
let garden = [];

function Point (x,y) {
	this.x = x; //need to define
	this.y = y;
}


function Flower (x,y) {
	this.numPetals = Math.floor(random(3, 33));
	this.size = random(10, 300);
	this.origin = new Point(x,y);
	this.color = {r: random(200, 255),
				  g: random(180, 255),
				  b: random(100, 180)};
}

Flower.prototype.draw = function () {
	let walkout = this.size / (this.numPetals/2) + ((1/this.numPetals) * this.size);
	let incr = TWO_PI / this.numPetals;
	push();
	translate(this.origin.x, this.origin.y);
	beginShape();
	fill(this.color.r, this.color.g, this.color.b);
	for(let i = 0; i < this.numPetals; i++)
	{
		let angle = i * incr;
		vertex(0, 0);
		bezierVertex(cos(angle) * this.size + sin(angle) * walkout,
			    	 sin(angle) * this.size - cos(angle) * walkout,
			    	 cos(angle) * this.size - sin(angle) * walkout,
			    	 sin(angle) * this.size + cos(angle) * walkout,
			    	 0,
			    	 0); 
	
	}
	endShape();
	pop();
}

let selectedFlower;

function setup () {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	origin = new Point(0, 0);
}

function draw () {
	background(255, 100, 60);
	for(flower of garden)
	{
		flower.draw();
	}
}

function mousePressed () {
	if(mouseButton == 'left') {
		
		selectedFlower = garden.findLast((flower) => {
			return dist(flower.origin.x,
				 flower.origin.y,
				 mouseX,
				 mouseY) < 10;
		})
		
		console.log(selectedFlower);
	}
}

function mouseDragged() {
	if(selectedFlower != undefined) {
		selectedFlower.origin.x = mouseX;
		selectedFlower.origin.y = mouseY;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyTyped () {
	if (key == 'd' || key == 'D') {
		garden.pop();
	}
	if (key == 'f' || key == 'F') {
		garden.push(new Flower(mouseX, mouseY));
	}
}