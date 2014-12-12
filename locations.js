function Location (name, descrip) {
	this.name = name;
	this.descrip = descrip;
	this.items = [];
}

Location.prototype.has = function(item) {
	return this.items.indexOf(item) > -1;
}

Location.prototype.add = function(item) {
	this.items.push(item);
}

Location.prototype.remove = function(item) {
	var i = this.items.indexOf(item)
	if (i > -1) {
		this.items.splice(i, 1);
	}
}

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

var map = {
	locations: [
		new Location('forest', 'You awaken to find yourself lying on lush, green grass in a massive forest. You stand up and feel dazed. In front of you lies a stone alter.'),
		new Location('entrance', 'You find yourself in a great stone temple'),
		new Location('pit', 'You see a giant chasm in the middle of the room, with little room to move around it')
	],
	//Adjacency Matrix
	connections: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]
}

map.locations[0].add("stuff");
oneWay('forest', 'entrance');
connect('entrance', 'pit');
oneWay('pit', 'forest');