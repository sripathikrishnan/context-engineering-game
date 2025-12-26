import { useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useGameStore } from './store';
import { TaskSelector } from './components/TaskSelector';
import { ItemPalette } from './components/ItemPalette';
import { ContextWindow } from './components/ContextWindow';
import { MetricsPanel } from './components/MetricsPanel';
import { FeedbackPanel } from './components/FeedbackPanel';
import { generateFeedback } from './utils';
import { ContextItem } from './types';

function App() {
  const {
    currentTask,
    contextWindow,
    setTask,
    addToContext,
    removeFromContext,
    reorderContext,
  } = useGameStore();


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const feedback = useMemo(() => {
    if (!currentTask) return [];
    return generateFeedback(contextWindow, currentTask.category);
  }, [contextWindow, currentTask]);

  const handleDragStart = (_event: DragStartEvent) => {
    // Could be used for visual feedback during drag
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId) return;

    const activeInContext = contextWindow.items.some((i) => i.id === activeId);
    const overIsContext = overId === 'context';

    if (!activeInContext && overIsContext) {
      const item = currentTask?.availableItems.find((i) => i.id === activeId);
      if (item) {
        addToContext(item);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeInContext = contextWindow.items.some((i) => i.id === activeId);
    const overInContext = contextWindow.items.some((i) => i.id === overId);

    if (activeInContext && overInContext && activeId !== overId) {
      const oldIndex = contextWindow.items.findIndex((i) => i.id === activeId);
      const newIndex = contextWindow.items.findIndex((i) => i.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(contextWindow.items, oldIndex, newIndex);
        reorderContext(reordered);
      }
    }
  };

  const handleAddToContext = (item: ContextItem) => {
    if (!contextWindow.items.some((i) => i.id === item.id)) {
      addToContext(item);
    }
  };

  if (!currentTask) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-anthro-cream">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-anthro-text mb-2">
            Context Engineering Game
          </h1>
          <p className="text-gray-600">
            Learn the art and science of designing optimal context for AI agents
          </p>
        </header>

        <TaskSelector currentTask={currentTask} onTaskChange={setTask} />

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <ItemPalette
              items={currentTask.availableItems}
              onAddToContext={handleAddToContext}
              contextItemIds={contextWindow.items.map((i) => i.id)}
            />
            <ContextWindow
              items={contextWindow.items}
              onRemove={removeFromContext}
            />
          </div>
        </DndContext>

        <div className="space-y-4">
          <MetricsPanel metrics={contextWindow.metrics} />
          <FeedbackPanel feedback={feedback} />
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Built with ❤️ for context engineering education •{' '}
            <a
              href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anthro-orange hover:underline"
            >
              Learn more about context engineering
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
