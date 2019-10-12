logger = {
	log: function(thing){
		console.log(thing);
	}
}

config = {};

config.paused = true;
config.gridSquareSize = 32; //size of one grid square
//shift from up-left corner
config.gridOffset = {
	x: 0,
	y: 0
}; 
config.gridCells = {
	width: 15,
	height: 12
}
config.canvas = document.getElementById('render-canvas');
config.canvasRender = config.canvas.getContext("2d");

currentGame = null;

/**
 * Starts a new game based on a given level, builds level from levelData
 * level: {
 	layout: {
 		spawn: position, 
 		pathPoints: [position]
 		},
 	},
 	waves: [{
		count: integer,
		delay: integer,
		enemyStats: object
 	}]
 */
Game = function (intLevel) {

	this.level = clone(levelData[intLevel]);
	this.waveNumber = 0;
	this.grid = [];
	this.buildGrid();
	this.towerList = [];
	this.enemyList = [];
	this.pendingEnemyList = [];
}
Game.prototype.buildGrid = function () {
	var startPoint = {
		x: Math.floor(this.level.layout.spawn.x),
		y: Math.floor(this.level.layout.spawn.y)
	}

	for (var i = 0; i < config.gridCells.width; i++) {
		this.grid[i] = [];
		for (var j = 0; j < config.gridCells.height; j++) {
			this.grid[i][j] = 0;
		}
	}
	this.grid[startPoint.x][startPoint.y] = 1;

	for (var i = 0; i < this.level.layout.pathPoints.length; i++) {
		var nextPoint = {
			x: Math.floor(this.level.layout.pathPoints[i].x),
			y: Math.floor(this.level.layout.pathPoints[i].y)
		};
		var moved = true;
		while (moved){
			moved = false;
			//Going left
			if (startPoint.x - nextPoint.x >= 1) {
				moved = true;
				startPoint.x -= 1;
			}
			//Going right
			if (startPoint.x - nextPoint.x <= -1) {
				moved = true;
				startPoint.x += 1;
			}
			//Going up
			if (startPoint.y - nextPoint.y <= -1) {
				moved = true;
				startPoint.y += 1;
			}
			//Going down
			if (startPoint.y - nextPoint.y >= 1) {
				moved = true;
				startPoint.y -= 1;
			}
			this.grid[startPoint.x][startPoint.y] = 1;
		}
		
	}
}

Game.prototype.getCurrentWave = function() {
	return this.level.waves[this.waveNumber];
};

Game.prototype.getSpawnPoint = function() {
	var rawSpawn = this.level.layout.spawn;
	return {
		x: rawSpawn.x,
		y: rawSpawn.y,
	}
};

Game.prototype.launchNextWave = function() {
	var wave = this.getCurrentWave;
	for (var i = 0; i < wave.enemyCount; i++) {
		var en = new Enemy(wave.stats);
		this.pendingEnemyList.push({
			enemy: en,
			delay: wave.enemydelay * i
		});
		
	}
	this.waveNumber++;
};

Game.prototype.onTick = function(deltaTime) {
	//Note: filter does not modify non-objects
	//But here that's OK because we are processing objects
	this.pendingEnemyList = this.pendingEnemyList.filter(function(pendingEn){
		pendingEn.delay -= deltaTime;
		if (pendingEn.delay <= 0) {
			this.enemyList.push(pendingEn.enemy);
			//Remove element from array
			return false;
		}
		//Keep element in array
		return true;
	}, this);

	this.enemyList = this.enemyList.filter(function(en){
		//console.log(en);
		en.onTick(deltaTime);
		en.render(config.canvasRender);
		return en.isValid();
		//return true;
	}, this);

	this.towerList.map(function(twr){
		twr.onTick(deltaTime);
	});
};


var animationFrameId = null;
var lastframe = 0;
function initGameTick(timestamp) {
	lastframe = timestamp;
	requestAnimationFrame(gameTick);
}

function gameTick(timestamp) {
	var render = config.canvasRender;
	var deltaTime = timestamp - lastframe;
	var fps = 1000/deltaTime;
	render.clearRect(0,0,
		config.canvas.width,
		config.canvas.height);
	
	currentGame.render(config.canvasRender);
	//console.log(timestamp);
	//console.log(deltaTime);
	//console.log(game.enemyList);
	currentGame.onTick(deltaTime);

	document.getElementById("fpscounter").innerHTML = Math.round(fps);

	lastframe = timestamp;
	if (!(config.paused)) {
		animationFrameId = window.requestAnimationFrame(gameTick);
	}
}

function gridToPos(gridPosition) {
	return {
		x: gridPosition.x * config.gridSquareSize - (config.gridSquareSize/2) + config.gridOffset,
		y: gridPosition.y * config.gridSquareSize - (config.gridSquareSize/2) + config.gridOffset
	};
}

//Thank you StackOverflow
//Note: do not use on objects than contain functions, or Date objects
//Also avoid using in CPU-intensive code unless necessary, performance cost over manually creating objects
function clone(obj){
	return JSON.parse(JSON.stringify(obj));
}

function play(){
	config.paused = false;
	animationFrameId = window.requestAnimationFrame(initGameTick);
}

function pause(){
	config.paused = true;
	window.cancelAnimationFrame(animationFrameId);
}
