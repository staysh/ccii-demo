let numStars = 330; 
let stars = [];
let shootingStars = [];

function Star (shooting) {
	this.x = shooting ? 0.0 : random(-0.5, 0.5);
	this.y = shooting ? 0.0 : random(-0.5, 0.5);
	this.r = random(1,4);
	this.xSpeed = random(-0.005, 0.005);
	this.ySpeed = random(-0.005, 0.005);
}

//Boundary check
Star.prototype.check = function () {
	if (Math.abs(this.x) > 0.5 || 
		Math.abs(this.y) > 0.5) 
	{
		this.x = 0.0;
		this.y = 0.0;
	}
}

function setup () {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	background(0);
	for(let i = 0; i < numStars; i++) {
		stars[i] = new Star(false);
		shootingStars[i] = new Star(true);
	}


}

function draw () {
	background(0);
	push();
	translate(width/2, height/2);
	for(star of stars) {
		circle(star.x * width,
			   star.y * height,
			   star.r);
	}
	for(star of shootingStars) { //
		let maxDist = star.x > star.y  ?
					  Math.abs(star.x) : 
					  Math.abs(star.y) ;
		fill(255, 255, 255, 255 * Math.tanh(maxDist / 0.1));
		circle(star.x * width,
			   star.y * height,
			   star.r);
		star.x += star.xSpeed;
		star.y += star.ySpeed;
		star.check();
	}
	pop();


}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}