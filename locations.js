function Location (name, descrip, objects) {
	this.name = name;
	this.descrip = descrip;
	this.items = [];
	this.objects = objects;
}
//Location items
Location.prototype.hasItem = function(item) {
	return this.items.indexOf(item) > -1;
}

Location.prototype.addItem = function(item) {
	this.items.push(item);
}

Location.prototype.removeItem = function(item) {
	var i = this.items.indexOf(item)
	if (i > -1) {
		this.items.splice(i, 1);
	}
}
//Location objects
Location.prototype.hasObj = function(name) {
	return this.indexOfObj(name) > -1;
}

Location.prototype.addObj = function(obj) {
	this.objects.push(obj);
}

Location.prototype.indexOfObj = function(name) {
	for (var i = 0; i < this.objects.length; i++) {
		if (this.objects[i].name === name) {
			return i;
		}
	}
	return -1;
}

Location.prototype.getObj = function(name) {
	return this.objects[this.indexOfObj(name)];
}

//Location related functions
function isConnected(from, to) {
	var i1 = indexLoc(from);
	var i2 = indexLoc(to);
	if (i1 !== -1 && i2 !== -1 && map.connections[i1][i2] === 1) {
		return true;
	} else {
		return false;
	}
}

function connect(loc1, loc2) {
	var i1 = indexLoc(loc1);
	var i2 = indexLoc(loc2);
	map.connections[i1][i2] = 1;
	map.connections[i2][i1] = 1;
}

function disconnect(loc1, loc2) {
	var i1 = indexLoc(loc1);
	var i2 = indexLoc(loc2);
	map.connections[i1][i2] = 0;
	map.connections[i2][i1] = 0;
}

function oneWay(loc1, loc2) {
	var i1 = indexLoc(loc1);
	var i2 = indexLoc(loc2);
	map.connections[i1][i2] = 1;
	map.connections[i2][i1] = 0;
}

function indexLoc(name) {
	var result = -1;
	for (var i = 0; i < map.locations.length; i++) {
		if (map.locations[i].name === name) {
			result = i;
		}
	}
	return result;
}

function getLoc(name) {
	var i = indexLoc(name);
	if (i > -1) {
		return map.locations[i];
	} else {
		throw "Location " + name + " does not exist";
	}
}

function updateLocations() {
	var list = document.querySelector("#map");
	clearContent(list);
	for (var i = 0; i < map.locations.length; i++) {
		var li = document.createElement("li");
		li.textContent = capitalize(map.locations[i].name);
		if (map.locations[i] === player.loc) {
			li.style.listStyleType = "disc";
		} else if (!isConnected(player.loc.name, map.locations[i].name)) {
			li.style.opacity = "0.5";
		}
		list.appendChild(li);
	}
}

//An object to hold all the locations in the game and their Adjacency Matrix
var map = {
	locations: [
		//CREATE LOCATIONS HERE
		new Location('forest', 'You awaken to find yourself lying on lush, green grass in a massive forest. You stand up and feel dazed.  In front of you sits a small stone <b>altar</b>.', ForestObjs),
		new Location('entrance', 'As the <b>door</b> slams shut behind, you find yourself in a great stone temple. In the center of the room is another stone <b>altar</b>, though the top looks different this time.  At your feet lies a small octagonal stone <b>slab</b>.', EntranceObjs),
		new Location('observatory', 'In the center of the <b>Observatory</b> are three heavy switches. The <b>first</b>, <b>second</b>, and <b>third</b> switch each have something sketched into them. There is an <b>engraving</b> on the wall on the right.', nameObjs)
	],
	//Adjacency Matrix
	connections: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]
}

//CREATE ITEMS AND PLACE THEM IN ROOMS HERE:
//Add items, objects, and connect the locations
getLoc('entrance').addItem("slab");

//EITHER USE FUNCTIONS TO CONNECT ROOMS INITIALLY OR MANUALLY EDIT ADJACENCY MATRIX