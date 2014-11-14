var player = {
	items: [],
	pickup: function(item){
		this.items.push(item);
	},
	drop: function(item){
		var pos = this.items.indexOf(item);
		if (pos >= 0) {
			this.items.splice(pos, 1);
		}
	}
}

function interpret (input) {
	var obj = {};
	input = input.toLowerCase();
	input = input.trim();
	var words = input.split(" ");
	obj.action = words.shift();
	obj.object = words.join();
	return obj;
};

function execute (cmd) {
	player[cmd.action](cmd.object);
}

function report () {
	var inventory = document.querySelector("#inventory > ul");
	for (var i = 0; i < p.items.length; i++) {
		var item = document.createElement("li");
		item.innerHTML = p.items[i];
		inventory.appendChild(item);
	}
}

function gameStep (input) {
	var cmd = interpret(input);
	execute(cmd);
	report();
}

function gameStart() {
	var inputBox = document.querySelector("#action");
	inputBox.addEventListener("keyup", function(e){
		if (e.keyCode === 13) {
			gameStep(this.value);
		}
	});
}

window.onload = gameStart;
