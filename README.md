# Coin Railz x402 SDK  
### Autonomous, pay-per-call blockchain microservices for AI agents  

[![Network: Base](https://img.shields.io/badge/network-Base-0052FF.svg)](https://base.org)
[![Protocol: x402](https://img.shields.io/badge/protocol-x402-orange.svg)](#)
![Endpoints](https://img.shields.io/badge/endpoints-18-brightgreen.svg)
![USDC](https://img.shields.io/badge/USDC-Payments-blue.svg)

---

## 🧩 Overview  
**Coin Railz x402 SDK** provides **18 production-ready blockchain microservices** designed specifically for **autonomous AI agents**, with **blockchain-native micropayments** authenticated through the `X-PAYMENT` header.

No API keys.  
No accounts.  
No OAuth.  
Just **Base USDC** + a single transaction hash.

Your agent pays for what it uses — fully autonomously.

---

## 🔥 Why Use Coin Railz?

### ✔ True “Stripe for AI Agents”  
Agents pay for services using Base USDC via x402 payment protocol.

### ✔ 18 On-Chain Intelligence Services  
- Wallet risk analysis  
- Token prices  
- Liquidity checks  
- Whale monitoring  
- Token metadata  
- Portfolio tracking  
- Contract scanning  
- Gas oracles  
- Transaction builder  
- And more…

### ✔ No developer accounts  
The payment transaction itself is the authentication.

### ✔ Designed for Autonomous Agents  
Perfect for:
- **ElizaOS**
- **LangChain**
- **AgentKit**
- **Virtuals**
- **Custom autonomous agents**
- **Node / Python bots**

---

## ⚙️ How It Works

1. Fund a Base wallet with USDC.  
2. Send a payment to the Coin Railz platform wallet:  
0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91

pgsql
Copy code
3. Copy the resulting `txHash`.  
4. Encode it as Base64 JSON:  
```json
{"txHash": "0x123abc..."}
Use it in your request header:

makefile
Copy code
X-PAYMENT: <base64_value>
Call any endpoint under https://coinrailz.com/x402/.

Get your JSON response.

🗂 Service Catalog (18 Endpoints)
Base URL:

arduino
Copy code
https://coinrailz.com/x402/
Service	Endpoint	Price (USDC)
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

🧪 Quick Start
1. Encode the X-PAYMENT header
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
ElizaOS Integration
/docs/eliza-integration.md

Node & Python Agents
/docs/agent-integration.md

Build a Paid AI Agent in 5 Minutes
/docs/build-paid-agent.md

Examples located in:

bash
Copy code
/examples/node
/examples/python
⚠️ Error Codes
Code	Meaning
400	Invalid request body
402	Payment required / txHash invalid
409	Payment conflict (double spend)
500	Internal service error

Example error:

json
Copy code
{
  "success": false,
  "error": "Invalid or insufficient payment.",
  "code": "PAYMENT_INVALID"
}
🌐 Network & Wallet Info
Network: Base Mainnet

Currency: USDC

Platform Wallet:

Copy code
0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91
🤝 Contributing
PRs welcome. Open issues for:

New service ideas

SDK enhancements

Agent framework integrations

ElizaOS examples

📞 Support
Documentation: https://coinrailz.com/docs
Email: support@coinrailz.com
GitHub Issues: https://github.com/coinrailz/x402-sdk/issues

📜 License
MIT License - See LICENSE for details
