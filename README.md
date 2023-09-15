# Flask-React Starter
Detailed steps on starting a full-stack project

## About
[HB Capstone](https://github.com/TYLPHE/hb-capstone) is a personal project that uses Flask and React. This repository is designed to revisit the early stages of developing a similar full-stack project.

I love writing step-by-step guides so this is a repo I plan to return to often if I ever want to create another Flask & React combo.

## References
- [dev.to Getting Started with Flask](https://dev.to/nagatodev/getting-started-with-flask-1kn1)

### To visit later
- [dev.to How to connect Flask to ReactJs](https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i)
- [Authentication in React app using Flask Server-Sided Sessions](https://www.youtube.com/watch?v=sBw0O5YTT4Q)

## How to use this repository
Follow the detailed steps [below](#guide) to start your own project. It should work in Command line on Windows and Terminal on Mac. I will be creating this project on Linux.

# Guide
###### Prerequisites
* Install Python

## Flask Setup
1. Create a repo on GitHub and clone it.
```
git clone git@github.com:TYLPHE/flask-react-starter.git
```

Alternitively, from the terimal, create a new directory for the project and enter the directory.
```
mkdir flask-react-starter
cd flask-react-starter
```

2. Create client and server directories
```
mkdir client server
```

3. Enter Server and create virtual environment
```
cd server
python3 -m venv env
source env/bin/activate
```

Notes:
- Don't forget to add `env` to `.gitignore`.
- `deactivate` to exit venv
- `pip3 freeze` checks for installed packages in virtual environment
- `pip3 freeze > requirements.txt` creates requirements file
- `pip3 install -r requirements.txt` install packages from requirements.txt

4. From /server, create /core with \_\_init\_\_.py and views.py
```
mkdir core
cd core
touch __init__.py
touch views.py
```

5. from /core, create config.py and add contents
`touch config.py`

config.py
```py
# config.py is used in ./core/__init__.py for Flask()
import os

class Config():
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql:///flask_react_starter'
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = 'filesystem'
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
```

5. init.py
```py
from flask import Flask
from config import Config
```