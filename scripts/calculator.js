class Calculator {
	constructor(isPowered = false) {
		this.isPowered = isPowered;
		if (!this.isPowered)
			document
				.getElementById("aDisplay")
				.classList.add("calculator__display--off");

		this.result = 0; // value to display after result is shown.

		this.buffer = ""; // working input.
		this.bufferPendingReset = false;
		this.memory = 0; // saved result.

		this.operator = "=";

		this.showResult();

		// setup the calculator in the dom.
		this.bind();
	}

	// DOM FUNCTIONS

	// bind the calculator's functions to the DOM.
	bind() {
		// create an object to map the button functions
		const functions = {
			mr: () => this.memoryRecall(),
			mc: () => this.memoryClear(),
			"m+": () => this.memoryAdd(),
			"m-": () => this.memorySub(),
			c: () => this.clear(),
			pow: () => {
				this.changeOperator("^");
			},
			sqr: () => {
				this.changeOperator("^2");
				this.changeOperator("=");
			},
			"+": () => {
				this.changeOperator("+");
			},
			"-": () => {
				this.changeOperator("-");
			},
			"*": () => {
				this.changeOperator("*");
			},
			"/": () => {
				this.changeOperator("/");
			},
			"=": () => {
				this.changeOperator("=");
			},
			"+/-": () => {
				this.invertBuffer();
			},
		};

		// fetch the buttons.
		const buttons = Array.from(
			document.querySelectorAll(".calculator__buttons > .btn")
		);

		// map the event functions.
		buttons.map((btn, index) => {
			// get the button's label.
			let buttonLabel = btn.innerText.toLowerCase();

			// if the button label is a registered function, push that operator.
			if (buttonLabel in functions) {
				btn.addEventListener("click", functions[buttonLabel]);
			}
			// otherwise it is a value pushing button, use that.
			else if (/([0-9.])/g.test(buttonLabel)) {
				btn.addEventListener("click", () =>
					this.pushValue(buttonLabel)
				);
			}
			// log when we have an unexpected button value.
			else {
				console.log(`unexpected button value: ${buttonLabel}.`);
			}

			return btn;
		});
	}

	// CALCULATION OPERATIONS

	// push a value to the end of the line.
	pushValue(value) {
		// validate power.
		if (!this.isPowered) return;

		// check if the buffer is awaiting a reset.
		if (this.bufferPendingReset) {
			this.buffer = "";
			this.bufferPendingReset = false;
		}

		// check that only one decimal is being added.
		if (value == "." && (/\./.test(this.buffer) || []).length >= 1) {
			value = "";
		}

		// push the character to the buffer and show.
		this.buffer += value;
		this.showBuffer();
	}

	setOperator(operator) {
		// validate power.
		if (!this.isPowered) return;

		if (operator !== "=") {
			this.operator = operator;
			document.getElementById("aOperator").innerText = operator;
		}
	}

	calculate() {
		// convert the buffer to an int.
		let b = parseFloat(this.buffer || this.result);

		// parse the operator.
		this.result =
			{
				"=": b,
				"+": this.result + b,
				"-": this.result - b,
				"*": this.result * b,
				"/": this.result / b,
				"^2": this.result ** 2,
				"^": this.result ** b,
			}[this.operator] ?? NaN; // catch invalid operators.

		// display the result to the user.
		this.showResult();
	}

	// perform the buffered operation then change the operator.
	changeOperator(operator) {
		// validate power.
		if (!this.isPowered) return;

		// calculate the result.
		this.calculate();

		// change the operator and reset the buffer.
		this.setOperator(operator);
		this.bufferPendingReset = true;
		//this.buffer = "";

		// show the result to the display.
		this.showResult();
	}

	// BUFFER OPERATIONS

	// clear all unstored values.
	clear() {
		// validate power.
		if (!this.isPowered) return;

		// clear the buffer first.
		if (this.buffer !== "") {
			this.buffer = "";
		}
		// then clear the results and reset the operator.
		else {
			this.result = 0;
			this.operator = "=";
		}

		// push the cleared buffer to the screen.
		this.showBuffer();
	}

	// invert the value in the buffer.
	invertBuffer() {
		// validate power.
		if (!this.isPowered) return;

		this.buffer = this.buffer.startsWith("-")
			? this.buffer.substring(1, this.buffer.length)
			: "-" + this.buffer;

		this.showBuffer();
	}

	reset() {
		this.result = 0;
		this.buffer = "";
		this.memory = 0;

		this.operator = "=";

		this.showResult();
	}

	// MEMORY FUNCTIONS

	// set the buffer to the value in memory.
	memoryRecall() {
		// validate power.
		if (!this.isPowered) return;

		this.buffer = this.memory.toString();
		this.setOperator("=");

		this.showBuffer();
	}

	// set the memory to the value of result.
	memoryStore(value = this.result) {
		// validate power.
		if (!this.isPowered) return;

		this.memory = value;

		document
			.getElementById("aMemory")
			.classList.remove("calculator__display--flag-hidden");
	}

	// add to the memory the value in result.
	memoryAdd() {
		this.memoryStore(this.memory + this.result);
	}

	// add to the memory the value in result.
	memorySub() {
		this.memoryStore(this.memory - this.result);
	}

	// clear the value stored in memory.
	memoryClear() {
		// validate power.
		if (!this.isPowered) return;

		this.memory = 0;

		/* this.memoryRecall(); */

		document
			.getElementById("aMemory")
			.classList.add("calculator__display--flag-hidden");
	}

	// DISPLAY FUNCTIONS

	// show the results to the display.
	showResult() {
		document.getElementById("aResult").innerText = this.result.toString();
	}

	// show the buffer to the display.
	showBuffer() {
		// if the buffer is empty, show '0' instead.
		document.getElementById("aResult").innerText =
			this.buffer.toString() || "0";
	}

	// toggle the display when the power button is pressed.
	togglePower() {
		// toggle the display.
		let display = document.getElementById("aDisplay");
		display.classList.toggle("calculator__display--off");
		this.isPowered = !display.classList.contains(
			"calculator__display--off"
		);

		// clear memory.
		this.reset();
		this.memoryClear();
	}
}

let calc = new Calculator();
