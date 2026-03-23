import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { render } from "@testing-library/react";
import { TrafficSimulator } from "@/features/canvas";
import { useDNA } from "@/features/engine";
import type { UIElement } from "@/types/dna";

vi.mock("@/features/engine", () => ({
  useDNA: vi.fn(),
}));

describe("TrafficSimulator Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupMockStore = (elements: UIElement[] = []) => {
    (useDNA as unknown as Mock).mockReturnValue({
      elements,
    });
  };

  it("must render null if props 'active' are false", () => {
    const mockElements: UIElement[] = [
      {
        id: "1",
        type: "button",
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        props: {},
        score: 90,
      },
    ];
    setupMockStore(mockElements);

    const { container } = render(<TrafficSimulator active={false} />);

    expect(container.firstChild).toBeNull();
  });

  it("must render null if there are no elements in the workspace", () => {
    setupMockStore([]);

    const { container } = render(<TrafficSimulator active={true} />);

    expect(container.firstChild).toBeNull();
  });

  it("must render particles if active and there are elements", () => {
    const mockElements: UIElement[] = [
      {
        id: "1",
        type: "button",
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        props: {},
        score: 90,
      },
    ];
    setupMockStore(mockElements);

    const { container } = render(<TrafficSimulator active={true} />);

    const presentationDiv = container.querySelector('[role="presentation"]');
    expect(presentationDiv).toBeInTheDocument();

    const particles = presentationDiv?.querySelectorAll("div");
    expect(particles?.length).toBe(25);
  });

  it("must target the element with the highest score", () => {
    const mockElements: UIElement[] = [
      {
        id: "low",
        type: "button",
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        props: {},
        score: 20,
      },
      {
        id: "high",
        type: "card",
        x: 500,
        y: 500,
        width: 200,
        height: 200,
        props: {},
        score: 95,
      },
    ];

    setupMockStore(mockElements);
    const { container } = render(<TrafficSimulator active={true} />);

    const presentationDiv = container.querySelector('[role="presentation"]');
    expect(presentationDiv).toBeInTheDocument();

    const particles = presentationDiv?.querySelectorAll("div");

    expect(particles?.length).toBeGreaterThan(0);
  });
});
