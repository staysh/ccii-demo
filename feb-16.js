let numStars = 100; 
let stars = [];
let shootingStars = [];
let dTest = 0.0;

// shooting is a boolean value
function Star (shooting) {
	this.x = shooting ? 0.0 : random(-0.5, 0.5);
	this.y = shooting ? 0.0 : random(-0.5, 0.5);
	this.r = random(1,4);
	this.xSpeed = random(-0.005, 0.005);
	this.ySpeed = random(-0.005, 0.005);
	this.distFromMouse = 100000000.0;
}

//Boundary check
Star.prototype.check = function () {
	if (Math.abs(this.x) > 0.5 || 
		Math.abs(this.y) > 0.5) 
	{
		this.x = 0.0;
		this.y = 0.0;
		this.xSpeed = random(-0.005, 0.005);
		this.ySpeed = random(-0.005, 0.005);
	}
}

Star.prototype.collision = function (Point, radius) {
	let d = distance(Point, {x: this.x*width, y: this.y*height});
	if( d < radius) {
		this.xSpeed = 0.0
		this.ySpeed = abs(this.ySpeed);
	}
	console.log(d);
}

function setup () {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	background(0);
	for(let i = 0; i < numStars; i++) {
		stars[i] = new Star(false);
		shootingStars[i] = new Star(true);
	}
	//frameRate(1);

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
	//let originPoint = {x: 0, y: 0};
	for(star of shootingStars) { //
		let d = distance({x: star.x * width,
						  y: star.y * height},
						 {x: 0, y: 0});
		//use map to include curve of tanh function
		//last two values control the fade of stars
		// from the origin
		let maxD = ({x:0, y:0}, {x: width/2, y: height/2});
		d = map(d, 0.0, maxD, -2.5, 10.0);
		fill(255, 255, 255, 255 * (Math.tanh(d) + 1) / 2) ;
		circle(star.x * width,
			   star.y * height,
			   star.r);
		star.x += star.xSpeed;
		star.y += star.ySpeed;
		star.check(); 
		//we need the mouse position in terms of a %
		let mouse = {x: (mouseX - width/2)/width,
					 y: (mouseY - height/2)/height}
		star.collision(mouse, 100);
	}
	pop();
	

	circle(mouseX, mouseY, 100);


}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function distance (p1, p2) {
	let d = Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2)
	//console.log(d);
	return d
}
