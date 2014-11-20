function Location (name, desc) {
	this.name = name;
	this.desc = desc;
	this.items = [];
}

var map = {
	locations: [
		new Location('Forest', 'You\'re standing in the Forest'),
		new Location('Entrance', 'You find yourself in a great stone temple'),
		new Location('Pit', 'You see a giant chasm in the middle of the room, with little room to move around it')
	],
	//Adjacency Matrix
	connections: [
		[1, 1, 0],
		[0, 1, 1],
		[1, 0, 1]
	]
}

//Print to console only locations accessible from locForest
function printLoc0Adj() {
	for (var i = 0; i < map.connections[0].length; i++) {
		if (map.connections[0][i] === 1) {
			console.log(map.locations[i].name)
		}
	}
}

window.onload = printLoc0Adj;
