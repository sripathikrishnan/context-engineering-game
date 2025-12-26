import { Metrics } from '../types';

interface MetricsPanelProps {
  metrics: Metrics;
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  const formatCost = (cost: number) => {
    if (cost < 0.01) return `$${(cost * 1000).toFixed(2)}¢`;
    return `$${cost.toFixed(3)}`;
  };

  const formatLatency = (seconds: number) => {
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    return `${seconds.toFixed(1)}s`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-anthro-text mb-3">
        Performance Metrics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard
          label="Tokens"
          value={metrics.totalTokens.toLocaleString()}
          max="200K"
          color="blue"
          percentage={(metrics.totalTokens / 200000) * 100}
        />
        <MetricCard
          label="Est. Cost"
          value={formatCost(metrics.estimatedCost)}
          color="green"
        />
        <MetricCard
          label="Est. Latency"
          value={formatLatency(metrics.estimatedLatency)}
          color="orange"
        />
        <MetricCard
          label="Cache Rate"
          value={`${Math.round(metrics.cacheHitRate * 100)}%`}
          color="purple"
          percentage={metrics.cacheHitRate * 100}
        />
        <MetricCard
          label="Accuracy"
          value={`${metrics.accuracyScore}%`}
          color="teal"
          percentage={metrics.accuracyScore}
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  max?: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'teal';
  percentage?: number;
}

function MetricCard({ label, value, max, color, percentage }: MetricCardProps) {
  const colorMap = {
    blue: 'border-blue-400 bg-blue-50',
    green: 'border-green-400 bg-green-50',
    orange: 'border-orange-400 bg-orange-50',
    purple: 'border-purple-400 bg-purple-50',
    teal: 'border-teal-400 bg-teal-50',
  };

  const barColorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    teal: 'bg-teal-500',
  };

  return (
    <div className={`rounded-lg border-2 ${colorMap[color]} p-3`}>
      <div className="text-xs font-medium text-gray-600 mb-1">{label}</div>
      <div className="text-xl font-bold text-anthro-text">
        {value}
        {max && <span className="text-sm text-gray-500 ml-1">/ {max}</span>}
      </div>
      {percentage !== undefined && (
        <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColorMap[color]} transition-all duration-300`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
      )}
    </div>
  );
}
