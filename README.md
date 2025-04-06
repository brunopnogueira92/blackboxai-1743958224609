# Voting Application

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Application**:
   ```bash
   flask run
   ```

3. **Access the Application**:
   Open your browser and navigate to:
   - Main page: `http://127.0.0.1:5000/`
   - Dashboard: `http://127.0.0.1:5000/dashboard.html`
   - Statistics: `http://127.0.0.1:5000/stats.html`

4. **Alternative for Frontend Development**:
   For frontend-only development (HTML/JS/CSS):
   ```bash
   python3 -m http.server 8000 -d templates/
   ```
   Then access at `http://localhost:8000`

4. **Test Credentials**:
   - Admin User: 
     - Username: `admin`
     - Password: `admin123`
   - Other Users:
     - Username: `mesa1`, Password: `mesa1123`
     - Username: `mesa2`, Password: `mesa2123`
     - Username: `mesa3`, Password: `mesa3123`
     - Username: `mesa4`, Password: `mesa4123`

## Local Testing with Docker
1. Build the Docker image:
   ```bash
   docker build -t voting-app .
   ```

2. Run the container:
   ```bash
   docker run -p 5000:5000 voting-app
   ```

3. Access the application at `http://localhost:5000`

## Koyeb.com Deployment Instructions (Buildpacks)

1. **Create a new Web Service** on Koyeb:
   - Connect your GitHub/GitLab repository
   - Select "Python" as the runtime
   - Use Buildpacks (automatic detection)

2. **Configure Environment Variables**:
   - `DATABASE_URL`: `postgres://voting-adm:npg_LtCUIiyv3GT4@ep-black-hall-a2bwuds6.eu-central-1.pg.koyeb.app/koyebdb`
   - `SECRET_KEY`: Generate a random secret key for Flask
   - `JWT_SECRET_KEY`: Generate a random secret key for JWT
   - `FLASK_ENV`: Set to "production"

3. **Application Settings**:
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `gunicorn --bind 0.0.0.0:$PORT app:create_app()`

4. **Database Setup**:
   - The database is already configured with the provided URL
   - Run migrations on first deploy:
     ```bash
     flask db upgrade
     ```
   - Seed initial data (optional):
     ```bash
     python seeds.py
     ```

5. **After Deployment**:
   - Access your app at the provided Koyeb URL
   - Login with admin credentials:
     - Username: `admin`
     - Password: `admin123`

Note: The application is pre-configured with:
- PostgreSQL database support
- Proper gunicorn configuration
- Environment variable handling
