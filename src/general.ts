class Config {
	static paused = true;
	static gridSquareSize = 32; //size of one grid square in pixels
	static gridOffset: PixelPosition = { //shift from up-left corner in pixels
		x: 0,
		y: 0
	};
	static gridCells = {
		width: 15,
		height: 12
	};
	static canvas = document.getElementById('render-canvas') as HTMLCanvasElement;
	static canvasRender = Config.canvas.getContext("2d");
};

let currentGame:Game = null;

interface GridPosition {
	x: number;
	y: number;
}

interface PixelPosition {
	x: number;
	y: number;
}

interface Cloneable {
	clone(): any;
}

interface Tickable {
	onTick(deltaTime:number): void;
}

interface Renderable {
	render(ctx:CanvasRenderingContext2D): void;
}
/**
 * Starts a new game based on a given level, builds level from levelData
 */
class Game implements Renderable, Tickable{
	public level: Level;
	public waveNumber: number = 0;
	public towerList: Tower[];
	public enemyList: Enemy[];
	public pendingEnemyList: {enemy:Enemy, delay:number}[];

	constructor(intLevel:number) {
		this.level = new Level(levelDataArray[intLevel]);
		this.waveNumber = 0;
		this.towerList = [];
		this.enemyList = [];
		this.pendingEnemyList = [];
	}

	public getCurrentWave():WaveData {
		return this.level.waves[this.waveNumber];
	}

	public getEnemiesInRange(position: GridPosition, range: number): Enemy[]{
		let rangeSquared = range*range;
		let result = this.enemyList.filter(function(en){
			//Inside this function, this = position
			let enGridPos = en.position;
			let xdiff = Math.abs(this.x - enGridPos.x);
			let ydiff = Math.abs(this.y - enGridPos.y);
			return xdiff*xdiff + ydiff*ydiff <= rangeSquared;
		}, position);
		return result;
	}

	//public getEnemiesInRange(position: GridPosition, range: number): Enemy[]{
	//	console.log(position);
	//	let enemiesInRange:Enemy[] = [];
	//	let rangeSquared = range*range;
	//	for (let index = 0; index < this.enemyList.length; index++) {
	//		const en = this.enemyList[index];
	//		let xdiff = Math.abs(position.x - en.position.x);
	//		let ydiff = Math.abs(position.y - en.position.y);
	//		console.log("" + xdiff + ", " + ydiff);
	//		if (xdiff*xdiff + ydiff*ydiff <= rangeSquared) {
	//			enemiesInRange.push(en);
	//		}
	//	}
	//	return enemiesInRange;
	//}

	public getSpawnPoint():GridPosition {
		var rawSpawn = this.level.spawnPoint;
		return {
			x: rawSpawn.x,
			y: rawSpawn.y,
		};
	}

	public launchNextWave() {
		var wave = this.getCurrentWave();
		for (var i = 0; i < wave.enemyCount; i++) {
			var en = new Enemy(wave.enemyStats);
			this.pendingEnemyList.push({
				enemy: en,
				delay: wave.delayBetweenSpawns * i
			});
			
		}
		this.waveNumber++;
	}

	public onTick(deltaTime) {
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
			en.render(Config.canvasRender);
			return en.isValid();
			//return true;
		}, this);
	
		this.towerList.map(function(twr){
			twr.onTick(deltaTime);
			twr.render(Config.canvasRender);
		});
	}

	public render(ctx:CanvasRenderingContext2D){
		this.level.render(ctx);
	}
}

var animationFrameId = null;
var lastframe: number = 0;

function initGameTick(timestamp: number) {
	lastframe = timestamp;
	requestAnimationFrame(gameTick);
}

function gameTick(timestamp: number) {
	var render = Config.canvasRender;
	var deltaTime = timestamp - lastframe;
	var fps = 1000/deltaTime;
	render.clearRect(0,0,
		Config.canvas.width,
		Config.canvas.height);
	
	currentGame.render(Config.canvasRender);
	//console.log(timestamp);
	//console.log(deltaTime);
	//console.log(game.enemyList);
	currentGame.onTick(deltaTime);

	document.getElementById("fpscounter").innerHTML = Math.round(fps) as unknown as string;

	lastframe = timestamp;
	if (!(Config.paused)) {
		animationFrameId = window.requestAnimationFrame(gameTick);
	}
}

function gridToPos(gridPosition: GridPosition): PixelPosition {
	return {
		x: gridPosition.x * Config.gridSquareSize + Config.gridOffset.x,
		y: gridPosition.y * Config.gridSquareSize + Config.gridOffset.y
	};
}

function posToGrid(position: PixelPosition): GridPosition {
	return {
		x: Math.floor((position.x - Config.gridOffset.x)/Config.gridSquareSize),
		y: Math.floor((position.y - Config.gridOffset.y)/Config.gridSquareSize)
	}
}

//Thank you StackOverflow
//Note: do not use on objects than contain functions, or Date objects
//Also avoid using in CPU-intensive code unless necessary, performance cost over manually creating objects
function clone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

function play(){
	Config.paused = false;
	animationFrameId = window.requestAnimationFrame(initGameTick);
}

function pause(){
	Config.paused = true;
	window.cancelAnimationFrame(animationFrameId);
}
