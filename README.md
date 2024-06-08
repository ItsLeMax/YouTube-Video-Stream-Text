# YouTube Video Stream Text
Searches Chrome Tabs for YouTube instances and writes their title into a .txt file for it to be read from a streaming software
![obs](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/5c6c2c65-1320-4976-8cc4-4a810ed3653c)

## Requirements
> ...that may have working alternatives:
- NPM (`npm install -g npm` inside a terminal, i.e. `cmd` in windows)
- Node (executable [here](https://nodejs.org/en/download/))
- Windows
> ...that are necessary:
- Google Chrome

## Setup
1. Download this source code
2. Open the root folder and inside it the terminal\
(typing `cmd` inside the file explorer path works) and execute `npm i`
3. Run `execute.cmd` and follow the guide
4. Open your broadcasting software and import the files inside `/data` as needed.
> Inside OBS, you can create an element by right clicking in sources and clicking on `add`.\
You may use `Text (GDI+)` for title and author and `Image` for the thumbnail. After entering a unique name, you need to click on `Browse` and navigate to the downloaded code and `/data/` and select the file you desire.\
![browse](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/14256f1c-9139-4e28-819f-9b2ab617a3c9)\
> Please note, that text elements need to have `Read from file` checked first.
![read](https://github.com/ItsLeMax/YouTube-Video-Stream-Text/assets/80857459/10bc5f08-952a-406d-a877-06a59a3a2e84)