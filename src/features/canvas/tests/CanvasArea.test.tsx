import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { UIElement } from "@/types/dna";

vi.mock("@/features/engine", () => ({
  useDNA: vi.fn(),
}));

vi.mock("@/features/canvas/components/DraggableElement", () => ({
  DraggableElement: ({ element }: { element: UIElement }) => (
    <div data-testid="draggable-node">
      {element.props?.label ?? element.type}
    </div>
  ),
}));

vi.mock("@/features/canvas/components/HeatmapLayer", () => ({
  HeatmapLayer: () => <div data-testid="heatmap" />,
}));

vi.mock("@/features/canvas/components/TrafficSimulator", () => ({
  TrafficSimulator: ({ active }: { active: boolean }) =>
    active ? <div data-testid="traffic-active" /> : null,
}));

import { CanvasArea } from "@/features/canvas";
import { useDNA } from "@/features/engine";

describe("CanvasArea Component", () => {
  const selectElementMock = vi.fn();
  const removeElementMock = vi.fn();
  const updateElementMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDNA as unknown as Mock).mockReturnValue({
      elements: [],
      selectedId: null,
      selectElement: selectElementMock,
      removeElement: removeElementMock,
      updateElement: updateElementMock,
    });
  });

  it("must display an 'Empty Workspace' message if there are no elements", () => {
    render(<CanvasArea />);
    expect(
      screen.getByText(/Empty Workspace: Inject DNA Patterns/i),
    ).toBeInTheDocument();
  });

  it("must render the list of elements that exist in the store", () => {
    const mockElements: UIElement[] = [
      {
        id: "1",
        type: "button",
        x: 0,
        y: 0,
        width: 50,
        height: 20,
        props: { label: "Node 1" },
        score: 0,
      },
      {
        id: "2",
        type: "card",
        x: 0,
        y: 0,
        width: 50,
        height: 20,
        props: { label: "Node 2" },
        score: 0,
      },
    ];
    (useDNA as unknown as Mock).mockReturnValue({
      elements: mockElements,
      selectedId: null,
      selectElement: selectElementMock,
    });

    render(<CanvasArea />);
    const nodes = screen.getAllByTestId("draggable-node");
    expect(nodes).toHaveLength(2);
    expect(screen.getByText("Node 1")).toBeInTheDocument();
  });

  it("must enable and disable traffic simulation when the button is clicked", () => {
    (useDNA as unknown as Mock).mockReturnValue({
      elements: [{ id: "1" }],
      selectElement: vi.fn(),
    });
    render(<CanvasArea />);

    const simButton = screen.getByText(/Initialize Traffic/i);

    fireEvent.click(simButton);
    expect(screen.getByText(/Terminate Simulation/i)).toBeInTheDocument();
    expect(screen.getByText(/LIVE_ANALYSIS_ACTIVE/i)).toBeInTheDocument();
    expect(screen.getByTestId("traffic-active")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Terminate Simulation/i));
    expect(screen.queryByTestId("traffic-active")).not.toBeInTheDocument();
  });

  it("must call removeElement when pressing the Delete/Backspace key", () => {
    (useDNA as unknown as Mock).mockReturnValue({
      elements: [{ id: "target-id" }],
      selectedId: "target-id",
      removeElement: removeElementMock,
      selectElement: vi.fn(),
    });

    render(<CanvasArea />);

    fireEvent.keyDown(window, { key: "Delete", code: "Delete" });
    expect(removeElementMock).toHaveBeenCalledWith("target-id");

    fireEvent.keyDown(window, { key: "Backspace", code: "Backspace" });
    expect(removeElementMock).toHaveBeenCalledTimes(2);
  });

  it("must not remove elements if the user is typing in an INPUT", () => {
    (useDNA as unknown as Mock).mockReturnValue({
      elements: [{ id: "1" }],
      selectedId: "1",
      removeElement: removeElementMock,
    });

    render(<CanvasArea />);

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    fireEvent.keyDown(window, { key: "Delete" });
    expect(removeElementMock).not.toHaveBeenCalled();

    document.body.removeChild(input);
  });

  it("must clear selection when the empty workspace area is clicked", () => {
    render(<CanvasArea />);
    const container = screen.getByText(/Empty Workspace/i).parentElement;
    if (container) fireEvent.click(container);

    expect(selectElementMock).toHaveBeenCalledWith(null);
  });
});
