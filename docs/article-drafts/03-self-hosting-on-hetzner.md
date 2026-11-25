# Article Dossier · Self-Hosting the Full AI Stack on $5/mo Hetzner

Status: research dossier (not yet written)
Last updated: 2026-05-07
Target: ~3,500 word HN/Reddit-tier deep dive

---

## Hook + TL;DR

**The pitch:** Migrate the entire creator/consultant SaaS stack — Substack, Cal.com cloud, UptimeRobot, PostHog cloud, Buttondown — onto a single Hetzner CX22 in Ashburn for **€3.79/mo (~$4.59 USD)**. Add a $4.51/mo Storage Box for backups + Resend's free tier for SMTP. **Total infra: ~$9/mo.**

**SaaS replaced (monthly retail):**
- Substack: 10% take-rate (effectively $20–80/mo at modest list size + 0.7% billing fee + Stripe)
- Buttondown: $9 base + $9/add-on (paid subs, RSS-to-email, analytics each cost extra)
- Cal.com Teams: $15/seat/mo
- PostHog Cloud: free up to 1M events, then $450/mo at 50M events
- UptimeRobot Solo: $9/mo

**Equivalent at typical volume: $80–150/mo. OSS-on-Hetzner: ~$9/mo. Annual delta: $850–1,700.**

The thesis isn't penny-pinching. It's that the same compute primitives that run agent workflows — a Linux box, Docker, Postgres, an LLM-friendly observability stack — also collapse the SaaS bill to a rounding error. The migration story is proof of the sovereign-compute thesis.

## Architecture (ASCII)

```
                          Cloudflare (DNS + L7 DDoS, optional)
                                       │
                                  ┌────┴─────┐
                                  │  :443    │
                                  ▼          ▼
┌──────────────────────────────────────────────────────────────┐
│  Hetzner CX22 · 2 vCPU · 4GB RAM · 40GB NVMe · Ashburn, VA   │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │           Caddy 2 (auto-TLS via Let's Encrypt)       │   │
│   └────┬───────────┬──────────┬──────────┬───────────────┘   │
│        │           │          │          │                   │
│   newsletter.   cal.       analytics.  status.               │
│        ▼           ▼          ▼          ▼                   │
│   ┌────────┐  ┌────────┐  ┌────────┐ ┌────────┐             │
│   │Listmonk│  │ Cal.com│  │ Umami  │ │ Uptime │             │
│   │  v6.1  │  │ Docker │  │  v2    │ │  Kuma  │             │
│   └───┬────┘  └───┬────┘  └───┬────┘ └────────┘             │
│       │           │           │                              │
│       └─────┬─────┴─────┬─────┘                              │
│             ▼           ▼                                    │
│        ┌──────────────────┐                                  │
│        │   Postgres 16    │  (separate DBs per app)          │
│        └──────────────────┘                                  │
│                                                              │
│   Restic (cron · daily 03:00 UTC) ──► Hetzner Storage Box    │
└──────────────────────────────────────────────────────────────┘
                                  │
                            SMTP relay
                                  ▼
                       Resend (free 3k/mo)
                              or AWS SES ($0.10/1k)
```

**Why this fits in 4 GB:** Listmonk (~150 MB), Cal.com (~600–800 MB), Umami (~200 MB), Uptime Kuma (~80 MB), Postgres shared (~400 MB), Caddy (~30 MB). Headroom ~1.5 GB. **Plane and PostHog do NOT fit on a CX22** — Plane needs 8 GB, PostHog needs 16 GB. Use Umami instead.

## Step-by-Step Setup

### Provision Hetzner
1. Create project. Add SSH key.
2. Create server: **CX22**, location **Ashburn (`ash`)** for US audience or Falkenstein/Helsinki for EU. Ubuntu 24.04 LTS. Skip backups (Restic).
3. Pricing as of May 2026:
   - **CX22**: €3.79/mo · 2 vCPU shared · 4 GB · 40 GB · 20 TB egress
   - **CX32**: €6.80/mo · 4 vCPU · 8 GB · 80 GB
   - **CCX13** (dedicated AMD): €15.99/mo · 2 dedicated vCPU · 8 GB
   - **Storage Box BX11**: ~$4.51/mo · 1 TB · SFTP/Restic/rclone

### DNS
```
A    @                 → <hetzner-ip>
A    newsletter        → <hetzner-ip>
A    cal               → <hetzner-ip>
A    analytics         → <hetzner-ip>
A    status            → <hetzner-ip>
TXT  @                 v=spf1 include:_spf.resend.com -all
TXT  resend._domainkey <DKIM key from Resend dashboard>
TXT  _dmarc            v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; adkim=r; aspf=r; pct=10
PTR  (reverse DNS)     yourdomain.com   ; in Hetzner Cloud Console
```

### OS bootstrap
```bash
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh && cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh

apt update && apt -y upgrade
apt -y install ufw fail2ban unattended-upgrades
ufw default deny incoming && ufw default allow outgoing
ufw allow OpenSSH && ufw allow 80,443/tcp && ufw enable
sed -i 's/#PermitRootLogin .*/PermitRootLogin no/; s/#PasswordAuthentication .*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy
```

### docker-compose.yml (single file)
```yaml
services:
  caddy:
    image: caddy:2
    restart: unless-stopped
    ports: ["80:80", "443:443", "443:443/udp"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config

  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD: ${PG_ROOT_PW}
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./initdb:/docker-entrypoint-initdb.d:ro

  listmonk:
    image: listmonk/listmonk:v6.1.0
    restart: unless-stopped
    environment:
      LISTMONK_app__address: "0.0.0.0:9000"
      LISTMONK_db__host: postgres
      LISTMONK_db__user: listmonk
      LISTMONK_db__password: ${LISTMONK_DB_PW}
      LISTMONK_db__database: listmonk
      LISTMONK_db__ssl_mode: disable
    depends_on: [postgres]

  calcom:
    image: calcom/cal.com:v4.1.2   # pin in production
    restart: unless-stopped
    environment:
      DATABASE_URL: postgresql://calcom:${CAL_DB_PW}@postgres:5432/calcom
      NEXTAUTH_URL: https://cal.yourdomain.com
      NEXT_PUBLIC_WEBAPP_URL: https://cal.yourdomain.com
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      CALENDSO_ENCRYPTION_KEY: ${CAL_ENC_KEY}
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: ${STRIPE_PK}
      STRIPE_PRIVATE_KEY: ${STRIPE_SK}
      EMAIL_FROM: bookings@yourdomain.com
      EMAIL_SERVER_HOST: smtp.resend.com
      EMAIL_SERVER_PORT: 465
      EMAIL_SERVER_USER: resend
      EMAIL_SERVER_PASSWORD: ${RESEND_API_KEY}
    depends_on: [postgres]

  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    restart: unless-stopped
    environment:
      DATABASE_URL: postgresql://umami:${UMAMI_DB_PW}@postgres:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: ${UMAMI_SECRET}
    depends_on: [postgres]

  uptime-kuma:
    image: louislam/uptime-kuma:1
    restart: unless-stopped
    volumes:
      - kuma_data:/app/data

volumes:
  caddy_data: {}
  caddy_config: {}
  pg_data: {}
  kuma_data: {}
```

### Caddyfile
```caddy
{ email ops@yourdomain.com }

newsletter.yourdomain.com  { reverse_proxy listmonk:9000 }
cal.yourdomain.com         { reverse_proxy calcom:3000 }
analytics.yourdomain.com   { reverse_proxy umami:3000 }
status.yourdomain.com      { reverse_proxy uptime-kuma:3001 }
```

`docker compose up -d` and Caddy fetches Let's Encrypt certs automatically.

### Backups (Restic to Hetzner Storage Box)
```bash
#!/usr/bin/env bash
set -euo pipefail
export RESTIC_PASSWORD_FILE=/home/deploy/.restic-pw
export RESTIC_REPOSITORY="sftp:u123456@u123456.your-storagebox.de:/restic"

docker exec -t stack-postgres-1 pg_dumpall -U postgres > /tmp/pgdump.sql
restic backup /home/deploy/stack /var/lib/docker/volumes /tmp/pgdump.sql --tag daily
restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune
rm /tmp/pgdump.sql
```

Cron: `0 3 * * * deploy /home/deploy/scripts/backup.sh >> /var/log/restic.log 2>&1`

## Email Deliverability — the dirty secret

This is where most "I'll just self-host my newsletter" stories die.

**Pick one SMTP relay:**
- **Resend** — Free 3,000 emails/mo (capped at 100/day). Pro $20/mo for 50k, no daily cap.
- **AWS SES** — $0.10 per 1,000 emails. 9× cheaper at scale; do your own bounce/complaint handling.

**Mandatory DNS records:**
```
SPF    v=spf1 include:_spf.resend.com -all
DKIM   resend._domainkey  TXT  "k=rsa; p=MIGfMA0..."
DMARC  _dmarc             TXT  "v=DMARC1; p=quarantine; rua=mailto:dmarc@..."
PTR    Set in Hetzner Cloud Console → reverse DNS
```

**Gmail bulk sender requirements (Feb 2024+, enforcing Nov 2025+):** SPF + DKIM auth, valid DMARC ≥ p=none, one-click unsubscribe, spam complaint <0.30%, valid forward + reverse DNS.

### 4-week warm-up plan

| Week | Daily cap | Audience |
|------|-----------|----------|
| 1    | 50        | Last-30-day-engaged subs only |
| 2    | 200       | Last-30-day-engaged |
| 3    | 1,000     | Last-60-day-engaged |
| 4    | 5,000     | Last-90-day-engaged |
| 5+   | Full list | Everyone except no-engagement-90+ |

Rules during warm-up: **consistency over volume**. Spikes look like a hijacked account. Send only to opted-in-within-90-days subs. Keep `p=quarantine` for 2–4 weeks of clean DMARC reports, then ramp `pct=10 → 25 → 50 → 100`.

### Deliverability QA loop
1. Send each campaign to a **mail-tester.com** address. Aim for 9.5+/10.
2. **mxtoolbox.com/deliverability** for SPF/DKIM/DMARC + 100+ RBL audit.
3. Paste raw headers into **mxtoolbox.com/EmailHeaders.aspx** — confirm DKIM signed by `d=yourdomain.com`.
4. Watch Gmail Postmaster Tools daily. Spam rate <0.30%; <0.10% safe zone.

### Common gotchas
- **Hetzner outbound port 25** blocked by default. You don't need it (relaying via 587/465).
- **Greylisting**: 1–2% deferrals on first-time sends — Listmonk + Resend handle retries.
- **DKIM signed by relay's domain instead of yours**: makes DMARC alignment fail. Set up custom domain in Resend/SES.
- **Reverse DNS missing** = instant spam folder.

## Cost Comparison Table

| Function | SaaS option | Cost @ ~5k subs / 50k events | OSS replacement | Cost on Hetzner |
|---|---|---|---|---|
| Newsletter | Substack (10% take) | ~$50–100/mo | Listmonk v6.1 | $0 |
| Newsletter | Buttondown (1k+ subs + paid + RSS + analytics) | ~$36/mo | Listmonk | $0 |
| Booking | Cal.com Teams | $15/seat/mo | Cal.com self-host | $0 |
| Product analytics | PostHog Cloud | Free → $450/mo @ 50M events | Umami v2 | $0 |
| Web analytics | Plausible Cloud (10k pv) | $9/mo | Umami v2 | $0 |
| Uptime monitoring | UptimeRobot Solo | $9/mo | Uptime Kuma | $0 |
| Email relay | Resend Pro 50k/mo | $20/mo | Resend Free / SES | $0–$5 |
| Hosting | — | — | Hetzner CX22 Ashburn | **€3.79/mo** |
| Backups | — | — | Hetzner Storage Box BX11 | **~$4.51/mo** |
| **Total SaaS** | | **~$80–150/mo** | | **~$9/mo all-in** |

## What NOT to self-host (and why)

- **Stripe / payment processing.** PCI-DSS, chargeback, fraud ML, KYC — you cannot replicate.
- **DNS.** Use Cloudflare (free) or Hetzner DNS. SPOF trap to host on the same VPS.
- **Email *sending* (the SMTP relay itself).** Blocked outbound :25, IP reputation hell, weeks of begging Spamhaus to delist. Use Resend or SES.
- **Object storage.** S3/R2/B2 cost ~$5–15/TB/mo with 11-nines durability. CX22's 40GB disk does not.
- **LLM inference at scale.** GPU rental on Hetzner (GEX44 with RTX 6000) is €184/mo. Self-host orchestration; rent inference.
- **Auth providers for B2B SaaS.** Clerk/WorkOS handle SAML/SCIM/SOC2 paperwork that takes a year to replicate.

## The maintenance reality

- **Initial setup**: 5–10 hours if you've done Docker before. 15–20 if it's your first compose stack.
- **Steady-state**: **1–2 hours/month** if nothing breaks.
- **Bad month**: 4–8 hours when something does — usually a Cal.com major version bump requiring a Postgres migration, Let's Encrypt hiccup behind Cloudflare proxy mode, or Listmonk silently failing because Resend rotated an API key.

Two grief-savers:
1. **Pin every Docker tag.** `:v4.1.2`, not `:latest`.
2. **Build the runbook *now*** while you remember what each env var does.

If 1–2 hours/month sounds like too much: stay on SaaS. The math only works if you actually enjoy the boxes.

## Sources

- [Hetzner CX cloud plans](https://www.hetzner.com/pressroom/new-cx-plans/)
- [Hetzner Cloud locations](https://docs.hetzner.com/cloud/general/locations/)
- [Hetzner April 2026 price adjustment](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/)
- [Hetzner Storage Box · Restic/rclone access](https://docs.hetzner.com/storage/storage-box/access/access-ssh-rsync-borg/)
- [Listmonk GitHub · v6.1.0](https://github.com/knadh/listmonk)
- [Listmonk official docker-compose.yml](https://github.com/knadh/listmonk/blob/master/docker-compose.yml)
- [Cal.com self-hosting docker docs](https://cal.com/docs/self-hosting/docker)
- [Cal.com Stripe integration](https://cal.com/docs/introduction/quick-start/self-hosting/install-apps/stripe)
- [PostHog self-host docs](https://posthog.com/docs/self-host)
- [Umami vs Plausible vs Matomo](https://aaronjbecker.com/posts/umami-vs-plausible-vs-matomo-self-hosted-analytics/)
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [Caddy reverse proxy quick-start](https://caddyserver.com/docs/quick-starts/reverse-proxy)
- [Resend pricing](https://resend.com/pricing)
- [AWS SES pricing](https://aws.amazon.com/ses/pricing/)
- [Google bulk sender requirements](https://support.google.com/a/answer/81126?hl=en)
- [Gmail enforcement ramp-up Nov 2025](https://dmarcwise.io/blog/gmail-sender-requirements-enforcement)
- [DMARC policy options](https://mxtoolbox.com/dmarc/details/dmarc-tags/dmarc-policy-options)
- [Mailgun warm-up guide](https://www.mailgun.com/blog/deliverability/domain-warmup-reputation-stretch-before-you-send/)

## Voice notes

- Strongest single sentence to seed an HN headline: **"The CX22 pays for itself in the first 24 hours of every month."**
- Counter-arguments to pre-empt:
  - "Your time costs more than $80/mo" → if you bill $200/hr and self-hosting costs 2 hrs/mo, it's a wash. The article is for people who *want* the boxes.
  - "PostHog Cloud is free up to 1M events" → exactly why the recommendation is **Umami in the stack, not PostHog**.
  - "Substack's 10% includes growth/discovery" → real. Article is for founders who already drive their own traffic.
- Word budget: Hook 250 · Architecture 400 · Setup 1,000 · Deliverability 900 · Cost table + commentary 400 · What-not-to-host 300 · Maintenance reality 250 = ~3,500.
