var player = {
	name: "",
	items: [],
	loc: map.locations[0],
}

player.take = function(item){
	var iLoc = this.loc.items.indexOf(item)
	if (iLoc > -1) {
		this.loc.removeItem(item);	
		this.items.push(item);
		print("You picked up <b>" + item + "</b>.");
	} else if (this.loc.hasObj(item)) {
		print("You cannot pick up <b>" + item + "</b>.");
	} else {
		print("<b>" + capitalize(item) + "</b> isn't in this room.");
	}
}

player.drop = function(item){
	var pos = this.items.indexOf(item);
	if (pos > -1) {
		this.items.splice(pos, 1);
		this.loc.addItem(item);
		print("You dropped <b>" + item + "</b>.");
	} else {
		print("You don't have <b>" + item + "</b>.");
	}
}

player.go = function(locName) {
	if (isConnected(this.loc.name, locName)) {
		this.loc = getLoc(locName);
		updateDescrip(this.loc.descrip);
		print("What will you do?");
	} else if (indexLoc(locName) > -1) {
		print("You can't go to <b>" + locName + "</b> right now.");
	} else {
		print("You can't go to <b>" + locName + "</b>.");
	}
}

player.look = function(input) {
	if (player.loc.hasObj(input)) {
		print(player.loc.getObj(input).descrip);
	} else if (player.items.indexOf(input) > -1 || player.loc.hasItem(input)) {
		print("You see a <b>" + input + "</b>.");
	} else {
		print("There isn't any <b>" + input + "</b> here.");
	}
}

player.use = function(input) {
	//Check to see if the player is trying to use an Obj
	if (player.loc.hasObj(input)) {
		player.loc.getObj(input).use();
	} else {
	//If not, see if they have an item with the same name.
		var pos = this.items.indexOf(input);
		if (pos > -1) {
			var obj = askforObj(input);
			if (!isEmptyObj(obj)) {
				obj.interactWith(input);
			}
		} else {
			print("You don't have <b>" + input + "</b>.");
		}
	}
}