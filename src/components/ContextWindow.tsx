import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ContextItem } from '../types';
import { ItemCard } from './ItemCard';

interface ContextWindowProps {
  items: ContextItem[];
  onRemove: (id: string) => void;
}

export function ContextWindow({ items, onRemove }: ContextWindowProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'context',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-anthro-text mb-3 flex items-center gap-2">
        <span>Context Window</span>
        <span className="text-sm font-normal text-gray-500">
          ({items.length} items)
        </span>
      </h2>
      <p className="text-xs text-gray-600 mb-3">
        Your selected context • Reorder by dragging
      </p>
      <div
        ref={setNodeRef}
        className={`flex-1 overflow-y-auto space-y-2 pr-2 border-2 border-dashed rounded-lg p-3 transition-colors ${
          isOver
            ? 'border-anthro-orange bg-orange-50'
            : 'border-gray-300 bg-gray-50'
        }`}
        style={{ maxHeight: 'calc(100vh - 400px)' }}
      >
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Drag items here or click items on the left
          </div>
        ) : (
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onRemove={onRemove} />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
