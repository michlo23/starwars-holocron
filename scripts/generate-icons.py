#!/usr/bin/env python3
"""Generate Star Wars themed icons for sidebar categories and eras."""

import os
import sys
import json
import time
import base64
import urllib.request
import urllib.error

API_KEY = open(os.path.expanduser("~/.factory/openai-api-key")).read().strip()
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "icons")
os.makedirs(OUT_DIR, exist_ok=True)

STYLE = "Star Wars concept art icon, dark background (#0d0d0f), glowing amber/gold accents, cinematic sci-fi style, clean minimal icon design, no text, no letters, square format, suitable as a small navigation icon"

ICONS = {
    # Categories
    "cat-character": "A stylized silhouette of a hooded figure holding a lightsaber, mysterious Force user",
    "cat-battle": "Two crossed lightsabers with energy sparks, epic battle symbol",
    "cat-ship": "A sleek starship silhouette seen from above, Star Destroyer style",
    "cat-planet": "A planet with rings and a glowing atmosphere, seen from space",
    "cat-lore": "An ancient glowing holocron cube emitting amber light, Jedi artifact",
    "cat-timeline": "A spiral galaxy with a glowing timeline path through it",
    "cat-scene": "A cinematic film frame with a lightsaber duel silhouette inside",
    # Eras
    "era-old-republic": "An ancient crumbling Jedi temple with amber glowing runes",
    "era-prequel": "The Jedi Temple on Coruscant at sunset, golden spires",
    "era-clone-wars": "A clone trooper helmet in amber lighting, battle-worn",
    "era-imperial": "The Imperial crest/symbol glowing ominously in amber",
    "era-rebellion": "The Rebel Alliance symbol glowing in amber against dark space",
    "era-new-republic": "A rising sun behind a New Republic cruiser",
    "era-first-order": "The First Order symbol, sharp angular, red and amber glow",
    "era-legends": "An ancient star map with glowing constellations, mystical",
    # Menu
    "menu-hamburger": "Three horizontal glowing amber lightsaber blades stacked vertically, menu icon style",
}

def generate_icon(name, description):
    outpath = os.path.join(OUT_DIR, f"{name}.webp")
    if os.path.exists(outpath):
        print(f"  SKIP {name} (exists)")
        return True

    prompt = f"{STYLE}. Subject: {description}"
    print(f"  Generating {name}...")

    body = json.dumps({
        "model": "gpt-image-1",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024",
        "quality": "low",
        "output_format": "webp",
    }).encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
    )

    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read())
            b64 = data["data"][0].get("b64_json")
            if b64:
                with open(outpath, "wb") as f:
                    f.write(base64.b64decode(b64))
                size_kb = os.path.getsize(outpath) / 1024
                print(f"  ✅ {name} ({size_kb:.0f}KB)")
                return True
            else:
                url = data["data"][0].get("url")
                if url:
                    urllib.request.urlretrieve(url, outpath)
                    size_kb = os.path.getsize(outpath) / 1024
                    print(f"  ✅ {name} ({size_kb:.0f}KB)")
                    return True
        except urllib.error.HTTPError as e:
            err = e.read().decode() if e.fp else str(e)
            print(f"  ⚠️ Attempt {attempt+1} failed: {err[:200]}")
            if e.code == 429:
                time.sleep(10)
            else:
                time.sleep(3)
        except Exception as e:
            print(f"  ⚠️ Attempt {attempt+1} error: {e}")
            time.sleep(3)

    print(f"  ❌ FAILED {name}")
    return False

if __name__ == "__main__":
    total = len(ICONS)
    success = 0
    print(f"Generating {total} icons...\n")
    for name, desc in ICONS.items():
        if generate_icon(name, desc):
            success += 1
        time.sleep(1)  # rate limit buffer
    print(f"\nDone: {success}/{total} icons generated")
