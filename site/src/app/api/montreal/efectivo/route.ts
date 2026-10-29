import { after } from "next/server";
import { CASH_LINK_MESSAGES, EVENT, validateRegistration } from "@/lib/montreal";
import { getCashLink, redeemCashLink } from "@/lib/server/sheet";
import { sheetRows, torontoTime } from "@/lib/server/rows";
import { emailTickets } from "@/lib/server/fulfill";
import { isCashTokenShape } from "@/lib/server/taquilla";
import { ticketCodes } from "@/lib/server/ticket-code";

export const runtime = "nodejs";

const refused = (status: string | undefined, code = 409) =>
  Response.json({ error: CASH_LINK_MESSAGES[status ?? ""] ?? "No pudimos registrar tu entrada. Intenta de nuevo." }, { status: code });

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const token = body?.token;
  if (!isCashTokenShape(token)) return refused("not_found", 404);

  try {
    const link = await getCashLink(token);
    if (!link.found || !link.show) return refused("not_found", 404);
    if (link.status !== "Pendiente") return refused(link.status);

    // The show and the number of tickets were fixed when Pedro created the link; whatever the form sends is ignored.
    const parsed = validateRegistration({ ...body, show: link.show, quantity: link.quantity });
    if (!parsed.ok) return Response.json({ error: "Revisa los campos marcados.", fields: parsed.errors }, { status: 400 });
    const r = parsed.data;

    const codes = ticketCodes(`cash:${token}`, r.show, r.quantity);
    const total = EVENT.priceCad * r.quantity;
    const now = new Date();
    const result = await redeemCashLink(token, sheetRows(r, codes, now, total, `EFECTIVO-${token}`), torontoTime(now));
    if (!result.ok) return refused(result.error);

    // The tickets are already on the thank-you page; the email is a backup and must not hold up the redirect.
    after(() =>
      emailTickets(r, codes, total).catch((error) =>
        console.error(`[montreal] cash ticket email failed for ${token}: ${error instanceof Error ? error.message : error}`),
      ),
    );
    return Response.json({ redirect: `/montreal/gracias?cash=${token}` });
  } catch (error) {
    console.error(`[montreal] cash redeem failed for ${token}: ${error instanceof Error ? error.message : error}`);
    return refused(undefined, 502);
  }
}
