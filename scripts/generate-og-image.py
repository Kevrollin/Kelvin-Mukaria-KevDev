"""
Regenerates public/og-image.png (1200x630 social share card) from brand
colors and content already used on the site. Requires Pillow: pip install pillow

Run from the repo root: python3 scripts/generate-og-image.py
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")

W, H = 1200, 630
BG = "#fcfcfc"
FG = "#0f1729"
MUTED = "#65758b"
ACCENT = "#00a2ad"
GREEN = "#16a34a"

FONT_DIR = "/usr/share/fonts/truetype/liberation/"


def font(name, size):
    return ImageFont.truetype(FONT_DIR + name, size)


f_name = font("LiberationSans-Bold.ttf", 92)
f_tagline = font("LiberationSans-Regular.ttf", 34)
f_badge = font("LiberationSans-Bold.ttf", 22)
f_url = font("LiberationSans-Bold.ttf", 26)
f_skill = font("LiberationSans-Regular.ttf", 22)

img = Image.new("RGB", (W, H), BG)

# Decorative blurred accent blobs (echoes the hero section's background blobs)
blob_layer = Image.new("RGB", (W, H), BG)
blob_draw = ImageDraw.Draw(blob_layer)
blob_draw.ellipse([W - 420, -180, W + 180, 420], fill=ACCENT)
blob_draw.ellipse([-200, H - 320, 260, H + 220], fill="#1672f3")
blob_layer = blob_layer.filter(ImageFilter.GaussianBlur(90))
img = Image.blend(img, blob_layer, 0.10)
draw = ImageDraw.Draw(img)

PAD_X = 84

# Avatar
avatar = Image.open(os.path.join(PUBLIC, "kelvin-avatar.png")).convert("RGBA")
avatar_size = 112
avatar = avatar.resize((avatar_size, avatar_size), Image.LANCZOS)
mask = Image.new("L", (avatar_size, avatar_size), 0)
ImageDraw.Draw(mask).ellipse([0, 0, avatar_size, avatar_size], fill=255)
ring = avatar_size + 8
ring_img = Image.new("RGBA", (ring, ring), (0, 0, 0, 0))
ImageDraw.Draw(ring_img).ellipse([0, 0, ring, ring], outline=ACCENT, width=3)
avatar_y = 78
img.paste(ring_img, (PAD_X - 4, avatar_y - 4), ring_img)
img.paste(avatar, (PAD_X, avatar_y), mask)

# Availability badge (top right)
badge_text = "OPEN FOR COLLABORATION"
bbox = draw.textbbox((0, 0), badge_text, font=f_badge)
bw, bh = bbox[2] - bbox[0], bbox[3] - bbox[1]
badge_pad_x, badge_pad_y = 18, 12
badge_w = bw + badge_pad_x * 2 + 22
badge_h = bh + badge_pad_y * 2
badge_x = W - PAD_X - badge_w
badge_y = 80
draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=badge_h // 2, fill="#e8f9ee")
dot_r = 6
dot_cx = badge_x + badge_pad_x + dot_r
dot_cy = badge_y + badge_h // 2
draw.ellipse([dot_cx - dot_r, dot_cy - dot_r, dot_cx + dot_r, dot_cy + dot_r], fill=GREEN)
draw.text((dot_cx + dot_r + 10, badge_y + badge_pad_y - bbox[1]), badge_text, font=f_badge, fill="#15803d")

# Name
name_y = 218
draw.text((PAD_X, name_y), "Kelvin", font=f_name, fill=FG)
w1 = draw.textlength("Kelvin ", font=f_name)
draw.text((PAD_X + w1, name_y), "Mukaria", font=f_name, fill=ACCENT)

# Tagline
tagline = "Software Engineer  ·  AI & Automation Builder  ·  Entrepreneur"
draw.text((PAD_X, name_y + 118), tagline, font=f_tagline, fill=MUTED)

# Location + role line
role_line = "Co-founder & COO, Ardena Platform Africa   —   Nakuru & Meru, Kenya"
draw.text((PAD_X, name_y + 170), role_line, font=f_tagline, fill=FG)

# Skill chips
skills = ["React", "Node.js", "TypeScript", "Python", "AI Automation"]
chip_x = PAD_X
chip_y = name_y + 240
for s in skills:
    bbox = draw.textbbox((0, 0), s, font=f_skill)
    sw, sh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    chip_w = sw + 34
    chip_h = 46
    draw.rounded_rectangle([chip_x, chip_y, chip_x + chip_w, chip_y + chip_h], radius=chip_h // 2, outline="#d8dee7", width=2, fill="#f2f4f7")
    draw.text((chip_x + 17, chip_y + (chip_h - sh) // 2 - bbox[1]), s, font=f_skill, fill=FG)
    chip_x += chip_w + 14

# Bottom divider + URL
line_y = H - 90
draw.line([(PAD_X, line_y), (W - PAD_X, line_y)], fill="#e2e6ec", width=2)
draw.text((PAD_X, line_y + 26), "kelvinmukaria.vercel.app", font=f_url, fill=ACCENT)

out_path = os.path.join(PUBLIC, "og-image.png")
img.save(out_path, "PNG", optimize=True)
print(f"saved {out_path}")
