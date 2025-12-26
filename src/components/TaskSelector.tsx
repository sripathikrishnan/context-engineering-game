import { Task } from '../types';
import { TASKS } from '../data/tasks';

interface TaskSelectorProps {
  currentTask: Task | null;
  onTaskChange: (taskId: string) => void;
}

export function TaskSelector({ currentTask, onTaskChange }: TaskSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold text-anthro-text mb-3">
        Select Scenario
      </h2>
      <div className="flex flex-wrap gap-2">
        {TASKS.map((task) => (
          <button
            key={task.id}
            onClick={() => onTaskChange(task.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentTask?.id === task.id
                ? 'bg-anthro-orange text-white shadow-md'
                : 'bg-gray-100 text-anthro-text hover:bg-gray-200'
            }`}
          >
            {task.name}
          </button>
        ))}
      </div>
      {currentTask && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Goal:</span> {currentTask.description}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <span className="font-semibold">Category:</span>{' '}
            <span className="capitalize">{currentTask.category}</span>
          </p>
        </div>
      )}
    </div>
  );
}
