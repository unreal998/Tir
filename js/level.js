var arrVal = []
var createLevel = function (object) {
	arrVal = [];

	var amimSpaceShip = pjs.tiles.newAnimation(object.targetFile, 900,330,30);

	bg = game.newImageObject({
	file : object.bgFile,
	onload: function () {
		aimObject.setPosition(bg.getPositionC());
	}
});

	aim = game.newImageObject({
	file : object.aimFile,
	w: joyRadius*1.5, h: joyRadius*1.5

});

	bullfile = object.bulletFile;
	firebutton = object.fireFile;
	boomfile = object.scoreFile;

	OOP.forInt(object.val,function () {
	var obj =	game.newAnimationObject({
			animation: amimSpaceShip,
			y: random(20,gameHeight*2), x:random(0,gameWidth*2),
			w: 150, h: 50,
			fillColor: '#FF0000',
			userData: {
				dx : random(-5, 5, true),
				dy: 0
			}
		});

		obj.setDelay(10-Math.abs(obj.dx));

		if (obj.dx > 0) {
			obj.setFlip(1,0);
		}
		arrVal.push(obj);
	});
};


var createLocalLevel= function (level){
	// body...
createLevel ({
	bgFile:'levels/'+level+'/spacebg.png',
	val:10,
	targetFile : 'levels/'+level+'/spaceship.png',
	aimFile: 'levels/'+level+'/aim.png',
	bulletFile: 'levels/'+level+'/bullet.png',
	fireFile: 'levels/'+level+'/fire.png'
});
};


var drawVal = function(){
	OOP.forArr(arrVal,function(val, i , arr){
		if (!val) return;
		val.draw();

		if (!val.dy) 
			val.drawFrames(0,1);
		else{
			val.drawFrame(2,3);
			val.turn(val.dx);
		}

		if(val.x < -val.w && val.dx < 0)
			val.x = bg.w+val.w;

		if(val.x > bg.w && val.dx > 0)
			val.x = -val.w;

		val.move(point(val.dx, val.dy));

		if (val.y>bg.h && bg.loaded) {
			arr.splice(i,1);
		}
	});
};
var shotTop = function () {
	OOP.forArr(arrVal, function (val, i, arr) {
		if (aimObject.isDynamicInside(val.getDynamicBox())) {
			
			log(1);
			score+=1;
			val.dy = 3;
			shot = false;
			fireRect.fillColor='#FF7575';
		}
	});
};