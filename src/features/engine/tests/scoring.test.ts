import { describe, it, expect } from "vitest";
import { scoring } from "@/features/engine";
import type { UIElement } from "@/types/dna";

describe("scoring Logic", () => {
  const createMockElement = (overrides: Partial<UIElement>): UIElement => ({
    id: "test-id",
    type: "button",
    x: 500, 
    y: 400, 
    width: 100,
    height: 40,
    props: {},
    score: 0,
    ...overrides,
  });

  it("must return a base score of 50 if no conditions are met", () => {
    const element = createMockElement({ x: 600, y: 400 });
    expect(scoring(element)).toBe(50);
  });

  it("must add +20 if the element is in the top area (y < 150)", () => {
    const element = createMockElement({ x: 600, y: 100 });
    expect(scoring(element)).toBe(70); 
  });

  it("must add +15 if the element is in the left area (x < 200)", () => {
    const element = createMockElement({ x: 100, y: 400 });
    expect(scoring(element)).toBe(65); 
  });

  it("must add +10 if the element is in the center-top area (Hero Area)", () => {
    const element = createMockElement({ x: 300, y: 200 });
    expect(scoring(element)).toBe(60); 
  });

  it("must give a cumulative bonus (Top + Left)", () => {
    const element = createMockElement({ x: 50, y: 50 });
    expect(scoring(element)).toBe(85); 
  });

  it("must reduce the score by -30 if the element is below the fold (y > 600)", () => {
    const element = createMockElement({ x: 600, y: 700 });
    expect(scoring(element)).toBe(20); 
  });

  it("must perform clamping to ensure the score is not less than 0", () => {
    const element = createMockElement({ x: 600, y: 1000 });
    const score = scoring(element);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("must perform clamping to ensure the score is not greater than 100", () => {
    const element = createMockElement({ x: 10, y: 10 });
    const score = scoring(element);
    expect(score).toBeLessThanOrEqual(100);
  });
});