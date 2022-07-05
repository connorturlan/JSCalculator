var a = 0;
var b = 1;
var op = "+";

function setA(newA) {
	a = newA;
}

function setB(newB) {
	b = newB;
}

function setOperation(newOp) {
	op = newOp;
}

function calculate() {
	switch (op) {
		case "+":
			return a + b;
			break;
		case "-":
			return a - b;
			break;
		case "*":
			return a * b;
			break;
		case "/":
			return a / b;
			break;
		case "^":
			return a ** b;
			break;
	}
	console.log("invalid operator provided." + toString(op));
	return NaN;
}
