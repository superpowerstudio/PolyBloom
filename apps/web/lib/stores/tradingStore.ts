import { create } from "zustand";
import { polymarketAPI, OrderBook, Trade, Position, PortfolioValue } from "@/lib/api/polymarket";

interface TradingStore {
  // Order Book
  orderBook: OrderBook | null;
  selectedTokenId: string | null;
  
  // Orders & Trades
  openOrders: Trade[];
  tradeHistory: Trade[];
  
  // Portfolio
  positions: Position[];
  portfolioValue: PortfolioValue | null;
  
  // Trading State
  isTrading: boolean;
  paperMode: boolean;
  lastTradeError: string | null;
  
  // Loading States
  loadingOrderBook: boolean;
  loadingOrders: boolean;
  loadingPositions: boolean;
  
  // Actions
  fetchOrderBook: (tokenId: string) => Promise<void>;
  fetchOrders: (marketConditionId?: string) => Promise<void>;
  fetchTrades: () => Promise<void>;
  fetchPositions: (address: string) => Promise<void>;
  fetchPortfolioValue: (address: string) => Promise<void>;
  
  // Trading Actions (Paper Mode by default)
  createOrder: (options: {
    tokenId: string;
    side: "buy" | "sell";
    price: number;
    size: number;
  }) => Promise<boolean>;
  
  createMarketOrder: (options: {
    tokenId: string;
    side: "buy" | "sell";
    amount: number;
  }) => Promise<boolean>;
  
  cancelOrder: (orderId: string) => Promise<boolean>;
  cancelAllOrders: () => Promise<boolean>;
  
  // Paper Trading Simulation
  paperOrders: Trade[];
  paperBalance: number;
  addPaperOrder: (order: Omit<Trade, "id" | "timestamp" | "status">) => void;
  cancelPaperOrder: (orderId: string) => void;
  
  // Utility
  setSelectedToken: (tokenId: string | null) => void;
  clearError: () => void;
}

// Initial paper balance for simulation
const INITIAL_PAPER_BALANCE = 10000;

export const useTradingStore = create<TradingStore>((set, get) => ({
  // State
  orderBook: null,
  selectedTokenId: null,
  openOrders: [],
  tradeHistory: [],
  positions: [],
  portfolioValue: null,
  isTrading: false,
  paperMode: true, // ALWAYS start in paper mode for safety
  lastTradeError: null,
  loadingOrderBook: false,
  loadingOrders: false,
  loadingPositions: false,
  paperOrders: [],
  paperBalance: INITIAL_PAPER_BALANCE,

  // Fetch Order Book
  fetchOrderBook: async (tokenId: string) => {
    set({ loadingOrderBook: true, selectedTokenId: tokenId });
    try {
      const orderBook = await polymarketAPI.getOrderBook(tokenId);
      set({ orderBook, loadingOrderBook: false });
    } catch (error) {
      console.error("Failed to fetch order book:", error);
      set({ loadingOrderBook: false });
    }
  },

  // Fetch Open Orders
  fetchOrders: async (marketConditionId?: string) => {
    set({ loadingOrders: true });
    try {
      const { paperMode, paperOrders } = get();
      if (paperMode) {
        // In paper mode, return simulated orders
        set({ openOrders: paperOrders, loadingOrders: false });
      } else {
        const orders = await polymarketAPI.getOrders(marketConditionId);
        set({ openOrders: orders, loadingOrders: false });
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      set({ loadingOrders: false });
    }
  },

  // Fetch Trade History
  fetchTrades: async () => {
    try {
      const { paperMode } = get();
      if (paperMode) {
        // In paper mode, use simulated trade history
        return;
      }
      const trades = await polymarketAPI.getTrades();
      set({ tradeHistory: trades });
    } catch (error) {
      console.error("Failed to fetch trades:", error);
    }
  },

  // Fetch Positions
  fetchPositions: async (address: string) => {
    set({ loadingPositions: true });
    try {
      const positions = await polymarketAPI.getPositions(address);
      set({ positions, loadingPositions: false });
    } catch (error) {
      console.error("Failed to fetch positions:", error);
      set({ loadingPositions: false });
    }
  },

  // Fetch Portfolio Value
  fetchPortfolioValue: async (address: string) => {
    try {
      const portfolioValue = await polymarketAPI.getPortfolioValue(address);
      set({ portfolioValue });
    } catch (error) {
      console.error("Failed to fetch portfolio value:", error);
    }
  },

  // Create Limit Order
  createOrder: async (options) => {
    const { paperMode, paperBalance } = get();
    
    if (paperMode) {
      // Paper trading simulation
      const cost = options.price * options.size;
      if (options.side === "buy" && cost > paperBalance) {
        set({ lastTradeError: "Insufficient balance" });
        return false;
      }
      
      get().addPaperOrder({
        market: options.tokenId,
        side: options.side,
        price: options.price,
        size: options.size,
      });
      
      // Update paper balance
      if (options.side === "buy") {
        set({ paperBalance: paperBalance - cost });
      } else {
        set({ paperBalance: paperBalance + cost });
      }
      
      return true;
    }
    
    // Live trading
    set({ isTrading: true, lastTradeError: null });
    try {
      await polymarketAPI.createOrder(options);
      set({ isTrading: false });
      // Refresh orders
      get().fetchOrders();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Order failed";
      set({ isTrading: false, lastTradeError: errorMessage });
      return false;
    }
  },

  // Create Market Order
  createMarketOrder: async (options) => {
    const { paperMode, paperBalance } = get();
    
    if (paperMode) {
      // Paper trading simulation - estimate price from order book
      const { orderBook } = get();
      if (!orderBook) {
        set({ lastTradeError: "No order book data available" });
        return false;
      }
      
      const estimatedPrice = options.side === "buy" 
        ? parseFloat(orderBook.asks[0]?.price || "0.5")
        : parseFloat(orderBook.bids[0]?.price || "0.5");
      
      const estimatedSize = options.amount / estimatedPrice;
      
      if (options.side === "buy" && options.amount > paperBalance) {
        set({ lastTradeError: "Insufficient balance" });
        return false;
      }
      
      get().addPaperOrder({
        market: options.tokenId,
        side: options.side,
        price: estimatedPrice,
        size: estimatedSize,
      });
      
      // Update paper balance
      if (options.side === "buy") {
        set({ paperBalance: paperBalance - options.amount });
      } else {
        set({ paperBalance: paperBalance + options.amount });
      }
      
      return true;
    }
    
    // Live trading
    set({ isTrading: true, lastTradeError: null });
    try {
      await polymarketAPI.createMarketOrder(options);
      set({ isTrading: false });
      get().fetchOrders();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Market order failed";
      set({ isTrading: false, lastTradeError: errorMessage });
      return false;
    }
  },

  // Cancel Order
  cancelOrder: async (orderId: string) => {
    const { paperMode } = get();
    
    if (paperMode) {
      get().cancelPaperOrder(orderId);
      return true;
    }
    
    set({ isTrading: true, lastTradeError: null });
    try {
      await polymarketAPI.cancelOrder(orderId);
      set({ isTrading: false });
      get().fetchOrders();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Cancel failed";
      set({ isTrading: false, lastTradeError: errorMessage });
      return false;
    }
  },

  // Cancel All Orders
  cancelAllOrders: async () => {
    const { paperMode } = get();
    
    if (paperMode) {
      set({ paperOrders: [], openOrders: [] });
      return true;
    }
    
    set({ isTrading: true, lastTradeError: null });
    try {
      await polymarketAPI.cancelAllOrders();
      set({ isTrading: false, openOrders: [] });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Cancel all failed";
      set({ isTrading: false, lastTradeError: errorMessage });
      return false;
    }
  },

  // Paper Trading Helpers
  addPaperOrder: (order) => {
    const newOrder: Trade = {
      id: `paper-${Date.now()}`,
      ...order,
      timestamp: Date.now(),
      status: "filled", // Simulate immediate fill for paper trading
    };
    
    set((state) => ({
      paperOrders: [...state.paperOrders, newOrder],
      tradeHistory: [...state.tradeHistory, newOrder],
    }));
  },

  cancelPaperOrder: (orderId: string) => {
    set((state) => ({
      paperOrders: state.paperOrders.filter((o) => o.id !== orderId),
      openOrders: state.openOrders.filter((o) => o.id !== orderId),
    }));
  },

  // Utility
  setSelectedToken: (tokenId) => {
    set({ selectedTokenId: tokenId });
    if (tokenId) {
      get().fetchOrderBook(tokenId);
    }
  },

  clearError: () => {
    set({ lastTradeError: null });
  },
}));