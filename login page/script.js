document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthIndicator = document.getElementById('password-strength');
    
    if (password.length < 6) {
        strengthIndicator.textContent = 'Weak';
        strengthIndicator.style.color = 'red';
    } else if (password.length < 10) {
        strengthIndicator.textContent = 'Moderate';
        strengthIndicator.style.color = 'orange';
    } else {
        strengthIndicator.textContent = 'Strong';
        strengthIndicator.style.color = 'green';
    }
});
