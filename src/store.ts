import { create } from 'zustand';
import { ContextItem, Task, ContextWindow } from './types';
import { calculateMetrics } from './utils';
import { TASKS } from './data/tasks';

interface GameState {
  currentTask: Task | null;
  contextWindow: ContextWindow;
  setTask: (taskId: string) => void;
  addToContext: (item: ContextItem) => void;
  removeFromContext: (itemId: string) => void;
  reorderContext: (items: ContextItem[]) => void;
  clearContext: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentTask: TASKS[0],
  contextWindow: {
    items: [],
    metrics: {
      totalTokens: 0,
      estimatedCost: 0,
      estimatedLatency: 0,
      cacheHitRate: 0,
      accuracyScore: 0,
    },
  },

  setTask: (taskId: string) => {
    const task = TASKS.find(t => t.id === taskId);
    if (task) {
      set({
        currentTask: task,
        contextWindow: {
          items: [],
          metrics: {
            totalTokens: 0,
            estimatedCost: 0,
            estimatedLatency: 0,
            cacheHitRate: 0,
            accuracyScore: 0,
          },
        },
      });
    }
  },

  addToContext: (item: ContextItem) =>
    set((state) => {
      const newItems = [...state.contextWindow.items, item];
      return {
        contextWindow: {
          items: newItems,
          metrics: calculateMetrics(newItems),
        },
      };
    }),

  removeFromContext: (itemId: string) =>
    set((state) => {
      const newItems = state.contextWindow.items.filter(i => i.id !== itemId);
      return {
        contextWindow: {
          items: newItems,
          metrics: calculateMetrics(newItems),
        },
      };
    }),

  reorderContext: (items: ContextItem[]) =>
    set(() => ({
      contextWindow: {
        items,
        metrics: calculateMetrics(items),
      },
    })),

  clearContext: () =>
    set(() => ({
      contextWindow: {
        items: [],
        metrics: {
          totalTokens: 0,
          estimatedCost: 0,
          estimatedLatency: 0,
          cacheHitRate: 0,
          accuracyScore: 0,
        },
      },
    })),
}));
