@echo off
chcp 65001 >nul
echo.
echo Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Python no esta instalado.
    echo Descargalo en: https://python.org/downloads
    echo Asegurate de marcar "Add Python to PATH" al instalarlo.
    echo.
    pause
    exit /b 1
)

echo Python OK
echo.
echo Iniciando demo de Clinica MediVida...
echo.
python tests\demo_clinica.py
pause
