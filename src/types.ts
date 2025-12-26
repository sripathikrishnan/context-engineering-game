export type ItemType =
  | 'system_prompt'
  | 'user_message'
  | 'doc'
  | 'tool'
  | 'memory_file'
  | 'instructions'
  | 'domain_knowledge'
  | 'message_history';

export interface ContextItem {
  id: string;
  type: ItemType;
  name: string;
  description: string;
  content: string;
  tokenCount: number;
  cacheable: boolean;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  category: 'realtime' | 'longrunning' | 'batch';
  availableItems: ContextItem[];
  optimalConfig?: {
    tokenRange: [number, number];
    cacheRateMin: number;
    requiredItems: string[];
  };
}

export interface Metrics {
  totalTokens: number;
  estimatedCost: number;
  estimatedLatency: number;
  cacheHitRate: number;
  accuracyScore: number;
}

export interface Feedback {
  type: 'warning' | 'insight' | 'tip' | 'tradeoff';
  message: string;
  severity: 'low' | 'medium' | 'high';
  relatedItems?: string[];
}

export interface ContextWindow {
  items: ContextItem[];
  metrics: Metrics;
}
