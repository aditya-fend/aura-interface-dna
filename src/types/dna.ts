export type ElementType = 
  | 'button' | 'heading' | 'card' | 'input' | 'image' | 'badge' | 'stat'
  | 'avatar' | 'toggle' | 'divider' | 'progress' | 'search' | 'breadcrumb';
  
export interface ElementProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  content?: string;
  placeholder?: string;
  [key: string]: string | number | boolean | undefined; 
}

export interface UIElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  props: ElementProps; 
  score: number;
}

export interface DNAState {
  elements: UIElement[];
  selectedId: string | null;
}