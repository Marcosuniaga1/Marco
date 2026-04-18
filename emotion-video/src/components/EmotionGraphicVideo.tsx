import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
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
  orange: "#FF6B35",
  green: "#00FF88",
  white: "#FFFFFF",
};

// ─── Scene timing (frames @ 30 fps = 30 s) ───────────────────────────────────
const T = { s1: 0, s2: 90, s3: 270, s4: 450, s5: 660, end: 900 };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function seededRand(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

function spr(frame: number, fps: number, stiffness = 120, damping = 14) {
  return spring({ frame, fps, config: { stiffness, damping } });
}

function fadeIn(frame: number, dur = 15) {
  return interpolate(frame, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function shake(frame: number, intensity = 6, speed = 1.5) {
  return (
    Math.sin(frame * speed * Math.PI) *
    intensity *
    Math.max(0, 1 - frame * 0.08)
  );
}

function glitchX(frame: number) {
  return frame % 7 < 1 ? (seededRand(frame * 3.7) - 0.5) * 20 : 0;
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
  x: string; y: string; size: number; color: string; offset: number;
}> = ({ x, y, size, color, offset }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin((frame + offset) * 0.08) * 0.4 + 0.6;
  const floatY = Math.sin((frame + offset) * 0.03) * 15;
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      borderRadius: "50%", backgroundColor: color, opacity: pulse,
      boxShadow: `0 0 ${size * 3}px ${color}`,
      transform: `scale(${0.8 + pulse * 0.3}) translateY(${floatY}px)`,
    }} />
  );
};

const GlitchText: React.FC<{
  text: string; fontSize: number; color: string; frame: number;
  style?: React.CSSProperties;
}> = ({ text, fontSize, color, frame, style }) => {
  const gx = glitchX(frame);
  const isGlitching = Math.abs(gx) > 0;
  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <div style={{
        fontFamily: '"Arial Black", Impact, sans-serif', fontSize,
        fontWeight: 900, color,
        textShadow: `0 0 30px ${color}, 0 0 60px ${color}88`,
      }}>{text}</div>
      {isGlitching && (
        <div style={{
          position: "absolute", top: 0, left: gx * 0.5,
          fontFamily: '"Arial Black", Impact, sans-serif', fontSize,
          fontWeight: 900, color: "#FF0000", opacity: 0.5,
          mixBlendMode: "screen",
          clipPath: `inset(${seededRand(frame * 1.3) * 60}% 0 ${seededRand(frame * 2.1) * 30}% 0)`,
        }}>{text}</div>
      )}
      {isGlitching && (
        <div style={{
          position: "absolute", top: 0, left: -gx * 0.3,
          fontFamily: '"Arial Black", Impact, sans-serif', fontSize,
          fontWeight: 900, color: "#00FFFF", opacity: 0.5,
          mixBlendMode: "screen",
          clipPath: `inset(${seededRand(frame * 2.7) * 40}% 0 ${seededRand(frame * 1.5) * 50}% 0)`,
        }}>{text}</div>
      )}
    </div>
  );
};

const FlashTransition: React.FC<{ triggerFrames: number[] }> = ({ triggerFrames }) => {
  const frame = useCurrentFrame();
  const flashOpacity = triggerFrames.reduce((acc, f) => {
    if (frame < f) return acc;
    return Math.max(acc, interpolate(frame - f, [0, 8], [0.9, 0], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    }));
  }, 0);
  if (flashOpacity === 0) return null;
  return (
    <div style={{
      position: "absolute", inset: 0, backgroundColor: C.white,
      opacity: flashOpacity, pointerEvents: "none", zIndex: 100,
    }} />
  );
};

const Hi: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <span style={{ color, textShadow: `0 0 20px ${color}, 0 0 40px ${color}66` }}>
    {children}
  </span>
);

const Radial: React.FC<{ color: string; pos?: string; size?: string }> = ({
  color, pos = "50% 50%", size = "65%",
}) => (
  <div style={{
    position: "absolute", inset: 0,
    background: `radial-gradient(ellipse at ${pos}, ${color}30 0%, transparent ${size})`,
  }} />
);

// ─── Scene 1 – Hook ───────────────────────────────────────────────────────────
const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heyProg = spr(frame, fps, 400, 18);
  const heyOp = fadeIn(frame, 8);
  const heyShake = shake(frame - 5, 8, 2.5);
  const heyScale = interpolate(heyProg, [0, 0.8, 1], [0, 1.2, 1]);
  const basta = spr(frame - 15, fps, 300, 20);
  const bastaOp = fadeIn(frame - 15, 8);
  const bastaX = interpolate(basta, [0, 1], [-400, 0]);
  const subOp = fadeIn(frame - 35, 10);
  const subScale = spr(frame - 35, fps, 200, 18);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 4 }}>
      <Radial color={C.gold} />
      <div style={{ transform: `scale(${heyScale}) translateX(${heyShake}px)`, opacity: heyOp, marginBottom: -10 }}>
        <GlitchText text="HEY," fontSize={160} color={C.gold} frame={frame < 25 ? frame : 0} />
      </div>
      <div style={{
        fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 66, fontWeight: 900,
        color: C.white, textShadow: `0 0 20px ${C.blue}, 0 0 40px ${C.blue}66`,
        transform: `translateX(${bastaX}px)`, opacity: bastaOp,
        letterSpacing: 2, textAlign: "center",
      }}>BASTA DE SCROLLEAR</div>
      <div style={{
        fontFamily: "Arial, sans-serif", fontSize: 38, fontWeight: 700,
        color: C.blue, opacity: subOp, transform: `scale(${subScale})`,
        marginTop: 8, textShadow: `0 0 15px ${C.blue}`,
      }}>y empieza a generar ingresos 💰</div>
    </AbsoluteFill>
  );
};

// ─── Scene 2 – Roma / Realidad Imparable ─────────────────────────────────────
const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1 = spr(frame, fps, 200, 16);
  const l1op = fadeIn(frame, 10);
  const l2 = spr(frame - 20, fps, 200, 16);
  const l2op = fadeIn(frame - 20, 10);
  const l3op = fadeIn(frame - 50, 12);
  const realScale = interpolate(spr(frame - 50, fps, 200, 10), [0, 0.7, 1], [0, 1.3, 1]);
  const l3shake = shake(frame - 55, 5, 3);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Radial color={C.purple} pos="50% 40%" />
      <Radial color={C.pink} pos="80% 70%" size="40%" />
      <div style={{ textAlign: "center", padding: "0 70px" }}>
        <div style={{
          fontFamily: "Arial, sans-serif", fontSize: 46, color: C.white, fontWeight: 700,
          opacity: l1op, transform: `translateX(${interpolate(l1, [0, 1], [-100, 0])}px)`,
          marginBottom: 6,
        }}><Hi color={C.gold}>Roma</Hi> no se construyó en un día,</div>
        <div style={{
          fontFamily: "Arial, sans-serif", fontSize: 46, color: C.white, fontWeight: 700,
          opacity: l2op, transform: `translateX(${interpolate(l2, [0, 1], [100, 0])}px)`,
          marginBottom: 24,
        }}>pero se mantuvo unida por una</div>
        <div style={{ transform: `scale(${realScale}) translateX(${l3shake}px)`, opacity: l3op }}>
          <div style={{
            fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 88, fontWeight: 900,
            color: C.pink, letterSpacing: 3, lineHeight: 1,
            textShadow: `0 0 20px ${C.pink}, 0 0 50px ${C.pink}88, 0 0 100px ${C.pink}44`,
          }}>REALIDAD<br />IMPARABLE</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3 – ¿Por qué sigues atrapado? ─────────────────────────────────────
const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const q1 = spr(frame, fps, 150, 15);
  const q1op = fadeIn(frame, 10);
  const q2 = spr(frame - 35, fps, 150, 14);
  const q2op = fadeIn(frame - 35, 12);
  const pulse = 1 + Math.sin(frame * 0.35) * 0.07;
  const colorShift = interpolate(Math.sin(frame * 0.2), [-1, 1], [0, 30]);
  const qShake = frame > 40 ? Math.sin(frame * 2.8) * 3 : 0;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Radial color="#FF2200" />
      <Radial color={C.orange} pos="30% 70%" size="50%" />
      <div style={{ textAlign: "center", padding: "0 65px" }}>
        <div style={{
          fontFamily: "Arial, sans-serif", fontSize: 48, color: C.white, fontWeight: 700,
          opacity: q1op, transform: `translateY(${interpolate(q1, [0, 1], [80, 0])}px)`,
          marginBottom: 24, lineHeight: 1.3,
        }}>Si sientes que <Hi color={C.blue}>nada puede detenerte</Hi>,</div>
        <div style={{
          fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 60, fontWeight: 900,
          color: `hsl(${colorShift}, 100%, 60%)`,
          textShadow: `0 0 20px #FF5252, 0 0 40px #FF525288`,
          opacity: q2op,
          transform: `scale(${interpolate(q2, [0, 1], [0.7, 1]) * pulse}) translateX(${qShake}px)`,
          lineHeight: 1.2,
        }}>
          ¿Por qué sigues<br />atrapado en una<br />vida financiera<br />que no te gusta?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4 – Marketing de Afiliados ────────────────────────────────────────
const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1 = spr(frame, fps, 200, 14);
  const l1op = fadeIn(frame, 10);
  const mkt = spr(frame - 20, fps, 250, 16);
  const mktOp = fadeIn(frame - 20, 10);
  const afl = spr(frame - 35, fps, 250, 16);
  const aflOp = fadeIn(frame - 35, 10);
  const l3 = spr(frame - 70, fps, 180, 14);
  const l3op = fadeIn(frame - 70, 12);
  const l4 = spr(frame - 100, fps, 180, 14);
  const l4op = fadeIn(frame - 100, 12);
  const scanY = (frame * 12) % 1920;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Radial color={C.blue} pos="50% 35%" />
      <Radial color={C.purple} pos="80% 60%" size="45%" />
      {[0, 200, 400, 600, 800].map((offset, i) => (
        <div key={i} style={{
          position: "absolute", top: (scanY + offset) % 1920, left: 0,
          width: "100%", height: 1, backgroundColor: C.blue, opacity: 0.15,
        }} />
      ))}
      <div style={{ textAlign: "center", padding: "0 55px" }}>
        <div style={{
          fontFamily: "Arial, sans-serif", fontSize: 28, color: C.blue,
          letterSpacing: 8, fontWeight: 700, opacity: l1op,
          transform: `translateY(${interpolate(l1, [0, 1], [-50, 0])}px)`,
          marginBottom: 12, textTransform: "uppercase" as const,
        }}>La herramienta que me está</div>
        <div style={{
          fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 96, fontWeight: 900,
          color: C.white, textShadow: `0 0 30px ${C.blue}`, opacity: mktOp,
          transform: `translateY(${interpolate(mkt, [0, 1], [-80, 0])}px)`,
          lineHeight: 0.95, letterSpacing: -2,
        }}>MARKETING</div>
        <div style={{
          fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 96, fontWeight: 900,
          color: C.blue, textShadow: `0 0 30px ${C.blue}, 0 0 60px ${C.blue}66`,
          opacity: aflOp, transform: `translateY(${interpolate(afl, [0, 1], [80, 0])}px)`,
          lineHeight: 0.95, letterSpacing: -2, marginBottom: 16,
        }}>AFILIADOS</div>
        <div style={{
          fontFamily: "Arial, sans-serif", fontSize: 40, color: C.white, fontWeight: 700,
          opacity: l3op, transform: `translateX(${interpolate(l3, [0, 1], [-80, 0])}px)`,
          marginTop: 8,
        }}>mi <Hi color={C.gold}>IMPERIO DIGITAL</Hi> 🏆</div>
        <div style={{
          fontFamily: "Arial, sans-serif", fontSize: 44, color: C.purple, fontWeight: 800,
          opacity: l4op, transform: `translateX(${interpolate(l4, [0, 1], [80, 0])}px)`,
          marginTop: 6, textShadow: `0 0 20px ${C.purple}`,
        }}>desde 🏠 CASA</div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5 – CTA ───────────────────────────────────────────────────────────
const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t1 = spr(frame, fps, 400, 14);
  const t1op = fadeIn(frame, 8);
  const t2 = spr(frame - 28, fps, 150, 14);
  const t2op = fadeIn(frame - 28, 12);
  const t3 = spr(frame - 58, fps, 300, 10);
  const t3op = fadeIn(frame - 58, 10);
  const pulse = 1 + Math.sin(frame * 0.4) * 0.06;
  const glow = 0.7 + Math.sin(frame * 0.5) * 0.3;

  const stars = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    dist: 280 + Math.sin(frame * 0.1 + i) * 50,
    size: 6 + Math.sin(frame * 0.15 + i * 1.3) * 3,
    opacity: 0.4 + Math.sin(frame * 0.2 + i * 0.7) * 0.4,
  }));

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Radial color={C.gold} size="70%" />
      <Radial color={C.pink} pos="50% 90%" size="40%" />
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `calc(50% + ${Math.cos(s.angle + frame * 0.02) * s.dist * 0.3}px)`,
          top: `calc(50% + ${Math.sin(s.angle + frame * 0.02) * s.dist * 0.5}px)`,
          width: s.size, height: s.size, borderRadius: "50%",
          backgroundColor: i % 2 === 0 ? C.gold : C.pink, opacity: s.opacity,
          boxShadow: `0 0 ${s.size * 3}px ${i % 2 === 0 ? C.gold : C.pink}`,
        }} />
      ))}
      <div style={{ textAlign: "center", padding: "0 55px", position: "relative" }}>
        <div style={{
          fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 116, fontWeight: 900,
          color: C.gold, textShadow: `0 0 30px ${C.gold}, 0 0 70px ${C.gold}88`,
          transform: `scale(${interpolate(t1, [0, 0.7, 1], [0, 1.25, 1]) * pulse})`,
          opacity: t1op, lineHeight: 0.9, marginBottom: 20,
        }}>¡SÍGUENOS!</div>
        <div style={{
          fontFamily: "Arial, sans-serif", fontSize: 42, color: C.white, fontWeight: 700,
          opacity: t2op, transform: `translateY(${interpolate(t2, [0, 1], [50, 0])}px)`,
          marginBottom: 32,
        }}>Escríbeme y te ayudaremos</div>
        <div style={{
          fontFamily: '"Arial Black", sans-serif', fontSize: 50, fontWeight: 900,
          color: C.bg, backgroundColor: C.gold, padding: "24px 56px", borderRadius: 20,
          transform: `scale(${interpolate(t3, [0, 0.6, 1], [0, 1.15, 1]) * pulse})`,
          opacity: t3op * glow,
          boxShadow: `0 0 40px ${C.gold}, 0 0 80px ${C.gold}88, 0 0 120px ${C.gold}44`,
          display: "inline-block",
        }}>¡GENERAR HOY! 🚀</div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export const EmotionGraphicVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const scanY = (frame * 5) % 1920;

  const dots = [
    { x: "8%",  y: "12%", size: 10, color: C.blue,   offset: 0  },
    { x: "88%", y: "8%",  size: 7,  color: C.pink,   offset: 30 },
    { x: "15%", y: "65%", size: 12, color: C.purple,  offset: 15 },
    { x: "80%", y: "70%", size: 8,  color: C.gold,   offset: 45 },
    { x: "50%", y: "5%",  size: 6,  color: C.blue,   offset: 20 },
    { x: "92%", y: "45%", size: 9,  color: C.pink,   offset: 60 },
    { x: "5%",  y: "85%", size: 7,  color: C.purple,  offset: 10 },
    { x: "55%", y: "95%", size: 11, color: C.gold,   offset: 50 },
    { x: "25%", y: "30%", size: 5,  color: C.green,  offset: 35 },
    { x: "70%", y: "25%", size: 8,  color: C.green,  offset: 25 },
    { x: "40%", y: "80%", size: 6,  color: C.blue,   offset: 55 },
    { x: "75%", y: "90%", size: 9,  color: C.pink,   offset: 40 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      <Audio src={staticFile("audio.mp3")} />

      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, #1a0035 0%, #0a001a 40%, ${C.bg} 70%)`,
      }} />

      <Grid />

      <div style={{
        position: "absolute", top: scanY, left: 0, width: "100%", height: 3,
        background: `linear-gradient(transparent, ${C.blue}55, transparent)`,
        pointerEvents: "none",
      }} />

      <div style={{ position: "absolute", top: 50, left: 50, width: 70, height: 70, borderTop: `3px solid ${C.blue}`, borderLeft: `3px solid ${C.blue}`, boxShadow: `0 0 15px ${C.blue}` }} />
      <div style={{ position: "absolute", top: 50, right: 50, width: 70, height: 70, borderTop: `3px solid ${C.pink}`, borderRight: `3px solid ${C.pink}`, boxShadow: `0 0 15px ${C.pink}` }} />
      <div style={{ position: "absolute", bottom: 50, left: 50, width: 70, height: 70, borderBottom: `3px solid ${C.purple}`, borderLeft: `3px solid ${C.purple}`, boxShadow: `0 0 15px ${C.purple}` }} />
      <div style={{ position: "absolute", bottom: 50, right: 50, width: 70, height: 70, borderBottom: `3px solid ${C.gold}`, borderRight: `3px solid ${C.gold}`, boxShadow: `0 0 15px ${C.gold}` }} />

      {dots.map((d, i) => <Dot key={i} {...d} />)}

      <FlashTransition triggerFrames={[T.s2, T.s3, T.s4, T.s5]} />

      <Sequence from={T.s1} durationInFrames={T.s2 - T.s1}><S1 /></Sequence>
      <Sequence from={T.s2} durationInFrames={T.s3 - T.s2}><S2 /></Sequence>
      <Sequence from={T.s3} durationInFrames={T.s4 - T.s3}><S3 /></Sequence>
      <Sequence from={T.s4} durationInFrames={T.s5 - T.s4}><S4 /></Sequence>
      <Sequence from={T.s5} durationInFrames={T.end - T.s5}><S5 /></Sequence>
    </AbsoluteFill>
  );
};
