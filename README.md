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
* Install Node

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

Make sure env is activated before installing packages
ex. `(env) username@cpuname server %  `

```
pip3 install flask
pip3 install flask-sqlalchemy
pip3 install flask-session
pip3 install flask-cors
pip3 install psycopg2-binary
```

Notes:
- Don't forget to add `env`, `__pycache__`, and `flask_session` to `.gitignore`.
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

5. from /server, create config.py and add contents
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

6. init.py
```py
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
app.app_context().push()
db = SQLAlchemy(app)
Session(app)
CORS(app)

from core import views
```
\_\_init\_\_.py in a folder will make it a regular package. The code inside \_\_init\_\_.py will run when it is imported. In this case we want to import Flask and run it with configuration set by us.

`flask_session` allows us to use server-side sessions. This allows us to have pages unique to the user like logging in and having a user home page.

`flask_cors` handles Cross Origin Resource Sharing(CORS), making cross-origin AJAX possible. from [this link](https://hackernoon.com/understanding-cors-why-its-important-and-how-it-works),
* It allows browsers to enforce the same-origin policy, which is a security measure that prevents a malicious script from accessing resources that it should not have access.
* It allows restricted resources on a web page to be requested from another domain. This can be useful when you want to embed a resource from another domain, such as an image or a video.
* It allows the browser to send a pre-flighted request to the server to check if the request is allowed. This can be useful when you want to make a request that could potentially cause a change in state on the server.

`flask_sqlalchemy` is an extension for Flask that adds support for SQLAlchemy. This sets up common objects and patterns for using those objects, such as  session tied to each web request, models, and engines.

`psycopg2-binary` is an error that appears if not installed. It is a PostgreSQL database adapter for Python. Psycopg2 requires a few prerequisites like a C compiler and development packages and recommended for production. There's a stand-alone package psycopg2-binary for development.

After research, I learned that the binary version is unreliable in multithread environments.

Notes:
`config.from_object()` sets config defaults
`app.app_context().push()` fixes 'Working outside of application context' error.

7. views.py
```py
from core import app

@app.route('/')
def index():
    return 'Hello world'
```
Tests to see if we set up server correctly. 'Hello world' should appear in the browser.

8. From /server create base.py and insert:
```py
from core import app
```
This allows us to use `run flask` from the terminal. The command will read the base.py file

9. From the terminal, type `export FLASK_APP=base.py`

This will create an exported variable in the env.

Note: type `env` to see all environment variables, including the ones we exported (the FLASK_APP one).

10. From the terminal, `flask run`
 
We should see something like, 

`* Running on http://127.0.0.1:5000`. 

Opening this link should return 'Hello World'

Note: We can also use `localhost:5000/`.

Whenever we want to run flask in a new terminal we would always need to run the following in the root directory (for this project, it's from the /server directory)...
```
source env/bin/activate
export FLASK_APP=base.py
```

11. To avoid having to type `export FLASK_APP=base.py` each time a new terminal is opened, we can install python-dotenv to set the environment variables everytime `flask run` is used.

From the terminal:

`pip3 install python-dotenv`

From /server, create a a `.flaskenv` file and enter the following lines into the file:
```
FLASK_APP=base.py
FLASK_ENV=development
```

## React Setup
We will install React in the /client directory and connect it with Flask in the /server directory. We will use server oriented commands like `flask run` in one terminal. The client commands will be in another terminal, like `npm start`.

1. In a new terminal, access the /client directory, and type `npx create-react-app flask-react-starter`

Note: Add `node_modules` to .gitignore on the root level.

2. From /client/flask-react-starter/package.json, add the proxy line:
```
"name": "flask-react-starter",
"version": "0.1.0",
"private": true,
"proxy":"http://127.0.0.1:5000",
```

Note: I used 127.0.0.1 instead of localhost. I read that localhost does not work and is a mac thing.

## Check if Flask and React communicate
1. From views.py, add the following lines:
```py
@app.route('/test')
def test():
    return {
        "msg": "hello"
    }, 200
```

Save and reset server.

2. From App.js, add a useEffect() to `App()` fetch data from the server:
```js
import { useEffect } from 'react'

useEffect(() => {
    async function testConnection(){
        const req = await fetch('/test');
        const res = await req.json(req);
        console.log(res);
        return;
    }
    testConnection();
})
```

I decided to test with useEffect so we can immediately check the browser's console right when the page loads. Running the server with `flask run` and `npm start` in another terminal should have the following message in the console:
```
Object { msg: "Hello" }
```

## Helpful Knowledge
Some helpful tips I resolved while working on this project.

### Missing imports
When not in a virtual environment, typing `which python` (mac) will show a default location, ex `/usr/bin/python3`.

After activating the virtual environment with `source env/bin/activate/`, `which python` shows a different location. My location was, `/Users/tylphe/projects/flask-react-starter/server/env/bin/python3`. Copy this location and then press `F1` in VSCode and find `Python: Select interpreter` and set the new default path.
