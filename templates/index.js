document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Handle registration
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            registerForm.reset();
        }
    });

    // Handle login
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            // Store the token and redirect to the dashboard
            localStorage.setItem('access_token', data.access_token);
            window.location.href = '/dashboard.html';
        }
    });
});