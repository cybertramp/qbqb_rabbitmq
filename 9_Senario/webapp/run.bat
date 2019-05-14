pauseif not "%minimized%"=="" goto :minimized
set minimized=true
@echo off

cd "C:\webapp\"

start /min cmd /C "node app.js"
goto :EOF
:minimized