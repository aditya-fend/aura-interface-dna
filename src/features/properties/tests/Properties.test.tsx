import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Properties } from "@/features/properties"; 
import { useDNA } from "@/features/engine";
import type { UIElement } from "@/types/dna";

vi.mock("@/features/engine", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/features/engine")>();
  return {
    ...actual,
    useDNA: vi.fn(),
  };
});

describe("Properties Component", () => {
  const updateElementMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupMockStore = (selectedId: string | null, elements: UIElement[] = []) => {
    (useDNA as unknown as Mock).mockReturnValue({
      elements,
      selectedId,
      updateElement: updateElementMock,
    });
  };

  it("must display the 'System Idle' state if no element is selected", () => {
    setupMockStore(null, []);
    render(<Properties />);

    expect(screen.getByText(/System Idle/i)).toBeInTheDocument();
  });

  it("must render element details when an element is selected", () => {
    const mockElement: UIElement = {
      id: "test-uuid-12345",
      type: "button",
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      props: { label: "Action Button" },
      score: 85,
    };

    setupMockStore(mockElement.id, [mockElement]);
    render(<Properties />);

    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Action Button")).toBeInTheDocument();
  });

  it("must call updateElement when the identity label is changed", () => {
    const mockElement: UIElement = {
      id: "1",
      type: "button",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      props: { label: "Old Label" },
      score: 50,
    };

    setupMockStore("1", [mockElement]);
    render(<Properties />);

    const input = screen.getByDisplayValue("Old Label");
    fireEvent.change(input, { target: { value: "New Label" } });

    expect(updateElementMock).toHaveBeenCalledWith("1", expect.objectContaining({
      props: { label: "New Label" }
    }));
  });

  it("must update the element width via the number input", () => {
    const mockElement: UIElement = {
      id: "1",
      type: "card",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      props: { label: "Card" },
      score: 50,
    };

    setupMockStore("1", [mockElement]);
    render(<Properties />);

    const widthInput = screen.getByDisplayValue("100");
    fireEvent.change(widthInput, { target: { value: "250" } });

    expect(updateElementMock).toHaveBeenCalledWith("1", expect.objectContaining({
      width: 250
    }));
  });
});