import { useDNA } from "@/features/engine";
import type { ElementType, UIElement } from "@/types/dna";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface ComponentTemplate {
  type: ElementType;
  icon: string;
  label: string;
  defaultSize: { w: number; h: number };
}

const DNA_LIBRARY: ComponentTemplate[] = [
  {
    type: "heading",
    icon: "lucide:type",
    label: "Typography",
    defaultSize: { w: 250, h: 40 },
  },
  {
    type: "button",
    icon: "lucide:mouse-pointer-2",
    label: "Action Trigger",
    defaultSize: { w: 140, h: 45 },
  },
  {
    type: "card",
    icon: "lucide:credit-card",
    label: "Content Container",
    defaultSize: { w: 280, h: 160 },
  },
  {
    type: "input",
    icon: "lucide:box",
    label: "Form Input",
    defaultSize: { w: 220, h: 50 },
  },
  {
    type: "image",
    icon: "lucide:image",
    label: "Visual Media",
    defaultSize: { w: 180, h: 120 },
  },
  {
    type: "badge",
    icon: "lucide:tag",
    label: "Status Badge",
    defaultSize: { w: 80, h: 28 },
  },
  {
    type: "stat",
    icon: "lucide:bar-chart-3",
    label: "Data Metric",
    defaultSize: { w: 150, h: 80 },
  },
  {
    type: "avatar",
    icon: "lucide:user-circle",
    label: "User Identity",
    defaultSize: { w: 48, h: 48 },
  },
  {
    type: "toggle",
    icon: "lucide:toggle-left",
    label: "Switch Toggle",
    defaultSize: { w: 40, h: 24 },
  },
  {
    type: "divider",
    icon: "lucide:minus",
    label: "Separator",
    defaultSize: { w: 300, h: 1 },
  },
  {
    type: "progress",
    icon: "lucide:activity",
    label: "Loading State",
    defaultSize: { w: 200, h: 8 },
  },
  {
    type: "search",
    icon: "lucide:search",
    label: "Search Bar",
    defaultSize: { w: 240, h: 42 },
  },
  {
    type: "breadcrumb",
    icon: "lucide:chevron-right",
    label: "Nav Path",
    defaultSize: { w: 180, h: 20 },
  },
];

const createNewElement = (template: ComponentTemplate): UIElement => ({
  id: crypto.randomUUID(),
  type: template.type,
  x: 100 + Math.random() * 80,
  y: 100 + Math.random() * 80,
  width: template.defaultSize.w,
  height: template.defaultSize.h,
  props: { label: `New ${template.label}` },
  score: 0,
});

export const PatternLibrary = () => {
  const addElement = useDNA((state) => state.addElement);

  const elements = useDNA((state) => state.elements);
  const clearWorkspace = useDNA((state) => state.clearWorkspace); // Assuming this action exists in your store

  return (
    <section
      className="w-72 border-r border-white/5 p-6 flex flex-col gap-6 font-sans h-full bg-background/50 backdrop-blur-xl"
      aria-labelledby="sidebar-title"
    >
      <header className="space-y-1 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center text-primary"
            aria-hidden="true"
          >
            <Icon icon="lucide:plus" className="w-3 h-3" />
          </div>
          <h2
            id="sidebar-title"
            className="text-[11px] font-bold text-foreground uppercase tracking-[0.2em]"
          >
            DNA LIBRARY
          </h2>
        </div>
        <p className="text-[10px] text-muted tracking-tight opacity-50 uppercase">
          <span className="sr-only">Currently available: </span>
          {DNA_LIBRARY.length} Patterns Available
        </p>
      </header>

      <nav
        aria-label="Component Selection"
        className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 no-scrollbar outline-none mask-[linear-gradient(to_bottom,black_85%,transparent_100%)]"
      >
        <ul className="flex flex-col gap-2 list-none m-0 p-0" role="list">
          {DNA_LIBRARY.map((item, index) => (
            <li key={item.type} role="listitem">
              <motion.button
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.015, duration: 0.2 }}
                onClick={() => addElement(createNewElement(item))}
                className="group w-full flex items-center justify-between p-3 rounded-xl bg-surface/30 border border-white/5 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/60 outline-none transition-all duration-200 text-left shrink-0"
                aria-label={`Add ${item.label} element to canvas`}
              >
                <div className="flex items-center gap-3 pointer-events-none">
                  <div className="p-2 rounded-lg bg-background group-hover:bg-primary/10 transition-colors">
                    <Icon
                      icon={item.icon}
                      className="w-4 h-4 text-muted group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-foreground/80 group-hover:text-foreground">
                      {item.label}
                    </span>
                    <span className="text-[9px] text-muted/40 font-mono tracking-tighter uppercase">
                      {item.type}
                    </span>
                  </div>
                </div>
                <Icon
                  icon="lucide:plus"
                  className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110"
                  aria-hidden="true"
                />
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="shrink-0 mt-auto border-t border-white/5 space-y-3">
        <button
          type="button"
          disabled={elements.length === 0}
          onClick={clearWorkspace}
          className="group w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-white/5 bg-surface/20 text-muted hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
          aria-label="Clear all elements from workspace"
        >
          <Icon
            icon="lucide:rotate-cw"
            className={`w-3.5 h-3.5 transition-transform duration-500 ${elements.length > 0 ? "group-hover:-rotate-180" : ""}`}
            aria-hidden="true"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Purge Workspace
          </span>
        </button>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <div
              className="w-1 h-1 rounded-full bg-success animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[9px] text-muted/50 font-mono tracking-tighter uppercase">
              &copy; 2026 Aditya Fend
            </span>
          </div>
          <span className="text-[9px] text-muted/30 font-mono tracking-tighter">
            v1.0.0-aura
          </span>
        </div>
      </footer>
    </section>
  );
};
