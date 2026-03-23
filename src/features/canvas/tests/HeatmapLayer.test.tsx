import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { render } from "@testing-library/react";
import { HeatmapLayer } from "@/features/canvas";
import { useDNA } from "@/features/engine";
import type { UIElement } from "@/types/dna";

vi.mock("@/features/engine", () => ({
  useDNA: vi.fn(),
}));

describe("HeatmapLayer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupMockStore = (elements: UIElement[] = []) => {
    (useDNA as unknown as Mock).mockReturnValue({
      elements,
    });
  };

  it("must render the main heatmap container", () => {
    setupMockStore([]);
    const { container } = render(<HeatmapLayer />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("absolute", "inset-0", "pointer-events-none");
  });

  it("must render the correct number of heat nodes based on the number of elements", () => {
    const mockElements: UIElement[] = [
      { id: "1", type: "button", x: 10, y: 10, width: 100, height: 40, props: {}, score: 50 },
      { id: "2", type: "card", x: 200, y: 200, width: 200, height: 150, props: {}, score: 80 },
    ];
    setupMockStore(mockElements);
    
    const { container } = render(<HeatmapLayer />);
    
    const heatNodes = container.querySelectorAll(".absolute.rounded-full");
    expect(heatNodes).toHaveLength(2);
  });

  it("must calculate the center position of an element correctly", () => {
    const mockElement: UIElement = {
      id: "test-center",
      type: "button",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      props: {},
      score: 50,
    };
    setupMockStore([mockElement]);
    
    const { container } = render(<HeatmapLayer />);
    const heatNode = container.querySelector(".absolute.rounded-full") as HTMLElement;

    expect(heatNode.style.left).toBe("50px");
    expect(heatNode.style.top).toBe("50px");
  });

  it("must use blue color (rgba 99, 102, 241) for high scores (> 70)", () => {
    const highScorer: UIElement = {
      id: "high",
      type: "button",
      x: 0, y: 0, width: 100, height: 100, props: {},
      score: 85, 
    };
    setupMockStore([highScorer]);
    
    const { container } = render(<HeatmapLayer />);
    const heatNode = container.querySelector(".absolute.rounded-full") as HTMLElement;

    expect(heatNode.style.background).toContain("rgba(99, 102, 241, 0.4)");
  });

  it("must use red color (rgba 244, 63, 94) for low scores (<= 70)", () => {
    const lowScorer: UIElement = {
      id: "low",
      type: "button",
      x: 0, y: 0, width: 100, height: 100, props: {},
      score: 40, 
    };
    setupMockStore([lowScorer]);
    
    const { container } = render(<HeatmapLayer />);
    const heatNode = container.querySelector(".absolute.rounded-full") as HTMLElement;

    expect(heatNode.style.background).toContain("rgba(244, 63, 94, 0.2)");
  });
});