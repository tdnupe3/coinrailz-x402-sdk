import { Buffer } from "buffer";

/**
 * Encode payment proof for x402 protocol
 * @param {string} txHash - Transaction hash of USDC payment on Base
 * @returns {string} Base64-encoded payment proof
 */
export function encodeXPayment(txHash) {
  const payload = { txHash };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

// Usage:
// const xPayment = encodeXPayment("0x123abc...");
// headers: { "X-PAYMENT": xPayment }
