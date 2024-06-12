const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");
const CDP = require('chrome-remote-interface');
const config = require("./config.json");
const axios = require("axios");
const fs = require('fs');

const variables = {
    success: "\x1b[32m",
    reset: "\x1b[0m",
    cache: null,
    test: false,
    queries: "./queries.json",
    limit: config.maximumTextLength
};

try {
    (async () => {
        if (!fs.existsSync(variables.queries)) {
            fs.writeFileSync(variables.queries, JSON.stringify(new Object));
        }

        let queries = require(variables.queries);
        const { data: latestQueries } = await axios.get(variables.test ? "http://localhost:3000/yvst" : "http://fpm-studio.de:3000/yvst");

        if (latestQueries.title != queries.title || latestQueries.author != queries.author) {
            const readLine = readline.createInterface({
                input: stdin,
                output: stdout
            });

            const answer = await readLine.question(
                "The queries are outdated or do not exist. An update is important. Do you want to update?" + "\n" +
                "Die Queries sind veraltet oder inexistent. Ein Update ist wichtig. Möchtest du aktualisieren?" + "\n" +
                "< 1 (yes) | 0 (no) >: ",
            );

            if (answer.trim() == "1") {
                console.log(variables.success + "Update successful! | Update erfolgreich!" + "\n");
                fs.writeFileSync("queries.json", JSON.stringify(latestQueries, null, "\t"));
                queries = latestQueries;
            } else {
                console.log("\x1b[33m" + "Update ignored. | Update ignoriert." + "\n");
            }
            readLine.close();
        }

        console.log(
            variables.success +
            "The program has loaded. " +
            "If a YouTube tab is open its title, author and thumbnail will be saved in \"/data/\". " +
            "It can be imported as text/image inside the streaming software. " +
            "If you have enough feel free to close the command line." + "\n\n" +
            "Das Programm wurde geladen. " +
            "Sollte ein YouTube-Fenster offen sein, wird dessen Titel, Author und Thumbnail in \"/data/\" gespeichert. " +
            "Diese kann über die eigene Streamingsoftware als Text/Bild importiert werden. " +
            "Sollte der Bedarf enden, kann die Konsole problemlos geschlossen werden." +
            variables.reset
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
                    const title = document.querySelector('${queries.title}').innerText;
                    const author = document.querySelector('${queries.author}').innerText;
                    const thumbnail = window.location.href.split('?v=').join('&').split('&')[1];
                    return { title, author, thumbnail };
                })();`,
                returnByValue: true
            });

            if (!result.result.value) return;
            if (!fs.existsSync("../data")) fs.mkdirSync("../data");

            let { title, author } = result.result.value;
            const { thumbnail } = result.result.value;

            if (title.length > variables.limit) title = title.slice(0, variables.limit) + "...";
            if (author.length > variables.limit) author = author.slice(0, variables.limit) + "...";
            if (variables.cache == title) return;

            variables.cache = title;
            console.log(`Update: ${title} <> ${author} <> ${thumbnail}`);

            fs.writeFile(`../data/title.txt`, title, () => { });
            fs.writeFile(`../data/author.txt`, author, () => { });

            const response = await axios.get(`https://i.ytimg.com/vi/${thumbnail}/maxresdefault.jpg`, { responseType: 'arraybuffer' });
            fs.writeFile(`../data/thumbnail.${`${response.headers['content-type'].split('/')[1]}`}`, response.data, () => { });
        }, config.updateInterval);
    })()
} catch (error) {
    console.error("\x1b[31m" + "An error occured.", "Ein Fehler ist aufgetreten." + variables.reset + "\n" + error);
    process.exit();
}