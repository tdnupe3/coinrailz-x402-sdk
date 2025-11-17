import fetch from "node-fetch";
import { Buffer } from "buffer";

const COINRAILZ_BASE_URL = "https://coinrailz.com/api/x402";
const PLATFORM_WALLET = "0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91";

function encodeXPayment(txHash) {
  return Buffer.from(JSON.stringify({ txHash })).toString("base64");
}

export async function getWalletRisk(walletAddress, chain, txHash) {
  const xPayment = encodeXPayment(txHash);
  const res = await fetch(`${COINRAILZ_BASE_URL}/wallet-risk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT": xPayment
    },
    body: JSON.stringify({ walletAddress, chain })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Coin Railz error (${res.status}): ${text}`);
  }

  return res.json();
}

// Usage example
const result = await getWalletRisk(
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "base",
  "0x123abc..." // Replace with your actual txHash
);

console.log("Wallet risk:", result);
