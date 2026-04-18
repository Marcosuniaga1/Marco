import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#08080F",
  blue: "#00D4FF",
  purple: "#9B59FF",
  pink: "#FF006E",
  gold: "#FFD700",
  red: "#FF5252",
  white: "#FFFFFF",
};

// ─── Scene timing (frames @ 30 fps, total 900 = 30 s) ────────────────────────
const T = {
  s1: 0,    // 0 s  – Hook
  s2: 90,   // 3 s  – Roma / Realidad Imparable
  s3: 270,  // 9 s  – ¿Por qué sigues atrapado?
  s4: 450,  // 15 s – Marketing de Afiliados
  s5: 660,  // 22 s – CTA ¡Síguenos!
  end: 900, // 30 s
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function spr(frame: number, fps: number, stiffness = 120, damping = 14) {
  return spring({ frame, fps, config: { stiffness, damping } });
}

function fadeIn(frame: number, dur = 15) {
  return interpolate(frame, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function slideUp(prog: number, dist = 60) {
  return interpolate(prog, [0, 1], [dist, 0]);
}

function slideX(prog: number, dist = 80) {
  return interpolate(prog, [0, 1], [dist, 0]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const Grid: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(${C.blue}18 1px, transparent 1px),
        linear-gradient(90deg, ${C.blue}18 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
    }}
  />
);

const Dot: React.FC<{
  x: string;
  y: string;
  size: number;
  color: string;
  offset: number;
}> = ({ x, y, size, color, offset }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin((frame + offset) * 0.08) * 0.4 + 0.6;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: pulse,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        transform: `scale(${0.8 + pulse * 0.3})`,
      }}
    />
  );
};

const Hi: React.FC<{ color: string; children: React.ReactNode }> = ({
  color,
  children,
}) => (
  <span
    style={{
      color,
      textShadow: `0 0 20px ${color}, 0 0 40px ${color}66`,
    }}
  >
    {children}
  </span>
);

const Radial: React.FC<{ color: string; pos?: string }> = ({
  color,
  pos = "50% 50%",
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse at ${pos}, ${color}28 0%, transparent 65%)`,
    }}
  />
);

// ─── Scene 1 – Hook ───────────────────────────────────────────────────────────
const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hey = spr(frame, fps, 300, 20);
  const pulse = Math.sin(frame * 0.3) * 0.05 + 1;

  const basta = spr(frame - 12, fps, 180, 16);
  const bastaOp = fadeIn(frame - 12);

  const sub = spr(frame - 30, fps, 120, 14);
  const subOp = fadeIn(frame - 30);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 8 }}
    >
      <Radial color={C.gold} />

      {/* HEY, */}
      <div
        style={{
          fontFamily: '"Arial Black", Impact, sans-serif',
          fontSize: 160,
          fontWeight: 900,
          color: C.gold,
          textShadow: `0 0 30px ${C.gold}, 0 0 60px ${C.gold}88`,
          transform: `scale(${hey * pulse})`,
          opacity: hey,
          lineHeight: 1,
          letterSpacing: -4,
        }}
      >
        HEY,
      </div>

      {/* BASTA DE SCROLLEAR */}
      <div
        style={{
          fontFamily: '"Arial Black", Impact, sans-serif',
          fontSize: 68,
          fontWeight: 900,
          color: C.white,
          textShadow: `0 0 20px ${C.blue}`,
          transform: `translateY(${slideUp(basta)})`,
          opacity: bastaOp,
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        BASTA DE SCROLLEAR
      </div>

      {/* y empieza a generar ingresos */}
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 38,
          fontWeight: 600,
          color: C.blue,
          transform: `translateY(${slideUp(sub, 40)})`,
          opacity: subOp,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        y empieza a generar ingresos
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2 – Roma / Realidad Imparable ─────────────────────────────────────
const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1 = spr(frame, fps, 100, 14);
  const l1op = fadeIn(frame);
  const l2 = spr(frame - 25, fps, 100, 14);
  const l2op = fadeIn(frame - 25);
  const l3 = spr(frame - 55, fps, 150, 12);
  const l3op = fadeIn(frame - 55, 20);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}
    >
      <Radial color={C.purple} pos="50% 40%" />

      <div style={{ textAlign: "center", padding: "0 80px" }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 48,
            color: C.white,
            fontWeight: 700,
            opacity: l1op,
            transform: `translateX(${slideX(l1, -80)})`,
            marginBottom: 8,
          }}
        >
          <Hi color={C.gold}>Roma</Hi> no se construyó en un día,
        </div>

        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 48,
            color: C.white,
            fontWeight: 700,
            opacity: l2op,
            transform: `translateX(${slideX(l2, 80)})`,
            marginBottom: 30,
          }}
        >
          pero se mantuvo unida por una
        </div>

        <div
          style={{
            fontFamily: '"Arial Black", Impact, sans-serif',
            fontSize: 88,
            fontWeight: 900,
            color: C.pink,
            textShadow: `0 0 20px ${C.pink}, 0 0 40px ${C.pink}66`,
            opacity: l3op,
            transform: `scale(${l3})`,
            letterSpacing: 2,
            lineHeight: 1,
          }}
        >
          REALIDAD
          <br />
          IMPARABLE
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3 – ¿Por qué sigues atrapado? ─────────────────────────────────────
const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const q1 = spr(frame, fps, 120, 15);
  const q1op = fadeIn(frame);
  const q2 = spr(frame - 35, fps, 120, 14);
  const q2op = fadeIn(frame - 35);
  const warn = Math.sin(frame * 0.2) * 0.25 + 0.75;

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}
    >
      <Radial color="#FF3B00" />

      <div style={{ textAlign: "center", padding: "0 70px" }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 50,
            color: C.white,
            fontWeight: 700,
            opacity: q1op,
            transform: `translateY(${slideUp(q1)})`,
            marginBottom: 28,
          }}
        >
          Si sientes que{" "}
          <Hi color={C.blue}>nada puede detenerte</Hi>,
        </div>

        <div
          style={{
            fontFamily: '"Arial Black", Impact, sans-serif',
            fontSize: 62,
            fontWeight: 900,
            color: C.red,
            textShadow: `0 0 20px ${C.red}, 0 0 40px ${C.red}66`,
            opacity: q2op * warn,
            transform: `scale(${interpolate(q2, [0, 1], [0.8, 1])})`,
            lineHeight: 1.2,
          }}
        >
          ¿Por qué sigues
          <br />
          atrapado en una
          <br />
          vida financiera
          <br />
          que no te gusta?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4 – Marketing de Afiliados ────────────────────────────────────────
const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1 = spr(frame, fps, 100, 14);
  const l1op = fadeIn(frame);
  const l2 = spr(frame - 30, fps, 120, 15);
  const l2op = fadeIn(frame - 30);
  const l3 = spr(frame - 65, fps, 140, 14);
  const l3op = fadeIn(frame - 65);
  const l4 = spr(frame - 100, fps, 150, 14);
  const l4op = fadeIn(frame - 100);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}
    >
      <Radial color={C.blue} pos="50% 40%" />

      <div style={{ textAlign: "center", padding: "0 60px" }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 32,
            color: C.blue,
            letterSpacing: 5,
            fontWeight: 700,
            opacity: l1op,
            transform: `translateY(${slideUp(l1, -40)})`,
            marginBottom: 16,
          }}
        >
          LA HERRAMIENTA QUE ME ESTÁ
        </div>

        <div
          style={{
            fontFamily: '"Arial Black", Impact, sans-serif',
            fontSize: 90,
            fontWeight: 900,
            color: C.white,
            textShadow: `0 0 30px ${C.blue}, 0 0 60px ${C.blue}44`,
            opacity: l2op,
            transform: `scale(${l2})`,
            lineHeight: 1,
            letterSpacing: -2,
            marginBottom: 10,
          }}
        >
          MARKETING
          <br />
          <span style={{ color: C.blue }}>AFILIADOS</span>
        </div>

        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 40,
            color: C.white,
            fontWeight: 600,
            opacity: l3op,
            transform: `translateY(${slideUp(l3, 40)})`,
            marginTop: 12,
          }}
        >
          construir mi <Hi color={C.gold}>IMPERIO DIGITAL</Hi>
        </div>

        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 46,
            color: C.purple,
            fontWeight: 700,
            opacity: l4op,
            transform: `translateY(${slideUp(l4, 40)})`,
            marginTop: 10,
            textShadow: `0 0 20px ${C.purple}`,
          }}
        >
          desde 🏠 CASA
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5 – CTA ───────────────────────────────────────────────────────────
const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t1 = spr(frame, fps, 200, 15);
  const t1op = fadeIn(frame);
  const t2 = spr(frame - 25, fps, 120, 14);
  const t2op = fadeIn(frame - 25);
  const t3 = spr(frame - 55, fps, 200, 12);
  const t3op = fadeIn(frame - 55);

  const pulse = Math.sin(frame * 0.25) * 0.05 + 1;
  const glow = Math.sin(frame * 0.4) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}
    >
      <Radial color={C.gold} />
      <Radial color={C.pink} pos="50% 85%" />

      <div style={{ textAlign: "center", padding: "0 60px" }}>
        {/* ¡SÍGUENOS! */}
        <div
          style={{
            fontFamily: '"Arial Black", Impact, sans-serif',
            fontSize: 118,
            fontWeight: 900,
            color: C.gold,
            textShadow: `0 0 30px ${C.gold}, 0 0 60px ${C.gold}88`,
            transform: `scale(${t1 * pulse})`,
            opacity: t1op,
            lineHeight: 0.9,
            marginBottom: 24,
          }}
        >
          ¡SÍGUENOS!
        </div>

        {/* Escríbeme */}
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 44,
            color: C.white,
            fontWeight: 700,
            opacity: t2op,
            transform: `translateY(${slideUp(t2, 40)})`,
            marginBottom: 36,
          }}
        >
          Escríbeme y te ayudaremos
        </div>

        {/* Button */}
        <div
          style={{
            fontFamily: '"Arial Black", sans-serif',
            fontSize: 52,
            fontWeight: 900,
            color: C.bg,
            backgroundColor: C.gold,
            padding: "22px 52px",
            borderRadius: 18,
            transform: `scale(${t3 * pulse})`,
            opacity: t3op * glow,
            boxShadow: `0 0 40px ${C.gold}, 0 0 80px ${C.gold}66`,
            display: "inline-block",
          }}
        >
          ¡GENERAR HOY! 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────
export const EmotionGraphicVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const scanY = (frame * 4) % 1920;

  const dots = [
    { x: "8%",  y: "12%", size: 10, color: C.blue,   offset: 0 },
    { x: "88%", y: "8%",  size: 7,  color: C.pink,   offset: 30 },
    { x: "15%", y: "65%", size: 12, color: C.purple,  offset: 15 },
    { x: "80%", y: "70%", size: 8,  color: C.gold,   offset: 45 },
    { x: "50%", y: "5%",  size: 6,  color: C.blue,   offset: 20 },
    { x: "92%", y: "45%", size: 9,  color: C.pink,   offset: 60 },
    { x: "5%",  y: "85%", size: 7,  color: C.purple,  offset: 10 },
    { x: "55%", y: "95%", size: 11, color: C.gold,   offset: 50 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      {/* Deep background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, #1a0035 0%, #0a001a 40%, ${C.bg} 70%)`,
        }}
      />

      {/* Tech grid */}
      <Grid />

      {/* Moving scanline */}
      <div
        style={{
          position: "absolute",
          top: scanY,
          left: 0,
          width: "100%",
          height: 3,
          background: `linear-gradient(transparent, ${C.blue}44, transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* Corner HUD brackets */}
      <div style={{ position: "absolute", top: 50, left: 50, width: 70, height: 70, borderTop: `3px solid ${C.blue}`, borderLeft: `3px solid ${C.blue}` }} />
      <div style={{ position: "absolute", top: 50, right: 50, width: 70, height: 70, borderTop: `3px solid ${C.pink}`, borderRight: `3px solid ${C.pink}` }} />
      <div style={{ position: "absolute", bottom: 50, left: 50, width: 70, height: 70, borderBottom: `3px solid ${C.purple}`, borderLeft: `3px solid ${C.purple}` }} />
      <div style={{ position: "absolute", bottom: 50, right: 50, width: 70, height: 70, borderBottom: `3px solid ${C.gold}`, borderRight: `3px solid ${C.gold}` }} />

      {/* Floating glow particles */}
      {dots.map((d, i) => (
        <Dot key={i} {...d} />
      ))}

      {/* ── Scenes ── */}
      <Sequence from={T.s1} durationInFrames={T.s2 - T.s1}>
        <S1 />
      </Sequence>

      <Sequence from={T.s2} durationInFrames={T.s3 - T.s2}>
        <S2 />
      </Sequence>

      <Sequence from={T.s3} durationInFrames={T.s4 - T.s3}>
        <S3 />
      </Sequence>

      <Sequence from={T.s4} durationInFrames={T.s5 - T.s4}>
        <S4 />
      </Sequence>

      <Sequence from={T.s5} durationInFrames={T.end - T.s5}>
        <S5 />
      </Sequence>
    </AbsoluteFill>
  );
};
