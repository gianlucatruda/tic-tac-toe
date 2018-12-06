# Minimal Tic-Tac-Toe
A Python-JavaScript hybrid web game

## Overview

## Installation
First, ensure you have Python 3.6+, pip, and pipenv installed.

Clone the repo and cd into the directory

```bash
git clone https://github.com/gianlucatruda/tic-tac-toe.git
cd tic-tac-toe
```

Start a new virtual environment for the project 

```bash
pipenv shell
```

Then install the dependencies in ```requirements.txt``` to that virtual environment

```bash
pipenv install -r requirements.txt
```

## Usage

Start the **API** server in one terminal

```bash
python api/api.py
```

Start the **web app** server in another terminal

```bash
python webapp/server.py
```

The API should now be accessible from your localhost (127.0.0.1) on port 8001. You can now use the web app by visiting ```http://127.0.0.1/8002/game/1```

Take note of the Game Id at the bottom of the page. You can resume a game mid-way (or see how the game ended) by visiting ```http://127.0.0.1/8002/game/<game id>``` later


## Limitations
