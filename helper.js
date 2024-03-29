//A library of helper functions

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.substring(1, word.length);
}

function clearContent(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

function print(str) {
	var label = document.querySelector("#scene > label");
	label.innerHTML = str;
}

function updateDescrip(str) {
	var descrip = document.querySelector("#descrip");
	descrip.innerHTML = str;
}

function isEmptyObj(obj){
	for (name in obj) {
        return false;
    }
    return true;
}

function askforObj(item) {
	var obj = {};
	var input = prompt("What would you like to use " + item + " on?");
	input = input.toLowerCase();
	input = input.trim();
	if (player.loc.hasObj(input)) {
		obj = player.loc.getObj(input);
	} else if (playerHasItem(input)) {
		print("You can't use <b>" + item + "</b> with <b>" + input + "</b>.");
	} else {
		print("<b>" + capitalize(input) + "</b> is not in this room.");
	}
	return obj;
}

function playerHasItem(item) {
	return player.items.indexOf(item) > -1;
}

function removeItem(item) {
	var pos = player.items.indexOf(item);
	if (pos > -1) {
		player.items.splice(pos, 1);
	}
}