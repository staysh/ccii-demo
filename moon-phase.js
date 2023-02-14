
//create an empty Array
let moons = [];

//'prototype' style function for creating objects
function Moon() {
		this.x = 0,
		this.y = 0,
		this.radius = 0,
		this.phase = 0,
		this.phIncr = function () {
			this.phase += 0.01;
			if (this.phase > 1.0) {
				this.phase = 0;
			}
		}
};

Moon.prototype.draw = function () {
	//let radius = r;
	let lext;
	let rext; 
	if(this.phase <= 0.5) {
		rext = this.radius * 4/3;
		lext = map(this.phase, 0, 0.5, rext, -rext);
		
	} else {
		lext = -this.radius * 4/3;
		rext = map(this.phase, 0.5, 1.0, -lext, lext);
	}
	push();
	translate(this.x, this.y);
	fill(255);
	beginShape();
		vertex(0, this.radius);
		bezierVertex(rext, this.radius, rext, -this.radius, 0, -this.radius);
		bezierVertex(lext, -this.radius, lext, this.radius, 0, this.radius);
	endShape();
	//noFill();
	//ellipse(0, 0, width/2, width/2);
	pop();
}

Moon.prototype.nudge = function () {
	this.x += random(-2.0, 2.0);
	this.y += random(-2.0, 2.0);
}

Moon.prototype.flate = function () {
	this.radius += random(-2.0, 2.0);
}


//when called with 'new' the above creates
//the same Object as this code.
let moon1 = {
	x: 0,
	y: 0,
	radius: 0,
	phase: 0.0
};


function setup () {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	//noStroke();

	//make 10 moons in a traditional way
	for (let i = 0; i < 10; i++){
		moons[i] = new Moon();
		moons[i].x = width/2;
		moons[i].y = height/2;
		moons[i].radius = 100;
	};

}

function draw () {
	background(210, 180, 220);

	fill(0);

	for(moon of moons){
		circle(moon.x,
			    moon.y,
			    moon.radius*2);
		moon.draw();
		moon.nudge();
		moon.phIncr();
		moon.flate();
	}
	moons.sort(compareMoons);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


function compareMoons(a, b) {
	return b.radius - a.radius;
}