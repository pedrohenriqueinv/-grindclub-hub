@echo off
echo ===================================================
echo   INICIANDO GRINDCLUB OPS HUB & VYK AI (LOCAL)
echo ===================================================
cd /d "%~dp0"
start http://localhost:5173
npm run dev
pause
