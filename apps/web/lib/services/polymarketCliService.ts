import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Polymarket CLI Service
 * Wraps the polymarket CLI and provides TypeScript methods for all operations.
 * All methods return JSON data parsed from CLI output.
 */
class PolymarketCliService {
  private baseCommand = "polymarket";

  /**
   * Execute a CLI command and return parsed JSON
   */
  private async execute(args: string[]): Promise<any> {
    try {
      const command = `${this.baseCommand} -o json ${args.join(" ")}`;
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && !stdout) {
        throw new Error(stderr);
      }
      
      return JSON.parse(stdout);
    } catch (error) {
      console.error("Polymarket CLI error:", error);
      throw error;
    }
  }

  /**
   * Execute command and return raw text output
   */
  private async executeRaw(args: string[]): Promise<string> {
    try {
      const command = `${this.baseCommand} ${args.join(" ")}`;
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr && !stdout) {
        throw new Error(stderr);
      }
      
      return stdout;
    } catch (error) {
      console.error("Polymarket CLI error:", error);
      throw error;
    }
  }

  // ==================== MARKETS ====================

  async getMarkets(options: {
    limit?: number;
    offset?: number;
    active?: boolean;
    closed?: boolean;
    order?: string;
    ascending?: boolean;
  } = {}): Promise<any[]> {
    const args = ["markets", "list"];
    if (options.limit) args.push("--limit", String(options.limit));
    if (options.offset) args.push("--offset", String(options.offset));
    if (options.active !== undefined) args.push("--active", String(options.active));
    if (options.closed !== undefined) args.push("--closed", String(options.closed));
    if (options.order) args.push("--order", options.order);
    if (options.ascending) args.push("--ascending");
    return this.execute(args);
  }

  async getMarketById(idOrSlug: string): Promise<any> {
    return this.execute(["markets", "get", idOrSlug]);
  }

  async searchMarkets(keyword: string, limit: number = 50): Promise<any[]> {
    return this.execute(["markets", "search", keyword, "--limit", String(limit)]);
  }

  async getMarketTags(marketId: string): Promise<any[]> {
    return this.execute(["markets", "tags", marketId]);
  }

  // ==================== EVENTS ====================

  async getEvents(options: {
    limit?: number;
    offset?: number;
    tag?: string;
    active?: boolean;
    closed?: boolean;
  } = {}): Promise<any[]> {
    const args = ["events", "list"];
    if (options.limit) args.push("--limit", String(options.limit));
    if (options.offset) args.push("--offset", String(options.offset));
    if (options.tag) args.push("--tag", options.tag);
    if (options.active !== undefined) args.push("--active", String(options.active));
    if (options.closed !== undefined) args.push("--closed", String(options.closed));
    return this.execute(args);
  }

  async getEventById(eventId: string): Promise<any> {
    return this.execute(["events", "get", eventId]);
  }

  // ==================== TAGS ====================

  async getTags(): Promise<any[]> {
    return this.execute(["tags", "list"]);
  }

  async getTag(slug: string): Promise<any> {
    return this.execute(["tags", "get", slug]);
  }

  async getRelatedTags(slug: string): Promise<any[]> {
    return this.execute(["tags", "related-tags", slug]);
  }

  // ==================== CLOB - ORDER BOOK & PRICES ====================

  async checkApiHealth(): Promise<any> {
    return this.execute(["clob", "ok"]);
  }

  async getPrice(tokenId: string, side: "buy" | "sell" = "buy"): Promise<any> {
    return this.execute(["clob", "price", tokenId, "--side", side]);
  }

  async getMidpoint(tokenId: string): Promise<any> {
    return this.execute(["clob", "midpoint", tokenId]);
  }

  async getSpread(tokenId: string): Promise<any> {
    return this.execute(["clob", "spread", tokenId]);
  }

  async getBatchPrices(tokenIds: string[], side: "buy" | "sell" = "buy"): Promise<any> {
    return this.execute(["clob", "batch-prices", tokenIds.join(","), "--side", side]);
  }

  async getMidpoints(tokenIds: string[]): Promise<any> {
    return this.execute(["clob", "midpoints", tokenIds.join(",")]);
  }

  async getSpreads(tokenIds: string[]): Promise<any> {
    return this.execute(["clob", "spreads", tokenIds.join(",")]);
  }

  async getOrderBook(tokenId: string): Promise<any> {
    return this.execute(["clob", "book", tokenId]);
  }

  async getOrderBooks(tokenIds: string[]): Promise<any> {
    return this.execute(["clob", "books", tokenIds.join(",")]);
  }

  async getLastTrade(tokenId: string): Promise<any> {
    return this.execute(["clob", "last-trade", tokenId]);
  }

  async getClobMarket(conditionId: string): Promise<any> {
    return this.execute(["clob", "market", conditionId]);
  }

  async getClobMarkets(): Promise<any[]> {
    return this.execute(["clob", "markets"]);
  }

  async getPriceHistory(
    tokenId: string,
    interval: "1m" | "1h" | "6h" | "1d" | "1w" | "max" = "1d",
    fidelity: number = 30
  ): Promise<any> {
    return this.execute([
      "clob", "price-history", tokenId,
      "--interval", interval,
      "--fidelity", String(fidelity),
    ]);
  }

  async getTickSize(tokenId: string): Promise<any> {
    return this.execute(["clob", "tick-size", tokenId]);
  }

  async getFeeRate(tokenId: string): Promise<any> {
    return this.execute(["clob", "fee-rate", tokenId]);
  }

  async getNegRisk(tokenId: string): Promise<any> {
    return this.execute(["clob", "neg-risk", tokenId]);
  }

  async getClobTime(): Promise<any> {
    return this.execute(["clob", "time"]);
  }

  async checkGeoblock(): Promise<any> {
    return this.execute(["clob", "geoblock"]);
  }

  // ==================== CLOB - TRADING ====================

  async createOrder(options: {
    tokenId: string;
    side: "buy" | "sell";
    price: number;
    size: number;
    orderType?: "GTC" | "FOK" | "GTD" | "FAK";
    postOnly?: boolean;
  }): Promise<any> {
    const args = [
      "clob", "create-order",
      "--token", options.tokenId,
      "--side", options.side,
      "--price", String(options.price),
      "--size", String(options.size),
    ];
    if (options.orderType) args.push("--order-type", options.orderType);
    if (options.postOnly) args.push("--post-only");
    return this.execute(args);
  }

  async createMarketOrder(options: {
    tokenId: string;
    side: "buy" | "sell";
    amount: number;
  }): Promise<any> {
    return this.execute([
      "clob", "market-order",
      "--token", options.tokenId,
      "--side", options.side,
      "--amount", String(options.amount),
    ]);
  }

  async postOrders(options: {
    tokenIds: string[];
    side: "buy" | "sell";
    prices: number[];
    sizes: number[];
  }): Promise<any> {
    return this.execute([
      "clob", "post-orders",
      "--tokens", options.tokenIds.join(","),
      "--side", options.side,
      "--prices", options.prices.join(","),
      "--sizes", options.sizes.join(","),
    ]);
  }

  async cancelOrder(orderId: string): Promise<any> {
    return this.execute(["clob", "cancel", orderId]);
  }

  async cancelOrders(orderIds: string[]): Promise<any> {
    return this.execute(["clob", "cancel-orders", orderIds.join(",")]);
  }

  async cancelMarketOrders(conditionId: string): Promise<any> {
    return this.execute(["clob", "cancel-market", "--market", conditionId]);
  }

  async cancelAllOrders(): Promise<any> {
    return this.execute(["clob", "cancel-all"]);
  }

  async getOrders(marketConditionId?: string): Promise<any[]> {
    const args = ["clob", "orders"];
    if (marketConditionId) args.push("--market", marketConditionId);
    return this.execute(args);
  }

  async getOrder(orderId: string): Promise<any> {
    return this.execute(["clob", "order", orderId]);
  }

  async getTrades(): Promise<any[]> {
    return this.execute(["clob", "trades"]);
  }

  async getBalance(assetType: "collateral" | "conditional", tokenId?: string): Promise<any> {
    const args = ["clob", "balance", "--asset-type", assetType];
    if (tokenId) args.push("--token", tokenId);
    return this.execute(args);
  }

  async updateBalance(assetType: "collateral" | "conditional"): Promise<any> {
    return this.execute(["clob", "update-balance", "--asset-type", assetType]);
  }

  // ==================== REWARDS & API KEYS ====================

  async getRewards(date?: string): Promise<any> {
    const args = ["clob", "rewards"];
    if (date) args.push("--date", date);
    return this.execute(args);
  }

  async getEarnings(date?: string): Promise<any> {
    const args = ["clob", "earnings"];
    if (date) args.push("--date", date);
    return this.execute(args);
  }

  async getApiKeys(): Promise<any[]> {
    return this.execute(["clob", "api-keys"]);
  }

  async createApiKey(): Promise<any> {
    return this.execute(["clob", "create-api-key"]);
  }

  async deleteApiKey(): Promise<any> {
    return this.execute(["clob", "delete-api-key"]);
  }

  async getAccountStatus(): Promise<any> {
    return this.execute(["clob", "account-status"]);
  }

  // ==================== ON-CHAIN DATA ====================

  async getPositions(address: string): Promise<any[]> {
    return this.execute(["data", "positions", address]);
  }

  async getClosedPositions(address: string): Promise<any[]> {
    return this.execute(["data", "closed-positions", address]);
  }

  async getPortfolioValue(address: string): Promise<any> {
    return this.execute(["data", "value", address]);
  }

  async getTradedMarkets(address: string): Promise<any[]> {
    return this.execute(["data", "traded", address]);
  }

  async getTradeHistory(address: string, limit: number = 50): Promise<any[]> {
    return this.execute(["data", "trades", address, "--limit", String(limit)]);
  }

  async getActivity(address: string): Promise<any[]> {
    return this.execute(["data", "activity", address]);
  }

  async getHolders(conditionId: string): Promise<any[]> {
    return this.execute(["data", "holders", conditionId]);
  }

  async getOpenInterest(conditionId: string): Promise<any> {
    return this.execute(["data", "open-interest", conditionId]);
  }

  async getVolume(eventId: string): Promise<any> {
    return this.execute(["data", "volume", eventId]);
  }

  async getLeaderboard(options: {
    period?: "day" | "week" | "month" | "all";
    orderBy?: "pnl" | "volume";
    limit?: number;
  } = {}): Promise<any[]> {
    const args = ["data", "leaderboard"];
    if (options.period) args.push("--period", options.period);
    if (options.orderBy) args.push("--order-by", options.orderBy);
    if (options.limit) args.push("--limit", String(options.limit));
    return this.execute(args);
  }

  // ==================== WALLET ====================

  async createWallet(force: boolean = false): Promise<any> {
    const args = ["wallet", "create"];
    if (force) args.push("--force");
    return this.execute(args);
  }

  async importWallet(privateKey: string): Promise<any> {
    return this.execute(["wallet", "import", privateKey]);
  }

  async getWalletAddress(): Promise<string> {
    return this.executeRaw(["wallet", "address"]);
  }

  async getWalletInfo(): Promise<any> {
    return this.execute(["wallet", "show"]);
  }

  async resetWallet(force: boolean = false): Promise<any> {
    const args = ["wallet", "reset"];
    if (force) args.push("--force");
    return this.execute(args);
  }

  // ==================== APPROVALS ====================

  async checkApprovals(address?: string): Promise<any> {
    const args = ["approve", "check"];
    if (address) args.push(address);
    return this.execute(args);
  }

  async setApprovals(): Promise<any> {
    return this.execute(["approve", "set"]);
  }

  // ==================== CTF OPERATIONS ====================

  async splitTokens(conditionId: string, amount: number): Promise<any> {
    return this.execute([
      "ctf", "split",
      "--condition", conditionId,
      "--amount", String(amount),
    ]);
  }

  async mergeTokens(conditionId: string, amount: number): Promise<any> {
    return this.execute([
      "ctf", "merge",
      "--condition", conditionId,
      "--amount", String(amount),
    ]);
  }

  async redeemTokens(conditionId: string): Promise<any> {
    return this.execute(["ctf", "redeem", "--condition", conditionId]);
  }

  async redeemNegRisk(conditionId: string, amounts: number[]): Promise<any> {
    return this.execute([
      "ctf", "redeem-neg-risk",
      "--condition", conditionId,
      "--amounts", amounts.join(","),
    ]);
  }

  // ==================== BRIDGE ====================

  async getDepositAddresses(address: string): Promise<any> {
    return this.execute(["bridge", "deposit", address]);
  }

  async getSupportedAssets(): Promise<any[]> {
    return this.execute(["bridge", "supported-assets"]);
  }

  async checkDepositStatus(depositAddress: string): Promise<any> {
    return this.execute(["bridge", "status", depositAddress]);
  }

  // ==================== PROFILES ====================

  async getProfile(address: string): Promise<any> {
    return this.execute(["profiles", "get", address]);
  }

  // ==================== SPORTS ====================

  async getSports(): Promise<any[]> {
    return this.execute(["sports", "list"]);
  }

  async getSportsMarketTypes(): Promise<any[]> {
    return this.execute(["sports", "market-types"]);
  }

  async getSportsTeams(league?: string, limit: number = 50): Promise<any[]> {
    const args = ["sports", "teams"];
    if (league) args.push("--league", league);
    args.push("--limit", String(limit));
    return this.execute(args);
  }

  // ==================== SYSTEM ====================

  async getStatus(): Promise<any> {
    return this.execute(["status"]);
  }
}

export const polymarketCli = new PolymarketCliService();