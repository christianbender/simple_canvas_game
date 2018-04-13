// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// magical numbers
const WIDTH = 512;
const HEIGHT = 480;
const NUMROSE = 10;

canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// the rose 
let roseReady = false;
let roseImage = new Image();
roseImage.onload = function () {
	roseReady = true;
};
roseImage.src = "images/rose.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = { speed: 100 };
var monstersCaught = 0;

let roses = new Array();

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));

	// places the monster in the bounds. 
	while (monster.x < 64 && (monster.x > (WIDTH - 64)) && monster.y < 64
		&& (monster.y > HEIGHT - 64)) {
		monster.x = 32 + (Math.random() * (canvas.width - 64));
		monster.y = 32 + (Math.random() * (canvas.height - 64));
	}

	// creates some rose
	for (let i = 0; i < NUMROSE; i++) {
		let xVal = (Math.random() * (canvas.width - 64));
		let yVal = (Math.random() * (canvas.height - 64));
		while (xVal < 64 && xVal >= (WIDTH-100) && yVal < 100 && yVal >= (HEIGHT-100)) {
			xVal = 32 + (Math.random() * (canvas.width - 100));
			yVal = 32 + (Math.random() * (canvas.height - 100));
		}
		roses[i] = {x : xVal, y : yVal, display : true};
	}
};

// The monster escapes
var moveMonster = function (modifier) {
	if (hero.x < monster.x) {
		if (monster.x < WIDTH - 64)
			monster.x += modifier * monster.speed;

	}
	else {
		if (monster.x > 32)
			monster.x -= modifier * monster.speed;
	}
	if (hero.y < monster.y) {
		if (monster.y < HEIGHT - 64)
			monster.y += modifier * monster.speed;

	}
	else {
		if (monster.y > 64)
			monster.y -= modifier * monster.speed;
	}
};


// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		if (hero.y >= 32)
			hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		if (hero.y < HEIGHT - 64)
			hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		if (hero.x > 32)
			hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		if (hero.x < WIDTH - 64)
			hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}

	// collision detection for hero and rose
	for (let i = 0; i < NUMROSE; i++) {
		if (roses[i].display &&
			hero.x <= (roses[i].x + 32)
			&& roses[i].x <= (hero.x + 32)
			&& hero.y <= (roses[i].y + 32)
			&& roses[i].y <= (hero.y + 32)
		) {
			if (monstersCaught > 0) {
				roses.display = false;
				monstersCaught--;
				reset();
			}
		}
	
	}

	moveMonster(modifier);
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (roseReady) {
		for (let i = 0; i < NUMROSE; i++) {
			if (roses[i].display)
				ctx.drawImage(roseImage,roses[i].x,roses[i].y);
		}
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame
	|| w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
