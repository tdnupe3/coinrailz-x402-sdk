"""Coin Railz x402 SDK - Python Client"""
import json
import base64
import requests
from typing import Dict, List, Any

COINRAILZ_BASE_URL = "https://coinrailz.com/api/x402"
PLATFORM_WALLET = "0xa4bbe37f9a6ae2dc36a607b91eb148c0ae163c91"
USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
BASE_CHAIN_ID = 8453

def encode_x_payment(tx_hash: str) -> str:
    """Encode payment proof for x402 protocol"""
    payload = {"txHash": tx_hash}
    return base64.b64encode(json.dumps(payload).encode("utf-8")).decode("utf-8")

def wallet_risk(wallet_address: str, chain: str, tx_hash: str) -> Dict[str, Any]:
    """Check wallet risk score"""
    x_payment = encode_x_payment(tx_hash)
    res = requests.post(
        f"{COINRAILZ_BASE_URL}/wallet-risk",
        headers={"Content-Type": "application/json", "X-PAYMENT": x_payment},
        json={"walletAddress": wallet_address, "chain": chain}
    )
    res.raise_for_status()
    return res.json()

class CoinRailzClient:
    """Main client for Coin Railz x402 services"""
    
    def __init__(self, base_url: str = COINRAILZ_BASE_URL):
        self.base_url = base_url
        self.platform_wallet = PLATFORM_WALLET

    def wallet_risk(self, wallet_address: str, chain: str, tx_hash: str) -> Dict[str, Any]:
        return wallet_risk(wallet_address, chain, tx_hash)

    def gas_price_oracle(self, chains: List[str], tx_hash: str) -> Dict[str, Any]:
        x_payment = encode_x_payment(tx_hash)
        res = requests.post(
            f"{self.base_url}/gas-price-oracle",
            headers={"Content-Type": "application/json", "X-PAYMENT": x_payment},
            json={"chains": chains}
        )
        res.raise_for_status()
        return res.json()
