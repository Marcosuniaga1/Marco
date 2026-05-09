"""
Procesa la salida del PASO 2 (Instagram Profile Scraper).
Lee leads/instagram/step2_output.json y produce:
  - input del PASO 3 (lista de websites únicos)
  - profiles_enriched.json (datos consolidados pre-paso-3)
"""
import json
from urllib.parse import urlparse

INPUT_FILE     = "leads/instagram/step2_output.json"
STEP3_INPUT    = "leads/instagram/step3_contact_input.json"
ENRICHED_OUT   = "leads/instagram/profiles_enriched.json"

with open(INPUT_FILE, encoding="utf-8") as f:
    profiles = json.load(f)

enriched = []
websites = []
seen_domains = set()

for p in profiles:
    username  = p.get("username", "")
    full_name = p.get("fullName", "") or p.get("full_name", "")
    bio       = p.get("biography", "") or ""
    followers = p.get("followersCount") or p.get("edge_followed_by", {}).get("count", 0)
    website   = p.get("externalUrl", "") or p.get("external_url", "") or ""
    biz_email = p.get("businessEmail", "") or p.get("public_email", "") or ""
    biz_phone = p.get("businessPhoneNumber", "") or p.get("public_phone_number", "") or ""

    enriched.append({
        "username":         username,
        "fullName":         full_name,
        "bio":              bio,
        "followers":        followers,
        "website":          website,
        "businessEmail":    biz_email,
        "businessPhone":    biz_phone,
        "instagramLink":    f"https://instagram.com/{username}" if username else "",
        # Origen explícito de cada campo (para la columna de fuente en el Excel)
        "_src_username":      "instagram_profile_scraper",
        "_src_fullName":      "instagram_profile_scraper" if full_name else "pendiente",
        "_src_bio":           "instagram_profile_scraper" if bio else "pendiente",
        "_src_followers":     "instagram_profile_scraper",
        "_src_website":       "instagram_profile_scraper" if website else "pendiente",
        "_src_email":         "instagram_profile_scraper" if biz_email else "pendiente",
        "_src_phone":         "instagram_profile_scraper" if biz_phone else "pendiente",
    })

    # Acumular websites únicos por dominio para el paso 3
    if website:
        try:
            d = urlparse(website if website.startswith("http") else "https://" + website).netloc.lower().replace("www.", "")
        except Exception:
            d = website
        if d and d not in seen_domains:
            seen_domains.add(d)
            websites.append(website if website.startswith("http") else "https://" + website)

with open(ENRICHED_OUT, "w", encoding="utf-8") as f:
    json.dump(enriched, f, ensure_ascii=False, indent=2)

# Construir input PASO 3 solo si hay websites
if websites:
    with open(STEP3_INPUT, "w", encoding="utf-8") as f:
        json.dump({
            "startUrls":              [{"url": u} for u in websites],
            "maxRequestsPerStartUrl": 3,
            "maxDepth":               1,
            "considerChildFrames":    True
        }, f, ensure_ascii=False, indent=2)

print(f"✓ Perfiles leídos:       {len(profiles)}")
print(f"✓ Con email en bio:      {sum(1 for e in enriched if e['businessEmail'])}")
print(f"✓ Con teléfono en bio:   {sum(1 for e in enriched if e['businessPhone'])}")
print(f"✓ Con website en bio:    {sum(1 for e in enriched if e['website'])}")
print(f"✓ Websites únicos para paso 3: {len(websites)}")
print(f"✓ Datos enriquecidos:    {ENRICHED_OUT}")
print(f"✓ Input PASO 3:          {STEP3_INPUT}")

if not websites:
    print("\n⚠ Ningún perfil tiene website en bio. Saltea el PASO 3 y ejecuta build_instagram_excel.py directamente.")
