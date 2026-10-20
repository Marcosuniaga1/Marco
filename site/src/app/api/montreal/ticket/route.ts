import type { NextRequest } from "next/server";
import { findTicket } from "@/lib/server/purchase";
import { renderTicketJpeg } from "@/lib/server/ticket";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const ticket = await findTicket({ session_id: params.get("session_id") ?? undefined, cash: params.get("cash") ?? undefined });
  if (!ticket?.issued) return new Response("Entrada no encontrada", { status: 404 });

  const image = await renderTicketJpeg({ holder: `${ticket.firstName} ${ticket.lastName}`, show: ticket.show, code: ticket.code });
  const disposition = params.has("download") ? "attachment" : "inline";

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `${disposition}; filename="entrada-${ticket.code}.jpg"`,
      "Cache-Control": "private, max-age=86400",
    },
  });
}
