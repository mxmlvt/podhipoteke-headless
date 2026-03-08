import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get("slug");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
    return NextResponse.json({ revalidated: true, path: `/blog/${slug}` });
  }

  // Bez sluga – odświeża cały blog
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/blog");
  return NextResponse.json({ revalidated: true, path: "all" });
}

// Obsługa GET (dla testowania z przeglądarki)
export async function GET(req: NextRequest) {
  return POST(req);
}
