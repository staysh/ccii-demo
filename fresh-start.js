
function Point (x,y) {
	this.x = x; //need to define
	this.y = y;
}

let origin;
/*
function Flower () {
	this.numPetals = //define this;
	this.size = //radius;
	this.origin = new Point(); //Point object?
}
*/

function setup () {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	origin = new Point(0, 0);
}

function draw () {
	background(255, 100, 60);
	
	let numPetals = 8;
	let radius = 400;
	let walkout = 180;

	let incr = TWO_PI / numPetals;
	push();
	translate(width/2, height/2);
	beginShape();
	for(let i = 0; i < numPetals; i++)
	{
		let angle = i * incr;
		vertex(origin.x, origin.y);
		bezierVertex(cos(angle) * radius + sin(angle) * walkout,
			    	 sin(angle) * radius - cos(angle) * walkout,
			    	 cos(angle) * radius - sin(angle) * walkout,
			    	 sin(angle) * radius + cos(angle) * walkout,
			    	 origin.x,
			    	 origin.y); 
	
	}
	endShape();
	pop();

	

}

function drawPetal () {

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}