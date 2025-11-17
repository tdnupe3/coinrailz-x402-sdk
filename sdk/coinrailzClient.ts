// Coin Railz x402 SDK - TypeScript Client
import fetch from "node-fetch";
import { Buffer } from "buffer";

const COINRAILZ_BASE_URL = "https://coinrailz.com/api/x402";
const PLATFORM_WALLET = "0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91";
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const BASE_CHAIN_ID = 8453;

export type Chain = "base";

export interface WalletRiskParams {
  walletAddress: string;
  chain: Chain;
}

export interface CoinRailzPaymentPayload {
  txHash: string;
}

export function encodeXPayment(payload: CoinRailzPaymentPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export async function callWalletRisk(params: WalletRiskParams, txHash: string) {
  const xPayment = encodeXPayment({ txHash });

  const res = await fetch(`${COINRAILZ_BASE_URL}/wallet-risk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT": xPayment
    },
    body: JSON.stringify(params)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Coin Railz wallet-risk error (${res.status}): ${text}`);
  }

  return res.json();
}

export class CoinRailzClient {
  private baseUrl: string;
  private platformWallet: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || COINRAILZ_BASE_URL;
    this.platformWallet = PLATFORM_WALLET;
  }

  async walletRisk(params: WalletRiskParams, txHash: string) {
    return callWalletRisk(params, txHash);
  }

  async gasPriceOracle(chains: string[], txHash: string) {
    const xPayment = encodeXPayment({ txHash });
    const res = await fetch(`${this.baseUrl}/gas-price-oracle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-PAYMENT": xPayment
      },
      body: JSON.stringify({ chains })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Coin Railz gas-price-oracle error (${res.status}): ${text}`);
    }

    return res.json();
  }
}
