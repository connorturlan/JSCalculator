// original values for the calculator.
var a = 1;
var b = 2;
var op = "+";

// set the value of the A variable.
function setA(newA) {
	a = newA;
}

// set the value of the B variable.
function setB(newB) {
	b = newB;
}

// set the value of the Op flag.
function setOperation(newOp) {
	op = newOp;
}

// calculate the value of "A Op B", return NaN for any invalid value.
function calculate(a, b) {
	return (
		{
			"+": a + b,
			"-": a - b,
			"*": a * b,
			"/": a / b,
			"^": a ** b,
		}[op] ?? NaN // catch invalid operators;
	);
}

// perform the calculation for the simple calc.
function simpleCalculate() {
	// get and set the values and operators.
	setA(parseInt(document.getElementById("sA").value));
	setOperation(document.getElementById("sOp").value);
	setB(parseInt(document.getElementById("sB").value));

	// perform the calculation and display the value.
	document.getElementById("sOut").innerText = calculate(a, b).toString();
}
