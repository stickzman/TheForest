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
		print("You cannot <b>" + cmd.action + "</b>.");
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
	var help = document.querySelector("#help");
	var keys = Object.keys(player);
	//Initialize locations list
	updateLocations();
	for (i in keys) {
		if (typeof player[keys[i]] === 'function') {
			var li = document.createElement("li");
			li.innerHTML = capitalize(keys[i]);
			help.appendChild(li);
		}
	}
	//Listen for Enter
	inputBox.addEventListener("keyup", function(e) {
		if (e.keyCode === 13) {
			gameStep(this.value);
			this.value = "";
		}
	});
}

function gameIntro() {
	var input = prompt("Hello traveler, what would you like to be called?");
	if (input === "") {
		player.name = "traveler";
	} else {
		input = input.trim();
		input = input.toLowerCase();
		player.name = input;
	}
	alert("Adventure awaits, " + capitalize(player.name) + "!");
	//Initialize the name room objects to get around load order (they need player.name)
	nameObjs[1].descrip = "There is a '" + capitalize(player.name.charAt(0)) + "' sketched into the <b>second</b> switch.";
	if (player.name.length < 2) {
		nameObjs[2].descrip = "There is a '-' sketched into the <b>third</b> switch.";
	} else {
		nameObjs[2].descrip = "There is a '" + capitalize(player.name.charAt(1)) + "' sketched into the <b>third</b> switch.";
	}
	if (player.name.length < 3) {
		nameObjs[0].descrip = "There is a '-' sketched into the <b>first</b> switch.";
	} else {
		nameObjs[0].descrip = "There is a '" + capitalize(player.name.charAt(2)) + "' sketched into the <b>first</b> switch.";
	}
	nameObjs[3].descrip = "The <b>engraving</b> looks thousands of years old. It reads, \"Only you can complete this puzzle, <i>" + capitalize(player.name) + "</i>.\"";
	gameStart();
}

window.onload = gameIntro;