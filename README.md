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

## Deployment
- For Render deployment (non-Docker), use the configured Procfile
- Ensure to configure the environment variables as needed
