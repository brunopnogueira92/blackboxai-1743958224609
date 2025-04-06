from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_babel import Babel
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_bcrypt import Bcrypt

migrate = Migrate()
jwt = JWTManager()
babel = Babel()
limiter = Limiter(key_func=get_remote_address)
bcrypt = Bcrypt()
