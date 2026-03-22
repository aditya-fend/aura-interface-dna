import type { UIElement } from "@/types/dna";

export const scoring = (element: UIElement): number => {
  let score = 50;

  if (element.y < 150) score += 20;
  if (element.x < 200) score += 15;

  if (element.x > 250 && element.x < 500 && element.y < 300) {
    score += 10;
  }

  if (element.y > 600) score -= 30;

  return Math.min(Math.max(score, 0), 100);
};
