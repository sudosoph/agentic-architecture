# Field Manual 02: 512GB & 128GB Private AI Hardware + Tailscale Cheatsheet (Nov 2026)

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. Vendor-Neutral Memory Bandwidth & Capacity Matrix

Autoregressive token decode is governed by **memory bandwidth divided by active parameters per token**. Do not buy 512 GB for giant dense models (3 to 4 tok/s); buy 512 GB for **sparse MoE weights + huge KV caches**:

| Node Class | Memory & Bandwidth | Best Model Fit | Hardware Options |
|---|---|---|---|
| **Entry Local / IDE Tab** | 16 GB to 32 GB | Continue `Instinct` / `Sweep 1.5B` + `8B–14B` Q4 | Existing developer laptop or desktop GPU |
| **64GB–128GB Team Workhorse** | 64 GB to 128 GB (`256–410+ GB/s`) | `Qwen 3.8-27B` (Apache 2.0) + vision + embeddings | M5 Max Studio, M5 Pro Mac mini, HP Z2 Mini G1a, GMKtec EVO-X2, or 96GB Linux laptop |
| **128GB CUDA Prefill Node** | 128 GB (`273 GB/s`) | Heavy CUDA prompt prefill (~1,700 tok/s), TensorRT, ConnectX pair | NVIDIA DGX Spark (`$6,950` / `$4,999` 64GB OEM) |
| **512GB Sparse-MoE Desk Cluster** | **512 GB (`1.2 TB/s`)** + TB5 RDMA | `MiniMax M3.1 Flash` (501B/23B active, ~301 GB) & `Nemotron 3 Ultra` (550B/55B active) | Apple M5 Ultra Mac Studio (`$5,499` base -> ~`$8,500+` @ 512 GB) |

## 2. Zero-Port Tailscale Mesh Standard

1. Serve models via `llama-server` (CUDA / native AMD HIP / Vulkan), Apple `MLX`, or `vLLM` bound strictly to `127.0.0.1:8080`.
2. Never port-forward `8080` or `11434` on your router.
3. Run `tailscale serve --bg 8080` so authenticated laptops, phones, and CI runners reach `https://desk-node.tailnet.ts.net/v1` over WireGuard.

Full teardowns:
- https://agenticarchitect.ai/blog/512gb-unified-memory-mini-pcs-local-llm-2026
- https://agenticarchitect.ai/blog/autonomous-ai-rig-tailscale-guide
