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
	} else {
		print("You can't do that.");
	}
}

function report () {
	var inventory = document.querySelector("#inventory > ul");
	clearContent(inventory);
	//Update inventory display with player's current items list
	for (var i = 0; i < player.items.length; i++) {
		var item = document.createElement("li");
		item.innerHTML = capitalize(player.items[i]);
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
	//Initialize description
	updateDescrip(player.loc.descrip);
	//Initialize help list
	var help = document.querySelector("#help > ul");
	var keys = Object.keys(player);
	for (i in keys) {
		if (typeof player[keys[i]] === 'function') {
			var li = document.createElement("li");
			li.innerHTML = capitalize(keys[i]);
			help.appendChild(li);
		}
	}
	//Listen for Enter
	inputBox.addEventListener("keyup", inputListener);
}

function inputListener(e){
	if (e.keyCode === 13) {
		gameStep(this.value);
		this.value = "";
	}
}

window.onload = gameStart;