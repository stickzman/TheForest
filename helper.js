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
	/* print("What would you like to use " + item + " with?");
	var inputBox = document.querySelector("#action");
	inputBox.placeholder = "Enter an object name..."
	inputBox.value = "";
	inputBox.removeEventListener("keyup", inputListener);
	inputBox.addEventListener("keyup", function objListener(e) {
		//e.stopImmediatePropagation()
		if (e.keyCode === 13) {
			var obj = {};
			var input = inputBox.value;
			input = input.toLowerCase();
			input = input.trim();
			if (player.loc.hasObj(input)) {
				obj = player.loc.getObj(input);
			} else {
				print(capitalize(input) + " is not in this room.");
			}
			inputBox.placeholder = "Enter an action here..."
			inputBox.value = "";
			inputBox.removeEventListener("keyup", objListener);
			inputBox.addEventListener("keyup", inputListener);
			return obj;
		}
	}); */
	var obj = {};
	var input = prompt("What would you like to use " + item + " with?");
	input = input.toLowerCase();
	input = input.trim();
	if (player.loc.hasObj(input)) {
		obj = player.loc.getObj(input);
	} else {
		print(capitalize(input) + " is not in this room.");
	}
	return obj;
}