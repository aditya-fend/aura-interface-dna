import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useDNA } from "@/features/engine";
import { DraggableElement, HeatmapLayer, TrafficSimulator } from "@/features/canvas";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';

export const CanvasArea = () => {
  const { elements, selectedId, selectElement, updateElement, removeElement } =
    useDNA();
  const [isSimulating, setIsSimulating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 15,
      },
    }),
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        if (document.activeElement?.tagName !== "INPUT") {
          removeElement(selectedId);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, removeElement]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (!active) return;

    const id = active.id as string;
    const element = elements.find((el) => el.id === id);

    if (element) {
      updateElement(id, {
        x: element.x + delta.x,
        y: element.y + delta.y,
      });
    }
    selectElement(id);
  };

  return (
    <div className="relative w-full h-full flex-1 p-6">
      <div className="absolute top-10 right-10 z-50 flex flex-col items-end gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSimulating(!isSimulating);
          }}
          className={`group flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${
            isSimulating
              ? "bg-primary text-white border-primary shadow-[0_0_30px_rgba(99,102,241,0.4)] scale-105"
              : "bg-surface/40 text-muted border-white/5 hover:border-primary/40 hover:text-primary backdrop-blur-xl"
          }`}
        >
          {isSimulating ? (
            <>
              <Icon icon="lucide:square" className="w-3 h-3 fill-current animate-pulse" />
              <span>Terminate Simulation</span>
            </>
          ) : (
            <>
              <Icon icon="lucide:play" className="w-3 h-3 fill-current translate-x-px" />
              <span>Initialize Traffic</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] text-primary font-mono tracking-widest"
            >
              <Icon icon="lucide:zap" className="w-3 h-3 animate-pulse" />
              LIVE_ANALYSIS_ACTIVE
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-full border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-700"
          onClick={() => selectElement(null)}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-0"
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.06), transparent 80%)`,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
            <HeatmapLayer />
          </div>
          <div className="absolute inset-0 z-20 pointer-events-none">
            <TrafficSimulator active={isSimulating} />
          </div>

          <div className="relative z-30 w-full h-full">
            <AnimatePresence mode="popLayout">
              {elements.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-muted/20"
                >
                  <Icon icon="lucide:mouse-pointer-2" className="w-12 h-12 stroke-[1px] animate-bounce" />
                  <p className="text-[10px] uppercase tracking-[0.5em] font-light">
                    Empty Workspace: Inject DNA Patterns
                  </p>
                </motion.div>
              ) : (
                elements.map((el) => (
                  <DraggableElement
                    key={el.id}
                    element={el}
                    isSelected={selectedId === el.id}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </DndContext>

      <div className="absolute bottom-12 left-12 pointer-events-none z-50">
        <div className="font-mono text-[9px] text-muted/30 tracking-[0.25em] flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-ping" />
            <span>NODES: {elements.length}</span>
          </div>
          <span>BUFFER: STABLE</span>
          <span>LATENCY: 0.4ms</span>
        </div>
      </div>
    </div>
  );
};
