import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ContextItem } from '../types';
import { ItemCard } from './ItemCard';

interface ItemPaletteProps {
  items: ContextItem[];
  onAddToContext: (item: ContextItem) => void;
  contextItemIds: string[];
}

export function ItemPalette({ items, onAddToContext, contextItemIds }: ItemPaletteProps) {
  const { setNodeRef } = useDroppable({ id: 'palette' });

  const availableItems = items.filter(item => !contextItemIds.includes(item.id));

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-anthro-text mb-3 flex items-center gap-2">
        <span>Available Items</span>
        <span className="text-sm font-normal text-gray-500">
          ({availableItems.length})
        </span>
      </h2>
      <p className="text-xs text-gray-600 mb-3">
        Drag items to the context window →
      </p>
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2"
        style={{ maxHeight: 'calc(100vh - 400px)' }}
      >
        <SortableContext
          items={availableItems.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {availableItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onAddToContext(item)}
              className="cursor-pointer"
            >
              <ItemCard item={item} isDraggable={false} />
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
