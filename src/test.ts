Config.canvas.onclick = function(event){
	//console.log(config.canvas);
	//console.log(event);
	var wave = currentGame.getCurrentWave();
	var en = new Enemy(wave.enemyStats);
	console.log(wave);
	currentGame.enemyList.push(en);
	console.log(en.position);
	console.log(currentGame.enemyList);
}

document.getElementById('level1').onclick = function(event){
	console.log('Level 1 loaded');
	currentGame = new Game(0);
}

document.getElementById('wave').onclick = function(event){
	//var level = currentGame.currentLevel;
	//console.log(level);
	var wave = currentGame.getCurrentWave();
	currentGame.launchNextWave();
	currentGame.waveNumber--;
}

function drawSquare(x,y,size) {
	var render = Config.canvasRender;
	var gridSize = Config.gridSquareSize;
	render.fillRect(x*gridSize, y*gridSize, size*gridSize, size*gridSize);
}