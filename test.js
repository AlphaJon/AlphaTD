config.canvas.onclick = function(event){
	//console.log(config.canvas);
	//console.log(event);
	var wave = currentGame.level.waves[currentGame.currentWave];
	var en = new enemy(wave.stats);
	console.log(wave);
	currentGame.enemyList.push(en);
	console.log(en.position);
	console.log(currentGame.enemyList);
}

document.getElementById('level1').onclick = function(event){
	console.log('Level 1 start');
	currentGame = new Game(0);
}

document.getElementById('wave').onclick = function(event){
	//var level = currentGame.currentLevel;
	//console.log(level);
	currentGame.launchWave();
	currentGame.currentWave--;
}

function drawSquare(x,y,size) {
	var render = config.canvasRender;
	var gridSize = config.gridSquareSize;
	render.fillRect(x*gridSize, y*gridSize, size*gridSize, size*gridSize);
}