import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PatternLibrary } from "../components/PatternLibrary";
import { useDNA } from "@/features/engine";
import type { UIElement } from "@/types/dna";

interface MockStore {
  elements: UIElement[];
  addElement: (el: UIElement) => void;
  clearWorkspace: () => void;
}

vi.mock("@/features/engine", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/features/engine")>();
  return {
    ...actual,
    useDNA: vi.fn(),
  };
});

describe("PatternLibrary Component", () => {
  const addElementMock = vi.fn();
  const clearWorkspaceMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });


  const setupMockStore = (elements: UIElement[] = []) => {
    (useDNA as unknown as Mock).mockImplementation((selector: (state: MockStore) => unknown) => {
      const fakeState = {
        elements,
        addElement: addElementMock,
        clearWorkspace: clearWorkspaceMock,
      };
      return selector(fakeState);
    });
  };

  it("must render the title and number of patterns available", () => {
    setupMockStore([]);
    render(<PatternLibrary />);
    expect(screen.getByText(/DNA LIBRARY/i)).toBeInTheDocument();
  });

  it("must call addElement when the component button is clicked", () => {
    setupMockStore([]);
    render(<PatternLibrary />);

    const button = screen.getByLabelText(/Add Typography element to canvas/i);
    
    fireEvent.click(button);

    expect(addElementMock).toHaveBeenCalledTimes(1);
  });

  it("must disable the Purge Workspace button if there are no elements", () => {
    setupMockStore([]);
    render(<PatternLibrary />);

    const purgeButton = screen.getByLabelText(/Clear all elements from workspace/i);
    
    expect(purgeButton).toBeDisabled();
  });

  it("must enable the Purge button and call clearWorkspace if there are elements", () => {
    const mockElements = [
      { id: "1", type: "button", x: 0, y: 0, width: 10, height: 10, props: {}, score: 0 }
    ] as UIElement[];

    setupMockStore(mockElements);
    render(<PatternLibrary />);

    const purgeButton = screen.getByLabelText(/Clear all elements from workspace/i);
    expect(purgeButton).not.toBeDisabled();

    fireEvent.click(purgeButton);
    expect(clearWorkspaceMock).toHaveBeenCalledTimes(1);
  });
});