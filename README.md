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
3. Run `start-chrome.bat` first, `run-script.cmd` right after and follow the guide
4. Open your broadcasting software and import the files inside `/data` as needed.
> Inside OBS, you can create an element by right clicking in sources and clicking on `add`.\
You may use `Text (GDI+)` for title and author and `Image` for the thumbnail. After entering a unique name, you need to click on `Browse` and navigate to the downloaded code and `/data/` and select the file you desire.\
![browse](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/14256f1c-9139-4e28-819f-9b2ab617a3c9)\
> Please note, that text elements need to have `Read from file` checked first.\
![read](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/10bc5f08-952a-406d-a877-06a59a3a2e84)

### Error [ERR_UNKNOWN_BUILTIN_MODULE]: No such built-in module: node:readline/promises
This error occurs if your node version is not up to date. You can update it using the installer [here](https://nodejs.org/en/download/). If newer versions also throw this error, you may use `v22.2.0`.