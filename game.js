var player = {
	items: [],
	pickup: function(item){
		this.items.push(item);
		print("You picked up " + item + ".");
	},
	drop: function(item){
		var pos = this.items.indexOf(item);
		if (pos >= 0) {
			this.items.splice(pos, 1);
			print("You dropped " + item + ".");
		} else {
			print("You don't have " + item + ".");
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
	if (Object.keys(player).indexOf(cmd.action) > -1) {
		player[cmd.action](cmd.object);
	} else {
		print("You can't do that right now.");
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

function print(str) {
	var label = document.querySelector("#scene > label");
	label.innerHTML = str;
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
