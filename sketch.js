function setup () {
	createCanvas(400, 400);
	background(0);
	fill(255, 200, 200);
	ellipse(width/2, height/2, 100, 100);
}

function draw () {
	ellipse(random(width), random(height), 100, 100);
}
