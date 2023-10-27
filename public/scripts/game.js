class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;

        // Define the game elements (Pac-Man and dots)
        this.pacman = { x: 50, y: 50, radius: 20, mouthOpen: false, angle: 0 };
        this.dots = [
            { x: 150, y: 150, radius: 5 },
            { x: 250, y: 250, radius: 5 },
            { x: 350, y: 350, radius: 5 }
        ];

        // Start game loop
        this.update();

        // Handle keyboard input
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    redraw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Pac-Man
        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, this.pacman.angle, (2 * Math.PI) - this.pacman.angle);
        this.ctx.lineTo(this.pacman.x, this.pacman.y);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();

        // Draw dots
        this.ctx.fillStyle = 'black';
        for (const dot of this.dots) {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }

    handleInput(e) {
        const step = 10;
        switch (e.key) {
            case 'd': // Move right
                this.pacman.x += step;
                break;
            case 'a': // Move left
                this.pacman.x -= step;
                break;
            case 's': // Move down
                this.pacman.y += step;
                break;
            case 'w': // Move up
                this.pacman.y -= step;
                break;
        }
    }

    checkCollision(obj1, obj2) {
        // Check if two circular objects are colliding
        const distance = Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
        return distance < obj1.radius + obj2.radius;
    }

    update() {
        this.redraw();
    
        // Check for collisions between Pac-Man and dots
        for (let i = this.dots.length - 1; i >= 0; i--) {
            if (this.checkCollision(this.pacman, this.dots[i])) {
                // Pac-Man eats the dot
                this.dots.splice(i, 1);
                this.score++;
    
                // Generate a new dot at a random location
                const newDotX = Math.random() * (this.canvas.width - 2 * this.pacman.radius) + this.pacman.radius;
                const newDotY = Math.random() * (this.canvas.height - 2 * this.pacman.radius) + this.pacman.radius;
                const newDot = { x: newDotX, y: newDotY, radius: 5 };
                this.dots.push(newDot);
            }
        }
    
        // Animate Pac-Man's mouth
        this.pacman.mouthOpen = !this.pacman.mouthOpen;
        this.pacman.angle = this.pacman.mouthOpen ? Math.PI / 4 : 0;
    
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => this.update());
    }    
}

// Initialize the game
document.myGame = new Game();

// Log the score once every second
setInterval(() => console.log(document.myGame.score), 1000);
