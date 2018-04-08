pjs.system.setTitle('PointJS Game'); // Set Title for Tab or Window

createLocalLevel('level1');
createLocalLevel('level2');

//createServerLevel();
game.newLoop('tir',function () {
	game.fill('#D9D9D9');

	shot = false;

	bgDraw();
	drawVal();
	drawInterface();

	if (shot) {
		shotTop();
	}

});
game.newLoop('menu',function () {
	game.fill('#1a3868');

	drawMenu();

});

game.startLoop('menu');
