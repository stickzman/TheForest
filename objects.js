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
	new Obj("alter", "The stone <b>alter</b> has a carving in the shape of an octagon on its top.")
];

//WRITE OBJECT FUNCTIONS HERE:
//Customized functions for objects
ForestObjs[0].useWith = function(item) {
	if (item === "slab") {
		updateDescrip("You place the stone <b>slab</b> into the carving on the top of the <b>alter</b>. With a grinding sound, the <b>slab</b> descends into the <b>alter</b>. The ground rumbles and a <b>door</b> slowly rises up in front of you.");
		removeItem("slab");
		oneWay('forest', 'entrance');
		var forest = getLoc('forest');
		forest.objects.push(new Obj("door", "A cold, stone <b>door</b> towers in front of you."));
		forest.getObj('door').use = function () {
			player.walk('entrance');
		}
		print("What will you do?");
	} else {
		print("<b>" + capitalize(item) + "</b> doesn't work on <b>" + this.name + "</b>.");
	}
}

var Loc2Objs = [];

var nameObjs = [
	new Obj('first', ""),
	new Obj('second', ""),
	new Obj('third', "")
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
				print("The <b>" + this.name + "</b> is fixed in the 'ON' position.");
			}
		} else {
			nameRoomOrder = "";
			print("You flip the <b>first</b> switch. As the lights on all three switches die out, you realize it was the wrong combination.");
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
			nameObjs[1].use = function() {
				print("The <b>" + this.name + "</b> is fixed in the 'ON' position.");
			}
		} else {
			nameRoomOrder = "";
			print("You flip the <b>second</b> switch. As the lights on all three switches die out, you realize it was the wrong combination.");
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
			nameObjs[2].use = function() {
				print("The <b>" + this.name + "</b> is fixed in the 'ON' position.");
			}
		} else {
			nameRoomOrder = "";
			print("You flip the <b>third</b> switch. As the lights on all three switches die out, you realize it was the wrong combination.");
		}
		
	} else {
		print("You flip the <b>third</b> switch. The '" + this.descrip.charAt(12) + "' on the base of the <b>third</b> switch lights up.");
	}
}