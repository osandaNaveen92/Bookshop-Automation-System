document.getElementById('adminLoginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Simulate sending login data to the server
        const response = await fetch('http://localhost:3000/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Redirect to admin dashboard or show success message
            window.location.href = 'admin_dashboard.html';
        } else {
            const error = await response.json();
            document.getElementById('errorMessage').textContent = error.message || 'Invalid login credentials';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = 'An error occurred. Please try again.';
    }
});