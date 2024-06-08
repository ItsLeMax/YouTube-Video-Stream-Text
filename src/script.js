const CDP = require('chrome-remote-interface');
const axios = require("axios");
const fs = require('fs');

const variables = {
    resetColor: "\x1b[0m",
    limit: 75,
    cache: null
};

try {
    (async () => {
        console.log(
            "\x1b[32m" +
            "The program has loaded. " +
            "If a YouTube tab is open its title, author and thumbnail will be saved in \"/data/\". " +
            "It can be imported as text/image inside the streaming software. " +
            "If you have enough feel free to close the command line." + "\n\n" +
            "Das Programm wurde geladen. " +
            "Sollte ein YouTube-Fenster offen sein, wird dessen Titel, Author und Thumbnail in \"/data/\" gespeichert. " +
            "Diese kann über die eigene Streamingsoftware als Text/Bild importiert werden. " +
            "Sollte der Bedarf enden, kann die Konsole problemlos geschlossen werden." +
            variables.resetColor
        );

        setInterval(async () => {
            const client = await CDP();
            const { Target } = client;

            await client.Network.enable();
            const youtube = (await Target.getTargets()).targetInfos.find(target => target.url.includes("https://www.youtube.com/watch"));

            if (!youtube) return;

            await Target.attachToTarget({
                targetId: youtube.targetId,
                flatten: true
            });

            const tabClient = await CDP({
                target: youtube.targetId
            });

            await tabClient.Page.enable();

            const result = await tabClient.Runtime.evaluate({
                expression: `(() => {
                    const title = document.querySelector('#below #title h1').innerText;
                    const author = document.querySelector('#upload-info a').innerText;
                    const thumbnail = window.location.href.split('?v=').join('&').split('&')[1];
                    return { title, author, thumbnail };
                })();`,
                returnByValue: true
            });

            if (!result.result.value) return;
            if (!fs.existsSync("../data")) fs.mkdirSync("../data");

            let { title } = result.result.value;
            const { author, thumbnail } = result.result.value;

            if (title.length > variables.limit) title = title.slice(0, variables.limit) + "...";
            if (variables.cache == title) return;

            variables.cache = title;
            console.log(`Update: ${title} <> ${author} <> ${thumbnail}`);

            fs.writeFileSync(`../data/title.txt`, title);
            fs.writeFileSync(`../data/author.txt`, author);

            const response = await axios.get(`https://i.ytimg.com/vi/${thumbnail}/maxresdefault.jpg`, { responseType: 'arraybuffer' });
            fs.writeFileSync(`../data/thumbnail.${`${response.headers['content-type'].split('/')[1]}`}`, response.data);
        }, 1000);
    })()
} catch (error) {
    console.error("\x1b[31m" + "An error occured.", "Ein Fehler ist aufgetreten." + variables.resetColor + "\n" + error);
    process.exit();
}