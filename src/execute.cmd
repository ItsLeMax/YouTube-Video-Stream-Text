@echo off

:start
cls

tasklist /fi "imagename eq chrome.exe" |find ":" > nul
if errorlevel 1 (
    echo No instance of Chrome is allowed to be opened yet. Close them all!
    echo Keine Instanz von Chrome darf bisher offen sein. Schliesse diese allesamt!

    set /p "confirm=(Optional) Should the chrome task be killed? | Soll der Chrome-Task forciert geschlossen werden? < J >: "
    if /i "%confirm%" EQU "J" (
        taskkill /f /im "chrome.exe"
    ) else (
        echo The input has been aborted.
        echo Die Eingabe wurde abgebrochen.
    )
    pause
    goto :start
)

start chrome.exe --remote-debugging-port=9222
timeout /t 3
node script.js

pause