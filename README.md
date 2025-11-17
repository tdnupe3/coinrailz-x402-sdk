# Coin Railz – x402 Microservices for Autonomous AI Agents  
Build paid, on-chain, autonomous AI agents on Base using simple HTTP requests and x402 micropayments.

BADGES:
x402 Enabled
Base Mainnet
18 Live Services
AI Autonomous
MIT License

------------------------------------------------------------
WHAT IS COIN RAILZ?
------------------------------------------------------------
Coin Railz is a production-ready catalog of 18 on-chain microservices for AI agents, powered by the x402 autonomous payment protocol.

Your AI agent can:
- Read multi-chain balances
- Fetch token prices
- Evaluate wallet risk
- Analyze DEX liquidity
- Track whale alerts
- Scan contracts
- Build transactions
- Manage approvals
- Track portfolios
- Create wallets
- Verify agent identity
- And more…

No API keys.
No user accounts.
No dashboards.
No subscriptions.

Just one header + Base USDC.

------------------------------------------------------------
WHY DEVELOPERS USE COIN RAILZ
------------------------------------------------------------
- Autonomous AI-native payments (x402)
- Permissionless, no signup required
- Base mainnet performance
- Agent-first microservices
- Works with all agent frameworks: ElizaOS, AgentKit, LangChain, AutoGen, custom agents

------------------------------------------------------------
ARCHITECTURE OVERVIEW
------------------------------------------------------------
AI Agent --> X-PAYMENT Header --> Coin Railz Gateway --> 18 Microservices --> JSON Response

------------------------------------------------------------
QUICK START (5 MINUTES)
------------------------------------------------------------

1. Fund a Wallet With USDC on Base  
Use MetaMask or Coinbase Wallet.

2. Send a Payment  
Send USDC to the Coin Railz platform wallet:

Platform Wallet:
0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91
Network: Base
Asset: USDC

Copy the resulting txHash.

3. Create Your X-PAYMENT Header  
Base64 encode a JSON object containing the txHash.

Example JSON:
{"txHash": "0x123abc..."}

Example Base64 encoding (Node style):
Buffer.from(JSON.stringify({ txHash: "0x123abc..." })).toString("base64")

Result example:
eyJ0eEhhc2giOiAiMHgxMjNhYmMuLi4ifQ==

Use this in:
X-PAYMENT: <base64 string>

4. Call Any Coin Railz Service

Node Example:
import fetch from "node-fetch";
import { Buffer } from "buffer";

const payload = { txHash: "0x123abc..." };
const xPayment = Buffer.from(JSON.stringify(payload)).toString("base64");

const res = await fetch(
  "https://coinrailz.com/x402/wallet-risk",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT": xPayment
    },
    body: JSON.stringify({
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      chain: "base"
    })
  }
);

console.log(await res.json());

Python Example:
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

------------------------------------------------------------
THE X-PAYMENT HEADER (CRITICAL)
------------------------------------------------------------
Coin Railz uses HTTP 402 “Payment Required”.

Header must use:
X-PAYMENT: <base64 encoded JSON>

Decoded JSON looks like:
{
  "txHash": "0xabc123..."
}

Coin Railz verifies:
- Transaction exists on Base
- Payment sent to platform wallet
- Amount matches or exceeds service price
- Transaction not reused

If valid → executes.
If invalid → HTTP 402.

------------------------------------------------------------
FULL SERVICE CATALOG
------------------------------------------------------------
Base URL:
https://coinrailz.com/x402/<service>

Name | Endpoint | Price (USDC) | Required Fields
---------------------------------------------------------------------------
Multi-Chain Balance | POST /multi-chain-balance | 0.01 | walletAddress
Gas Price Oracle | POST /gas-price-oracle | 0.01 | chain
Token Price | POST /token-price | 0.05 | tokenAddress, chain
Contract Scan | POST /contract-scan | 2.00 | contractAddress, chain
Wallet Risk | POST /wallet-risk | 0.50 | walletAddress, chain
Trade Signals | POST /trade-signals | 2.00 | optional
Token Sentiment | POST /token-sentiment | 0.10 | tokenSymbol
Trending Tokens | POST /trending-tokens | 0.25 | optional
Whale Alerts | POST /whale-alerts | 0.50 | optional
DEX Liquidity | POST /dex-liquidity | 0.15 | tokenAddress, chain
Transaction Builder | POST /transaction-builder | 0.30 | to, chain, amount
Token Metadata | POST /token-metadata | 0.10 | tokenAddress, chain
Approval Manager | POST /approval-manager | 0.20 | tokenAddress, spender, amount, chain
Batch Quote | POST /batch-quote | 0.40 | fromToken, toToken, amount, chain
Portfolio Tracker | POST /portfolio-tracker | 0.50 | walletAddress
Instant Agent Wallet | POST /instant-agent-wallet | 1.00 | agentId
Verified Agent Identity | POST /verified-agent-identity | 5.00 | agentId, walletAddress
Seamless Chain Bridge | POST /seamless-chain-bridge | 2.00 | fromChain, toChain, amount, fromAddress, toAddress

------------------------------------------------------------
BUILD A PAID AI AGENT (5 MINUTES)
------------------------------------------------------------

1. Send USDC payment → copy txHash  
2. Create helper:

function xPayment(txHash) {
  return Buffer.from(JSON.stringify({ txHash })).toString("base64");
}

3. Add service wrapper:

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

4. Call inside agent:

const result = await walletRisk(
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "base",
  "0x123abc..."
);

console.log(result);

------------------------------------------------------------
ELIZAOS INTEGRATION
------------------------------------------------------------

Tool Definition:
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
    const xPayment = Buffer.from(JSON.stringify({ txHash: input.txHash })).toString("base64");

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

Add to agent config:
tools: [walletRiskTool]

------------------------------------------------------------
ERROR CODES
------------------------------------------------------------
400 – Bad Request  
402 – Payment Required  
404 – Invalid Service  
500 – Internal Error  

------------------------------------------------------------
REPOSITORY STRUCTURE
------------------------------------------------------------

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

------------------------------------------------------------
CONTRIBUTING
------------------------------------------------------------
PRs welcome. Open an issue for new service ideas.

------------------------------------------------------------
LICENSE
------------------------------------------------------------
MIT License 
© 2025 Coin Railz

------------------------------------------------------------
CONTACT
------------------------------------------------------------
X: https://x.com/coinrailz  
Email: support@coinrailz.com  
Website: https://coinrailz.com/developers

