import { ItemType, ContextItem, ContextWindow, Feedback } from './types';

export function getItemColor(type: ItemType): string {
  const colorMap: Record<ItemType, string> = {
    system_prompt: 'bg-anthro-blue',
    user_message: 'bg-anthro-blue',
    instructions: 'bg-anthro-blue',
    domain_knowledge: 'bg-anthro-blue',
    doc: 'bg-anthro-teal',
    tool: 'bg-anthro-orange',
    memory_file: 'bg-anthro-purple',
    message_history: 'bg-anthro-gray',
  };
  return colorMap[type] || 'bg-gray-200';
}

export function calculateMetrics(items: ContextItem[]) {
  const totalTokens = items.reduce((sum, item) => sum + item.tokenCount, 0);
  const cacheableTokens = items
    .filter(item => item.cacheable)
    .reduce((sum, item) => sum + item.tokenCount, 0);

  const cacheHitRate = totalTokens > 0 ? cacheableTokens / totalTokens : 0;

  // Cost calculation (simplified): $3 per million input tokens
  const estimatedCost = (totalTokens / 1_000_000) * 3;

  // Latency estimation: roughly 50ms per 1000 tokens
  const estimatedLatency = (totalTokens / 1000) * 0.05;

  // Accuracy heuristic: penalize extremes
  let accuracyScore = 85; // baseline
  if (totalTokens < 1000) accuracyScore -= 20; // too little context
  if (totalTokens > 150000) accuracyScore -= 15; // context rot

  // Bonus for having memory files (structured info)
  const hasMemoryFiles = items.some(item => item.type === 'memory_file');
  if (hasMemoryFiles) accuracyScore += 5;

  accuracyScore = Math.max(0, Math.min(100, accuracyScore));

  return {
    totalTokens,
    estimatedCost,
    estimatedLatency,
    cacheHitRate,
    accuracyScore,
  };
}

export function generateFeedback(
  contextWindow: ContextWindow,
  taskCategory: 'realtime' | 'longrunning' | 'batch'
): Feedback[] {
  const feedback: Feedback[] = [];
  const { items, metrics } = contextWindow;

  // Check for tool overlap
  const tools = items.filter(i => i.type === 'tool');
  if (tools.length > 5) {
    feedback.push({
      type: 'warning',
      message: `You have ${tools.length} tools. Too many tools may create decision ambiguity for the agent.`,
      severity: 'medium',
      relatedItems: tools.map(t => t.id),
    });
  }

  // Check token efficiency
  if (metrics.totalTokens > 100000) {
    feedback.push({
      type: 'tip',
      message: 'Large context detected. Consider message compaction or memory files to reduce tokens by ~40%.',
      severity: 'medium',
    });
  }

  // Check caching
  if (metrics.cacheHitRate > 0.7) {
    feedback.push({
      type: 'insight',
      message: `Excellent cache utilization (${Math.round(metrics.cacheHitRate * 100)}%)! This will significantly reduce costs.`,
      severity: 'low',
    });
  } else if (metrics.cacheHitRate < 0.3 && items.length > 3) {
    feedback.push({
      type: 'tip',
      message: 'Low cache utilization. Consider marking static items (system prompt, instructions) as cacheable.',
      severity: 'medium',
    });
  }

  // Task-specific checks
  if (taskCategory === 'realtime' && metrics.estimatedLatency > 3) {
    feedback.push({
      type: 'warning',
      message: `High latency (~${metrics.estimatedLatency.toFixed(1)}s) for real-time use case. Consider reducing context size.`,
      severity: 'high',
    });
  }

  if (taskCategory === 'realtime' && metrics.totalTokens < 5000) {
    feedback.push({
      type: 'insight',
      message: 'Tight context optimized for low latency. Good for real-time applications!',
      severity: 'low',
    });
  }

  // Check for missing system prompt
  const hasSystemPrompt = items.some(i => i.type === 'system_prompt');
  if (!hasSystemPrompt && items.length > 0) {
    feedback.push({
      type: 'warning',
      message: 'No system prompt detected. Agents typically need instructions to perform well.',
      severity: 'high',
    });
  }

  // Check for large documents without memory files
  const largeDocs = items.filter(i => i.type === 'doc' && i.tokenCount > 10000);
  const memoryFiles = items.filter(i => i.type === 'memory_file');
  if (largeDocs.length > 0 && memoryFiles.length === 0) {
    feedback.push({
      type: 'tip',
      message: `You have ${largeDocs.length} large document(s). Consider using memory files to pre-compute and condense key information.`,
      severity: 'medium',
      relatedItems: largeDocs.map(d => d.id),
    });
  }

  // Tradeoff analysis
  if (metrics.totalTokens > 50000 && taskCategory === 'longrunning') {
    feedback.push({
      type: 'tradeoff',
      message: `Current config: High accuracy (${metrics.accuracyScore}%), higher cost ($${metrics.estimatedCost.toFixed(3)}), medium latency. Good for accuracy-critical tasks.`,
      severity: 'low',
    });
  }

  return feedback;
}
