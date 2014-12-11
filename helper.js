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
