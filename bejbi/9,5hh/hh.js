const heartsContainer = document.getElementById('hearts-container');
const proceedButton = document.getElementById('submitBtn');

// Function to generate a random heart
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Generate hearts at regular intervals
setInterval(createHeart, 500);

// Redirect to number.html when the button is clicked
proceedButton.addEventListener('click', () => {
    console.log('Button clicked! Redirecting...'); // Debug message
    window.location.href = '/9hang/hang.html'; // Adjust the path as needed
});
