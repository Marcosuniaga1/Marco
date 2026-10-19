import type { NextRequest } from "next/server";
import { findPurchase } from "@/lib/server/purchase";
import { renderTicketJpeg } from "@/lib/server/ticket";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const purchase = await findPurchase(request.nextUrl.searchParams.get("session_id"));
  if (!purchase?.paid) return new Response("Entrada no encontrada", { status: 404 });

  const r = purchase.registration;
  const image = await renderTicketJpeg({ holder: `${r.firstName} ${r.lastName}`, show: r.show, code: purchase.code });
  const disposition = request.nextUrl.searchParams.has("download") ? "attachment" : "inline";

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `${disposition}; filename="entrada-${purchase.code}.jpg"`,
      "Cache-Control": "private, max-age=86400",
    },
  });
}
