function setup () {
	createCanvas(400, 400);
	background(127);


}

function draw () {
	background(127);
	
	let radius = 100;

	push();
	translate(width/2, height/2)
	fill(100, 100, 200);
	strokeWeight(10);
	beginShape();
		for(let i = 0; i < 4; i++)
		{
			let incr = PI / 2;
			let radians = PI / 4 + i * incr;
			vertex(cos(radians) * 200, sin(radians) * 200);
		}
		
		beginContour();
		for(let i = 50; i > 0; i--)
		{
			let ratio = i / 50;
			let radians = ratio * TWO_PI;
			vertex(cos(radians) * 40, sin(radians) * 40);
		}
		endContour();
		
	endShape(CLOSE);
	pop();

	textSize(24);
	fill(255, 0, 0);
	text("x : " + mouseX.toString(), 20, 20);
	text("y : " + mouseY.toString(), 120, 20);
}