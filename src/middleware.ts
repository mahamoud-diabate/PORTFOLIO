import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    const country = req.headers.get("x-vercel-ip-country") || "Local";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const location = city ? `${city}, ${country}` : country;
    const referer = req.headers.get("referer") || "Direct / Aucun";
    const userAgent = req.headers.get("user-agent") || "Inconnu";

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "👀 Nouvelle visite sur le Portfolio",
            color: 0x3b82f6,
            fields: [
              { name: "📍 Localisation", value: location, inline: true },
              { name: "🔗 Provenance", value: referer, inline: true },
              { name: "📱 Navigateur / Client", value: userAgent.slice(0, 100), inline: false },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
