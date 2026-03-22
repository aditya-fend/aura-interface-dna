import { create } from "zustand";
import type { DNAState, UIElement } from "@/types/dna";
import { scoring } from "@/features/engine";

interface DNAMethods {
  addElement: (element: UIElement) => void;
  updateElement: (id: string, updates: Partial<UIElement>) => void;
  selectElement: (id: string | null) => void;
  removeElement: (id: string) => void;
  clearWorkspace: () => void;
}

export const useDNA = create<DNAState & DNAMethods>((set) => ({
  elements: [],

  selectedId: null,

  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),

  updateElement: (id, updates) =>
    set((state) => {
      const updatedElements = state.elements.map((el) => {
        if (el.id === id) {
          const baseUpdated = { ...el, ...updates };

          const newScore = scoring(baseUpdated);

          return { ...baseUpdated, score: newScore };
        }
        return el;
      });

      return { elements: updatedElements };
    }),

  selectElement: (id) => set({ selectedId: id }),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  clearWorkspace: () => {
    set({ elements: [], selectedId: null });
  },
}));
