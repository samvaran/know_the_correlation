function trueR() {
	var rect = document.getElementsByTagName("rect")[1];
	var width = parseInt(rect.getAttribute("width"));
	var height = parseInt(rect.getAttribute("height"));

	var points = document.getElementsByClassName("nv-point");
	var x, y;
	var xs = [];
	var ys = [];

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

	return linReg(xs,ys);
}

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

function humanTouch(r) {
	var random = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 6;
	random = random * 0.3;
	random = random - 0.15;

	var guess = r + random;
	if (guess < 0) {
		return 0;
	} else if (guess > 1) {
		return 1;
	} else {
		return guess;
	}
}

function guessR() {
	return humanTouch(trueR());
}