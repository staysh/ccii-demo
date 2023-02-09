
//create an empty Array
let moons = [];

//'prototype' style function for creating objects
function moon() {
		this.x = 0,
		this.y = 0,
		this.radius = 0,
		this.phase = 0
};

//when called with 'new' the above creates
//the same Object as this code.
let moon1 = {
	x: 0,
	y: 0,
	radius: 0,
	phase: 0.0
};

//Arrays can stretch to fit any size on the fly
//moons[0] = moon1; //valid moons.length = 1
//moons[1000] = moon1; //also fine moons.length = 1001


function setup () {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	//noStroke();

	//make 10 moons in a traditional way
	for (let i = 0; i < 10; i++){
		moons[i] = new moon();
		moons[i].x = width/2;
		moons[i].y = height/2;
		moons[i].radius = 100;
	};
}

function draw () {
	background(210, 180, 220);
	
	//better way to iterate over arrays
	//will give us acces to every item in
	//an array no matter what length it is
	for(moon of moons){	
		moon.phase += 0.01;
		if (moon.phase > 1.0) {
			moon.phase = 0;
		}
	}

	fill(0);

	for(moon of moons){
		ellipse(moon.x,
			    moon.y,
			    moon.radius*2,
			    moon.radius*2);
		drawMoon(moon);
		nudge(moon);
	}
}

//this can take any Object with an x or y parameter...
function nudge(moon){
	moon.x += random(-2.0, 2.0);
	moon.y += random(-2.0, 2.0);
}

function drawMoon(params) {
	//let radius = r;
	let lext;
	let rext; 
	if(params.phase <= 0.5) {
		rext = params.radius * 4/3;
		lext = map(params.phase, 0, 0.5, rext, -rext);
		
	} else {
		lext = -params.radius * 4/3;
		rext = map(params.phase, 0.5, 1.0, -lext, lext);
	}
	push();
	translate(params.x, params.y);
	fill(255);
	beginShape();
		vertex(0, params.radius);
		bezierVertex(rext, params.radius, rext, -params.radius, 0, -params.radius);
		bezierVertex(lext, -params.radius, lext, params.radius, 0, params.radius);
	endShape();
	//noFill();
	//ellipse(0, 0, width/2, width/2);
	pop();
}

//this is "broken" now...
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	parameters.x = width / 2;
	parameters.y = height / 2;
}