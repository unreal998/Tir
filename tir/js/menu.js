var newLocalLevel1 = game.newTextObject({
	text: "level1 (without internet)",
	x:10 , y:10,
	color: "#FFFFFF",
	size : gameWidth/20
});
var newLocalLevel2 = game.newTextObject({
	text: "level2 (without internet)",
	x:10 , y:80,
	color: "#FFFFFF",
	size : gameWidth/20
});


var drawMenu = function () {
	newLocalLevel1.draw();
	newLocalLevel2.draw();

	if (touch.isPeekObject(newLocalLevel1)){
		createLocalLevel('level1');
		game.setLoop('tir');
		return
	} 
	if (touch.isPeekObject(newLocalLevel2)){
		createLocalLevel('level2');
		game.setLoop('tir');
		return
	} 

	
};