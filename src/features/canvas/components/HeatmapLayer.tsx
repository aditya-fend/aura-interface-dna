import { useDNA } from "@/features/engine";

export const HeatmapLayer = () => {
  const { elements } = useDNA();

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mix-blend-screen">
      {elements.map((el) => (
        <div
          key={`heat-${el.id}`}
          className="absolute rounded-full blur-[60px] transition-all duration-700"
          style={{
            left: el.x + el.width / 2 - 100,
            top: el.y + el.height / 2 - 100,
            width: "200px",
            height: "200px",
            background:
              el.score > 70
                ? "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(244,63,94,0.2) 0%, transparent 70%)",
          }}
        />
      ))}
    </div>
  );
};
