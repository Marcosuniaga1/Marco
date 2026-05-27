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
    echo  ERROR: Python no encontrado. Instala desde python.org
    pause
    exit /b 1
)

:menu
cls
echo.
echo ============================================================
echo    AgentKit — Demos de Agentes WhatsApp con IA
echo ============================================================
echo.
echo   Elige la demo que quieres ver:
echo.
echo   [1]  Clinica MediVida       (salud, citas, laboratorio)
echo   [2]  ProHogar Inmobiliaria  (venta, alquiler, visitas)
echo   [3]  Restaurante El Criollo (menu, delivery, reservas)
echo.
echo ============================================================
echo.
set /p OPCION="   Tu eleccion (1, 2 o 3): "

if "%OPCION%"=="1" goto :clinica
if "%OPCION%"=="2" goto :inmobiliaria
if "%OPCION%"=="3" goto :restaurante

echo  Opcion no valida. Escribe 1, 2 o 3.
pause
goto :menu

:clinica
cls
%PYTHON_CMD% "%~dp0tests\demo_clinica.py"
goto :fin

:inmobiliaria
cls
%PYTHON_CMD% "%~dp0tests\demo_inmobiliaria.py"
goto :fin

:restaurante
cls
%PYTHON_CMD% "%~dp0tests\demo_restaurante.py"
goto :fin

:fin
echo.
echo  Demo finalizado.
pause
