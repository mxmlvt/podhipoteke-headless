import { NextRequest, NextResponse } from "next/server";

interface LeadBody {
  source?: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
  message?: string;
  tool_data?: Record<string, unknown>;
}

function validate(data: Partial<LeadBody>): string | null {
  if (!data.name?.trim())  return "Imię jest wymagane";
  if (!data.phone?.trim()) return "Numer telefonu jest wymagany";
  if (!data.email?.trim()) return "Adres e-mail jest wymagany";

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!emailOk) return "Nieprawidłowy adres e-mail";

  const phoneClean = data.phone.replace(/\s+/g, "");
  const phoneOk = /^(\+48)?[0-9]{9}$/.test(phoneClean);
  if (!phoneOk) return "Nieprawidłowy numer telefonu (format: 9 cyfr lub +48...)";

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: Partial<LeadBody> = await request.json();
    console.log("[leads] received submission:", JSON.stringify({ source: body.source, name: body.name, phone: body.phone?.slice(0, 4) + "***" }));

    const error = validate(body);
    if (error) {
      console.log("[leads] validation failed:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    const wpUrl = process.env.WORDPRESS_API_URL;
    console.log("[leads] WORDPRESS_API_URL set:", !!wpUrl, wpUrl ? wpUrl.slice(0, 30) + "..." : "NOT SET");

    if (!wpUrl) {
      // WP plugin not yet configured – log lead to server console and return success
      console.log("[leads] WORDPRESS_API_URL not set – lead captured in logs:", JSON.stringify(body));
      return NextResponse.json({ success: true, id: 0 }, { status: 201 });
    }

    const wpEndpoint = `${wpUrl}/wp-json/ph24/v1/leads`;
    console.log("[leads] posting to WP:", wpEndpoint);

    const wpResponse = await fetch(wpEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    console.log("[leads] WP response status:", wpResponse.status);

    if (!wpResponse.ok) {
      const wpError = await wpResponse.json().catch(() => ({})) as { message?: string };
      console.error("[leads] WP error response:", JSON.stringify(wpError));
      return NextResponse.json(
        { error: wpError.message ?? "Błąd zapisu danych. Spróbuj ponownie." },
        { status: wpResponse.status }
      );
    }

    const data = await wpResponse.json();
    console.log("[leads] WP success, lead id:", data?.id);
    return NextResponse.json(data, { status: 201 });

  } catch (err) {
    console.error("[leads] submission error:", err);
    return NextResponse.json(
      { error: "Serwis chwilowo niedostępny. Spróbuj ponownie lub zadzwoń: 577 873 616" },
      { status: 500 }
    );
  }
}
