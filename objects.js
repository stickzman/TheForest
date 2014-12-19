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
	new Obj('door', "A cold, stone <b>door</b> towers in front of you. On its side is a large keyhole."),
	new Obj("altar", "The stone <b>altar</b> has a carving in the shape of an octagon on its top.")
];

EntranceObjs[0].use = function () {
	print("The <b>" + this.name + "</b> is locked shut.");
}
EntranceObjs[1].useWith = function (item) {
	if (item === 'slab') {
		removeItem('slab');
		updateDescrip("You place the <b>slab</b> on the top of the <b>altar</b>. With a grinding sound, the the <b>slab</b> descends into the <b>altar</b>. The wall to your left crumbles and you can see a <b>Hallway</b>.");
		this.descrip = "The top of the <b>altar</b> is push down into the body of the structure, with the <b>slab</b> stuck inside it.";
		getLoc('entrance').descrip = "In the center of the room rests the now defunct <b>altar</b>. The <b>door</b> to the <b>Forest</b> is still locked shut. The <b>Hallway</b> is behind you.";
		connect('entrance', 'hallway');
		updateLocations();
		print("What will you do?");
	} else {
		print("<b>" + capitalize(item) + "</b> doesn't work on <b>" + this.name + "</b>.");
	}
}


//HALLWAY
var nameObjs = [
	new Obj('first', ""),
	new Obj('second', ""),
	new Obj('third', ""),
	new Obj('engraving', ""),
];

var nameRoomOrder = "";
nameObjs[0].use = function() {
	buttonFunction(this);
}

nameObjs[1].use = function() {
	buttonFunction(this);
}

nameObjs[2].use = function() {
	buttonFunction(this);
}

function buttonFunction(button) {
	if (nameRoomOrder.length < 3) {
		nameRoomOrder += button.descrip.charAt(12);
	}
	if (nameRoomOrder.length === 3) {
		if (player.name.length < 3) {
			nameRoomOrder = nameRoomOrder.slice(0, nameRoomOrder.indexOf("-"));
		}
		if (nameRoomOrder.toLowerCase() === player.name.substr(0,3)) {
			nameRoomOrder = "";
			updateDescrip("You flip the <b>" + button.name + "</b> switch. The '" + button.descrip.charAt(12) + "' on its base lights up. By entering the first 3 letters of your name, you have activated the switches. You hear a loud metal clank from the <b>Observatory</b>.");
			connect('observatory', 'staircase');
			updateLocations();
			var observatory = getLoc('observatory');
			observatory.getObj('gate').descrip = "The rusted <b>gate</b> lies broken on the floor next to the entrance to the <b>Staircase</b>.";
			observatory.descrip = 'To your left, a large metal <b>gate</b> lies on the floor near the entrance to the <b>Staircase</b>. In the center of the room is a pool of boiling <b>water</b>. On the other side of the <b>water</b>, you can see a <b>Dungeon</b>. On the ground lies a small golden <b>key</b>. To your right is the <b>Hallway</b>.'
			print("What will you do?");
			//Reset interactivity
			nameObjs[0].use = function() {
				print("The <b>first</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[1].use = function() {
				print("The <b>second</b> switch is fixed in the 'ON' position.");
			}
			nameObjs[2].use = function() {
				print("The <b>third</b> switch is fixed in the 'ON' position.");
			}
		} else {
			nameRoomOrder = "";
			print("You flip the <b>" + button.name + "</b> switch. The '" + button.descrip.charAt(12) + "' on its base glows for a second, but as the lights on all three switches die out, you realize it was the wrong combination.");
		}
		
	} else {
		print("You flip the <b>" + button.name + "</b> switch. The '" + button.descrip.charAt(12) + "' on the base of the <b>" + button.name + "</b> switch lights up.");
	}
}

nameObjs[3].use = function() {
	player.look(this.name);
}

//OBSERVATORY
var observatoryObjs = [
	new Obj('gate', "A rusted metal <b>gate</b> blocks the passage to the <b>Staircase</b>."),
	new Obj('water', "A deep pool of boiling <b>water</b> blocks your path to the <b>Dungeon</b>.")
];

//STAIRCASE
var stairObjs = [];

//FIREPIT
var fireObjs = [
	new Obj('pit', 'Flames fire up from the <b>pit</b>\'s center, making the whole room unbearably hot. It appears to be heating the building, but for who is unclear.'),
	new Obj('machine', 'The heavy <b>machine</b> appears to be producing the flames. Amoungst its dusty dials and monitors is an empty keyhole.')
];

fireObjs[1].useWith = function(item) {
	if (item === 'key') {
		var rnd = Math.random();
		if (rnd < 0.5) {
			updateDescrip("You turn the <b>key</b> in the <b>machine</b> and the whole thing comes humming to a stop. As you pull the <b>key</b> out, the flames in the <b>pit</b> die down the whole building begins to cool.");
			getLoc("firepit").descrip = 'The <b>pit</b> in the middle of the room is cool and dark. At the other end the large <b>machine</b> sits silently. Behind you is the <b>Staircase</b>.';
			var observatory = getLoc("observatory");
			observatory.getObj('water').descrip = "The pool of <b>water</b> has cool to a comfortable temperature. You can now cross it and enter the <b>Dungeon</b>.";
			observatory.descrip = "To your left, a large metal <b>gate</b> lies on the floor near the entrance to the <b>Staircase</b>. It appears the pool of <b>water</b> has cooled down significantly. On the other side of the <b>water</b>, you can see a <b>Dungeon</b>. To your right is the <b>Hallway</b>.";
		} else {
			updateDescrip("You turn the <b>key</b> in the <b>machine</b> and the the whole thing appears to go into overdrive! As you pull the <b>key</b> out, the flames in the <b>pit</b> grow in size! The room could quickly cook you alive!");
			getLoc("firepit").descrip = 'The <b>pit</b> in the middle of the room is spewing flames larger than you have ever seen. At the other end the large <b>machine</b> loudly clanks on. Behind you is the <b>Staircase</b>.';
			var observatory = getLoc("observatory");
			observatory.getObj('water').descrip = "The pool of <b>water</b> has evaporated. You can now enter the <b>Dungeon</b>.";
			observatory.descrip = "To your left, a large metal <b>gate</b> lies on the floor near the entrance to the <b>Staircase</b>. The <b>Observatory</b> has a warm mist hanging over it, and the pool of <b>water</b> is no longer on the ground. Through the mist, you can see a <b>Dungeon</b>. To your right is the <b>Hallway</b>.";
		}
	} else {
		print("<b>" + capitalize(item) + "</b> doesn't work on <b>" + this.name + "</b>.");
	}
}