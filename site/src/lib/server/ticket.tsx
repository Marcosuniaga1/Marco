import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { EVENT, SHOWS, TICKET_SIZE, type ShowId } from "@/lib/montreal";

const root = process.cwd();
const fonts = Promise.all([
  readFile(join(root, "src/assets/fonts/Poppins-Medium.ttf")),
  readFile(join(root, "src/assets/fonts/Poppins-Bold.ttf")),
  readFile(join(root, "src/assets/fonts/Poppins-ExtraBold.ttf")),
]);

// The poster's bottom row lists both show times; cropping just above it leaves only the buyer's show on the stub.
const ART_HEIGHT = 1215;
// The stub is drawn from this height down, starting with a fade over the bottom of the art.
const FADE = 140;
const OVERLAY_TOP = ART_HEIGHT - FADE;

// The cropped poster on the stub's background is the same for every ticket, so it is built once per instance;
// each ticket only renders its own stub, which keeps a 10-ticket purchase within the webhook's time budget.
let base: Promise<Buffer> | null = null;
function ticketBase(): Promise<Buffer> {
  base ??= readFile(join(root, "public/images/MontrealNuevoDef.jpg")).then(async (art) => {
    const cropped = await sharp(art).resize(TICKET_SIZE.width, ART_HEIGHT, { fit: "cover", position: "top" }).toBuffer();
    return sharp({ create: { width: TICKET_SIZE.width, height: TICKET_SIZE.height, channels: 3, background: "#16060d" } })
      .composite([{ input: cropped, top: 0, left: 0 }])
      .png()
      .toBuffer();
  });
  return base;
}

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
  // Position of this ticket within the purchase, shown as "Entrada 2/5" when there is more than one.
  index?: number;
  count?: number;
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
  const [[medium, bold, extraBold], background] = await Promise.all([fonts, ticketBase()]);
  const show = SHOWS[t.show];
  const count = t.count ?? 1;
  const entrada = count > 1 ? `Entrada ${t.index ?? 1}/${count}` : "Entrada";

  const overlay = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", fontFamily: "Poppins", color: C.white }}>
        <div style={{ display: "flex", height: FADE, background: `linear-gradient(to bottom, rgba(22,6,13,0), ${C.stub})` }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, background: C.stub }}>
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
                <Label>{entrada}</Label>
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
              <div>Venezuela se levanta</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: TICKET_SIZE.width,
      height: TICKET_SIZE.height - OVERLAY_TOP,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
        { name: "Poppins", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );

  // A ~570 KB PNG attachment counts against inbox placement; JPEG keeps it far smaller with no visible loss.
  const stub = Buffer.from(await overlay.arrayBuffer());
  return sharp(background)
    .composite([{ input: stub, top: OVERLAY_TOP, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}
