class Main {
    constructor() {
        this.cookieCount = 0;
        this.cookieInterval = null;
    }

    // Function to show the pop-up and start the YouTube video
    showPopUp() {
        const popUp = document.getElementById("popUp");
        popUp.style.display = "block";
    }

    closePopUp() {
        const popUp = document.getElementById("popUp");
        popUp.style.display = "none";

        // Start playing the audio
        const audio = document.getElementById("backgroundAudio");
        audio.play();
    }

    // Function to navigate to the "about.html" page
    navigateToAboutPage() {
        window.location.href = "about.html";
    }

    // Function to create a falling cookie element
    createFallingCookie() {
        const fallingCookie = document.createElement("div");
        fallingCookie.className = "falling-cookie";
        fallingCookie.textContent = "🍪";
        fallingCookie.style.left = `${Math.random() * 100}vw`;

        fallingCookie.addEventListener("click", () => {
            fallingCookie.parentNode.removeChild(fallingCookie);
            this.cookieCount++;
            document.getElementById("cookieCount").textContent = this.cookieCount;

            // Create and play a new audio element for each cookie click
            const audio = new Audio("vineBoom.mp3");
            audio.play();
        });

        document.getElementById("container").appendChild(fallingCookie);
    }

    // Function to start the cookie-clicking game
    startCookies() {
        if (!this.cookieInterval) {
            this.cookieInterval = setInterval(() => this.createFallingCookie(), 1000); // Add cookies every 1 second
        }
    }

    // Function to stop the cookie-clicking game
    stopCookies() {
        clearInterval(this.cookieInterval);
        this.cookieInterval = null;

        // Remove any cookies that were scheduled to fall
        const fallingCookies = document.querySelectorAll(".falling-cookie");
        fallingCookies.forEach((cookie) => cookie.parentNode.removeChild(cookie));
    }

    // Function to make the background black
    makeBackgroundBlack() {
        const body = document.body;
        body.style.background = "black";
    }

    // Function to revert to the holographic background
    revertBackground() {
        const body = document.body;
        // Set the background to the holographic animation
        body.style.background = "linear-gradient(45deg, #00f, #f0f, #0ff, #ff0)";
        body.style.animation = "holographicBackground 10s infinite";
    }
}

const main = new Main();

// Attach event listeners
//document.querySelector(".cookie-button").addEventListener("click", main.showPopUp);
document.querySelector(".startCookie-button").addEventListener("click", () => main.startCookies());
document.querySelector(".stopCookie-button").addEventListener("click", () => main.stopCookies());
document.querySelector(".backgroundBlack-button").addEventListener("click", main.makeBackgroundBlack);
document.querySelector(".backgroundRevert-button").addEventListener("click", main.revertBackground);
document.querySelector(".popup-button").addEventListener("click", main.closePopUp);
