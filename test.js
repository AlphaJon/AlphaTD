config.canvas.onclick = function(event){
	//console.log(config.canvas);
	//console.log(event);
	var en = new enemy();
	enS = en;
	//enS.position = {};
	//enS.position.x = event.x - config.canvas.offsetLeft;
	//enS.position.y = event.y - config.canvas.offsetTop;
	enS.stats.size = 10 + 5*currentGame.enemyList.length;
	currentGame.enemyList.push(en);
	//console.log(en);
	console.log(currentGame.enemyList);
}

document.getElementById('level1').onclick = function(event){
	console.log('Level 1 start');
	currentGame = new Game(0);
}

document.getElementById('wave').onclick = function(event){
	var level = currentGame.currentLevel;
	console.log(level);
	level.launchWave();
}