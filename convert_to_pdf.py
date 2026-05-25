import markdown
from weasyprint import HTML
import os

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

@page {
    margin: 2.5cm 2.5cm 2.5cm 2.5cm;
    size: A4;
}

body {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12pt;
    line-height: 1.8;
    color: #1a1a1a;
    max-width: 100%;
}

h1 {
    font-size: 20pt;
    font-weight: 700;
    color: #1a1a1a;
    border-bottom: 3px solid #1a1a1a;
    padding-bottom: 8px;
    margin-top: 0;
    margin-bottom: 20px;
}

h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #333333;
    margin-top: 28px;
    margin-bottom: 8px;
    background-color: #f0f0f0;
    padding: 6px 10px;
    border-left: 4px solid #1a1a1a;
}

h3 {
    font-size: 12pt;
    font-weight: 600;
    color: #444444;
    margin-top: 18px;
    margin-bottom: 6px;
}

p {
    margin: 0 0 10px 0;
}

strong {
    font-weight: 700;
    color: #1a1a1a;
}

em {
    font-style: italic;
    color: #555555;
}

blockquote {
    background-color: #fff8e1;
    border-left: 4px solid #f4b400;
    margin: 16px 0;
    padding: 10px 16px;
    color: #555;
    font-size: 10.5pt;
    font-style: italic;
}

ul, ol {
    margin: 8px 0 12px 0;
    padding-left: 24px;
}

li {
    margin-bottom: 4px;
}

hr {
    border: none;
    border-top: 1px solid #dddddd;
    margin: 24px 0;
}

code {
    background-color: #f5f5f5;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 10pt;
}
"""

files = [
    ("leccion_1_piloto_automatico_ejecutivo.md", "leccion_1_piloto_automatico_ejecutivo.pdf"),
    ("leccion_2_postergacion_sofisticada.md", "leccion_2_postergacion_sofisticada.pdf"),
    ("leccion_3_costo_oculto_no_decidir.md", "leccion_3_costo_oculto_no_decidir.pdf"),
    ("leccion_4_miedo_racional_vs_imaginado.md", "leccion_4_miedo_racional_vs_imaginado.pdf"),
    ("leccion_5_decision_esta_adentro.md", "leccion_5_decision_esta_adentro.pdf"),
]

base = "/home/user/Marco"

for md_file, pdf_file in files:
    md_path = os.path.join(base, md_file)
    pdf_path = os.path.join(base, pdf_file)

    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    html_body = markdown.markdown(md_content, extensions=["extra", "nl2br"])
    full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>{CSS}</style>
</head>
<body>{html_body}</body>
</html>"""

    HTML(string=full_html, base_url=base).write_pdf(pdf_path)
    print(f"✓ {pdf_file}")

print("Listo.")
