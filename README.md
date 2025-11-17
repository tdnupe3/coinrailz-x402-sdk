Coin Railz – x402 Microservices for Autonomous AI Agents

Build paid, on-chain, autonomous AI agents on Base using simple HTTP requests and x402 micropayments.










🚀 What Is Coin Railz?

Coin Railz is a production-ready catalog of 18 on-chain microservices for AI agents, powered by the x402 autonomous micropayment protocol.

These endpoints give your agents real operational abilities:

Multi-chain wallet reading

Wallet risk scoring

Token pricing & metadata

DEX liquidity analysis

Contract scanning

Whale alerts

Portfolio tracking

Transaction building

Approval management

Sentiment analysis

Agent identity verification

Autonomous wallet creation

And more…

No API keys
No dashboards
No authentication
Pay-per-call with USDC on Base
Fully permissionless

Your agent simply pays with a txHash via the X-PAYMENT header, and the service executes.

⚡ Why Developers Use Coin Railz

Autonomous AI-native payments (x402)

Permissionless (no signup required)

Base mainnet (low fees, fast finality)

Agent-first design (made for LLM agents)

Works with ElizaOS, AgentKit, LangChain, AutoGen, and custom agents

Production-grade 18-service API catalog

🧩 Architecture Overview
[AI Agent] 
     |
     |  X-PAYMENT Header (base64 txHash)
     v
[Coin Railz x402 Gateway]
     |
     v
[18 Microservices]
     |
     v
[JSON Response]


Simple. Modular. Autonomous.

🏁 Quick Start (5 Minutes)
1. Fund a Wallet With USDC on Base

Use MetaMask or Coinbase Wallet.

2. Send a Payment to Coin Railz

Send USDC to:

Coin Railz Platform Wallet
0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91
Network: Base Mainnet
Asset: USDC


Copy the resulting txHash.
This will authenticate and pay for your service call.

3. Create Your X-PAYMENT Header
JSON payload:
{"txHash": "0x123abc..."}

Base64 encoding:
Buffer.from(JSON.stringify({ txHash: "0x123abc..." })).toString("base64")

Result example:
eyJ0eEhhc2giOiAiMHgxMjNhYmMuLi4ifQ==

4. Call Any Service
Node.js Example
import fetch from "node-fetch";
import { Buffer } from "buffer";

const payload = { txHash: "0x123abc..." };
const xPayment = Buffer.from(JSON.stringify(payload)).toString("base64");

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

console.log(await res.json());

Python Example
import json
import base64
import requests

payload = {"txHash": "0x123abc..."}
x_payment = base64.b64encode(json.dumps(payload).encode("utf-8")).decode("utf-8")

res = requests.post(
    "https://coinrailz.com/x402/wallet-risk",
    headers={
        "Content-Type": "application/json",
        "X-PAYMENT": x_payment
    },
    json={
        "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        "chain": "base"
    }
)

print(res.json())

🧠 The X-PAYMENT Header (Critical)

Coin Railz uses HTTP 402 "Payment Required" to enable autonomous payments.

Your agent must send:

X-PAYMENT: <base64 encoded JSON>


Decoded JSON:

{
  "txHash": "0xabc123..."
}


Coin Railz validates:

Payment was sent to platform wallet

Amount ≥ service price

Transaction exists

Transaction has not been reused

If valid → service runs
If invalid → HTTP 402 returned

📚 Full Service Catalog

Base URL:

https://coinrailz.com/x402/<service>

Name	Endpoint	Price (USDC)	Required Fields
Multi-Chain Balance	POST /multi-chain-balance	0.01	walletAddress
Gas Price Oracle	POST /gas-price-oracle	0.01	chain
Token Price	POST /token-price	0.05	tokenAddress, chain
Contract Scan	POST /contract-scan	2.00	contractAddress, chain
Wallet Risk	POST /wallet-risk	0.50	walletAddress, chain
Trade Signals	POST /trade-signals	2.00	optional
Token Sentiment	POST /token-sentiment	0.10	tokenSymbol
Trending Tokens	POST /trending-tokens	0.25	optional
Whale Alerts	POST /whale-alerts	0.50	optional
DEX Liquidity	POST /dex-liquidity	0.15	tokenAddress, chain
Transaction Builder	POST /transaction-builder	0.30	to, chain, amount
Token Metadata	POST /token-metadata	0.10	tokenAddress, chain
Approval Manager	POST /approval-manager	0.20	tokenAddress, spender, amount, chain
Batch Quote	POST /batch-quote	0.40	fromToken, toToken, amount, chain
Portfolio Tracker	POST /portfolio-tracker	0.50	walletAddress
Instant Agent Wallet	POST /instant-agent-wallet	1.00	agentId
Verified Agent Identity	POST /verified-agent-identity	5.00	agentId, walletAddress
Seamless Chain Bridge	POST /seamless-chain-bridge	2.00	fromChain, toChain, amount, fromAddress, toAddress
🛠 Build a Paid AI Agent (5 Minutes)
1. Send a USDC payment

Get the resulting txHash.

2. Create header helper
function xPayment(txHash) {
  return Buffer.from(JSON.stringify({ txHash })).toString("base64");
}

3. Add service wrapper
async function walletRisk(wallet, chain, txHash) {
  const header = xPayment(txHash);

  const res = await fetch("https://coinrailz.com/x402/wallet-risk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT": header
    },
    body: JSON.stringify({ walletAddress: wallet, chain })
  });

  return res.json();
}

4. Use inside agent logic
const result = await walletRisk(
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "base",
  "0x123abc..."
);

console.log(result);


Your agent is now paid, autonomous, and operational.

🧬 ElizaOS Integration
Tool definition
import { Buffer } from "buffer";
import fetch from "node-fetch";

export const walletRiskTool = {
  name: "wallet_risk",
  description: "Evaluate wallet risk using Coin Railz",
  inputSchema: {
    type: "object",
    properties: {
      walletAddress: { type: "string" },
      chain: { type: "string", default: "base" },
      txHash: { type: "string" }
    },
    required: ["walletAddress", "txHash"]
  },
  async execute(input) {
    const xPayment = Buffer
      .from(JSON.stringify({ txHash: input.txHash }))
      .toString("base64");

    const res = await fetch("https://coinrailz.com/x402/wallet-risk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-PAYMENT": xPayment
      },
      body: JSON.stringify({
        walletAddress: input.walletAddress,
        chain: input.chain || "base"
      })
    });

    return res.json();
  }
};

Add to agent config
tools: [walletRiskTool]


Done.

❗ Error Codes
Code	Meaning
400	Bad Request
402	Payment Required
404	Invalid Service
500	Internal Error
📁 Repository Structure
/examples
    node-wallet-risk.js
    python-wallet-risk.py
    eliza-wallet-risk-tool.ts

/sdk
    coinrailzClient.ts
    coinrailzClient.py
    encodeXPayment.js

README.md
LICENSE

🤝 Contributing

PRs welcome.
Issues welcome.
Agent builders encouraged to request new services.

📜 License

MIT License © 2025 Coin Railz

📬 Contact

X (Twitter): https://x.com/coinrailz

Email: support@coinrailz.com

Developers: https://coinrailz.com/developers
