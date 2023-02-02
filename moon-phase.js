let phaseArg = 0;

function setup () {
	createCanvas(700, 700);
	//noStroke();
}

function draw () {
	background(210, 180, 220);
	
	phaseArg += 0.01;
	if (phaseArg > 1.0) {
		phaseArg = 0;
	}


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
}

function drawMoon(x, y, radius, phase) {
	//let radius = r;
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
	translate(x, y);
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
