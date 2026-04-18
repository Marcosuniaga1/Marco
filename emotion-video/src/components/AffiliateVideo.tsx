import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CFG = {
  commission: 347,
  name:       "Marco",
  keyword:    "SISTEMA",
  whatsapp:   "+1 555 123-4567",
};

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  black:     "#07070F",
  darkGray:  "#1A1A2E",
  gold:      "#FFD700",
  goldDark:  "#C8A96E",
  white:     "#FFFFFF",
  navy:      "#0047AB",
  lightGray: "#E8E8E8",
  brownGold: "#8B6F47",
  darkText:  "#141414",
  red:       "#FF3B30",
};

// ─── Timing (frames @ 30fps, total 45s = 1350f) ───────────────────────────────
const T = {
  b1: 0,    // HOOK        0-3s
  b2: 90,   // PROBLEMA    3-8s
  b3: 240,  // TRANSICIÓN  8-12s
  b4: 360,  // PASOS       12-30s  (3×180f)
  b5: 900,  // OBJECIÓN    30-38s
  b6: 1140, // CTA         38-45s
  end:1350,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function spr(frame: number, fps: number, stiffness = 120, damping = 14) {
  return spring({ frame, fps, config: { stiffness, damping } });
}
function fi(frame: number, dur = 15) {
  return interpolate(frame, [0, dur], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
}
function slideUp(prog: number, dist = 60) {
  return interpolate(prog, [0, 1], [dist, 0]);
}
function slideX(prog: number, dist = 80) {
  return interpolate(prog, [0, 1], [dist, 0]);
}

const H2 = 960; // vertical center of 1920px frame

// ─── Shared components ────────────────────────────────────────────────────────
const Bg: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ position: "absolute", inset: 0, backgroundColor: color }} />
);

const Radial: React.FC<{ color: string; pos?: string; size?: string }> = ({
  color, pos = "50% 50%", size = "60%",
}) => (
  <div style={{
    position: "absolute", inset: 0,
    background: `radial-gradient(ellipse at ${pos}, ${color}35 0%, transparent ${size})`,
  }} />
);

const GoldBar: React.FC<{ top?: boolean; bottom?: boolean }> = ({ top, bottom }) => (
  <>
    {top    && <div style={{ position: "absolute", top:    0, left: 0, right: 0, height: 12, backgroundColor: C.gold }} />}
    {bottom && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 12, backgroundColor: C.gold }} />}
  </>
);

const Hi: React.FC<{ color?: string; children: React.ReactNode }> = ({
  color = C.gold, children,
}) => (
  <span style={{ color, textShadow: `0 0 20px ${color}99` }}>{children}</span>
);

// ─── BLOQUE 1 – HOOK ──────────────────────────────────────────────────────────
const B1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelProg = spr(frame, fps, 200, 16);
  const labelOp   = fi(frame, 12);

  // Counter 0 → CFG.commission in 1.5s (45 frames)
  const count = Math.round(
    interpolate(frame, [0, 45], [0, CFG.commission], { extrapolateRight: "clamp" })
  );
  const countProg = spr(frame - 5, fps, 150, 18);
  const countOp   = fi(frame - 5, 10);

  // Glow after counter ends
  const glowAmt = fi(frame - 50, 20);
  const subProg = spr(frame - 55, fps, 120, 14);
  const subOp   = fi(frame - 55, 12);

  // Pulse on number
  const pulse = 1 + Math.sin(frame * 0.4) * 0.03;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 0 }}>
      <Bg color={C.navy} />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, #0063CC 0%, ${C.navy} 50%, #001F5B 100%)`,
      }} />
      <Radial color={C.gold} size="50%" />

      {/* Label top */}
      <div style={{
        fontFamily: '"Arial Black", Arial, sans-serif',
        fontSize: 50, fontWeight: 900, color: C.white,
        letterSpacing: 1, textAlign: "center",
        opacity: labelOp,
        transform: `translateY(${slideUp(labelProg, 40)}px)`,
        marginBottom: 16,
        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
      }}>Mi primer comisión fue</div>

      {/* Counter */}
      <div style={{
        fontFamily: "Courier New, monospace",
        fontSize: 120, fontWeight: 900,
        color: C.gold,
        opacity: countOp,
        transform: `scale(${interpolate(countProg, [0, 0.8, 1], [0.6, 1.08, 1]) * pulse})`,
        textShadow: `0 0 ${20 + glowAmt * 40}px ${C.gold}, 0 0 ${glowAmt * 80}px ${C.gold}88`,
        lineHeight: 1,
      }}>${count.toLocaleString()}</div>

      {/* Sub label */}
      <div style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 42, fontWeight: 700, color: C.white,
        opacity: subOp,
        transform: `translateY(${slideUp(subProg, 30)}px)`,
        marginTop: 18,
        letterSpacing: 1,
        textShadow: "0 2px 10px rgba(0,0,0,0.4)",
      }}>en 3 días sin followers</div>
    </AbsoluteFill>
  );
};

// ─── BLOQUE 2 – PROBLEMA ──────────────────────────────────────────────────────
const B2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = [
    { text: "El problema no es que no tengas potencial...", delay: 0,  color: C.darkText, size: 46, bold: true },
    { text: "Es que estás en el lugar equivocado",          delay: 40, color: "#7A5C00",  size: 50, bold: true },
    { text: "(Plataformas falsas, cursos caros,\nmétodos que no funcionan)", delay: 90, color: C.darkText, size: 36, bold: false },
  ];

  const yPos = [H2 - 280, H2 - 30, H2 + 240];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Bg color={C.lightGray} />
      <GoldBar top bottom />

      {lines.map((line, i) => {
        const p = spr(frame - line.delay, fps, 180, 16);
        const op = fi(frame - line.delay, 12);
        return (
          <div key={i} style={{
            position: "absolute",
            top: yPos[i],
            left: 0, right: 0,
            textAlign: "center",
            padding: "0 70px",
            opacity: op,
            transform: `translateY(${slideUp(p, 50)}px)`,
          }}>
            {line.text.split("\n").map((l, j) => (
              <div key={j} style={{
                fontFamily: line.bold ? '"Arial Black", Arial, sans-serif' : "Arial, sans-serif",
                fontSize: line.size, fontWeight: line.bold ? 900 : 400,
                color: line.color, lineHeight: 1.3,
                textShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}>{l}</div>
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── BLOQUE 3 – TRANSICIÓN ────────────────────────────────────────────────────
const B3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fade  = fi(frame, 20);
  const scale = interpolate(spr(frame, fps, 80, 18), [0, 1], [0.85, 1]);
  const pulse = 1 + Math.sin(frame * 0.3) * 0.02;

  // Animated dots
  const dotCount = Math.floor(frame / 25) % 4;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Bg color={C.black} />
      <Radial color={C.gold} size="55%" />
      <Radial color="#4400AA" pos="30% 70%" size="45%" />

      <div style={{
        fontFamily: '"Arial Black", Arial, sans-serif',
        fontSize: 70, fontWeight: 900, color: C.gold,
        textAlign: "center",
        opacity: fade,
        transform: `scale(${scale * pulse})`,
        textShadow: `0 0 30px ${C.gold}88, 0 0 60px ${C.gold}44`,
        letterSpacing: 1,
        padding: "0 60px",
      }}>
        Aquí está el secreto{"."  .repeat(dotCount)}
      </div>
    </AbsoluteFill>
  );
};

// ─── BLOQUE 4 – SISTEMA 3 PASOS ───────────────────────────────────────────────
const STEPS = [
  {
    num: "1", bg: C.navy,
    title:    "Identifica a personas que ya quieren lo que ofreces",
    subtitle: "(No tienes que buscar, ellos vienen solos)",
  },
  {
    num: "2", bg: C.brownGold,
    title:    "Presentas la oportunidad en la forma correcta",
    subtitle: "(Script simple, sin complicaciones)",
  },
  {
    num: "3", bg: C.darkGray,
    title:    "Recibe comisiones automáticas",
    subtitle: "(Mientras duermes, sin inventario, sin estrés)",
  },
];

const StepScene: React.FC<{ step: typeof STEPS[0] }> = ({ step }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numProg = spr(frame, fps, 250, 14);
  const numOp   = fi(frame, 10);
  const txtProg = spr(frame - 20, fps, 160, 15);
  const txtOp   = fi(frame - 20, 12);
  const subProg = spr(frame - 40, fps, 140, 14);
  const subOp   = fi(frame - 40, 12);

  const isLight = step.bg === C.lightGray;
  const textColor = isLight ? C.darkText : C.white;

  // Animated dots indicator
  const dots = [0, 1, 2].map(i => ({
    active: i === parseInt(step.num) - 1,
  }));

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Bg color={step.bg} />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
      }} />
      <Radial color={C.gold} pos="50% 40%" size="45%" />

      {/* Step number */}
      <div style={{
        fontFamily: "Courier New, monospace",
        fontSize: 160, fontWeight: 900, color: C.gold,
        opacity: numOp,
        transform: `scale(${interpolate(numProg, [0, 0.7, 1], [0.3, 1.15, 1])})`,
        textShadow: `0 0 40px ${C.gold}88, 0 0 80px ${C.gold}44`,
        lineHeight: 1,
        marginBottom: -20,
      }}>{step.num}</div>

      {/* Title */}
      <div style={{
        fontFamily: '"Arial Black", Arial, sans-serif',
        fontSize: 46, fontWeight: 900, color: textColor,
        textAlign: "center", padding: "0 70px",
        opacity: txtOp,
        transform: `translateY(${slideUp(txtProg, 40)}px)`,
        lineHeight: 1.25,
        marginBottom: 20,
        textShadow: isLight ? "none" : "0 2px 10px rgba(0,0,0,0.3)",
      }}>{step.title}</div>

      {/* Subtitle */}
      <div style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 34, fontWeight: 400, color: C.goldDark,
        textAlign: "center", padding: "0 80px",
        opacity: subOp,
        transform: `translateY(${slideUp(subProg, 30)}px)`,
        lineHeight: 1.3,
      }}>{step.subtitle}</div>

      {/* Dot indicator */}
      <div style={{
        position: "absolute", bottom: 80,
        display: "flex", gap: 16, alignItems: "center",
      }}>
        {dots.map((d, i) => (
          <div key={i} style={{
            width: d.active ? 28 : 12, height: d.active ? 28 : 12,
            borderRadius: "50%",
            backgroundColor: d.active ? C.gold : "rgba(255,255,255,0.3)",
            boxShadow: d.active ? `0 0 12px ${C.gold}` : "none",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const B4: React.FC = () => (
  <>
    <Sequence from={0}   durationInFrames={180}><StepScene step={STEPS[0]} /></Sequence>
    <Sequence from={180} durationInFrames={180}><StepScene step={STEPS[1]} /></Sequence>
    <Sequence from={360} durationInFrames={180}><StepScene step={STEPS[2]} /></Sequence>
  </>
);

// ─── BLOQUE 5 – OBJECIÓN ──────────────────────────────────────────────────────
const B5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: question (0-2s = 60f)
  // Phase 2: answer   (2-5s = 60-150f)
  // Phase 3: note     (5-8s = 150-240f)

  const qProg = spr(frame, fps, 200, 16);
  const qOp   = fi(frame, 12);

  const aProg = spr(frame - 62, fps, 300, 14);
  const aOp   = fi(frame - 62, 12);
  const aScale = interpolate(aProg, [0, 0.7, 1], [0.5, 1.12, 1]);

  const nProg = spr(frame - 152, fps, 160, 15);
  const nOp   = fi(frame - 152, 12);

  const showAnswer = frame >= 55;
  const showNote   = frame >= 148;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Bg color={C.lightGray} />
      <GoldBar top bottom />
      <Radial color={C.gold} pos="50% 50%" size="70%" />

      {/* Question */}
      <div style={{
        fontFamily: '"Arial Black", Arial, sans-serif',
        fontSize: 52, fontWeight: 900, color: C.darkText,
        textAlign: "center", padding: "0 60px",
        opacity: qOp,
        transform: `translateY(${showAnswer ? -200 : slideUp(qProg, 50)}px)`,
        position: "absolute",
        top: showAnswer ? H2 - 300 : "auto",
      }}>¿Pero cuánto cuesta?</div>

      {/* Answer */}
      {showAnswer && (
        <div style={{
          fontFamily: '"Arial Black", Arial, sans-serif',
          fontSize: 84, fontWeight: 900, color: C.gold,
          textAlign: "center",
          opacity: aOp,
          transform: `scale(${aScale})`,
          textShadow: `0 0 30px ${C.gold}88`,
          position: "absolute",
          top: H2 - 60,
        }}>La afiliación<br />es GRATIS</div>
      )}

      {/* Note */}
      {showNote && (
        <div style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 36, fontWeight: 400, color: C.darkText,
          textAlign: "center", padding: "0 80px",
          opacity: nOp,
          transform: `translateY(${slideUp(nProg, 30)}px)`,
          position: "absolute",
          top: H2 + 260,
          lineHeight: 1.4,
        }}>Pagas solo cuando decidas<br />empezar a ganar</div>
      )}
    </AbsoluteFill>
  );
};

// ─── BLOQUE 6 – CTA URGENCIA ──────────────────────────────────────────────────
const B6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const CTA_LINES = [
    { text: `ESCRIBE '${CFG.keyword}'`,    color: C.gold,  delay: 0  },
    { text: "EN COMENTARIOS",              color: C.white, delay: 8  },
    { text: "o mándame DM al",             color: C.white, delay: 16 },
    { text: "WhatsApp ↓",                  color: C.gold,  delay: 24 },
  ];

  const URGENT = [
    { text: "Los primeros 20 quedan",   delay: 60 },
    { text: "en el grupo privado",      delay: 70 },
    { text: "Después cierra. 🔒",       delay: 80 },
  ];

  // Pulsing border
  const borderGlow = 0.5 + 0.5 * Math.sin(frame * 0.25);
  const phonePulse = 1 + 0.04 * Math.sin(frame * 0.4);
  const phoneOp    = fi(frame - 100, 15);
  const signOp     = fi(frame - 155, 15);
  const phoneProg  = spr(frame - 100, fps, 200, 14);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Bg color={C.black} />
      <Radial color={C.gold}    pos="50% 30%" size="55%" />
      <Radial color="#440088"   pos="20% 80%" size="40%" />

      {/* Animated border */}
      {[8].map(t => (
        <React.Fragment key={t}>
          <div style={{ position:"absolute", top:0,    left:0, right:0,  height:t, background:`linear-gradient(90deg,transparent,${C.gold},transparent)`, opacity: borderGlow }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0,  height:t, background:`linear-gradient(90deg,transparent,${C.gold},transparent)`, opacity: borderGlow }} />
          <div style={{ position:"absolute", top:0, bottom:0, left:0,   width:t,  background:`linear-gradient(180deg,transparent,${C.gold},transparent)`, opacity: borderGlow }} />
          <div style={{ position:"absolute", top:0, bottom:0, right:0,  width:t,  background:`linear-gradient(180deg,transparent,${C.gold},transparent)`, opacity: borderGlow }} />
        </React.Fragment>
      ))}

      {/* CTA lines */}
      <div style={{ position:"absolute", top: H2 - 440, left:0, right:0, textAlign:"center", padding:"0 50px" }}>
        {CTA_LINES.map((line, i) => {
          const p = spr(frame - line.delay, fps, 250, 16);
          const op = fi(frame - line.delay, 10);
          return (
            <div key={i} style={{
              fontFamily: '"Arial Black", Arial, sans-serif',
              fontSize: 58, fontWeight: 900, color: line.color,
              opacity: op, marginBottom: 4,
              transform: `translateY(${slideUp(p, 40)}px)`,
              textShadow: line.color === C.gold ? `0 0 20px ${C.gold}88` : "none",
            }}>{line.text}</div>
          );
        })}
      </div>

      {/* Urgency */}
      <div style={{ position:"absolute", top: H2 + 50, left:0, right:0, textAlign:"center" }}>
        {URGENT.map((line, i) => {
          const op = fi(frame - line.delay, 10);
          return (
            <div key={i} style={{
              fontFamily: '"Arial Black", Arial, sans-serif',
              fontSize: 40, fontWeight: 900, color: C.white,
              opacity: op, lineHeight: 1.4,
            }}>{line.text}</div>
          );
        })}
      </div>

      {/* WhatsApp */}
      <div style={{
        position:"absolute", top: H2 + 310,
        left:0, right:0, textAlign:"center",
        fontFamily: "Courier New, monospace",
        fontSize: 64, fontWeight: 900, color: C.gold,
        opacity: phoneOp,
        transform: `scale(${interpolate(phoneProg,[0,0.7,1],[0.5,1.1,1]) * phonePulse})`,
        textShadow: `0 0 20px ${C.gold}88`,
      }}>{CFG.whatsapp}</div>

      {/* Firma */}
      <div style={{
        position:"absolute", top: H2 + 450,
        left:0, right:0, textAlign:"center",
        fontFamily: "Arial, sans-serif",
        fontSize: 34, color: C.white, opacity: signOp,
      }}>Soy {CFG.name}. Te espero allá. 👋</div>
    </AbsoluteFill>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export const AffiliateVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Flash between blocks
  const flashes = [T.b2, T.b3, T.b4, T.b5, T.b6];
  const flashOp = flashes.reduce((acc, f) => {
    if (frame < f) return acc;
    return Math.max(acc, interpolate(frame - f, [0, 8], [1, 0], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    }));
  }, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: C.black, overflow: "hidden" }}>
      <Sequence from={T.b1} durationInFrames={T.b2 - T.b1}><B1 /></Sequence>
      <Sequence from={T.b2} durationInFrames={T.b3 - T.b2}><B2 /></Sequence>
      <Sequence from={T.b3} durationInFrames={T.b4 - T.b3}><B3 /></Sequence>
      <Sequence from={T.b4} durationInFrames={T.b5 - T.b4}><B4 /></Sequence>
      <Sequence from={T.b5} durationInFrames={T.b6 - T.b5}><B5 /></Sequence>
      <Sequence from={T.b6} durationInFrames={T.end - T.b6}><B6 /></Sequence>

      {flashOp > 0 && (
        <div style={{
          position:"absolute", inset:0,
          backgroundColor: C.white, opacity: flashOp,
          pointerEvents:"none", zIndex:999,
        }} />
      )}
    </AbsoluteFill>
  );
};
