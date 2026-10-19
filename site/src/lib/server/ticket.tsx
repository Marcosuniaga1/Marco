import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { EVENT, SHOWS, TICKET_SIZE, type ShowId } from "@/lib/montreal";

const root = process.cwd();
const assets = Promise.all([
  readFile(join(root, "src/assets/fonts/Poppins-Medium.ttf")),
  readFile(join(root, "src/assets/fonts/Poppins-Bold.ttf")),
  readFile(join(root, "src/assets/fonts/Poppins-ExtraBold.ttf")),
  readFile(join(root, "public/images/MontrealNuevoDef.jpg")),
]);

// The poster's bottom row lists both show times; cropping just above it leaves only the buyer's show on the stub.
const ART_HEIGHT = 1215;

const C = {
  stub: "#16060d",
  pink: "#ff3d73",
  yellow: "#ffd23f",
  white: "#ffffff",
  dim: "rgba(255,255,255,0.68)",
  line: "rgba(255,255,255,0.22)",
};

export type TicketData = {
  holder: string;
  show: ShowId;
  code: string;
};

function Label({ children }: { children: string }) {
  return <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 4, color: C.pink, textTransform: "uppercase" }}>{children}</div>;
}

function holderSize(name: string): number {
  if (name.length > 36) return 28;
  if (name.length > 24) return 34;
  return 42;
}

export async function renderTicketJpeg(t: TicketData): Promise<Buffer> {
  const [medium, bold, extraBold, art] = await assets;
  const artSrc = `data:image/jpeg;base64,${art.toString("base64")}`;
  const show = SHOWS[t.show];

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.stub, fontFamily: "Poppins", color: C.white }}>
        <div style={{ display: "flex", position: "relative", width: TICKET_SIZE.width, height: ART_HEIGHT }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
          <img src={artSrc} alt="" width={TICKET_SIZE.width} height={ART_HEIGHT} style={{ objectFit: "cover", objectPosition: "top" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 140, display: "flex", background: `linear-gradient(to bottom, rgba(22,6,13,0), ${C.stub})` }} />
        </div>

        <div style={{ display: "flex", borderTop: `3px dashed ${C.line}`, margin: "0 40px" }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", padding: "30px 64px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Label>Fecha</Label>
              <div style={{ fontSize: 58, fontWeight: 800, color: C.yellow, lineHeight: 1.05 }}>{EVENT.ticketDate}</div>
              <div style={{ fontSize: 22, fontWeight: 500, color: C.dim }}>{EVENT.ticketWeekday}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Label>Función</Label>
              <div style={{ fontSize: 84, fontWeight: 800, color: C.yellow, lineHeight: 1 }}>{show.label}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
              <Label>Entrada</Label>
              <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.05 }}>2</div>
              <div style={{ fontSize: 22, fontWeight: 500, color: C.dim }}>personas</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
              <Label>Titular</Label>
              <div style={{ fontSize: holderSize(t.holder), fontWeight: 700, lineHeight: 1.15 }}>{t.holder}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
              <Label>Código</Label>
              <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 1, lineHeight: 1.1 }}>{t.code}</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 500, color: C.dim }}>
            <div>{`${EVENT.venue} · ${EVENT.city}`}</div>
            <div>Incluye 1 Agenda Esperanza 2027</div>
          </div>
        </div>
      </div>
    ),
    {
      ...TICKET_SIZE,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
        { name: "Poppins", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );

  // A ~570 KB PNG attachment counts against inbox placement; JPEG keeps it far smaller with no visible loss.
  const png = Buffer.from(await image.arrayBuffer());
  return sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}
