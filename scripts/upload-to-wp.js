#!/usr/bin/env node
/**
 * upload-to-wp.js
 * Wgrywa / aktualizuje artykuły z content/artykuly/rewrite-*.html do WordPressa.
 *
 * Konfiguracja:
 *   WP_URL          – adres bazy WP, np. https://srv106163.seohost.com.pl
 *   WP_USER         – login admina WP
 *   WP_APP_PASSWORD – Application Password (Użytkownicy → Twój profil → Hasła aplikacji)
 *
 * Uruchomienie:
 *   WP_URL=https://... WP_USER=admin WP_APP_PASSWORD="xxxx xxxx xxxx" node scripts/upload-to-wp.js
 *
 * Opcjonalne flagi:
 *   --dry-run   – tylko pokazuje co by zrobiło, nic nie wysyła
 *   --file rewrite-01-xxx.html  – wgrywa tylko jeden plik
 *   --status draft              – wgrywa jako szkic zamiast publish
 */

const fs   = require("fs");
const path = require("path");

// ── Konfiguracja ──────────────────────────────────────────────────────────────
const WP_URL          = (process.env.WP_URL || "https://srv106163.seohost.com.pl").replace(/\/$/, "");
const WP_USER         = process.env.WP_USER;
const WP_APP_PASS     = process.env.WP_APP_PASSWORD;
const NEXT_URL        = (process.env.NEXT_URL || "https://podhipoteke24.pl").replace(/\/$/, "");
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "ph24_rv_k9mX2nQpL8wR";

if (!WP_USER || !WP_APP_PASS) {
  console.error("❌  Brak WP_USER lub WP_APP_PASSWORD w środowisku.");
  console.error("    Uruchom: WP_USER=admin WP_APP_PASSWORD='xxxx xxxx' node scripts/upload-to-wp.js");
  process.exit(1);
}

const AUTH    = "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString("base64");
const API     = `${WP_URL}/wp-json/wp/v2`;
const DIR     = path.join(__dirname, "../content/artykuly");

// ── Flagi CLI ─────────────────────────────────────────────────────────────────
const args     = process.argv.slice(2);
const DRY_RUN  = args.includes("--dry-run");
const STATUS   = args.includes("--status") ? args[args.indexOf("--status") + 1] : "publish";
const ONLY_FILE = args.includes("--file")  ? args[args.indexOf("--file") + 1]   : null;

// ── Parser pliku rewrite ──────────────────────────────────────────────────────
function parseRewriteFile(raw) {
  const line = (marker) => {
    const m = raw.match(new RegExp(`<!-- ${marker} -->\\r?\\n([^\\n]+)`));
    return m ? m[1].trim() : "";
  };

  const contentStart = raw.indexOf("<!-- CONTENT -->");
  const content = contentStart !== -1
    ? raw.slice(contentStart + "<!-- CONTENT -->".length).trim()
    : "";

  return {
    metaTitle : line("META TITLE"),
    metaDesc  : line("META DESCRIPTION"),
    slug      : line("URL SLUG"),
    content,
  };
}

// ── REST API helpers ──────────────────────────────────────────────────────────
async function wpGet(path) {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: AUTH } });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json();
}

async function wpPost(path, body, method = "POST") {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `${method} ${path} → ${res.status}`);
  return json;
}

async function findPostBySlug(slug) {
  const posts = await wpGet(`/posts?slug=${encodeURIComponent(slug)}&_fields=id,slug,title,link`);
  return posts[0] || null;
}

async function revalidateSlug(slug) {
  try {
    const url = `${NEXT_URL}/api/revalidate?secret=${REVALIDATE_SECRET}&slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, { method: "POST" });
    if (res.ok) {
      console.log(`   🔄 Revalidated → /blog/${slug}`);
    } else {
      console.warn(`   ⚠️  Revalidate failed: ${res.status}`);
    }
  } catch {
    console.warn(`   ⚠️  Revalidate – brak połączenia z ${NEXT_URL}`);
  }
}

// ── Główna logika ─────────────────────────────────────────────────────────────
async function uploadFile(file) {
  const raw    = fs.readFileSync(path.join(DIR, file), "utf-8");
  const parsed = parseRewriteFile(raw);

  if (!parsed.slug) {
    console.warn(`  ⚠️  Brak URL SLUG – pomijam.`);
    return;
  }
  if (!parsed.content) {
    console.warn(`  ⚠️  Brak treści – pomijam.`);
    return;
  }

  console.log(`\n📄 ${file}`);
  console.log(`   slug:  ${parsed.slug}`);
  console.log(`   title: ${parsed.metaTitle || "(brak – zostanie użyty tytuł WP)"}`);

  if (DRY_RUN) {
    console.log("   [dry-run] pominięto wysyłanie.");
    return;
  }

  const existing = await findPostBySlug(parsed.slug);

  const body = {
    slug    : parsed.slug,
    content : parsed.content,
    status  : STATUS,
    // Yoast SEO meta (wymaga PHP snippeta – patrz README lub comments w skrypcie)
    meta: {
      _yoast_wpseo_title    : parsed.metaTitle,
      _yoast_wpseo_metadesc : parsed.metaDesc,
    },
  };

  // Tytuł posta w WP = meta title (bez "- PODHIPOTEKE24.PL" na końcu jeśli jest)
  body.title = parsed.metaTitle.replace(/\s*[-–|]\s*PODHIPOTEKE24\.PL\s*$/i, "").trim()
    || parsed.slug.replace(/-/g, " ");

  try {
    if (existing) {
      const updated = await wpPost(`/posts/${existing.id}`, body, "PUT");
      console.log(`   ✅ Zaktualizowano → ${updated.link}`);
    } else {
      const created = await wpPost("/posts", body);
      console.log(`   ✅ Utworzono     → ${created.link}`);
    }
    await revalidateSlug(parsed.slug);
  } catch (err) {
    console.error(`   ❌ Błąd: ${err.message}`);
  }
}

async function main() {
  console.log(`🔗 WP: ${WP_URL}`);
  console.log(`👤 User: ${WP_USER}`);
  if (DRY_RUN)  console.log("🧪 Tryb DRY-RUN – nic nie zostanie wysłane\n");
  if (STATUS !== "publish") console.log(`📝 Status postów: ${STATUS}\n`);

  // Pobierz listę plików
  let files = fs.readdirSync(DIR)
    .filter(f => f.startsWith("rewrite-") && f.endsWith(".html"))
    .sort();

  if (ONLY_FILE) {
    files = files.filter(f => f === ONLY_FILE);
    if (!files.length) {
      console.error(`❌ Plik "${ONLY_FILE}" nie istnieje w ${DIR}`);
      process.exit(1);
    }
  }

  console.log(`📁 Znaleziono ${files.length} plik(ów) do przetworzenia`);

  for (const file of files) {
    await uploadFile(file);
  }

  console.log("\n✔  Gotowe.");
}

main().catch(err => {
  console.error("Nieoczekiwany błąd:", err);
  process.exit(1);
});
