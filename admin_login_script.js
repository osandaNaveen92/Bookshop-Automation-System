document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example hardcoded credentials (replace with actual validation logic)
    const validUsername = 'admin';
    const validPassword = 'admin123';

    if (username === validUsername && password === validPassword) {
        // Redirect to admin.html on successful login
        window.location.href = 'admin_page/admin.html';
    } else {
        // Display an error message for invalid credentials
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        errorMessage.style.color = 'red';
    }
});