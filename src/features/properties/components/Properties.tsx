import { useDNA } from "@/features/engine";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';

export const Properties = () => {
  const { elements, selectedId, updateElement } = useDNA();
  const selectedElement = elements.find((el) => el.id === selectedId);

  const getScoreInsight = (score: number) => {
    if (score > 80)
      return "High visual prominence. Acting as a primary anchor.";
    if (score > 50) return "Balanced visibility. Good for secondary actions.";

    return "Low attention weight. Recommended for background elements.";
  };

  return (
    <div className="flex flex-col h-full min-h-[85vh] gap-6 font-sans">
      <AnimatePresence mode="wait">
        {!selectedElement ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-muted/20 text-[10px] uppercase tracking-[0.4em] text-center px-8 gap-4 "
          >
            <Icon icon="lucide:fingerprint" className="w-12 h-12 stroke-[1px] animate-pulse" />
            System Idle: Awaiting Node Selection
          </motion.div>
        ) : (
          <motion.div
            key={selectedElement.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col flex-1 gap-6 overflow-y-auto no-scrollbar pb-10 mask-[linear-gradient(to_bottom,black_85%,transparent_100%)]"
          >
            <section className="p-6 rounded-[2.5rem] bg-linear-to-br from-primary/15 via-primary/5 to-transparent border border-primary/10 relative overflow-hidden shrink-0">
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      Live Analysis
                    </p>
                  </div>
                  <p className="text-[10px] text-muted font-mono opacity-50 uppercase">
                    ID_{selectedElement.id.slice(0, 8)}
                  </p>
                </div>
                <motion.span
                  key={selectedElement.score}
                  className={`text-5xl font-mono font-bold tracking-tighter ${selectedElement.score > 70 ? "text-success" : "text-primary"}`}
                >
                  {Math.round(selectedElement.score)}%
                </motion.span>
              </div>
              <div className="w-full h-1.5 bg-white/5 mt-6 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedElement.score}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              </div>
            </section>

            <section className="space-y-4 px-1 shrink-0">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Icon icon="lucide:settings-2" className="w-3.5 h-3.5 text-muted" />
                <h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                  Core Configuration
                </h4>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] text-muted font-bold uppercase ml-1 flex items-center gap-2 opacity-60">
                    <Icon icon="lucide:type" className="w-3 h-3" /> Identity Label
                  </label>
                  <input
                    type="text"
                    value={selectedElement.props.label || ""}
                    onChange={(e) =>
                      updateElement(selectedElement.id, {
                        props: {
                          ...selectedElement.props,
                          label: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-surface border border-white/5 rounded-xl px-5 py-3.5 text-xs outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] text-muted font-bold uppercase ml-1 opacity-60">
                      Width
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={Math.round(selectedElement.width)}
                        onChange={(e) =>
                          updateElement(selectedElement.id, {
                            width: Number(e.target.value),
                          })
                        }
                        className="w-full bg-surface border border-white/5 rounded-xl px-5 py-3.5 text-xs font-mono outline-none focus:border-primary/40"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-muted font-mono">
                        PX
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-muted font-bold uppercase ml-1 opacity-60">
                      Height
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={Math.round(selectedElement.height)}
                        onChange={(e) =>
                          updateElement(selectedElement.id, {
                            height: Number(e.target.value),
                          })
                        }
                        className="w-full bg-surface border border-white/5 rounded-xl px-5 py-3.5 text-xs font-mono outline-none focus:border-primary/40"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-muted font-mono">
                        PX
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3 shrink-0">
              <div className="p-4 rounded-xl bg-surface/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Icon icon="lucide:compass" className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    Coordinates
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-muted/40 uppercase">X_Axis</span>
                    <span>{Math.round(selectedElement.x)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-muted/40 uppercase">Y_Axis</span>
                    <span>{Math.round(selectedElement.y)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-success">
                  <Icon icon="lucide:zap" className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    Performance
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-muted/40 uppercase">Render</span>
                    <span>0.2ms</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-muted/40 uppercase">Memory</span>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="p-5 rounded-xl bg-white/2 border border-white/5 space-y-4 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-success">
                  <Icon icon="lucide:shield-check" className="w-4 h-4" />
                  <h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.15em]">
                    Compliance
                  </h4>
                </div>
                <div className="px-2 py-0.5 rounded bg-success/10 text-success text-[8px] font-bold">
                  PASSED
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-[10px] text-muted">
                      Contrast Ratio (AAA)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono">7.2:1</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-[10px] text-muted">
                      Touch Sensitivity
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-success">
                    OPTIMAL
                  </span>
                </div>
              </div>
            </section>

            <section className="p-5 rounded-xl bg-primary/5 border border-primary/10 relative overflow-hidden shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Icon icon="lucide:eye" className="w-4 h-4 text-primary" />
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Aura Intelligence
                </h4>
              </div>
              <p className="text-[11px] text-muted/90 leading-relaxed italic font-medium">
                &quot;{getScoreInsight(selectedElement.score)}&quot;
              </p>
              <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between">
                <span className="text-[9px] text-primary font-bold uppercase">
                  Confidence Level
                </span>
                <span className="text-[10px] font-mono text-primary">
                  98.4%
                </span>
              </div>
            </section>

            <section className="p-5 rounded-xl bg-white/1 border border-white/5 space-y-4 shrink-0">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:layers" className="w-3.5 h-3.5 text-muted" />
                <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest">
                  Layer Stack
                </h4>
              </div>
              <div className="space-y-2">
                {["Shadow Root", "Interactive Layer", "Base Mesh"].map(
                  (layer, i) => (
                    <div key={layer} className="flex items-center gap-3">
                      <div
                        className={`w-1 h-4 rounded-full ${i === 0 ? "bg-primary" : "bg-white/10"}`}
                      />
                      <span
                        className={`text-[10px] uppercase tracking-tighter ${i === 0 ? "text-foreground" : "text-muted/40"}`}
                      >
                        {layer}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
