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
