@echo off
chcp 65001 >nul
cls
echo.
echo ============================================================
echo    Clinica MediVida — Demo Agente Valeria
echo ============================================================
echo.
echo  Verificando Python...
echo.

python --version >nul 2>&1

if errorlevel 1 (
    echo  *** ERROR: Python no esta instalado ***
    echo.
    echo  Para instalar Python:
    echo.
    echo  1. Ve a: https://python.org/downloads
    echo  2. Descarga la ultima version
    echo  3. Al instalar, MARCA la casilla:
    echo        "Add Python to PATH"   ^<-- MUY IMPORTANTE
    echo  4. Instala y vuelve a abrir este archivo
    echo.
    echo  ============================================================
    echo  Presiona cualquier tecla para cerrar...
    pause >nul
    exit /b 1
)

echo  Python OK -
python --version
echo.
echo  Iniciando demo...
echo.
python "%~dp0tests\demo_clinica.py"

echo.
echo  Demo finalizado. Presiona cualquier tecla para cerrar.
pause >nul
