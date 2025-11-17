# Coin Railz — x402 Microservices for Autonomous AI Agents

Coin Railz lets you build **paid, on-chain, autonomous AI agents on Base** using simple HTTP requests and x402 micropayments.

- ⚡ 18 production microservices (wallet risk, token price, DEX liquidity, contract scan, etc.)
- 🧠 Designed for AI agents (ElizaOS, AgentKit, LangChain, custom loops)
- 💸 Pay-per-call with USDC on Base using the `X-PAYMENT` header
- 🔐 No API keys, no login, no dashboard – just HTTP + txHash

---

## How It Works

1. Fund a wallet with **USDC on Base**.
2. Send a payment to the Coin Railz platform wallet  
   `0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91`
3. Take the transaction hash (`txHash`) from that payment.
4. Base64-encode a JSON payload like:

   ```json
   {"txHash": "0x123abc..."}
Put the result in the X-PAYMENT header when calling any Coin Railz endpoint.

If the payment is valid, the service executes and returns JSON.

Quick Example (Node.js)
js
Copy code
import fetch from "node-fetch";
import { Buffer } from "buffer";

const txHash = "0x123abc..."; // USDC payment to the Coin Railz wallet

const xPayment = Buffer
  .from(JSON.stringify({ txHash }))
  .toString("base64");

const res = await fetch("https://coinrailz.com/x402/wallet-risk", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-PAYMENT": xPayment
  },
  body: JSON.stringify({
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    chain: "base"
  })
});

const data = await res.json();
console.log(data);
Available Services (Overview)
All endpoints are POST and live under:

https://coinrailz.com/x402/<service>

Examples:

multi-chain-balance – check balances across chains

wallet-risk – score wallet risk

token-price – get token prices

dex-liquidity – fetch liquidity data

contract-scan – analyze contract safety

portfolio-tracker – track wallets

instant-agent-wallet – create wallets for agents

verified-agent-identity – bind identity to wallets

👉 See full parameters, pricing, and endpoints here:
/docs/technical.md (or your preferred docs path)

ElizaOS / Agent Integration
Coin Railz is designed to plug into:

ElizaOS tools

AgentKit actions

LangChain tools

Custom async loops

Each tool/action only needs to:

Accept a txHash from the caller

Generate the X-PAYMENT header

POST to the appropriate /x402/... endpoint

Return the JSON back to the agent

(See detailed examples in /docs/technical.md.)

Status
✅ 18 live services

✅ Base mainnet

✅ x402 payments

✅ OpenAI + WalletConnect integrated on the platform side

License
MIT © 2025 Coin Railz

Contact
X (Twitter): https://x.com/coinrailz

Email: support@coinrailz.com

Developers: https://coinrailz.com/developers
