var player = {
	name: "",
	year: 0,
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

player.walk = function(locName) {
	//Special condition if player tries to 'walk door' instead of 'use door'
	if (locName === 'door' && player.loc.hasObj('door')) {
		player.loc.getObj('door').use();
	} else {
		if (isConnected(this.loc.name, locName)) {
			this.loc = getLoc(locName);
			updateLocations();
			updateDescrip(this.loc.descrip);
			print("What will you do?");
		} else if (indexLoc(locName) > -1) {
			print("You can't go to <b>" + capitalize(locName) + "</b> right now.");
		} else {
			print("You can't go to <b>" + capitalize(locName) + "</b>.");
		}
	}
}

player.look = function(input) {
	//Is the player looking at an object?
	if (player.loc.hasObj(input)) {
		print(player.loc.getObj(input).descrip);
	//Are they looking at an item?
	} else if (playerHasItem(input) || player.loc.hasItem(input)) {
		print("You see a <b>" + input + "</b>.");
	//Are they looking at a nearby location?
	} else if (isConnected(this.loc.name, input)) {
		print("You see the <b>" + capitalize(input) + "</b>.");
	} else {
		print("There isn't any <b>" + input + "</b> here.");
	}
}

player.use = function(input) {
	//Check to see if the player is trying to use an object
	if (player.loc.hasObj(input)) {
		player.loc.getObj(input).use();
	} else {
		//If not, see if they are trying to use an item
		if (playerHasItem(input)) {
			//If so, ask player what the want to use the item on
			var obj = askforObj(input);
			if (!isEmptyObj(obj)) {
				obj.useWith(input);
			}
		} else {
			print("You don't have <b>" + input + "</b>.");
		}
	}
}