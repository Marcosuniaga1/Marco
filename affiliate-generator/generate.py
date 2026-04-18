#!/usr/bin/env python3
"""
Generador de Video de Marketing de Afiliación
Formato: 1080x1920 (9:16) | 45s | 30fps | H.264
Uso: python generate.py [output.mp4]
"""

import sys
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from moviepy.editor import VideoClip, concatenate_videoclips

# ══════════════════════════════════════════════════════════════════════════════
#  CONFIGURACIÓN  ←  CAMBIA ESTOS VALORES
# ══════════════════════════════════════════════════════════════════════════════
CFG = {
    "commission":   347,            # Monto de la comisión
    "name":         "Marco",        # Tu nombre
    "cta_keyword":  "SISTEMA",      # Palabra clave para comentarios
    "whatsapp":     "+1 555 123-4567",  # Tu número WhatsApp
}

# ══════════════════════════════════════════════════════════════════════════════
#  CONSTANTES
# ══════════════════════════════════════════════════════════════════════════════
W, H, FPS = 1080, 1920, 30

C = {
    "black":      (7,   7,   15),
    "dark_gray":  (26,  26,  46),
    "gold_dark":  (200, 169, 110),
    "white":      (255, 255, 255),
    "gold":       (255, 215, 0),
    "navy":       (0,   71,  171),
    "light_gray": (232, 232, 232),
    "brown_gold": (139, 111, 71),
    "dark_text":  (20,  20,  20),
}

# ══════════════════════════════════════════════════════════════════════════════
#  FUENTES
# ══════════════════════════════════════════════════════════════════════════════
def _font(name="arial", bold=False, size=40):
    candidates = []
    if name == "courier":
        candidates = [
            "C:/Windows/Fonts/courbd.ttf" if bold else "C:/Windows/Fonts/cour.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
        ]
    else:
        candidates = [
            "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()

# ══════════════════════════════════════════════════════════════════════════════
#  UTILIDADES DE DIBUJO
# ══════════════════════════════════════════════════════════════════════════════
def _bbox(draw, text, font):
    b = draw.textbbox((0, 0), text, font=font)
    return b[2] - b[0], b[3] - b[1]

def draw_centered(draw, text, cy, font, color, sw=2):
    tw, th = _bbox(draw, text, font)
    x = (W - tw) // 2
    y = cy - th // 2
    if sw:
        draw.text((x, y), text, font=font, fill=(0, 0, 0),
                  stroke_width=sw, stroke_fill=(0, 0, 0))
    draw.text((x, y), text, font=font, fill=color)

def draw_wrapped(draw, text, cy, font, color, max_w=W - 120, sw=2, leading=18):
    words = text.split()
    lines, cur = [], []
    for w in words:
        test = " ".join(cur + [w])
        if _bbox(draw, test, font)[0] <= max_w:
            cur.append(w)
        else:
            if cur:
                lines.append(" ".join(cur))
            cur = [w]
    if cur:
        lines.append(" ".join(cur))
    lh = _bbox(draw, "Ay", font)[1] + leading
    y = cy - (len(lines) * lh) // 2
    for line in lines:
        tw = _bbox(draw, line, font)[0]
        x = (W - tw) // 2
        if sw:
            draw.text((x, y), line, font=font, fill=(0, 0, 0),
                      stroke_width=sw, stroke_fill=(0, 0, 0))
        draw.text((x, y), line, font=font, fill=color)
        y += lh

def alpha_color(color, a):
    return tuple(int(c * min(1.0, max(0.0, a))) for c in color)

def ease_out(t, d=1.0):
    x = min(1.0, max(0.0, t / d))
    return 1 - (1 - x) ** 3

def ease_in_out(t, d=1.0):
    x = min(1.0, max(0.0, t / d))
    return x * x * (3 - 2 * x)

def np_frame(img):
    return np.array(img.convert("RGB"))

# ══════════════════════════════════════════════════════════════════════════════
#  BLOQUE 1 – HOOK  (0-3 s)
# ══════════════════════════════════════════════════════════════════════════════
def block1():
    amount   = CFG["commission"]
    f_label  = _font("arial",   bold=True,  size=52)
    f_count  = _font("courier", bold=True,  size=110)
    f_sub    = _font("arial",   bold=False, size=42)

    def frame(t):
        img  = Image.new("RGB", (W, H), C["navy"])
        draw = ImageDraw.Draw(img)

        # Subtle vignette
        for iy in range(0, H, 4):
            v = int(20 * (1 - abs(iy / H - 0.5) * 2))
            draw.rectangle([0, iy, W, iy + 4], fill=tuple(max(0, c - v) for c in C["navy"]))

        draw_centered(draw, "Mi primer comisión fue", H // 2 - 210, f_label, C["white"], sw=1)

        # Counter
        current = int(amount * ease_out(t, 1.5)) if t < 1.5 else amount
        txt     = f"${current:,}"

        # Glow after counter finishes
        if t > 1.5:
            glow = ease_in_out(t - 1.5, 0.6)
            for dx, dy in [(-4,0),(4,0),(0,-4),(0,4),(-3,-3),(3,3)]:
                tw, _ = _bbox(draw, txt, f_count)
                draw.text(((W - tw) // 2 + dx, H // 2 - 70 + dy), txt,
                          font=f_count, fill=alpha_color(C["gold"], glow * 0.35))

        draw_centered(draw, txt, H // 2, f_count, C["gold"], sw=2)
        draw_centered(draw, "en 3 días sin followers",
                      H // 2 + 140, f_sub, alpha_color(C["white"], ease_out(t, 0.5)), sw=1)
        return np_frame(img)

    return VideoClip(frame, duration=3)


# ══════════════════════════════════════════════════════════════════════════════
#  BLOQUE 2 – PROBLEMA  (3-8 s)
# ══════════════════════════════════════════════════════════════════════════════
def block2():
    f_main = _font("arial", bold=True,  size=46)
    f_sub  = _font("arial", bold=False, size=36)

    LINES = [
        ("El problema no es que no tengas potencial...", f_main, C["dark_text"], 0.0, 1.5),
        ("Es que estás en el lugar equivocado",          f_main, (160, 120, 0),  1.5, 1.5),
        ("(Plataformas falsas, cursos caros, métodos que no funcionan)",
                                                          f_sub,  C["dark_text"], 3.0, 2.0),
    ]
    Y = [H // 2 - 280, H // 2 - 50, H // 2 + 230]

    def frame(t):
        img  = Image.new("RGB", (W, H), C["light_gray"])
        draw = ImageDraw.Draw(img)
        draw.rectangle([0, 0, W, 14], fill=C["gold"])
        draw.rectangle([0, H - 14, W, H], fill=C["gold"])

        for i, (text, font, color, start, _dur) in enumerate(LINES):
            a = ease_out(t - start, 0.4)
            if a <= 0:
                continue
            draw_wrapped(draw, text, Y[i], font, alpha_color(color, a), sw=1)

        return np_frame(img)

    return VideoClip(frame, duration=5)


# ══════════════════════════════════════════════════════════════════════════════
#  BLOQUE 3 – TRANSICIÓN  (8-12 s)
# ══════════════════════════════════════════════════════════════════════════════
def block3():
    def frame(t):
        img  = Image.new("RGB", (W, H), C["black"])
        draw = ImageDraw.Draw(img)

        fade = ease_out(t, 0.8)
        zoom = int(68 + max(0, (1 - ease_out(t, 1.2))) * 22)
        font = _font("arial", bold=True, size=zoom)

        draw_centered(draw, "Aquí está el secreto...", H // 2, font,
                      alpha_color(C["gold"], fade), sw=2)
        return np_frame(img)

    return VideoClip(frame, duration=4)


# ══════════════════════════════════════════════════════════════════════════════
#  BLOQUE 4 – SISTEMA 3 PASOS  (12-30 s)
# ══════════════════════════════════════════════════════════════════════════════
def _step_clip(num, title, subtitle, bg, dur=6):
    f_num   = _font("courier", bold=True,  size=140)
    f_title = _font("arial",   bold=True,  size=48)
    f_sub   = _font("arial",   bold=False, size=36)
    txt_col = C["dark_text"] if bg == C["light_gray"] else C["white"]

    def frame(t):
        img  = Image.new("RGB", (W, H), bg)
        draw = ImageDraw.Draw(img)

        # Number with glow
        for dx, dy in [(-5,0),(5,0),(0,-5),(0,5)]:
            tw, _ = _bbox(draw, str(num), f_num)
            draw.text(((W - tw) // 2 + dx, H // 2 - 370 + dy),
                      str(num), font=f_num, fill=alpha_color(C["gold"], 0.3))
        draw_centered(draw, str(num), H // 2 - 300, f_num, C["gold"], sw=3)

        a  = ease_out(t, 0.5)
        a2 = ease_out(t - 0.3, 0.5)

        draw_wrapped(draw, title,    H // 2 + 10,  f_title, alpha_color(txt_col, a),         sw=2)
        draw_wrapped(draw, subtitle, H // 2 + 220, f_sub,   alpha_color(C["gold_dark"], a2), sw=1)

        # Dot indicator
        for i in range(3):
            cx = W // 2 - 40 + i * 40
            cy = H - 130
            r  = 14 if i == num - 1 else 8
            draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                         fill=C["gold"] if i == num - 1 else (80, 80, 80))

        return np_frame(img)

    return VideoClip(frame, duration=dur)

def block4():
    return concatenate_videoclips([
        _step_clip(1,
            "Identifica a personas que ya quieren lo que ofreces",
            "(No tienes que buscar, ellos vienen solos)", C["navy"]),
        _step_clip(2,
            "Presentas la oportunidad en la forma correcta",
            "(Script simple, sin complicaciones)", C["brown_gold"]),
        _step_clip(3,
            "Recibe comisiones automáticas",
            "(Mientras duermes, sin inventario, sin estrés)", C["dark_gray"]),
    ])


# ══════════════════════════════════════════════════════════════════════════════
#  BLOQUE 5 – OBJECIÓN  (30-38 s)
# ══════════════════════════════════════════════════════════════════════════════
def block5():
    f_q   = _font("arial", bold=True,  size=52)
    f_ans = _font("arial", bold=True,  size=80)
    f_note= _font("arial", bold=False, size=36)

    def frame(t):
        img  = Image.new("RGB", (W, H), C["light_gray"])
        draw = ImageDraw.Draw(img)
        draw.rectangle([0, 0, W, 14], fill=C["gold"])
        draw.rectangle([0, H - 14, W, H], fill=C["gold"])

        if t < 2:
            a = ease_out(t, 0.4)
            draw_centered(draw, "¿Pero cuánto cuesta?", H // 2, f_q,
                          alpha_color(C["dark_text"], a), sw=1)
        elif t < 5:
            draw_centered(draw, "¿Pero cuánto cuesta?", H // 2 - 200, f_q, C["dark_text"], sw=1)
            a = ease_out(t - 2, 0.4)
            sz = int(80 + max(0, (1 - ease_out(t - 2, 0.5))) * 28)
            draw_centered(draw, "La afiliación es GRATIS", H // 2 + 40,
                          _font("arial", bold=True, size=sz), alpha_color(C["gold"], a), sw=2)
        else:
            draw_centered(draw, "¿Pero cuánto cuesta?",  H // 2 - 300, f_q,   C["dark_text"], sw=1)
            draw_centered(draw, "La afiliación es GRATIS", H // 2 - 120, f_ans, C["gold"],     sw=2)
            a = ease_out(t - 5, 0.5)
            draw_wrapped(draw, "Pagas solo cuando decidas empezar a ganar",
                         H // 2 + 140, f_note, alpha_color(C["dark_text"], a), sw=1)

        return np_frame(img)

    return VideoClip(frame, duration=8)


# ══════════════════════════════════════════════════════════════════════════════
#  BLOQUE 6 – CTA URGENCIA  (38-45 s)
# ══════════════════════════════════════════════════════════════════════════════
def block6():
    kw    = CFG["cta_keyword"]
    phone = CFG["whatsapp"]
    name  = CFG["name"]

    f_cta    = _font("arial",   bold=True,  size=56)
    f_urgent = _font("arial",   bold=True,  size=42)
    f_phone  = _font("courier", bold=True,  size=66)
    f_sign   = _font("arial",   bold=False, size=34)

    CTA_LINES = [
        (f"ESCRIBE '{kw}'",      C["gold"],  0.0),
        ("EN COMENTARIOS",       C["white"], 0.3),
        ("o mándame DM al",      C["white"], 0.6),
        ("WhatsApp",             C["gold"],  0.9),
    ]
    URGENT = [
        ("Los primeros 20 quedan",  2.0),
        ("en el grupo privado",     2.0),
        ("Después cierra.",         2.4),
    ]

    def frame(t):
        img  = Image.new("RGB", (W, H), C["black"])
        draw = ImageDraw.Draw(img)

        # Pulsing border
        glow = 0.5 + 0.5 * math.sin(t * 3.5)
        bc   = alpha_color(C["gold"], glow)
        for thick, color in [(8, bc), (3, C["gold"])]:
            draw.rectangle([0, 0, W, thick],       fill=color)
            draw.rectangle([0, H - thick, W, H],   fill=color)
            draw.rectangle([0, 0, thick, H],        fill=color)
            draw.rectangle([W - thick, 0, W, H],    fill=color)

        # CTA lines
        y = H // 2 - 400
        for text, color, delay in CTA_LINES:
            a = ease_out(t - delay, 0.35)
            draw_centered(draw, text, y, f_cta, alpha_color(color, a), sw=2)
            y += 92

        # Urgency
        y = H // 2 + 50
        for text, delay in URGENT:
            a = ease_out(t - delay, 0.4)
            draw_centered(draw, text, y, f_urgent, alpha_color(C["white"], a), sw=1)
            y += 58

        # WhatsApp number with pulse
        if t > 3.5:
            pulse = 1.0 + 0.04 * math.sin(t * 5)
            sz    = int(66 * pulse)
            a     = ease_out(t - 3.5, 0.5)
            draw_centered(draw, phone, H // 2 + 280,
                          _font("courier", bold=True, size=sz),
                          alpha_color(C["gold"], a), sw=2)

        # Firma
        if t > 5.2:
            a = ease_out(t - 5.2, 0.5)
            draw_centered(draw, f"Soy {name}. Te espero allá.", H // 2 + 420,
                          f_sign, alpha_color(C["white"], a), sw=1)

        return np_frame(img)

    return VideoClip(frame, duration=7)


# ══════════════════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════════════════
def generate(output="affiliate_video.mp4"):
    print("🎬  Generando video de marketing de afiliación...")
    print(f"    Comisión: ${CFG['commission']} | Nombre: {CFG['name']} "
          f"| CTA: '{CFG['cta_keyword']}' | WhatsApp: {CFG['whatsapp']}")

    steps = [
        ("HOOK",            block1),
        ("PROBLEMA",        block2),
        ("TRANSICIÓN",      block3),
        ("SISTEMA 3 PASOS", block4),
        ("OBJECIÓN",        block5),
        ("CTA URGENCIA",    block6),
    ]

    clips = []
    for i, (label, fn) in enumerate(steps, 1):
        print(f"  [{i}/{len(steps)}] {label}...")
        clips.append(fn())

    print("  ✂️   Concatenando bloques...")
    final = concatenate_videoclips(clips)
    print(f"  ⏱️   Duración total: {final.duration:.1f}s")

    print(f"  💾  Exportando → {output}")
    final.write_videofile(
        output,
        fps=FPS,
        codec="libx264",
        audio=False,
        preset="medium",
        ffmpeg_params=["-crf", "23", "-pix_fmt", "yuv420p"],
        logger="bar",
    )

    print(f"\n✅  Listo: {output}")
    print(f"    {W}×{H} | {FPS}fps | H.264 | TikTok / Instagram / YouTube Shorts")


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "affiliate_video.mp4"
    generate(out)
