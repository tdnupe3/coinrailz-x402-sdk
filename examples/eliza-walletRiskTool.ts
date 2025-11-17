import type { Tool } from "@elizaos/core";
import { callWalletRisk } from "../sdk/coinrailzClient";

export const walletRiskTool: Tool = {
  name: "wallet_risk",
  description: "Check wallet risk score via Coin Railz x402 service",
  inputSchema: {
    type: "object",
    properties: {
      walletAddress: {
        type: "string",
        description: "Wallet address to check"
      },
      chain: {
        type: "string",
        enum: ["base"],
        default: "base"
      },
      txHash: {
        type: "string",
        description: "Base USDC payment txHash to Coin Railz platform wallet"
      }
    },
    required: ["walletAddress", "txHash"]
  },
  async execute(input, _context) {
    const { walletAddress, chain = "base", txHash } = input as {
      walletAddress: string;
      chain: "base";
      txHash: string;
    };

    const result = await callWalletRisk({ walletAddress, chain }, txHash);
    return result;
  }
};

// Usage in ElizaOS agent config:
// import { walletRiskTool } from "./examples/eliza-walletRiskTool";
// 
// export const myAgentConfig = {
//   name: "coinrailz-defi-guardian",
//   description: "An Eliza agent using Coin Railz x402 services",
//   tools: [walletRiskTool],
// };
