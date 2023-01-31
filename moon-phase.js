let phaseArg = 0;

function setup () {
	createCanvas(400, 400);
	noStroke();
}

function draw () {
	background(210, 180, 220);
	moonPhase(phaseArg);
	phaseArg += 0.01;
	if (phaseArg > 1.0) {
		phaseArg = 0;
	}

}

function moonPhase(phase) {
	let radius = width/4;
	let lext;
	let rext; 
	if(phase <= 0.5) {
		rext = radius * 4/3;
		lext = map(phase, 0, 0.5, rext, -rext);
		
	} else {
		lext = -radius * 4/3;
		rext = map(phase, 0.5, 1.0, -lext, lext);
	}
	push();
	translate(width/2, height/2);
	fill(255);
	beginShape();
		vertex(0, radius);
		bezierVertex(rext, radius, rext, -radius, 0, -radius);
		bezierVertex(lext, -radius, lext, radius, 0, radius);
	endShape();
	//noFill();
	//ellipse(0, 0, width/2, width/2);
	pop();
}

// top = (0, radius)
// bottom = (0, -radius)
// 133 / 200 = 2/3 = 0.66666666
// 133 / 100 = 1.333333
