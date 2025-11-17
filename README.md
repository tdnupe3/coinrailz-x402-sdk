# Coin Railz x402 SDK
Autonomous, pay-per-call blockchain microservices for AI agents.

[![Network: Base](https://img.shields.io/badge/network-Base-0052FF.svg)](https://base.org)
![Protocol: x402](https://img.shields.io/badge/protocol-x402-orange.svg)
![Endpoints](https://img.shields.io/badge/endpoints-18-brightgreen.svg)
![USDC](https://img.shields.io/badge/USDC-payments-blue.svg)

---

## 🧩 Overview
**Coin Railz x402 SDK** provides **18 production-ready blockchain microservices** designed for **autonomous AI agents**, with micropayments authenticated using the `X-PAYMENT` header.

No API keys.  
No accounts.  
No OAuth.  
Just **Base USDC + a transaction hash**.

---

## 🔥 Why Use Coin Railz?

### ✔ True “Stripe for AI Agents”
Each call is paid automatically using x402.

### ✔ 18 On-Chain Intelligence Services
- Wallet risk scoring  
- Token price lookups  
- Liquidity monitoring  
- Whale alerts  
- Contract scanning  
- Portfolio tracking  
- Gas oracle  
- Transaction builder  
- Agent identity  
- And more…

### ✔ Authentication via blockchain payment
No onboarding required.

### ✔ Works with all AI agent frameworks
- ElizaOS  
- LangChain  
- AgentKit  
- Custom loops  
- Node/Python bots  

---

## ⚙️ How It Works

1. Fund a Base wallet with USDC  
2. Send a payment to the Coin Railz platform wallet:  
0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91

css
Copy code
3. Copy the resulting `txHash`  
4. Encode it:
```json
{"txHash": "0x123abc..."}
```
Add as header:

makefile
Copy code
X-PAYMENT: <base64_value>
Call any endpoint

Receive JSON response

🗂 Service Catalog
Base URL:

arduino
Copy code
https://coinrailz.com/x402/
Service	Endpoint	Price
Multi-Chain Balance	/multi-chain-balance	$0.01
Gas Price Oracle	/gas-price-oracle	$0.01
Token Price	/token-price	$0.05
Contract Scan	/contract-scan	$2.00
Wallet Risk	/wallet-risk	$0.50
Trade Signals	/trade-signals	$2.00
Token Sentiment	/token-sentiment	$0.10
Trending Tokens	/trending-tokens	$0.25
Whale Alerts	/whale-alerts	$0.50
DEX Liquidity	/dex-liquidity	$0.15
Transaction Builder	/transaction-builder	$0.30
Token Metadata	/token-metadata	$0.10
Approval Manager	/approval-manager	$0.20
Batch Quote	/batch-quote	$0.40
Portfolio Tracker	/portfolio-tracker	$0.50
Instant Agent Wallet	/instant-agent-wallet	$1.00
Verified Agent Identity	/verified-agent-identity	$5.00
Seamless Bridge	/seamless-chain-bridge	$2.00

🧪 Quick Start Example
Step 1 — Encode X-PAYMENT
js
Copy code
const payload = { txHash: "0x123abc..." };
const xPayment = Buffer.from(JSON.stringify(payload)).toString("base64");
🚀 JavaScript Example
js
Copy code
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
🐍 Python Example
python
Copy code
import json
import base64
import requests

payload = {"txHash": "0x123abc..."}
x_payment = base64.b64encode(json.dumps(payload).encode()).decode()

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
🧠 Integration Guides
/docs/eliza-integration.md

/docs/agent-integration.md

/docs/build-paid-agent.md

Examples in:

bash
Copy code
/examples/node
/examples/python
⚠️ Error Codes
Code	Meaning
400	Invalid request
402	Payment required / invalid
409	Payment conflict
500	Server error

🌐 Network Info
Network: Base Mainnet
Currency: USDC
Platform Wallet:

Copy code
0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91
🤝 Contributing
PRs welcome.

📞 Support
Email: support@coinrailz.com
X: @coinrailz

© 2025 Coin Railz
