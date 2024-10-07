let clickCount = 0;
const fishContainer = document.getElementById("fishContainer");
const fish = document.getElementById("fish");
const explosionContainer = document.getElementById("explosion");

fishContainer.addEventListener("click", () => {
    clickCount++;
    
    // Randomly move the fish and apply color shadow animation
    fishContainer.style.top = `${Math.random() * 80}vh`;
    fishContainer.style.left = `${Math.random() * 80}vw`;
    
    // Trigger the color-changing shadow animation
    fish.style.animation = "changeShadowColor 1s infinite";
    
    if (clickCount >= 9) {
        // Reset the fish position
        fishContainer.style.top = "50%";
        fishContainer.style.left = "50%";
        
        // Trigger explosion
        triggerExplosion();

        // Redirect to login page after explosion
        setTimeout(() => {
            window.location.href = "/2login/login.html"; // Redirect to login page
        }, 2000);
        
        // Reset click count
        clickCount = 0;
    }
});

// Function to trigger explosion effect
function triggerExplosion() {
    explosionContainer.style.display = "block";

    for (let i = 0; i < 50; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.top = `${Math.random() * 100}vh`;
        explosionContainer.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 2000);
    }
    
    setTimeout(() => {
        explosionContainer.style.display = "none";
    }, 2000);
}
