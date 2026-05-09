"""
Procesa la salida del PASO 1 (Instagram Hashtag Scraper).
Lee leads/instagram/step1_output.json (lo que descargues de Apify)
y produce el input del PASO 2: lista de 50 usernames únicos.
"""
import json
from collections import OrderedDict

INPUT_FILE  = "leads/instagram/step1_output.json"
OUTPUT_FILE = "leads/instagram/step2_profiles_input.json"
LIMIT = 50

with open(INPUT_FILE, encoding="utf-8") as f:
    posts = json.load(f)

# Deduplicar por ownerUsername conservando el primer post por usuario
unique = OrderedDict()
for p in posts:
    u = p.get("ownerUsername") or p.get("ownerUserName")
    if not u or u in unique:
        continue
    unique[u] = {
        "username": u,
        "fullName": p.get("ownerFullName", ""),
        "ownerId": p.get("ownerId", ""),
        "samplePostUrl": p.get("url", ""),
        "fromHashtag": p.get("hashtag", ""),
    }
    if len(unique) >= LIMIT:
        break

usernames = list(unique.keys())
profiles_meta = list(unique.values())

# Guardar metadatos para fusionar después
with open("leads/instagram/step1_unique_profiles.json", "w", encoding="utf-8") as f:
    json.dump(profiles_meta, f, ensure_ascii=False, indent=2)

# Guardar input del paso 2
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump({"usernames": usernames}, f, ensure_ascii=False, indent=2)

print(f"✓ Posts leídos:        {len(posts)}")
print(f"✓ Usernames únicos:    {len(usernames)}")
print(f"✓ Input PASO 2:        {OUTPUT_FILE}")
print(f"✓ Metadatos paso 1:    leads/instagram/step1_unique_profiles.json")
print("\nPrimeros 10 usernames:")
for u in usernames[:10]:
    print(f"  - {u}")
