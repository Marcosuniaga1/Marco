#!/usr/bin/env bash
# ==========================================================================
#  AgentKit — Demos de Agentes WhatsApp con IA
#  Equivalente a demo.bat para Git Bash (Windows), WSL, macOS y Linux.
#  Uso:  bash demo.sh   ó   ./demo.sh
# ==========================================================================

set -u
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TESTS_DIR="$SCRIPT_DIR/tests"

# ── Buscar Python ─────────────────────────────────────────────────────────
PYTHON_CMD=""
if command -v python3 >/dev/null 2>&1; then
  PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON_CMD="python"
elif command -v py >/dev/null 2>&1; then
  PYTHON_CMD="py"
fi

# ── Abrir el navegador según el sistema ─────────────────────────────────────
open_browser() {
  local target="$1"
  if command -v xdg-open >/dev/null 2>&1; then       # Linux
    xdg-open "$target" >/dev/null 2>&1 &
  elif command -v open >/dev/null 2>&1; then          # macOS
    open "$target" >/dev/null 2>&1 &
  elif command -v start >/dev/null 2>&1; then         # Git Bash en Windows
    start "" "$target" >/dev/null 2>&1 &
  elif command -v cmd.exe >/dev/null 2>&1; then       # WSL
    cmd.exe /c start "" "$target" >/dev/null 2>&1 &
  else
    echo "  No pude abrir el navegador automaticamente."
    echo "  Abre manualmente: $target"
  fi
}

pause() { read -rp "  Presiona ENTER para continuar..." _; }

# ── Demos en consola (Python) ───────────────────────────────────────────────
run_py_console() {
  local script="$1"
  if [ -z "$PYTHON_CMD" ]; then
    echo "  ERROR: Python no encontrado. Instala desde python.org"
    pause; return
  fi
  "$PYTHON_CMD" "$TESTS_DIR/$script"
  echo; echo "  Demo finalizado."; pause
}

# ── Demos con IA real (servidor Claude) ─────────────────────────────────────
run_ai() {
  local demo="$1"
  if [ -z "$PYTHON_CMD" ]; then
    echo "  ERROR: Python no encontrado. Instala desde python.org"
    pause; return
  fi
  if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
    echo
    echo "  ============================================================"
    echo "   FALTA LA API KEY DE CLAUDE"
    echo "  ============================================================"
    echo
    echo "   Estas demos usan IA real (Claude) y necesitan una API key."
    echo
    echo "   1) Consiguela en:  https://console.anthropic.com/"
    echo "   2) Configurala en esta terminal con:"
    echo
    echo "        export ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui"
    echo
    echo "   3) Vuelve a ejecutar ./demo.sh"
    echo
    pause; return
  fi
  echo
  echo "  Instalando dependencia 'anthropic' si hace falta..."
  "$PYTHON_CMD" -m pip install --quiet anthropic 2>/dev/null
  echo
  echo "  Iniciando servidor de IA. Se abrira el navegador automaticamente."
  echo "  Presiona Ctrl+C para detener."
  echo
  "$PYTHON_CMD" "$TESTS_DIR/demo_ai_server.py" --demo "$demo"
  echo; echo "  Demo finalizado."; pause
}

# ── Menu principal ──────────────────────────────────────────────────────────
while true; do
  clear
  echo
  echo "============================================================"
  echo "   AgentKit — Demos de Agentes WhatsApp con IA"
  echo "============================================================"
  echo
  echo "  DEMOS VISUALES (se abren en el navegador):"
  echo
  echo "  [1]  Todas las demos juntas  (selector interactivo)"
  echo "  [2]  Clinica MediVida        (salud, citas, laboratorio)"
  echo "  [3]  ProHogar Inmobiliaria   (venta, alquiler, visitas)"
  echo "  [4]  Restaurante El Criollo  (menu, delivery, reservas)"
  echo
  echo "  DEMOS EN CONSOLA (requieren Python):"
  echo
  echo "  [5]  Clinica MediVida        (chat en terminal)"
  echo "  [6]  ProHogar Inmobiliaria   (chat en terminal)"
  echo "  [7]  Restaurante El Criollo  (chat en terminal)"
  echo
  echo "  DEMOS CON IA REAL — Claude  (requieren Python + ANTHROPIC_API_KEY):"
  echo
  echo "  [8]  Clinica MediVida        (IA: comprende contexto, no palabras clave)"
  echo "  [9]  ProHogar Inmobiliaria   (IA: comprende contexto, no palabras clave)"
  echo "  [10] Restaurante El Criollo  (IA: comprende contexto, no palabras clave)"
  echo
  echo "  [0]  Salir"
  echo
  echo "============================================================"
  echo
  read -rp "   Tu eleccion (0-10): " OPCION

  case "$OPCION" in
    1) open_browser "$TESTS_DIR/demo_visual.html";        echo; echo "  Demo abierta en el navegador."; pause ;;
    2) open_browser "$TESTS_DIR/demo_clinica.html";       echo; echo "  Demo abierta en el navegador."; pause ;;
    3) open_browser "$TESTS_DIR/demo_inmobiliaria.html";  echo; echo "  Demo abierta en el navegador."; pause ;;
    4) open_browser "$TESTS_DIR/demo_restaurante.html";   echo; echo "  Demo abierta en el navegador."; pause ;;
    5) run_py_console "demo_clinica.py" ;;
    6) run_py_console "demo_inmobiliaria.py" ;;
    7) run_py_console "demo_restaurante.py" ;;
    8) run_ai "clinica" ;;
    9) run_ai "inmobiliaria" ;;
    10) run_ai "restaurante" ;;
    0) echo; echo "  Hasta luego."; exit 0 ;;
    *) echo "  Opcion no valida. Escribe un numero del 0 al 10."; pause ;;
  esac
done
