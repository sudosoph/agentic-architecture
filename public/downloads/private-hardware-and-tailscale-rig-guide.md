# Field Manual 02: The Private AI Hardware & Tailscale Rig Cheatsheet

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. Quick Memory Sizing Rule of Thumb (Q4_K_M Quantization)

Memory capacity and memory bandwidth dictate what you can actually run locally without painful token-per-second stalls:

| Workload Tier | Target Model Class | Minimum VRAM / Unified RAM | Practical Hardware Pick |
|---|---|---|---|
| Fast Router + 8B-14B Drafts | 4B to 14B Q4_K_M | 12 GB to 16 GB | Existing laptop or entry desktop GPU |
| Daily Coding & 27B-35B Workhorse | 27B Dense or 35B-A3B MoE | 24 GB VRAM or 48 GB Unified | Single 24GB GPU or modular workstation |
| Heavy Multi-Agent + Long Context | 70B Q4 or multi-model concurrent | 64 GB to 96 GB Unified RAM | Framework 16 / Strix Halo / 96GB DDR5 rig |

## 2. Clean Software Stack (Zero Dependency Hell)

1. **Inference Server:** Use `llama-server` (from `llama.cpp`, including the lightweight native HIP backend on AMD GPUs without multi-gigabyte toolkit bloat) or `vLLM` exposing `http://127.0.0.1:8080/v1`.
2. **Bind Strictly to Localhost / Tailscale Interface:** Never port-forward `8080` or `11434` on your home router.
3. **Encrypted Mesh Access Everywhere:** Install Tailscale on both your home rig and your travel laptop or phone. Enable Tailscale Serve so your coding editor, n8n instance, or mobile client reaches `https://my-rig.tailnet-name.ts.net/v1` over WireGuard from coffee shops or hotels with zero public ports open.

Full setup walkthroughs:
- https://agenticarchitect.ai/blog/96gb-ram-thesis
- https://agenticarchitect.ai/blog/framework-laptop-thesis
- https://agenticarchitect.ai/blog/autonomous-ai-rig-tailscale-guide
