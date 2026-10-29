import type { NextRequest } from "next/server";
import { findTicket } from "@/lib/server/purchase";
import { renderTicketJpeg } from "@/lib/server/ticket";
import { ticketFileName } from "@/lib/server/ticket-code";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const ticket = await findTicket({ session_id: params.get("session_id") ?? undefined, cash: params.get("cash") ?? undefined });
  const n = Number(params.get("n") ?? 1);
  const code = ticket?.issued ? ticket.codes[n - 1] : undefined;
  if (!ticket || !code) return new Response("Entrada no encontrada", { status: 404 });

  const count = ticket.codes.length;
  const image = await renderTicketJpeg({ holder: `${ticket.firstName} ${ticket.lastName}`, show: ticket.show, code, index: n, count });
  const disposition = params.has("download") ? "attachment" : "inline";

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `${disposition}; filename="${ticketFileName(code, n, count)}"`,
      "Cache-Control": "private, max-age=86400",
    },
  });
}
