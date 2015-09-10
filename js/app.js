// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.setSpeed();
};

Enemy.prototype.setSpeed = function() {
    return Math.random() * 500 + 150;
};

Enemy.prototype.checkCollision = function() {
    if (Math.abs(this.x - player.x) <= 70 && Math.abs(this.y - player.y) <= 10) {
        if (lifes.length>0) {
            player.x = 200;
            player.y = 400;
            lifes.splice(lifes.length-1,1);
        } else {
            //Game over! The player goes back to his initial position
            Bg();
            ctx.fillText("GAME OVER! Press R to restart.", 150, 50);
            player.x = 200;
            player.y = 400;
            gameIsOn = 0;
        }
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {
        this.x =- 100;
        this.speed = this.setSpeed();
    } else {
        this.x += this.speed * dt;
    }
    this.checkCollision();
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var verticalStep = 83;
var horizontalStep = 101;
var win = 0;
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0 && gameIsOn === 1) {
        this.x -= horizontalStep;
    } else if (key === 'up' && gameIsOn === 1) {
        if (this.y >= verticalStep) {
            //if the player can move upwards (if there's no water above), he will move upwards
            this.y -= verticalStep;
        } else {
            //If the player reaches the water, he goes back to the grass
            this.x = 200;
            this.y = 400;
            //Winning counts
            Bg();
            win=win+1;
            ctx.fillText("Wins: " + win, 410, 50);
        }
    } else if (key === 'right' && this.x < 400 && gameIsOn === 1) {
        this.x += horizontalStep;
    } else if (key === 'down' && this.y < 400 && gameIsOn === 1) {
        this.y += verticalStep;
    } else if (key === 'r' && gameIsOn === 0) {
        Bg();
        win = 0;
        gameIsOn = 1;
        ctx.fillText("Wins: " + win, 410, 50);
        for (var i=0; i<3; i++) {
            lifes.push(new Lifes(0 + 40 * i, 540));
        };
    } else {
        console.log('This is not a valid input.');
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        82: 'r'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


var Lifes = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
};

Lifes.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*In this function, the formatting of the text that counts the points and the text that shows "Game Over" is done.
It shows a white background (because the text is overlapping)
It sets the font size, family and color*/
var Bg = function () {
    ctx.fillStyle="white";
    ctx.fillRect(150,0,400,100);
    ctx.font = "15pt Courier New";
    ctx.fillStyle="black"
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
for (var i=1; i<4; i++) {
    allEnemies.push(new Enemy(-100, 83 * i -20));
};

var lifes = [];
for (var i=0; i<3; i++) {
    lifes.push(new Lifes(0 + 40 * i, 540));
};

var player = new Player();

var gameIsOn = 1;



