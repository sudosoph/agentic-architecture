# Field Manual 02: 512GB & 128GB Private AI Hardware + Tailscale Cheatsheet

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. Vendor-Neutral Memory Bandwidth & Capacity Matrix

Autoregressive token decode is governed by **memory bandwidth divided by active parameters per token**. Do not buy 512 GB for giant dense models; buy 512 GB for **sparse MoE weights + large KV caches**:

| Node Class | Memory & Bandwidth | Best Model Fit | Hardware Options |
|---|---|---|---|
| **Entry Local / IDE** | 16 GB to 32 GB | Local edit models + `8B-14B` Q4 | Existing laptop or desktop GPU |
| **64GB-128GB Team Workhorse** | 64 GB to 128 GB (`256-410+ GB/s`) | `Qwen 3.8-27B` (Apache 2.0) + vision + embeddings | M5 Max Studio, HP Z2 Mini G1a, GMKtec EVO-X2, or 96GB Linux rig |
| **128GB CUDA Prefill Node** | 128 GB (`273 GB/s`) | Heavy CUDA prompt prefill (~1,700 tok/s), TensorRT | NVIDIA DGX Spark |
| **512GB Sparse-MoE Desk Node** | **512 GB (`1.2 TB/s`)** + TB5 RDMA | `MiniMax M3.1 Flash` (501B/23B active) & `Nemotron 3 Ultra` | Apple M5 Ultra Mac Studio (512 GB) |

## 2. Zero-Port Tailscale Mesh Standard

1. Serve models via `llama-server` (CUDA / HIP / Vulkan), Apple `MLX`, or `vLLM` bound strictly to `127.0.0.1:8080`.
2. Never port-forward `8080` or `11434` on your router.
3. Run `tailscale serve --bg 8080` so authenticated team devices reach `https://desk-node.tailnet.ts.net/v1` over WireGuard.

Full teardowns:
- https://agenticarchitect.ai/blog/mac-studio-512gb-vs-dgx-spark
- https://agenticarchitect.ai/blog/autonomous-ai-rig-tailscale-guide
