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
	var cmd = {};
	input = input.toLowerCase();
	input = input.trim();
	var words = input.split(" ");
	cmd.action = words.shift();
	cmd.object = words.join(" ");
	return cmd;
};

function execute (cmd) {
	if (typeof player[cmd.action] === 'function') {
		player[cmd.action](cmd.object);
	}
}

function report () {
	var inventory = document.querySelector("#inventory > ul");
	//Clear inventory display
	while (inventory.firstChild) {
		inventory.removeChild(inventory.firstChild);
	}
	//Update inventory display with player's current items list
	for (var i = 0; i < player.items.length; i++) {
		var item = document.createElement("li");
		item.innerHTML = player.items[i];
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
			this.value = "";
		}
	});
}

window.onload = gameStart;
