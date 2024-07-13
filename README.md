# YouTube Video Stream Text
Searches Chrome Tabs for YouTube instances, writes their title and author into *.txt files and saves the thumbnail as image, for them to be read from a streaming software\
![obs](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/5c6c2c65-1320-4976-8cc4-4a810ed3653c)

## Requirements
> ...that may have working alternatives:
- Node (executable [here](https://nodejs.org/en/download/))
- Windows
> ...that are necessary:
- Google Chrome

## Setup
1. Download this source code by clicking on `<> Code` and `Download ZIP`\
![download](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/883af1c1-5670-4325-88b3-24452ebc5acb)
2. (Extract the content and) open the root folder and inside it the terminal\
(typing `cmd` inside the file explorer path works) and execute `npm i`\
![cmd](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/7334f1ee-197e-46e2-8909-2ea95e83f9f6)
3. (Optional) Open `/run/config.json` and change some settings that you want to change
> `prependSpaceForOBS` adds a space in front of title and author to compensate the spacing at the end of text elements.\
![prependSpaceForOBS](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/f4e7f163-a664-4c4d-abe5-fd32b89596f3)
4. Run `start-chrome.bat` inside `/run/` first, `run-script.cmd` right after and follow the guide
5. Open your broadcasting software and import the files inside `/data/` as needed

### Step 5 detailed
Inside OBS, you can create an element by right clicking in sources and clicking on `add`. You may use `Text (GDI+)` for `title.txt` and `author.txt` and `Image` for `thumbnail.jpeg`. After entering a unique name, you need to click on `Browse` and navigate to the downloaded code and `/data/` and select the file you desire. Feel free to resize the elements as needed.\
![browse](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/d880de97-6c9a-4756-88ee-1095b1dc1478)
> Please note, that text elements need to have `Read from file` checked first.\
![read](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/a2781753-90c7-4062-be5c-0f4c15232995)

### Important
It is highly recommended to fixate the image size for the case that the script uses a low quality backup thumbnail. You can do so by right clicking the Image in sources, hovering on `Transform` and clicking on `Edit Transform...` right after. Set `Bounding Box Type` to `Stretch to bounds`, the `Bounding Box Size` to a size you want the image to always have and other settings that you'd like to use as seen in the image.\
![v3 1](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/cfefa5e4-8727-4c98-91cb-9337d8c107f2)

## Known Errors and how to fix them
- `Error [ERR_UNKNOWN_BUILTIN_MODULE]: No such built-in module: node:readline/promises`\
This error occurs if your node version is not up to date. You can update it using the installer [here](https://nodejs.org/en/download/). If newer versions also throw this error, you may use `v22.2.0`.