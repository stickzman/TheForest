//This file contains the constructor, instances, and functions related to objects.
//Objects are distinct from items as they can be interacted with but not picked up.
//Players can use an item on an object or interact with the object directly.

var Obj = function(name, descrip) {
	this.name = name;
	this.descrip = descrip;
}

Obj.prototype.use = function() {
	print("You cannot use <b>" + this.name + "</b>.");
}

Obj.prototype.useWith = function(item) {
	print("<b>" + capitalize(item) + "</b> doesn't work on <b>" + this.name + "</b>.");
}

//CREATE ALL ROOM OBJECTS HERE:
//Object arrays for each location, to be added in locations.js
var ForestObjs = [
	new Obj('altar', "The top of the <b>altar</b> is jutting out. It looks as if it could be some kind of ancient button.")

];

//WRITE OBJECT FUNCTIONS HERE:
//Customized functions for objects

//FOREST
ForestObjs[0].use = function() {
	updateDescrip("You push down on the top of the <b>altar</b>. With a grinding sound, the top slides down, the ground rumbles, and a <b>door</b> slowly rises up in front of you.");
	this.descrip = "The top of the <b>altar</b> is push down into the body of the structure.";
	oneWay('forest', 'entrance');
	updateLocations();
	var forest = getLoc('forest');
	forest.objects.push(new Obj("door", "A cold, stone <b>door</b> towers in front of you."));
	forest.getObj('door').use = function () {
		player.walk('entrance');
	}
	print("What will you do?");
	//Reset use function
	ForestObjs[0].use = function() {
		print("You cannot use <b>" + this.name + "</b>.");
	}
}

//ENTRANCE
var EntranceObjs = [
	new Obj('door', "A cold, stone <b>door</b> towers in front of you."),
	new Obj("altar", "The stone <b>altar</b> has a carving in the shape of an octagon on its top.")
];

EntranceObjs[0].use = function () {
	print("The <b>" + this.name + "</b> is locked shut.");
}
EntranceObjs[1].useWith = function (item) {
	if (item === 'slab') {
		removeItem('slab');
		updateDescrip("You place the <b>slab</b> on the top of the <b>altar</b>. With a grinding sound, the the <b>slab</b> descends into the <b>altar</b>. The wall to your left crumbles and you can see a path to an <b>Observatory</b>.");
		this.descrip = "The top of the <b>altar</b> is push down into the body of the structure, with the <b>slab</b> stuck inside it.";
		getLoc('entrance').descrip = "In the center of the room rests the now defunct <b>altar</b>. The <b>door</b> to the <b>Forest</b> is still locked shut. The path to the <b>Observatory</b> is behind you.";
		connect('entrance', 'observatory');
		updateLocations();
	} else {
		print("<b>" + capitalize(item) + "</b> doesn't work on <b>" + this.name + "</b>.");
	}
}

//NAMEROOM
var nameObjs = [
	new Obj('first', ""),
	new Obj('second', ""),
	new Obj('third', ""),
	new Obj('engraving', "")
];

var nameRoomOrder = "";
nameObjs[0].use = function() {
	if (nameRoomOrder.length < 3) {
		nameRoomOrder += this.descrip.charAt(12);
	}
	if (nameRoomOrder.length === 3) {
		if (player.name.length < 3) {
			nameRoomOrder = nameRoomOrder.slice(0, nameRoomOrder.indexOf("-"));
		}
		if (nameRoomOrder.toLowerCase() === player.name.substr(0,3)) {
			print("YAY! You beat the room!");
			//Reset interactivity
			nameObjs[0].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[1].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[3].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
		} else {
			nameRoomOrder = "";
			print("You flip the <b>first</b> switch. The '" + this.descrip.charAt(12) + "' on the switch glows for a second, but as the lights on all three switches die out, you realize it was the wrong combination.");
		}
	} else {
		print("You flip the <b>first</b> switch. The '" + this.descrip.charAt(12) + "' on the base of the <b>first</b> switch lights up.");
	}
}

nameObjs[1].use = function() {
	if (nameRoomOrder.length < 3) {
		nameRoomOrder += this.descrip.charAt(12);
	}
	if (nameRoomOrder.length === 3) {
		if (player.name.length < 3) {
			nameRoomOrder = nameRoomOrder.slice(0, nameRoomOrder.indexOf("-"));
		}
		if (nameRoomOrder.toLowerCase() === player.name.substr(0,3)) {
			print("YAY! You beat the room!");
			//Reset interactivity
			nameObjs[0].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[1].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[3].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
		} else {
			nameRoomOrder = "";
			print("You flip the <b>first</b> switch. The '" + this.descrip.charAt(12) + "' on the switch glows for a second, but as the lights on all three switches die out, you realize it was the wrong combination.");
		}
	} else {
		print("You flip the <b>second</b> switch. The '" + this.descrip.charAt(12) + "' on the base of the <b>second</b> switch lights up.");
	}
}

nameObjs[2].use = function() {
	if (nameRoomOrder.length < 3) {
		nameRoomOrder += this.descrip.charAt(12);
	}
	if (nameRoomOrder.length === 3) {
		if (player.name.length < 3) {
			nameRoomOrder = nameRoomOrder.slice(0, nameRoomOrder.indexOf("-"));
		}
		if (nameRoomOrder.toLowerCase() === player.name.substr(0,3)) {
			print("YAY! You beat the room!");
			//Reset interactivity
			nameObjs[0].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[1].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[3].use = function() {
				print("The <b>" + this.name + "</b> switch is fixed in the 'ON' position.");
			}
		} else {
			nameRoomOrder = "";
			print("You flip the <b>first</b> switch. The '" + this.descrip.charAt(12) + "' on the switch glows for a second, but as the lights on all three switches die out, you realize it was the wrong combination.");
		}
		
	} else {
		print("You flip the <b>third</b> switch. The '" + this.descrip.charAt(12) + "' on the base of the <b>third</b> switch lights up.");
	}
}

nameObjs[3].use = function() {
	player.look(this.name);
}