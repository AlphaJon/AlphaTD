/// <reference path="references.ts" />

import {
	Config, GridPosition, PixelPosition, Game,
	Enemy, Tower, towerList
} from "./references.js";

Config.canvas.onclick = function(event){
	// https://stackoverflow.com/questions/55677/
	const rect = Config.canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	//console.log(event);
	//console.log(`clicked at ${event.x}, ${event.y}`);
	testSpawnTower(new PixelPosition(x, y).toGridPos());
}

document.getElementById('level1').onclick = function(event){
	console.log('Level 1 loaded');
	Config.currentGame = new Game(0);
}

document.getElementById('wave').onclick = function(event){
	var wave = Config.currentGame.getCurrentWave();
	Config.currentGame.launchNextWave();
	Config.currentGame.waveNumber--;
}

document.getElementById("start").onclick = function (event) {
	Config.currentGame.resume();
}

document.getElementById("pause").onclick = function (event) {
	Config.currentGame.pause();
}

//function drawSquare(x,y,size) {
//	var render = Config.canvasRender;
//	var gridSize = Config.gridSquareSize;
//	render.fillRect(x*gridSize, y*gridSize, size*gridSize, size*gridSize);
//}

function testSpawnEnemy() {
	//console.log(config.canvas);
	//console.log(event);
	var wave = Config.currentGame.getCurrentWave();
	var en = new Enemy(wave.enemyStats);
	console.log(wave);
	Config.currentGame.enemyList.push(en);
	console.log(en.position);
	console.log(Config.currentGame.enemyList);
}

function testSpawnTower(position:GridPosition) {
	if (Config.currentGame.money >= towerList.defaultTower.cost) {
		Config.currentGame.money -= towerList.defaultTower.cost;
		let twr = new Tower(towerList.defaultTower);
		twr.setPosition(position);
		Config.currentGame.towerList.push(twr);
	}
	
}