const CDP = require('chrome-remote-interface');
const fs = require('fs');

const margin = "";
const reset = "\x1b[0m";
let lastTitle = new String;
const fileName = "last.txt";
const limit = 75 + margin.length;

try {
    (async () => {
        let client = await CDP();

        console.log(
            "\x1b[32m" +
            "The program has loaded. " +
            "If a YouTube tab is open its title will be saved in a local file. " +
            "It can be imported as text inside the streaming software. " +
            "If you have enough feel free to close the command line.",
            "Das Programm wurde geladen. " +
            "Sollte ein YouTube-Fenster offen sein, wird dessen Titel in eine lokale Datei gespeichert. " +
            "Diese kann über die eigene Streamingsoftware als Text importiert werden. " +
            "Sollte der Bedarf enden, kann die Konsole problemlos geschlossen werden." +
            reset
        );

        setInterval(async () => {
            let YTinstancesFound = 0;
            for (const target of Object.values(await client.Target.getTargets())[0]) {
                if (target.type == "service_worker" || !target.url.startsWith("https://www.youtube.com")) continue;
                YTinstancesFound++;
                let targetTitle = margin + target.title.split(" - YouTube")[0];
                if (targetTitle.length > limit) targetTitle = targetTitle.slice(0, limit) + "...";

                if (lastTitle == targetTitle) continue;
                fs.writeFileSync(fileName, `♫ ${targetTitle}`, 'utf-8');
                console.log(`Update: ${targetTitle}`);
                lastTitle = targetTitle;
            }
            if (!YTinstancesFound && lastTitle) {
                fs.writeFileSync(fileName, "");
                console.log(`Update: ${margin}` + "Kein YouTube-Tab erkannt/No YouTube tab found");
                lastTitle = null;
            }
        }, 1000);

        await client.Page.enable();
    })()
} catch (error) {
    console.error("\x1b[31m" + "An error occured.", "Ein Fehler ist aufgetreten." + reset + "\n" + error);
}