# YouTube Video Stream Text

Saves title, author and thumbnail of YouTube videos using Chrome for stream overlays
![1 0 0-position](https://github.com/user-attachments/assets/70fd693d-6be7-43f1-ae88-ec40c74a54ff)

## Requirements

> ...that are necessary:
- [Google Chrome](https://www.google.com/chrome/de/download-chrome/)
> ...that may have working alternatives:
- [Node](https://nodejs.org/en/download/prebuilt-installer)
- Windows
> ...that have working alternatives:
- [7-Zip](https://7-zip.de/download.html)

## Setup

1. Download the source code by clicking on `<> Code` & `Download ZIP` and extract its content\
![download](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/883af1c1-5670-4325-88b3-24452ebc5acb)
2. Open the root folder and inside it the terminal (typing `cmd` inside the file explorer path works) and execute `npm i`\
![cmd](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/7334f1ee-197e-46e2-8909-2ea95e83f9f6)\
![npm](https://github.com/user-attachments/assets/25b67d93-759a-4ce7-875b-364aac09dcbd)
3. (Optional) Open `/run/config.json` and change some settings that you want to change
![1 3 0-obs_prepend](https://github.com/user-attachments/assets/9da339a5-9a3b-45fc-b432-fb4a32485119)
> `updateInterval` describes an update every specified amount of milliseconds\
> `prependSpaceForOBS` adds a space in front of title and author to compensate the spacing at the end of text elements.\
![prependSpaceForOBS](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/f4e7f163-a664-4c4d-abe5-fd32b89596f3)
4. Run `start-chrome.bat` inside `/run/` first, `run-script.cmd` right after and follow the guide\
![1 2 0-batches](https://github.com/user-attachments/assets/417b7583-673c-49d7-af63-4a2a9f1b9c16)
5. Open your broadcasting software and import the files of `/data/` as needed. Inside OBS, you can create an element by right clicking in sources and clicking on `add`. You may use `Text (GDI+)` for `title.txt` and `author.txt` and `Image` for `thumbnail.jpeg`.
![1 0 0-elements](https://github.com/user-attachments/assets/619863d2-1d77-40c1-a3f3-5b6a396f3a68)\
After entering a unique name, you need to click on `Browse` and navigate to the downloaded code and `/data/` and select the file you desire.\
![1 0 0-unique](https://github.com/user-attachments/assets/c1358468-7ce6-4431-ac34-179ea438fe11)
![1 1 0-thumbnail](https://github.com/user-attachments/assets/8b752b65-ba9c-4e79-ba9d-d406e36ecfa8)
![1 1 0-image](https://github.com/user-attachments/assets/c929af92-e6c6-45f3-89ce-d396a6aa7274)\
Feel free to resize the elements as needed.
> Please note, that text elements need to have `Read from file` checked first.\
![1 0 0-text](https://github.com/user-attachments/assets/79ba5cb8-e960-43ba-bf5f-5756e00ddfce)

### Important

It is highly recommended to fixate the image size for the case that the script uses a low quality backup thumbnail. You can do so by right clicking the Image in sources, hovering on `Transform` and clicking on `Edit Transform...` right after.
![1 1 0-transform](https://github.com/user-attachments/assets/d0454c29-4a75-4838-82ec-8d8cf81604a2)\
Set `Bounding Box Type` to `Stretch to bounds`, the `Bounding Box Size` to a size you want the image to always have and other settings that you'd like to use as seen in the image.\
![1 1 0-stretch](https://github.com/user-attachments/assets/4f398779-a2e0-4547-80f5-3c752899e736)

## Known Errors and how to fix them

- `Error [ERR_UNKNOWN_BUILTIN_MODULE]: No such built-in module: node:readline/promises`\
This error occurs if your node version is not up to date. You can update it using the installer [here](https://nodejs.org/en/download/prebuilt-installer). If newer versions also throw this error, you may use `v22.2.0`.