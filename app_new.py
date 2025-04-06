from flask import Flask
from extensions import db, migrate, jwt, babel, limiter
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    babel.init_app(app)
    CORS(app)
    limiter.init_app(app)

    # Register blueprints
    from auth import auth_bp
    from votes import vote_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(vote_bp, url_prefix="/api/votes")

    # Error handlers
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return {"message": "Rate limit exceeded"}, 429

    return app

app = create_app()

if __name__ == "__main__":
    app.run()
