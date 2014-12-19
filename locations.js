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
		new Location('hallway', "On the wall of the <b>Hallway</b> are three heavy switches. The <b>first</b>, <b>second</b>, and <b>third</b> switch each have something sketched into them. There is an <b>engraving</b> on the wall above the switches. At one end of the <b>Hallway</b> you see an <b>Observatory</b> and at the other you see the <b>Entrance</b>.", nameObjs),
		new Location('observatory', 'To your right, a large metal <b>gate</b> impedes your progress, but through its bars you see a <b>Staircase</b>. In the center of the room is a pool of boiling <b>water</b>. On the other side of the <b>water</b>, you can see a <b>Dungeon</b>. On the ground lies a small golden <b>key</b>. To your right is the <b>Hallway</b>.', observatoryObjs),
		new Location('staircase', 'The passage of the <b>Staircase</b> winds down in a clockwise pattern. At the bottom of the stairs you see flickering lights from the flames of the <b>Firepit</b> and hear the muffled \'whirr\' of machinery. The <b>Observatory</b> is found at the top of the steps.', stairObjs),
		new Location('firepit', 'There is a gigantic <b>pit</b> in the middle of the room with flames firing out of the center. It appears to be heating the room above. At the other end is a large <b>machine</b> clanking away.', fireObjs),
		new Location('dungeon', 'The <b>Dungeon</b> contains a single small cell with a rusted old <b>gate</b>. On the other side of the <b>gate</b> is a <b>ladder</b> leading to a <b>Loft</b>. In the corner is a <b>note</b>, partially covered by heavy rubble.', dungeonObjs),
		new Location('loft', 'The <b>Loft</b> is pitch black. You hear heavy, deep breathing coming from the corner. You can barely make out a <b>big key</b> near your feet. It looks like it could fit the door at the <b>Entrance</b>!', loftObjs)
	],
	//Adjacency Matrix
	connections: [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	]
}

//CREATE ITEMS AND PLACE THEM IN ROOMS HERE:
//Add items, objects, and connect the locations
getLoc('entrance').addItem("slab");
getLoc('observatory').addItem("key");
getLoc('loft').addItem("big key");

//EITHER USE FUNCTIONS TO CONNECT ROOMS INITIALLY OR MANUALLY EDIT ADJACENCY MATRIX
connect('staircase', 'firepit');
connect('hallway', 'observatory');