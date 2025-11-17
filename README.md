# Coin Railz — x402 Microservices for Autonomous AI Agents

Build paid, on-chain, autonomous AI agents on Base using simple HTTP requests and x402 micropayments.










🚀 What Is Coin Railz?

Coin Railz provides a production-ready catalog of 18 on-chain microservices for AI agents, powered by the x402 autonomous payment protocol.

These services give your agent real-world powers:

Wallet scanning

Wallet risk scoring

Multi-chain balances

Token prices

DEX liquidity

Whale tracking

Sentiment analysis

Portfolio tracking

Transaction building

Smart contract scanning

Approval management

Agent identity verification

Autonomous wallet creation

No API keys.
No login.
No dashboard.
Just USDC on Base + the X-PAYMENT header.

⚡ Why Developers Use Coin Railz

Autonomous-friendly payment model (x402)

Base mainnet = fast, cheap, low-latency

Fully permissionless — no signup required

Simple HTTP POST endpoints

Pay-per-call — no subscriptions

Works with:

ElizaOS

AgentKit

LangChain

AutoGen

Custom LLM agent loops

🧩 Architecture Overview
[AI Agent]
    |
    |  (X-PAYMENT Header: base64-encoded txHash)
    v
[Coin Railz x402 Gateway]
    |
    v
[18 Autonomous Microservices]
    |
    v
[JSON Response]

🏁 Quick Start (5 Minutes)
1. Fund a wallet with USDC on Base

Use MetaMask, Coinbase Wallet, or any Base-supported wallet.

2. Send a USDC payment to the Coin Railz platform wallet
Platform Wallet Address (Base):
0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91
Asset: USDC
Network: Base Mainnet


Copy the resulting txHash.

3. Create your X-PAYMENT header
JSON payload:
{"txHash": "0x123abc..."}

Convert to Base64:
Buffer.from(JSON.stringify({ txHash: "0x123abc..." })).toString("base64")


Example output:

eyJ0eEhhc2giOiAiMHgxMjNhYmMuLi4ifQ==

4. Call any Coin Railz service
Node.js example:
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

Python example:
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

🧠 The X-PAYMENT Header

Coin Railz uses HTTP 402 Payment Required for autonomous payments.

Format:
X-PAYMENT: <base64 encoded JSON>


Decoded payload must look like:

{"txHash": "0xabc123..."}


Coin Railz verifies:

transaction exists

payment sent to platform wallet

amount >= required price

txHash not reused

chain = Base mainnet

If valid → service executes
If invalid → HTTP 402 error

📚 Full Service Catalog

Below is a clean, bullet-style catalog (renders perfectly on GitHub every time).

Each service lives at:

https://coinrailz.com/x402/<service>

Multi-Chain Balance

Endpoint: POST /multi-chain-balance

Price: 0.01 USDC

Params: walletAddress

Gas Price Oracle

Endpoint: POST /gas-price-oracle

Price: 0.01 USDC

Params: chain

Token Price

Endpoint: POST /token-price

Price: 0.05 USDC

Params: tokenAddress, chain

Contract Scan

Endpoint: POST /contract-scan

Price: 2.00 USDC

Params: contractAddress, chain

Wallet Risk

Endpoint: POST /wallet-risk

Price: 0.50 USDC

Params: walletAddress, chain

Trade Signals

Endpoint: POST /trade-signals

Price: 2.00 USDC

Params: (optional)

Token Sentiment

Endpoint: POST /token-sentiment

Price: 0.10 USDC

Params: tokenSymbol

Trending Tokens

Endpoint: POST /trending-tokens

Price: 0.25 USDC

Params: (optional)

Whale Alerts

Endpoint: POST /whale-alerts

Price: 0.50 USDC

Params: (optional)

DEX Liquidity

Endpoint: POST /dex-liquidity

Price: 0.15 USDC

Params: tokenAddress, chain

Transaction Builder

Endpoint: POST /transaction-builder

Price: 0.30 USDC

Params: to, chain, amount

Token Metadata

Endpoint: POST /token-metadata

Price: 0.10 USDC

Params: tokenAddress, chain

Approval Manager

Endpoint: POST /approval-manager

Price: 0.20 USDC

Params: tokenAddress, spender, amount, chain

Batch Quote

Endpoint: POST /batch-quote

Price: 0.40 USDC

Params: fromToken, toToken, amount, chain

Portfolio Tracker

Endpoint: POST /portfolio-tracker

Price: 0.50 USDC

Params: walletAddress

Instant Agent Wallet

Endpoint: POST /instant-agent-wallet

Price: 1.00 USDC

Params: agentId

Verified Agent Identity

Endpoint: POST /verified-agent-identity

Price: 5.00 USDC

Params: agentId, walletAddress

Seamless Chain Bridge

Endpoint: POST /seamless-chain-bridge

Price: 2.00 USDC

Params: fromChain, toChain, amount, fromAddress, toAddress

🛠 Build a Paid AI Agent (5 Minutes)
Helper
function xPayment(txHash) {
  return Buffer.from(JSON.stringify({ txHash })).toString("base64");
}

Service call wrapper
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

Use inside agent logic
const risk = await walletRisk(
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "base",
  "0x123abc..."
);

console.log(risk);

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
    const header = Buffer
      .from(JSON.stringify({ txHash: input.txHash }))
      .toString("base64");

    const res = await fetch("https://coinrailz.com/x402/wallet-risk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-PAYMENT": header
      },
      body: JSON.stringify({
        walletAddress: input.walletAddress,
        chain: input.chain ?? "base"
      })
    });

    return res.json();
  }
};

Add to agent config
tools: [walletRiskTool]

❗ Error Codes
Code	Meaning
400	Missing or invalid parameters
402	Payment invalid or insufficient
404	Service not found
500	Internal server error
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
Agent builders encouraged to request new services.

📜 License

MIT License © 2025 Coin Railz

📬 Contact

Twitter (X): https://x.com/coinrailz

Email: support@coinrailz.com

Developers: https://coinrailz.com/developers
