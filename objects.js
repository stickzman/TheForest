//This file contains the constructor, instances, and functions related to objects.
//Objects are distinct from items as they can be interacted with but not picked up.
//Players can use an item on an object or interact with the object directly.

var Obj = function(name, descrip) {
	this.name = name;
	this.descrip = descrip;
}

Obj.prototype.updateDesc = function(str) {
	this.descrip = str;
}

Obj.prototype.use = function() {
	print("You cannot use " + this.name + ".");
}

Obj.prototype.interactWith = function(item) {
	print(capitalize(item) + " doesn't work on " + this.name + ".");
}

//Object arrays for each location, to be added in locations.js
var ForestObjs = [
	new Obj("alter", "The stone alter has a carving fit for the stone slab on it.")
];
ForestObjs[0].interactWith = function(item) {
	if (item === "slab") {
		updateDescrip("You place the stone slab into the carving on the top of the alter. The floor rumbles and a door appears in front of you.");
		oneWay('forest', 'entrance');
		print("(You can now go to the entrance)");
	} else {
		print(capitalize(item) + " doesn't work on " + this.name + ".");
	}
}
var Loc2Objs = [];
var Loc3Objs = [];