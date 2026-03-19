"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { useLayoutStore, Panel } from "@/lib/stores/layoutStore";
import { ClawControlPanel } from "@/components/ClawControlPanel";
import { NewsRadarPanel } from "@/components/NewsRadarPanel";
import { BacktesterPanel } from "@/components/BacktesterPanel";
import { MarketOverviewPanel } from "@/components/MarketOverviewPanel";

function SortablePanel({
  panel,
  children,
}: {
  panel: Panel;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: panel.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`panel ${isDragging ? "opacity-80 scale-105" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between gap-2 mb-3 cursor-grab"
      >
        <h3 className="text-base font-semibold text-polybloom-neon">
          {panel.title}
        </h3>
        <span className="text-xs text-slate-500">drag</span>
      </div>
      {children}
    </div>
  );
}

function PanelContent({ panel }: { panel: Panel }) {
  switch (panel.type) {
    case "markets":
      return <MarketOverviewPanel limit={20} />;
    case "polymarket":
      return <MarketOverviewPanel limit={20} />;
    case "bot-control":
      return <ClawControlPanel />;
    case "news":
      return <NewsRadarPanel />;
    case "chart":
      return (
        <div className="text-sm text-slate-300">
          Chart panel coming soon (placeholder)
        </div>
      );
    case "order-book":
      return (
        <div className="text-sm text-slate-300">
          Order book panel coming soon (placeholder)
        </div>
      );
    default:
      return (
        <div className="text-sm text-slate-300">
          Unknown panel type: {panel.type}
        </div>
      );
  }
}

export function PanelGrid() {
  const panels = useLayoutStore((state) => state.panels);
  const movePanel = useLayoutStore((state) => state.movePanel);

  const orderedPanels = useMemo(
    () => [...panels].sort((a, b) => a.position - b.position),
    [panels],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedPanels.findIndex((p) => p.id === active.id);
    const newIndex = orderedPanels.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    movePanel(oldIndex, newIndex);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        items={orderedPanels.map((p) => p.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {orderedPanels.map((panel) => (
            <SortablePanel key={panel.id} panel={panel}>
              <PanelContent panel={panel} />
            </SortablePanel>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
