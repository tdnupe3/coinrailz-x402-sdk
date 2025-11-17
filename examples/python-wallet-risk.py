import json
import base64
import requests

COINRAILZ_BASE_URL = "https://coinrailz.com/api/x402"
PLATFORM_WALLET = "0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91"

def encode_x_payment(tx_hash: str) -> str:
    payload = {"txHash": tx_hash}
    return base64.b64encode(json.dumps(payload).encode("utf-8")).decode("utf-8")

def wallet_risk(wallet_address: str, chain: str, tx_hash: str):
    x_payment = encode_x_payment(tx_hash)
    res = requests.post(
        f"{COINRAILZ_BASE_URL}/wallet-risk",
        headers={"Content-Type": "application/json", "X-PAYMENT": x_payment},
        json={"walletAddress": wallet_address, "chain": chain}
    )
    res.raise_for_status()
    return res.json()

# Usage example
if __name__ == "__main__":
    result = wallet_risk(
        "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        "base",
        "0x123abc..."  # Replace with your actual txHash
    )
    print("Wallet risk:", result)
