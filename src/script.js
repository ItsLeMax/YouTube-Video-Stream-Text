const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");
const CDP = require('chrome-remote-interface');
const config = require("../run/config.json");
const axios = require("axios");
const fs = require('fs');

const values = {
    cache: null,
    test: false,
    limit: config.maximumTextLength
};

const colors = {
    success: "\x1b[32m",
    warn: "\x1b[33m",
    reset: "\x1b[0m"
};

const paths = {
    data: "../data",
    queries: "../src/queries.json"
};

(async () => {
    if (!fs.existsSync(paths.queries)) {
        fs.writeFileSync(paths.queries, JSON.stringify(new Object));
    }

    let queries = require(paths.queries);
    const { data: latestQueries } = await axios.get(values.test ? "http://localhost:3000/yvst" : "http://fpm-studio.de:3000/yvst");

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
            console.log(colors.success + "Update successful! | Update erfolgreich!" + "\n");
            fs.writeFileSync(paths.queries, JSON.stringify(latestQueries, null, "\t"));
            queries = latestQueries;
        } else {
            console.warn(colors.warn + "Update ignored. | Update ignoriert." + "\n");
        }

        readLine.close();
    }

    console.log(
        colors.success +
        "The program has loaded. " +
        "If a YouTube tab is open its title, author and thumbnail will be saved in \"/data/\". " +
        "It can be imported as text/image inside the streaming software. " +
        "If you have enough feel free to close the command line." + "\n\n" +
        "Das Programm wurde geladen. " +
        "Sollte ein YouTube-Fenster offen sein, wird dessen Titel, Author und Thumbnail in \"/data/\" gespeichert. " +
        "Diese kann über die eigene Streamingsoftware als Text/Bild importiert werden. " +
        "Sollte der Bedarf enden, kann die Konsole problemlos geschlossen werden." +
        colors.reset
    );

    const client = await CDP();

    setInterval(async () => {
        const youtube = (await client.Target.getTargets()).targetInfos.find(target => target.url.includes("https://www.youtube.com/watch"));
        const dataFiles = fs.readdirSync(paths.data);

        if (!youtube && dataFiles.length) {
            console.log(colors.warn + "No YouTube Tab opened. Deleting cache... | Kein YouTube-Tab offen. Cache wird gelöscht..." + colors.reset);
            deleteCache(dataFiles);
            return;
        }

        const result = await client.Runtime.evaluate({
            expression: `(() => {
                const title = document.querySelector('${queries.title}').innerText;
                const author = document.querySelector('${queries.author}').innerText;
                const thumbnail = window.location.href.split('?v=').join('&').split('&')[1];
                return { title, author, thumbnail };
            })();`,
            returnByValue: true
        });

        if (!result.result.value) return;
        if (!fs.existsSync(paths.data)) fs.mkdirSync(paths.data);

        let { title, author } = result.result.value;
        const { thumbnail } = result.result.value;

        if (title.length > values.limit) title = title.slice(0, values.limit) + "...";
        if (author.length > values.limit) author = author.slice(0, values.limit) + "...";

        if (config.prependSpaceForOBS) {
            title = " " + title;
            author = " " + author;
        }

        if (values.cache == title) return;

        values.cache = title;

        fs.writeFile(`../data/title.txt`, title, () => { });
        fs.writeFile(`../data/author.txt`, author, () => { });

        const highResUrl = `https://i.ytimg.com/vi/${thumbnail}/maxresdefault.jpg`;
        const lowResUrl = `https://img.youtube.com/vi/${thumbnail}/mqdefault.jpg`;

        const highRes = await axios.get(highResUrl, { responseType: 'arraybuffer' }).catch(async () => { });
        const lowRes = await axios.get(lowResUrl, { responseType: 'arraybuffer' }).catch(() => { });

        if (!highRes && !lowRes) {
            console.warn(colors.warn + `${highResUrl} - ${lowResUrl}` + "\n" +
                `Thumbnail not found. | Thumbnail nicht gefunden.` +
                colors.reset
            );
            return deleteCache(dataFiles);
        }

        const highResHeader = highRes?.headers['content-type'].split('/')[1];
        const lowResHeader = lowRes?.headers['content-type'].split('/')[1];

        console.log(
            "======================================================================================" + "\n" +
            `Title | Titel       ${!config.prependSpaceForOBS ? " " : ""}  ${title}` + "\n" +
            `Author              ${!config.prependSpaceForOBS ? " " : ""}  ${author}` + "\n" +
            `Quality | Qualität     ${(highResHeader ? "maxresdefault" : "mqdefault")}` + "\n" +
            `URL Value | URL-Wert   ${thumbnail}`
        );

        fs.writeFile(`${paths.data}/thumbnail.${`${highResHeader || lowResHeader}`}`, (highRes || lowRes).data, () => { });
    }, config.updateInterval);

    /**
     * @description
     * Deletes the cache, the images and text files in this case
     * 
     * Löscht den Zwischenspeicher, die Bilder und Textdateien in diesem Fall
     * 
     * @param { String[] } dataFiles
     * Data Files Directory Content
     *
     * Data-Dateien Ordnerinhalt
     *
     * @author ItsLeMax
     */
    function deleteCache(dataFiles) {
        for (const data of dataFiles) {
            fs.unlink(`${paths.data}/${data}`, () => { });
        }
    }
})();