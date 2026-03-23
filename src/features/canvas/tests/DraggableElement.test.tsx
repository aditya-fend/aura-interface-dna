import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DraggableElement } from "@/features/canvas";
import { useDNA } from "@/features/engine";
import { useDraggable } from "@dnd-kit/core";
import type { UIElement } from "@/types/dna";

interface MockStore {
  updateElement: (id: string, updates: Partial<UIElement>) => void;
  selectElement: (id: string) => void;
}

vi.mock("@/features/engine", () => ({
  useDNA: vi.fn(),
}));

vi.mock("@dnd-kit/core", () => ({
  useDraggable: vi.fn(),
}));

describe("DraggableElement Component", () => {
  const updateElementMock = vi.fn();
  const selectElementMock = vi.fn();

  const mockElement: UIElement = {
    id: "el-1",
    type: "button",
    x: 100,
    y: 100,
    width: 200,
    height: 50,
    props: { label: "Drag Me" },
    score: 80,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useDNA as unknown as Mock).mockImplementation(
      (selector: (state: MockStore) => unknown) => {
        const state: MockStore = {
          updateElement: updateElementMock,
          selectElement: selectElementMock,
        };
        return selector(state);
      },
    );

    (useDraggable as Mock).mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: null,
      isDragging: false,
    });
  });

  it("must render element labels correctly", () => {
    render(<DraggableElement element={mockElement} isSelected={false} />);
    expect(screen.getByText("Drag Me")).toBeInTheDocument();
  });

  it("must call selectElement when clicked", () => {
    render(<DraggableElement element={mockElement} isSelected={false} />);

    const content = screen.getByText("Drag Me");
    fireEvent.click(content);

    expect(selectElementMock).toHaveBeenCalledWith("el-1");
  });

  it("must display resize handles only when the element is selected (isSelected)", () => {
    const { rerender } = render(
      <DraggableElement element={mockElement} isSelected={false} />,
    );

    let handles = document.querySelectorAll('[class*="cursor-"]');
    expect(handles.length).toBe(1); 

    rerender(<DraggableElement element={mockElement} isSelected={true} />);

    handles = document.querySelectorAll('[class*="cursor-"]');
    expect(handles.length).toBe(9);
  });

  it("must apply dragging style when isDragging is true", () => {
    (useDraggable as Mock).mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: { x: 10, y: 20, scaleX: 1, scaleY: 1 },
      isDragging: true,
    });

    const { container } = render(
      <DraggableElement element={mockElement} isSelected={false} />,
    );
    const elementDiv = container.firstChild as HTMLElement;

    expect(elementDiv).toHaveClass("z-50", "opacity-60", "ring-primary");
    expect(elementDiv.style.transform).toContain("translate3d(10px, 20px, 0)");
  });

  it("must trigger updateElement when performing resize (East/Right)", () => {
    render(<DraggableElement element={mockElement} isSelected={true} />);

    const eastHandle = document.querySelector(
      ".cursor-ew-resize",
    ) as HTMLElement;

    fireEvent.mouseDown(eastHandle);

    const mouseMoveEvent = new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(mouseMoveEvent, "movementX", { value: 50 });
    Object.defineProperty(mouseMoveEvent, "movementY", { value: 0 });

    window.dispatchEvent(mouseMoveEvent);

    expect(updateElementMock).toHaveBeenCalledWith(
      "el-1",
      expect.objectContaining({
        width: 250,
      }),
    );
  });
});
