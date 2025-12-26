import { Feedback } from '../types';

interface FeedbackPanelProps {
  feedback: Feedback[];
}

export function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  if (feedback.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-anthro-text mb-3">
          AI Feedback & Analysis
        </h2>
        <p className="text-sm text-gray-500 italic">
          Add items to your context window to receive feedback on your configuration...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-anthro-text mb-3">
        AI Feedback & Analysis
      </h2>
      <div className="space-y-2">
        {feedback.map((item, index) => (
          <FeedbackItem key={index} feedback={item} />
        ))}
      </div>
    </div>
  );
}

interface FeedbackItemProps {
  feedback: Feedback;
}

function FeedbackItem({ feedback }: FeedbackItemProps) {
  const typeConfig = {
    warning: {
      icon: '⚠️',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
    },
    insight: {
      icon: '💡',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
    },
    tip: {
      icon: '✨',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-800',
    },
    tradeoff: {
      icon: '⚖️',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-400',
      textColor: 'text-gray-800',
    },
  };

  const config = typeConfig[feedback.type];

  const severityDot = {
    low: 'bg-green-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400',
  };

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-r-lg p-3`}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg">{config.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              {feedback.type}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${severityDot[feedback.severity]}`}
              title={`${feedback.severity} severity`}
            />
          </div>
          <p className={`text-sm ${config.textColor}`}>{feedback.message}</p>
        </div>
      </div>
    </div>
  );
}
