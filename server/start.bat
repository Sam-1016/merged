@echo off
chcp 65001 >nul
cd /d %~dp0
echo Starting Mantu local server (Ctrl+C to stop)...
node server.js
pause
