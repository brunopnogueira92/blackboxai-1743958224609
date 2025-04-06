from flask import Flask
from extensions import db, migrate
app = Flask(__name__)
db.init_app(app)
migrate.init_app(app, db)
