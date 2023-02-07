let phaseArg = 0;

let parameters = {
		x: 0,
		y: 0,
		radius: 0,
		phase: 0
};

function setup () {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	//noStroke();
	parameters.x = width / 2;
	parameters.y = height / 2;
	parameters.radius = 100;
}

function draw () {
	background(210, 180, 220);
	
	parameters.phase += 0.01;
	if (parameters.phase > 1.0) {
		parameters.phase = 0;
	}


	fill(0);
	ellipse(width / 2, height / 2, 200, 200);
	drawMoon(parameters);

	/*
	for(let i = 0; i < 9; i++){
		let phase = i / 8;
		phase += phaseArg;
		if(phase > 1.0)
		{
			phase -= 1.0;
		}
		let r = width/9/2 - 5;
		let x = (width * i/9) + (width/9/2);
		let y = height/2;
		fill(0);
		ellipse(x, y, r*2, r*2);
		drawMoon(x, y, r, phase);
	}
	*/
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

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	parameters.x = width / 2;
	parameters.y = height / 2;
}
// top = (0, radius)
// bottom = (0, -radius)
// 133 / 200 = 2/3 = 0.66666666
// 133 / 100 = 1.333333
