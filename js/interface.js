var joyRadius = gameHeight/6;

var aimObject = game.newBaseObject({
	x:(gameWidth)/2, y:gameHeight/2,
});
var aimObject2 = game.newBaseObject({
	x:(gameWidth)/2, y:gameHeight/2,
});
var aim;

var joy = game.newCircleObject({
	x:gameWidth+30, y:75,
	radius : joyRadius,
	fillColor: 'red',
	alpha:0.2
});
var joystic = game.newCircleObject({
	x:gameWidth+30, y:75,
	radius : joyRadius/2,
	fillColor: pjs.colors.hex2rgba('#FF0000',0.3),
	strokeColor:'red',
	strokeWidth: 3
});
var fireRect = game.newRectObject({
	x:0, y:0,
	w: gameWidth, h:gameHeight,
	fillColor: 'white'
});

var exit = game.newImageObject({
	file : 'img/exit.png',
	scale: 0.08,
	alpha: 0.8
});
var bg;
var bullfile;
var firebutton;
var boomfile;
var pressTime = 0;
var ammo = 10;
var score = 0;
var bgDraw = function () {
	bg.draw();
}
var drawInterface = function () {
	joy.setPositionS({
	x:gameWidth-joy.w-10,
	y:gameHeight-joy.h-10
	});

	fireRect.setPositionS(point(0,0));

	var fire = game.newImageObject({
	file : firebutton,
	scale: 0.6
   });

	
	fire.setPositionS({
		y:gameHeight-130,
		x:gameWidth-950
	});
	var dist = joystic.getDistanceC(joy.getPositionC());
	if(touch.isDown() && touch.isInStatic(joy.getStaticBox())){
	joystic.moveTimeC(touch.getPosition(),5);
	if (joy.alpha<0.7)
		joy.alpha += 0.05;
					} else{
	joystic.moveTimeC(joy.getPositionC(),10);
	if (joy.alpha>0.2)
		joy.alpha -= 0.05;
	}

	
	var angle = vector.getAngle2Points(joy.getPositionC(), joystic.getPositionC());
	aimObject.setAngle(angle);
	aimObject.moveAngle(dist/10);
	aim.draw();

	joy.draw();
	joystic.draw();

	fire.draw();

	aimObject2.moveTimeC(aimObject.getPositionC(),10);
	//aim.moveTimeC(aimObject.getPositionC(),5);
	aim.motionC(aimObject2.getPositionC(), size(random(0,10)/5,random(0,10)/5),10);

	OOP.forInt(ammo, function(i){
		brush.drawImageS({
		x:200+(20+5)*i, y:gameHeight-(105*0.5)-10,
		w:20*0.5 , h:105*0.5,
		file: bullfile
		});
	});

	OOP.forInt(score, function(i){
		brush.drawImageS({
		x:20+(20+5)*i, y:10,
		w:996*0.2 , h:648*0.2,
		file:'levels/level1/boom.png'
		});
	});
	if (touch.isPress() && touch.isInStatic(fire.getStaticBox())) {
		pressTime = game.getTime();
	}
	if (touch.isUp()) {
		if(game.getTime()- pressTime <100 && ammo){
			shot = true;
			ammo-=1;
			fireRect.fillColor = 'white';
			fireRect.setAlpha(1);
			aimObject2.move(point(0,-50));
			aimObject.move(point(random(-5, 5), random(-5, 5)));

		}
	}
	if (fireRect.getAlpha()>0) {
		fireRect.setAlpha(fireRect.getAlpha()-0.05);
		fireRect.draw();
	}
	exit.setPositionS(point(width-exit.w-10, 10))
	exit.draw();

	camera.moveTime(vector.pointMinus(aim.getPositionC(),point(gameWidth/2,gameHeight/2)),10);

	if (aimObject.x < gameWidth/2) 
		camera.setPosition({x:0,y:false});
	if (aimObject.y < gameHeight/2) 
		camera.setPosition({x:false,y:0});
	if (aimObject.x > bg.w - gameWidth/2)
		camera.setPosition({x: bg.w-gameWidth ,y:false});
	if (aimObject.y > (bg.h - gameHeight/2))
		camera.setPosition({x: false, y:bg.h-gameHeight});

	if (touch.isPeekObject(exit)) {
		game.setLoop('menu');
		score =0;
		
		return;
	}

};
