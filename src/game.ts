/// <reference path="references.ts" />
import {
	Config, Level, WaveData, GridPosition, 
	Renderable, Tickable, Tower, Enemy
} from "./references.js";

export {Game}


/**
 * Starts a new game based on a given level, builds level from levelData
 */
class Game implements Renderable, Tickable{
	public level: Level;
	public waveNumber: number = 0;
	public towerList: Tower[];
	public enemyList: Enemy[];
	public pendingEnemyList: {enemy:Enemy, delay:number}[];
	private _money: number;

	get money(): number{
		return this._money;
	}

	set money(value: number){
		this._money = value;
		let moneyTag = document.querySelector("#moneydisplay");
		if (moneyTag !== null) {
			moneyTag.innerHTML = "" + value;
		}
	}

	constructor(intLevel:number) {
		this.level = new Level(intLevel);
		this.money = this.level.startingMoney;
		this.waveNumber = 0;
		this.towerList = [];
		this.enemyList = [];
		this.pendingEnemyList = [];
		Config.app.ticker.add(this.onTick, this);
		this.render();
	}

	public getCurrentWave(): WaveData {
		return this.level.waves[this.waveNumber];
	}

	public getSpawnPoint(): GridPosition {
		return this.level.spawnPoint;
	}

	public getEnemiesInRange(position: GridPosition, range: number): Enemy[]{
		let rangeSquared = range*range;
		let result = this.enemyList.filter(function(en: Enemy){
			if (en.destroyed) return false;
			//Inside this function, this = position
			let enGridPos = en.position;
			let xdiff = Math.abs(position.x - enGridPos.x);
			let ydiff = Math.abs(position.y - enGridPos.y);
			return xdiff*xdiff + ydiff*ydiff <= rangeSquared;
		});
		return result;
	}

	//note: probably more efficient but unstable when there are holes in array
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

	/*public getSpawnPoint():GridPosition {
		var rawSpawn = this.level.spawnPoint;
		return rawSpawn;
	}*/

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

	public onTick(deltaTime: number) {
		//console.log(Config.app.ticker.elapsedMS);
		//deltaTime = Config.app.ticker.elapsedMS;
		deltaTime = deltaTime * 20;
		//Note: filter does not modify non-objects
		//But here that's OK because we are processing objects
		this.pendingEnemyList = this.pendingEnemyList.filter(function(pendingEn){
			pendingEn.delay -= deltaTime;
			if (pendingEn.delay <= 0) {
				this.enemyList.push(pendingEn.enemy);
				pendingEn.enemy.render();
				//Remove element from array
				return false;
			}
			//Keep element in array
			return true;
		}, this);
	
		this.enemyList = this.enemyList.filter(function(en){
			if (en.destroyed) return false;
			//console.log(en);
			en.onTick(deltaTime);
			//en.render();
			return en.isValid();
			//return true;
		}, this);
	
		this.towerList.map(function(twr){
			twr.onTick(deltaTime);
			//twr.render();
		});
	}

	public pause(){
		Config.paused = true;
		Config.app.ticker.stop();
		//window.cancelAnimationFrame(animationFrameId);
	}

	public render(){
		this.level.render();
	}

	public resume(){
		Config.paused = false;
		Config.app.ticker.start();
		//animationFrameId = window.requestAnimationFrame(initGameTick);
	}
}