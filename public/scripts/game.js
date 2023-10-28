class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.isGameOver = false;

        this.pacman = {
            x: 50,
            y: 50,
            radius: 20,
            mouthOpen: false,
            angle: 0
        };
        this.dots = [];

        // Set the canvas size and bounds
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.bounds = {
            x: 10,
            y: 10,
            width: this.canvas.width - 20,
            height: this.canvas.height - 20
        };
        
        // Initialize the Pacman font style
        this.ctx.font = '36px PacmanFont';
        this.ctx.fillStyle = 'yellow';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Generate a large number of dots
        const numDots = 50;
        for (let i = 0; i < numDots; i++) {
            const dotX = Math.random() * this.bounds.width + this.bounds.x;
            const dotY = Math.random() * this.bounds.height + this.bounds.y;
            const newDot = { x: dotX, y: dotY, radius: 5 };
            this.dots.push(newDot);
        }
        const pacmanFont = new FontFace('PacmanFont', 'url(pac-font.ttf)');
        
        pacmanFont.load().then((font) => {
            document.fonts.add(font);
            // Initialize the game after the font is loaded
            this.init();
        }).catch((error) => {
            console.error('Font loading error:', error);
        });
    }

    init() {
        this.addEventListeners();
        this.gameLoop();
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    handleInput(e) {
        if (this.isGameOver) return; // Prevent movement when the game is over

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

        // Limit Pacman's movement within the canvas boundaries
        this.pacman.x = Math.max(this.pacman.radius, Math.min(this.canvas.width - this.pacman.radius, this.pacman.x));
        this.pacman.y = Math.max(this.pacman.radius, Math.min(this.canvas.height - this.pacman.radius, this.pacman.y));
    }

    checkCollision(obj1, obj2) {
        const distance = Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
        return distance < obj1.radius + obj2.radius;
    }

    update() {
        if (this.isGameOver) return; // Don't update the game if it's over
        this.clearCanvas();
        this.drawPacman();
        this.drawDots();
        this.checkCollisions();
        this.animatePacmanMouth();
        this.drawScore();

        requestAnimationFrame(() => this.update());
    }

    drawBounds() {
        this.ctx.strokeStyle = 'red'; // Adjust the boundary color as needed
        this.ctx.lineWidth = 5; // Adjust the boundary line width as needed
        this.ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    }

    drawTitle() {
        // Draw the title at the top of the canvas
        const titleText = 'Basically Pacman';
        const x = this.bounds.x + this.bounds.width / 2;
        const y = this.bounds.y + 20; // Adjust the vertical position as needed
        this.ctx.fillText(titleText, x, y);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBounds(); // Draw the bounds after clearing the canvas
        this.drawTitle();
    }

    drawPacman() {
        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, this.pacman.angle, (2 * Math.PI) - this.pacman.angle);
        this.ctx.lineTo(this.pacman.x, this.pacman.y);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
    }

    drawDots() {
        this.ctx.fillStyle = 'black';
        for (const dot of this.dots) {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }

    checkCollisions() {
        for (let i = this.dots.length - 1; i >= 0; i--) {
            if (this.checkCollision(this.pacman, this.dots[i])) {
                this.eatDot(i);
            }
        }
    }

    eatDot(index) {
        this.dots.splice(index, 1);
        this.score++;
        if (this.dots.length === 0) {
            this.isGameOver = true;
            // You can add a game over message and any other actions here
        }
    }

    drawScore() {
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Score: ' + this.score, 10, 30);
    }

    animatePacmanMouth() {
        this.pacman.mouthOpen = !this.pacman.mouthOpen;
        this.pacman.angle = this.pacman.mouthOpen ? Math.PI / 4 : 0;
    }

    gameLoop() {
        this.update();
    }
}

document.myGame = new Game();

setInterval(() => console.log(document.myGame.score), 1000);
