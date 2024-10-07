document.getElementById('submitBtn').addEventListener('click', function() {
    const password = document.getElementById('passwordInput').value;
    const correctPassword = '07042024';

    if (password === correctPassword) {
        // Redirect to another part of the website (change the URL as needed)
        window.location.href = '/3maze/maze.html';
    } else {
        // Display error message
        document.getElementById('error-message').style.display = 'block';
    }
});
