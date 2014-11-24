function Location (name, desc) {
	this.name = name;
	this.desc = desc;
	this.items = [];
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

var map = {
	locations: [
		new Location('Forest', 'You\'re standing in the Forest'),
		new Location('Entrance', 'You find yourself in a great stone temple'),
		new Location('Pit', 'You see a giant chasm in the middle of the room, with little room to move around it')
	],
	//Adjacency Matrix
	connections: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]
}
