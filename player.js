var player = {
	name: "",
	items: [],
	loc: map.locations[0],
	
	
}

player.take = function(item){
	var iLoc = this.loc.items.indexOf(item)
	if (iLoc > -1) {
		this.loc.remove(item);	
		this.items.push(item);
		print("You picked up " + item + ".");
	} else {
		print(capitalize(item) + " isn't in this room.");
	}	
}

player.drop = function(item){
	var pos = this.items.indexOf(item);
	if (pos > -1) {
		this.items.splice(pos, 1);
		this.loc.add(item);
		print("You dropped " + item + ".");
	} else {
		print("You don't have " + item + ".");
	}
}

//TODO write player movement function.
player.go = function(locName) {
	console.log("Will go to " + locName);
}
//TODO write player use function.
player.use = function(item) {
	console.log("Will use " + item);
}
