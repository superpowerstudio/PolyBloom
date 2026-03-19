"use client";

import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

export type PanelType =
  | "markets"
  | "polymarket"
  | "bot-control"
  | "chart"
  | "order-book"
  | "news";

export interface Panel {
  id: string;
  type: PanelType;
  title: string;
  position: number;
  size: "small" | "medium" | "large";
  visible: boolean;
}

interface LayoutStore {
  panels: Panel[];
  addPanel: (type: PanelType, title: string) => void;
  removePanel: (id: string) => void;
  updatePanel: (id: string, updates: Partial<Panel>) => void;
  togglePanel: (id: string) => void;
  movePanel: (fromIndex: number, toIndex: number) => void;
  resetLayout: () => void;
}

const LAYOUT_STORAGE_KEY = "polybloom-layout";

const DEFAULT_PANELS: Panel[] = [
  {
    id: "markets-top",
    type: "markets",
    title: "Top Markets",
    position: 0,
    size: "medium",
    visible: true,
  },
  {
    id: "polymarket-hot",
    type: "polymarket",
    title: "Hot Markets",
    position: 1,
    size: "medium",
    visible: true,
  },
  {
    id: "bot-claw",
    type: "bot-control",
    title: "Claw Control",
    position: 2,
    size: "large",
    visible: true,
  },
];

function loadPersistedLayout(): Panel[] {
  if (typeof window === "undefined") return DEFAULT_PANELS;
  try {
    const raw = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return DEFAULT_PANELS;
    const parsed = JSON.parse(raw) as Panel[];
    if (!Array.isArray(parsed)) return DEFAULT_PANELS;
    return parsed;
  } catch {
    return DEFAULT_PANELS;
  }
}

function persistLayout(panels: Panel[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(panels));
  } catch {
    // ignore
  }
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  panels: loadPersistedLayout(),

  addPanel: (type: PanelType, title: string) => {
    set((state) => {
      const newPanel: Panel = {
        id: `${type}-${Date.now()}`,
        type,
        title,
        position: state.panels.length,
        size: "medium",
        visible: true,
      };

      const newPanels = [...state.panels, newPanel];
      persistLayout(newPanels);
      return { panels: newPanels };
    });
  },

  removePanel: (id: string) => {
    set((state) => {
      const newPanels = state.panels.filter((p) => p.id !== id);
      persistLayout(newPanels);
      return { panels: newPanels };
    });
  },

  updatePanel: (id: string, updates: Partial<Panel>) => {
    set((state) => {
      const newPanels = state.panels.map((p) =>
        p.id === id ? { ...p, ...updates } : p,
      );
      persistLayout(newPanels);
      return { panels: newPanels };
    });
  },

  togglePanel: (id: string) => {
    set((state) => {
      const newPanels = state.panels.map((p) =>
        p.id === id ? { ...p, visible: !p.visible } : p,
      );
      persistLayout(newPanels);
      return { panels: newPanels };
    });
  },

  movePanel: (fromIndex: number, toIndex: number) => {
    set((state) => {
      const reordered = arrayMove(state.panels, fromIndex, toIndex);
      const updated = reordered.map((panel, index) => ({
        ...panel,
        position: index,
      }));
      persistLayout(updated);
      return { panels: updated };
    });
  },

  resetLayout: () => {
    persistLayout(DEFAULT_PANELS);
    set({ panels: DEFAULT_PANELS });
  },
}));
