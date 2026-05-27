@echo off
chcp 65001 >nul
cls

:: Buscar Python
set PYTHON_CMD=
python --version >nul 2>&1
if not errorlevel 1 set PYTHON_CMD=python
if "%PYTHON_CMD%"=="" (
    py --version >nul 2>&1
    if not errorlevel 1 set PYTHON_CMD=py
)
if "%PYTHON_CMD%"=="" (
    for %%P in (
        "%LOCALAPPDATA%\Programs\Python\Python315\python.exe"
        "%LOCALAPPDATA%\Programs\Python\Python313\python.exe"
        "%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
        "%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
    ) do (
        if exist %%P (
            set PYTHON_CMD=%%P
            goto :menu
        )
    )
    echo  AVISO: Python no encontrado. Las demos visuales (opciones 1-4) igual funcionan sin Python.
)

:menu
cls
echo.
echo ============================================================
echo    AgentKit — Demos de Agentes WhatsApp con IA
echo ============================================================
echo.
echo   DEMOS VISUALES (se abren en el navegador):
echo.
echo   [1]  Todas las demos juntas  (selector interactivo)
echo   [2]  Clinica MediVida        (salud, citas, laboratorio)
echo   [3]  ProHogar Inmobiliaria   (venta, alquiler, visitas)
echo   [4]  Restaurante El Criollo  (menu, delivery, reservas)
echo.
echo   DEMOS EN CONSOLA (requieren Python):
echo.
echo   [5]  Clinica MediVida        (chat en terminal)
echo   [6]  ProHogar Inmobiliaria   (chat en terminal)
echo   [7]  Restaurante El Criollo  (chat en terminal)
echo.
echo ============================================================
echo.
set /p OPCION="   Tu eleccion (1-7): "

if "%OPCION%"=="1" goto :html_todas
if "%OPCION%"=="2" goto :html_clinica
if "%OPCION%"=="3" goto :html_inmobiliaria
if "%OPCION%"=="4" goto :html_restaurante
if "%OPCION%"=="5" goto :py_clinica
if "%OPCION%"=="6" goto :py_inmobiliaria
if "%OPCION%"=="7" goto :py_restaurante

echo  Opcion no valida. Escribe un numero del 1 al 7.
pause
goto :menu

:html_todas
start "" "%~dp0tests\demo_visual.html"
goto :fin_html

:html_clinica
start "" "%~dp0tests\demo_clinica.html"
goto :fin_html

:html_inmobiliaria
start "" "%~dp0tests\demo_inmobiliaria.html"
goto :fin_html

:html_restaurante
start "" "%~dp0tests\demo_restaurante.html"
goto :fin_html

:fin_html
echo.
echo  Demo visual abierta en el navegador.
pause
goto :menu

:py_clinica
if "%PYTHON_CMD%"=="" (
    echo  ERROR: Python no encontrado. Instala desde python.org
    pause
    goto :menu
)
cls
%PYTHON_CMD% "%~dp0tests\demo_clinica.py"
goto :fin_py

:py_inmobiliaria
if "%PYTHON_CMD%"=="" (
    echo  ERROR: Python no encontrado. Instala desde python.org
    pause
    goto :menu
)
cls
%PYTHON_CMD% "%~dp0tests\demo_inmobiliaria.py"
goto :fin_py

:py_restaurante
if "%PYTHON_CMD%"=="" (
    echo  ERROR: Python no encontrado. Instala desde python.org
    pause
    goto :menu
)
cls
%PYTHON_CMD% "%~dp0tests\demo_restaurante.py"
goto :fin_py

:fin_py
echo.
echo  Demo finalizado.
pause
goto :menu
