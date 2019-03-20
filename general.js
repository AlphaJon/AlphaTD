logger = {
	log: function(thing){
		console.log(thing);
	}
}

config = {};

config.paused = true;
config.gridSquareSize = 32; //size of one grid square
config.gridOffset = {
	x: 0,
	y: 0
}; //shift from up-left corner
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
 		spawn: position+edge, 
 		pathPoints: [position]
 		},
 	},
 	waves: [{
		count: integer,
		delay: integer,
		stats: object
 	}]
 */
Game = function (intLevel) {

	this.level = clone(levelData[intLevel]);
	this.currentWave = 0;
	this.grid = [];
	this.buildGrid();
	this.towerList = [];
	this.enemyList = [];
	this.pendingEnemyList = [];
}
Game.prototype.buildGrid = function () {
	var startPoint = {
		x: this.level.layout.spawn.x,
		y: this.level.layout.spawn.y
	}

	for (var i = 0; i < config.gridCells.width; i++) {
		this.grid[i] = [];
		for (var j = 0; j < config.gridCells.height; j++) {
			this.grid[i][j] = 0;
		}
	}
	this.grid[startPoint.x][startPoint.y] = 1;

	for (var i = 0; i < this.level.layout.pathPoints.length; i++) {
		var nextPoint = this.level.layout.pathPoints[i];
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

Game.prototype.getSpawnPoint = function() {
	var rawSpawn = this.level.layout.spawn;
	return {
		x: rawSpawn.x + edges[rawSpawn.edge].x,
		y: rawSpawn.y + edges[rawSpawn.edge].y,
	}
};

Game.prototype.launchWave = function() {
	
	var currentWave = this.level.waves[this.currentWave];
	for (var i = 0; i < currentWave.count; i++) {
		var en = new Enemy(currentWave.stats);
		this.pendingEnemyList.push({
			enemy: en,
			delay: currentWave.delay * i
		});
		
	}
	this.currentWave++;
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
		var render = config.canvasRender;
		//console.log(en);
		en.onTick(deltaTime);
		var enPosition = en.topLeftPosition();
		var enSize = en.stats.size * config.gridSquareSize;
		render.strokeRect(config.gridSquareSize*(enPosition.x), 
			config.gridSquareSize*(enPosition.y), 
			enSize, 
			enSize);
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
	
	drawGrid();
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

function drawGrid(){
	var render = config.canvasRender;
	var size = config.gridSquareSize;
	var grid = currentGame.grid;
	var currentPos = {
		x: config.gridOffset.x,
		y: config.gridOffset.y,
	};
	//render.fillStyle("rgb(0,0,0)");
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 12; j++) {
			if (grid[i][j] == 0) {
				render.strokeRect(currentPos.x, currentPos.y, size, size);
			} else {
				//render.strokeRect(currentPos.x, currentPos.y, size/2, size/2);
				//render.strokeRect(currentPos.x + size/2, currentPos.y + size/2, size/2, size/2);
				//render.fillRect(currentPos.x, currentPos.y, size, size);
			}

			currentPos.y += size;
		}
		currentPos.x += size;
		currentPos.y = config.gridOffset.y;
	}
}

function gridToPos(gridPosition) {
	return {
		x: gridPosition.x * config.gridSquareSize - (config.gridSquareSize/2) + config.gridOffset,
		y: gridPosition.y * config.gridSquareSize - (config.gridSquareSize/2) + config.gridOffset
	};
}

edges = {
	left: {
		x: 0,
		y: 0.5
	},
	right: {
		x: 1,
		y: 0.5
	},
	up: {
		x: 0.5,
		y: 0
	},
	down: {
		x: 1,
		y: 0.5
	}
}

//As recommended by StackOverflow
//Note: do not use if it contains objects with functions, or Date objects
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
