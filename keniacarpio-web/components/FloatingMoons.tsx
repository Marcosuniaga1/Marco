/**
 * Decorative floating moons. Very subtle — for ambient cosmic feel without
 * overwhelming the layout. Render inside any section with `position: relative`.
 */
export default function FloatingMoons({
  variant = "default",
}: {
  variant?: "default" | "few" | "more";
}) {
  const moons =
    variant === "few"
      ? [{ icon: "☾", x: "8%", y: "18%", size: "text-3xl", delay: 0 }]
      : variant === "more"
        ? [
            { icon: "☾", x: "6%", y: "12%", size: "text-4xl", delay: 0 },
            { icon: "☽", x: "88%", y: "20%", size: "text-3xl", delay: 1.5 },
            { icon: "☾", x: "12%", y: "78%", size: "text-3xl", delay: 0.8 },
            { icon: "☽", x: "82%", y: "70%", size: "text-4xl", delay: 2.2 },
            { icon: "✦", x: "50%", y: "85%", size: "text-2xl", delay: 1 },
          ]
        : [
            { icon: "☾", x: "7%", y: "20%", size: "text-3xl", delay: 0 },
            { icon: "☽", x: "85%", y: "30%", size: "text-3xl", delay: 1.5 },
            { icon: "☾", x: "10%", y: "75%", size: "text-2xl", delay: 0.8 },
          ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {moons.map((m, i) => (
        <span
          key={i}
          className={`${m.size} absolute text-oro/15 animate-float-slow select-none`}
          style={{
            left: m.x,
            top: m.y,
            animationDelay: `${m.delay}s`,
          }}
          aria-hidden
        >
          {m.icon}
        </span>
      ))}
    </div>
  );
}
