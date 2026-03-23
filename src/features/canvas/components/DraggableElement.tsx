import { useDraggable } from "@dnd-kit/core";
import { useDNA } from "@/features/engine";
import type { UIElement } from "@/types/dna";
import { useState, useCallback, useEffect } from "react";

export const DraggableElement = ({
  element,
  isSelected,
}: {
  element: UIElement;
  isSelected: boolean;
}) => {
  const updateElement = useDNA((state) => state.updateElement);
  const selectElement = useDNA((state) => state.selectElement);
  const [resizing, setResizing] = useState<string | null>(null);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: element.id,
    });

  const handleMouseDownResize = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(direction);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizing) return;
      const deltaX = e.movementX;
      const deltaY = e.movementY;

      let { x, y, width, height } = element;

      if (resizing.includes("e")) width += deltaX;
      if (resizing.includes("w")) {
        width -= deltaX;
        x += deltaX;
      }
      if (resizing.includes("s")) height += deltaY;
      if (resizing.includes("n")) {
        height -= deltaY;
        y += deltaY;
      }

      updateElement(element.id, {
        width: Math.max(30, width),
        height: Math.max(20, height),
        x,
        y,
      });
    },
    [resizing, element, updateElement],
  );

  const handleMouseUp = useCallback(() => setResizing(null), []);

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, handleMouseMove, handleMouseUp]);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    width: element.width,
    height: element.height,
    left: element.x,
    top: element.y,
  };

  const handles = [
    { dir: "n", class: "top-[-4px] left-0 right-0 h-2 cursor-ns-resize" },
    { dir: "s", class: "bottom-[-4px] left-0 right-0 h-2 cursor-ns-resize" },
    { dir: "e", class: "top-0 right-[-4px] bottom-0 w-2 cursor-ew-resize" },
    { dir: "w", class: "top-0 left-[-4px] bottom-0 w-2 cursor-ew-resize" },
    { dir: "nw", class: "top-[-6px] left-[-6px] w-3 h-3 cursor-nwse-resize" },
    { dir: "ne", class: "top-[-6px] right-[-6px] w-3 h-3 cursor-nesw-resize" },
    {
      dir: "sw",
      class: "bottom-[-6px] left-[-6px] w-3 h-3 cursor-nesw-resize",
    },
    {
      dir: "se",
      class: "bottom-[-6px] right-[-6px] w-3 h-3 cursor-nwse-resize",
    },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`absolute flex items-center justify-center rounded-lg border select-none
        ${isDragging ? "z-50 opacity-60 ring-2 ring-primary cursor-grabbing" : "z-30 cursor-grab"}
        ${isSelected ? "border-primary bg-primary/10 ring-1 ring-primary/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]" : "border-white/10 bg-surface/90 hover:border-white/20"}
      `}
    >
      <div
        {...listeners}
        onClick={(e) => {
          e.stopPropagation();
          selectElement(element.id);
        }}
        className="w-full h-full flex items-center justify-center p-2"
      >
        <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest pointer-events-none">
          {element.props.label || element.type}
        </span>
      </div>

      {isSelected &&
        handles.map((h) => (
          <div
            key={h.dir}
            onMouseDown={(e) => handleMouseDownResize(e, h.dir)}
            className={`absolute ${h.class} z-60 flex items-center justify-center group`}
          >
            {h.dir.length > 1 && (
              <div className="w-1.5 h-1.5 bg-primary rounded-full border border-background shadow-sm" />
            )}
          </div>
        ))}
    </div>
  );
};
