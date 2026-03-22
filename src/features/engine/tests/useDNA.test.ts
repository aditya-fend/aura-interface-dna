import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDNA } from "@/features/engine";
import type { UIElement } from "@/types/dna";

describe("useDNA", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useDNA());
    act(() => {
      result.current.clearWorkspace();
    });
  });

  const mockElement: UIElement = {
    id: "1",
    type: "button",
    x: 100,
    y: 100,
    width: 100,
    height: 40,
    props: { label: "Test" },
    score: 0,
  };

  it("must add new elements to the state", () => {
    const { result } = renderHook(() => useDNA());

    act(() => {
      result.current.addElement(mockElement);
    });

    expect(result.current.elements).toHaveLength(1);
    expect(result.current.elements[0].id).toBe("1");
  });

  it("must update elements and recalculate scores automatically", () => {
    const { result } = renderHook(() => useDNA());

    act(() => {
      result.current.addElement(mockElement);
    });

    act(() => {
      result.current.updateElement("1", { x: 50, y: 50 });
    });

    const updated = result.current.elements[0];
    expect(updated.x).toBe(50);
    expect(updated.score).toBe(85);
  });

  it("must change the selectedId when an element is selected", () => {
    const { result } = renderHook(() => useDNA());

    act(() => {
      result.current.selectElement("1");
    });

    expect(result.current.selectedId).toBe("1");
  });

  it("must remove elements and reset selection if the element is removed", () => {
    const { result } = renderHook(() => useDNA());

    act(() => {
      result.current.addElement(mockElement);
      result.current.selectElement("1");
    });

    act(() => {
      result.current.removeElement("1");
    });

    expect(result.current.elements).toHaveLength(0);
    expect(result.current.selectedId).toBeNull();
  });

  it("must clear the entire workspace", () => {
    const { result } = renderHook(() => useDNA());

    act(() => {
      result.current.addElement(mockElement);
      result.current.clearWorkspace();
    });

    expect(result.current.elements).toHaveLength(0);
    expect(result.current.selectedId).toBeNull();
  });
});