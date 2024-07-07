@echo off

:execute
node --max-old-space-size=512 ../src/script.js

pause
goto execute