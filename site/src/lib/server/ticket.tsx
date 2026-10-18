import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { EVENT, SHOWS, type ShowId } from "@/lib/montreal";

const root = process.cwd();
const assets = Promise.all([
  readFile(join(root, "src/assets/fonts/SpaceGrotesk-Medium.ttf")),
  readFile(join(root, "src/assets/fonts/SpaceGrotesk-Bold.ttf")),
  readFile(join(root, "public/images/logo-leal.jpg")),
]);

export const TICKET_SIZE = { width: 1080, height: 1350 };

export type TicketData = {
  holder: string;
  show: ShowId;
  code: string;
};

const C = {
  canvas: "#05060f",
  panel: "#0b0d1a",
  edge: "rgba(186,215,247,0.18)",
  ice: "#d8ecf8",
  frost: "#d1e4fa",
  mist: "#c7d3ea",
  fog: "#9da7ba",
  violet: "#663af3",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 24, letterSpacing: 4, color: C.fog, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 44, fontWeight: 700, color: C.ice }}>{value}</div>
    </div>
  );
}

export async function renderTicketPng(t: TicketData): Promise<Buffer> {
  const [medium, bold, logo] = await assets;
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;
  const show = SHOWS[t.show];

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.canvas, fontFamily: "Space Grotesk", color: C.frost }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
        <img src={logoSrc} alt="" width={1080} height={360} style={{ objectFit: "cover", objectPosition: "center 52%" }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "52px 72px 0", gap: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 26, letterSpacing: 6, color: C.mist, textTransform: "uppercase" }}>
              {`Venezuela se levanta · ${EVENT.city}`}
            </div>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#ffffff" }}>Entrada válida para 2 personas</div>
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px 36px", borderRadius: 18, background: C.violet }}>
              <div style={{ fontSize: 22, letterSpacing: 4, color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Función</div>
              <div style={{ fontSize: 64, fontWeight: 700, color: "#ffffff" }}>{show.label}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
              <Row label="Fecha" value={EVENT.dateLabel} />
            </div>
          </div>

          <Row label="Lugar" value={EVENT.venue} />
          <Row label="Titular" value={t.holder} />
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "36px 0 0" }}>
          <div style={{ width: 36, height: 72, borderRadius: "0 36px 36px 0", background: C.panel }} />
          <div style={{ flex: 1, borderTop: `3px dashed ${C.edge}`, margin: "0 12px" }} />
          <div style={{ width: 36, height: 72, borderRadius: "36px 0 0 36px", background: C.panel }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "28px 72px 64px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, color: C.fog, textTransform: "uppercase" }}>Código de entrada</div>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: 2, color: "#ffffff" }}>{t.code}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, fontSize: 24, color: C.mist }}>
            <div>Incluye 1 Agenda Esperanza 2027</div>
            <div style={{ color: C.fog }}>Presenta esta imagen en la puerta</div>
          </div>
        </div>
      </div>
    ),
    {
      ...TICKET_SIZE,
      fonts: [
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    },
  );

  return Buffer.from(await image.arrayBuffer());
}
