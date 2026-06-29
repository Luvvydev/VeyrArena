@echo off
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install the LTS version from https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing desktop app dependencies...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
echo Building Windows installer and portable EXE...
call npm run dist:win
if errorlevel 1 pause & exit /b 1
echo.
echo Done. Check the dist folder.
pause
