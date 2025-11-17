# Coin Railz x402 SDK
Autonomous, pay-per-call blockchain microservices for AI agents.

Network: Base  
Protocol: x402  
Endpoints: 18  
Currency: USDC on Base  

---

## Overview

Coin Railz x402 SDK provides 18 production-ready blockchain microservices designed for autonomous AI agents, with payments authenticated using the X-PAYMENT header.

No API keys.  
No accounts.  
No OAuth.  

Just Base USDC + a transaction hash.

---

## Why Use Coin Railz?

- True "Stripe for AI Agents" using x402 pay-per-call flows  
- 18 on-chain intelligence services: wallet risk, token prices, liquidity, whale alerts, contract scan, portfolio tracking, gas oracle, transaction builder, agent identity, and more  
- Authentication via blockchain payment, not accounts  
- Works with ElizaOS, LangChain, AgentKit, custom agents, Node/Python bots  

---

## How It Works

1) Fund a Base wallet with USDC  
2) Send a payment to the Coin Railz platform wallet:

    0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91

3) Copy the resulting txHash  
4) Build a JSON payload like:

    {"txHash": "0x123abc..."}

5) Base64-encode that JSON and put it in the header:

    X-PAYMENT: <base64_value>

6) Call any Coin Railz x402 endpoint  
7) Read the JSON response in your agent

---

## Service Catalog

Base URL:

    https://coinrailz.com/x402/

Services and endpoints:

    Multi-Chain Balance      /multi-chain-balance      $0.01
    Gas Price Oracle         /gas-price-oracle         $0.01
    Token Price              /token-price              $0.05
    Contract Scan            /contract-scan            $2.00
    Wallet Risk              /wallet-risk              $0.50
    Trade Signals            /trade-signals            $2.00
    Token Sentiment          /token-sentiment          $0.10
    Trending Tokens          /trending-tokens          $0.25
    Whale Alerts             /whale-alerts             $0.50
    DEX Liquidity            /dex-liquidity            $0.15
    Transaction Builder      /transaction-builder      $0.30
    Token Metadata           /token-metadata           $0.10
    Approval Manager         /approval-manager         $0.20
    Batch Quote              /batch-quote              $0.40
    Portfolio Tracker        /portfolio-tracker        $0.50
    Instant Agent Wallet     /instant-agent-wallet     $1.00
    Verified Agent Identity  /verified-agent-identity  $5.00
    Seamless Bridge          /seamless-chain-bridge    $2.00

---

## Quick Start – JavaScript

Example of encoding X-PAYMENT and calling wallet-risk:

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

---

## Quick Start – Python

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

---

## Integration Guides

Planned docs (coming soon):

    /docs/eliza-integration.md
    /docs/agent-integration.md
    /docs/build-paid-agent.md

Example scripts will live under:

    /examples/node
    /examples/python

---

## Error Codes

    400  Invalid request
    402  Payment required or invalid
    409  Payment conflict
    500  Internal server error

Example error response:

    {
      "success": false,
      "error": "Invalid or insufficient payment.",
      "code": "PAYMENT_INVALID"
    }

---

## Network & Wallet Info

    Network: Base Mainnet
    Currency: USDC
    Platform Wallet: 0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91

---

## Contributing

PRs welcome. Please open issues for:

- New service ideas  
- SDK improvements  
- Agent integrations  
- ElizaOS / LangChain / AgentKit examples  

---

## Support

X (Twitter): @coinrailz  
Email: support@coinrailz.com  

© 2025 Coin Railz
