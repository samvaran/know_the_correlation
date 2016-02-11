// Samvaran Sharma 
// Feb 10, 2016

// Get true R value
function trueR() {
	// Grab the size of the graph (2nd rect object)
	var rect = document.getElementsByTagName("rect")[1];
	var width = parseInt(rect.getAttribute("width"));
	var height = parseInt(rect.getAttribute("height"));

	// All points in the graph are class "nv-point"
	var points = document.getElementsByClassName("nv-point");
	var x, y;
	var xs = [];
	var ys = [];

	// Iterate through and use a regex to get the x and y coors
	for (i=0; i<points.length; i++) {
		x = points[i].getAttribute("transform").split(",")[0];
		x = /(?:\d*\.)?\d+/.exec(x);
		x = parseFloat(x)/width;

		y = points[i].getAttribute("transform").split(",")[1];
		y = /(?:\d*\.)?\d+/.exec(y);
		y = parseFloat(y)/height;

		xs.push(x);
		ys.push(y);
	}

	// Calculate R value
	return linReg(xs,ys);
}

// Formula to calculate R value from x and y coordinates
function linReg(x,y) {
	var n = y.length;
	var sum_x = 0;
	var sum_y = 0;
	var sum_xy = 0;
	var sum_xx = 0;
	var sum_yy = 0;
	
	for (var i = 0; i < n; i++) {
		sum_x += x[i];
		sum_y += y[i];
		sum_xy += (x[i] * y[i]);
		sum_xx += (x[i] * x[i]);
		sum_yy += (y[i] * y[i]);
	} 

	r2 = Math.pow((n*sum_xy - sum_x*sum_y) / Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
	
	r = Math.sqrt(r2);
	return r;
}

// Since it would look suspicious if you got every answer exactly right...
// This function will tell you how "wrong" to be! (and still do well)
function humanTouch(r) {
	// Central limit theorem takes the hard work out of approximating normal distributions
	var random = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 6;
	random = random * 0.3;
	random = random - 0.15;

	// random = some random error from the true R value; offset with a normal distribution
	var guess = r + random;

	// Make sure the guess makes sense
	if (guess < 0) {
		return 0;
	} else if (guess > 1) {
		return 1;
	} else {
		return guess;
	}
}

// Simple function to get the guess
function guessR() {
	return humanTouch(trueR());
}