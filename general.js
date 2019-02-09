config = {};

config.game = {};
config.game.paused = true;
config.game.gridSquareSize = 32; //size of one grid square
config.game.gridOffset = {
	x: 0,
	y: 0
}; //shift from up-left corner
config.ticksPerSecond = 60; //effectively maximum framerate
//TODO: try to make it work for 60 ticks
config.game.canvas = document.getElementById('render-canvas');
config.game.canvasRender = config.game.canvas.getContext("2d");

game = {
	isRunning: false,
	currentLevel: null,
	currentGrid: null,
	currentWave: 0,
	towerList: [],
	enemyList: []
}

var animationFrameId = null;
var lastframe = 0;
function gameTick(timestamp) {
	var render = config.game.canvasRender;
	var deltaTime = timestamp - lastframe;
	render.clearRect(0,0,
		config.game.canvas.width,
		config.game.canvas.height);
	
	drawGrid();
	//console.log(timestamp);
	console.log(deltaTime);

	lastframe = timestamp;
	if (!(config.game.paused)) {
		animationFrameId = window.requestAnimationFrame(gameTick);
	}
}

function drawGrid(){
	var render = config.game.canvasRender;
	var size = config.game.gridSquareSize;
	var currentPos = {
		x: config.game.gridOffset.x,
		y: config.game.gridOffset.y,
	};
	//render.fillStyle("rgb(0,0,0)");
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			render.strokeRect(currentPos.x, currentPos.y, size, size);

			currentPos.x += size;
		}
		currentPos.y += size;
		currentPos.x = config.game.gridOffset.x;
	}
}

function startLevel(intLevel) {
	game.currentLevel = new level(intLevel);
	game.currentWave = 0;
}

function spawnEnemy(enemy){
	enemy.position.x = game.currentLevel.data.layout.spawn.x;
	enemy.position.y = game.currentLevel.data.layout.spawn.y;
	//TODO: add enemy to enemyList
}

function gridToPos(gridPosition) {
	return {
		x: gridPosition.x * config.gridSquareSize - (config.gridSquareSize/2) + config.gridOffset,
		y: gridPosition.y * config.gridSquareSize - (config.gridSquareSize/2) + config.gridOffset
	};
}

edges = {
	left: {
		x: -0.5,
		y: 0
	},
	right: {
		x: 0.5,
		y: 0
	},
	up: {
		x: 0,
		y: -0.5
	},
	down: {
		x: 0,
		y: 0.5
	}
}

//As recommended by StackOverflow
//Note: do not use if it contains objects with functions, or Date objects
function clone(obj){
	return JSON.parse(JSON.stringify(obj));
}

function play(){
	config.game.paused = false;
	animationFrameId = window.requestAnimationFrame(gameTick);
}

function pause(){
	config.game.paused = true;
	window.cancelAnimationFrame(animationFrameId);
}
