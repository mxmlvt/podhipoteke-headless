const fs   = require("fs");
const path = require("path");

const AUTH   = "Basic " + Buffer.from("mx:T4hA QlVc uFqe cTSB N783 v9nB").toString("base64");
const API    = "https://srv106163.seohost.com.pl/wp-json/wp/v2";
const NEXT   = "https://podhipoteke24.pl";
const SECRET = "ph24_rv_k9mX2nQpL8wR";
const DIR    = path.join(__dirname, "../content/artykuly");

// Upload only batch 2 files (rewrite-21 through rewrite-53)
const PATTERN = /^rewrite-(2[1-9]|[3-4]\d|5[0-3])-.*\.html$/;

function parseFile(raw) {
  const line = (marker) => {
    const m = raw.match(new RegExp(`<!-- ${marker} -->\\r?\\n([^\\n]+)`));
    return m ? m[1].trim() : "";
  };
  const ci = raw.indexOf("<!-- CONTENT -->");
  return {
    metaTitle: line("META TITLE"),
    metaDesc:  line("META DESCRIPTION"),
    slug:      line("URL SLUG"),
    content:   ci !== -1 ? raw.slice(ci + 16).trim() : "",
  };
}

async function wpGet(p) {
  const r = await fetch(API + p, { headers: { Authorization: AUTH } });
  return r.json();
}
async function wpPost(p, b, m = "POST") {
  const r = await fetch(API + p, {
    method: m,
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    body: JSON.stringify(b),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.message || `${m} ${p} → ${r.status}`);
  return j;
}

async function main() {
  const files = fs.readdirSync(DIR)
    .filter(f => PATTERN.test(f))
    .sort();

  console.log(`Pliki do wgrania: ${files.length}\n`);

  for (const file of files) {
    const p = parseFile(fs.readFileSync(path.join(DIR, file), "utf-8"));
    if (!p.slug || !p.content) { console.log(`⚠️  SKIP: ${file}`); continue; }

    process.stdout.write(`${p.slug} ... `);
    const existing = (await wpGet(`/posts?slug=${encodeURIComponent(p.slug)}&_fields=id`))[0];
    const body = {
      slug:    p.slug,
      content: p.content,
      status:  "publish",
      title:   p.metaTitle.replace(/\s*[-–|]\s*PODHIPOTEKE24\.PL\s*$/i, "").trim() || p.slug,
      meta: { _yoast_wpseo_title: p.metaTitle, _yoast_wpseo_metadesc: p.metaDesc },
    };
    try {
      if (existing) { await wpPost(`/posts/${existing.id}`, body, "PUT"); process.stdout.write("✅ "); }
      else           { await wpPost("/posts", body);                       process.stdout.write("🆕 "); }
      await fetch(`${NEXT}/api/revalidate?secret=${SECRET}&slug=${encodeURIComponent(p.slug)}`, { method: "POST" });
      console.log("🔄");
    } catch (e) {
      console.log("❌", e.message);
    }
  }
  console.log("\nGotowe!");
}

main().catch(console.error);
