import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContextItem } from '../types';
import { getItemColor } from '../utils';

interface ItemCardProps {
  item: ContextItem;
  onRemove?: (id: string) => void;
  isDraggable?: boolean;
}

export function ItemCard({ item, onRemove, isDraggable = true }: ItemCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: !isDraggable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const colorClass = getItemColor(item.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${colorClass} rounded-lg px-4 py-2.5 shadow-sm border border-gray-300 cursor-move hover:shadow-md transition-shadow relative group`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-anthro-text truncate">
            {item.name}
          </div>
          <div className="text-xs text-gray-600 mt-0.5">
            {item.tokenCount.toLocaleString()} tokens
            {item.cacheable && (
              <span className="ml-2 text-purple-600">● Cacheable</span>
            )}
          </div>
        </div>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800 p-1"
            title="Remove from context"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
