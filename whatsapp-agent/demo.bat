@echo off
chcp 65001 >nul
cls
echo.
echo ============================================================
echo    Clinica MediVida -- Demo Agente Valeria
echo ============================================================
echo.
echo  Buscando Python...
echo.

:: Intentar con 'python'
python --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python
    goto :run
)

:: Intentar con 'py' (launcher de Windows)
py --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=py
    goto :run
)

:: Intentar rutas comunes de instalacion
for %%P in (
    "%LOCALAPPDATA%\Programs\Python\Python313\python.exe"
    "%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
    "%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
    "%LOCALAPPDATA%\Programs\Python\Python310\python.exe"
    "C:\Python313\python.exe"
    "C:\Python312\python.exe"
    "C:\Python311\python.exe"
    "C:\Python310\python.exe"
) do (
    if exist %%P (
        set PYTHON_CMD=%%P
        goto :run
    )
)

:: No se encontro Python
echo  *** Python no encontrado ***
echo.
echo  Opciones para solucionarlo:
echo.
echo  OPCION A - Reinstalar Python correctamente:
echo    1. Ve a https://python.org/downloads
echo    2. Descarga e instala Python
echo    3. En la PRIMERA pantalla del instalador, abajo del todo,
echo       marca la casilla "Add Python to PATH"
echo    4. Haz clic en "Install Now"
echo.
echo  OPCION B - Si Python ya esta instalado:
echo    1. Abre esta ventana (cmd)
echo    2. Escribe: py --version
echo    3. Si muestra Python 3.x, escribe en cmd:
echo       py "%~dp0tests\demo_clinica.py"
echo.
echo ============================================================
pause
exit /b 1

:run
echo  Python encontrado: %PYTHON_CMD%
echo.
echo  Iniciando demo de Clinica MediVida...
echo.
%PYTHON_CMD% "%~dp0tests\demo_clinica.py"
echo.
echo  Demo finalizado.
pause
