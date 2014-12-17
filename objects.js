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

Obj.prototype.interactWith = function(item) {
	print("<b>" + capitalize(item) + "</b> doesn't work on <b>" + this.name + "</b>.");
}

//Object arrays for each location, to be added in locations.js
var ForestObjs = [
	new Obj("alter", "The stone <b>alter</b> has a carving in the shape of an octagon on its top.")
];
//Customized functions for objects
ForestObjs[0].interactWith = function(item) {
	if (item === "slab") {
		updateDescrip("You place the stone <b>slab</b> into the carving on the top of the <b>alter</b>. The floor rumbles and a <b>door</b> appears in front of you.");
		oneWay('forest', 'entrance');
		var forest = getLoc('forest');
		forest.objects.push(new Obj("door", "A cold stone <b>door</b> towers in front of you."));
		forest.getObj('door').use = function () {
			player.go('entrance');
		}
		print("What will you do?");
	} else {
		print("<b>" + capitalize(item) + "</b> doesn't work on <b>" + this.name + "</b>.");
	}
}

var Loc2Objs = [];
var Loc3Objs = [];