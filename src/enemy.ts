/// <reference path="references.ts" />

import {
	Config, Renderable, Tickable, GridPosition, Vector, Tower
} from "./references.js";
export {Enemy, EnemyData}

interface EnemyData {
	maxHealth: number;
	speed: number;
	size: number;
	worth: number;
	effects: any[];
}

class Enemy implements Renderable, Tickable{
	
	public position: GridPosition;
	public maxHealth: number;
	private _currentHealth: number;
	public speed: number;
	public size: number;
	public effects: any[]; //TODO

	private currentPathPoint: number;
	private _destroyed: boolean;
	private endReached: boolean;
	private _representation: PIXI.Graphics;

	get currentHealth() {
		return this._currentHealth;
	}

	set currentHealth(value: number) {
		if (this._currentHealth <= 0) return; 
		if (value <= 0){
			this.destroy();
		} else {
			this.render();
		}
		this._currentHealth = value;
	}

	get destroyed() {
		return this._destroyed;
	}

	constructor(stats: EnemyData) {
		var pos = Config.currentGame.getSpawnPoint();
		//this.stats = clone(game.currentLevel.data.waves[game.currentWave].stats);

		this.maxHealth = stats.maxHealth;
		this.speed = stats.speed;
		this.size = stats.size;
		this.effects = stats.effects;

		this._currentHealth = this.maxHealth;
		this._destroyed = false;
		this.position = GridPosition.fromPoint(pos);
		this.currentPathPoint = 0;
		this.endReached = false;

		this._representation = new PIXI.Graphics();
		Config.app.stage.addChild(this._representation);
	}

	public destroy() {
		if (this._destroyed) return;

		this._destroyed = true;
		this._representation.destroy();
		this.position = null;
		this.effects = null;
	}

	public hit(origin: Tower) {
		this.currentHealth -= origin.baseDamage;
	}

	public isValid() {
		return !(this.endReached) && this._currentHealth > 0;
	};

	public move(factor: number){
		if (this.endReached) {
			return;
		}
		var size = Config.gridSquareSize;
		var points = Config.currentGame.level.pathPoints
		var destination = points[this.currentPathPoint];
		var delta = new Vector(
			destination.x - this.position.x,
			destination.y - this.position.y
		);
		var baseVector = delta.normalize();
		this.position.x = this.position.x + baseVector.x * factor * this.speed;
		this.position.y = this.position.y + baseVector.y * factor * this.speed;
	
		if (delta.weight() <= 0.01) {
			//console.log("x:"+this.position.x+", y: "+this.position.y);
			this.currentPathPoint++;
			//console.log(this.currentPathPoint);
			//console.log(points);
			if (this.currentPathPoint == points.length) {
				this.endReached = true;
				this.destroy();
			}
		}
		//console.log(this.position);
	};

	public onTick(deltaTime){
		if (this._destroyed) return;
		this.move(deltaTime/1000);
		if (this.isValid()){
			let pos = this.position.toPixelPos();
			this._representation.position.x = pos.x;
			this._representation.position.y = pos.y;
			//this._representation.moveTo(pos.x, pos.y);
		}
		
		//console.log(config.gridSquareSize * deltaTime/1000 * 60);
		
		//this.position.y += deltaTime/1000;
	};
	
	public render(){
		//let topLeftCoords = this.topLeftPosition();
		//let leftPx = topLeftCoords.x * Config.gridSquareSize + Config.gridOffset.x;
		//let topPx = topLeftCoords.y * Config.gridSquareSize + Config.gridOffset.y;
		let sizePx = this.size * Config.gridSquareSize;
		let colorHealth = Math.floor((this._currentHealth/this.maxHealth)*255);
		this._representation
			.lineStyle(1, 0x000000)
			.beginFill(colorHealth*256)
			.drawCircle(0, 0, sizePx)
			.endFill();
		//ctx.fillStyle = colorStr;
		//ctx.fillRect(leftPx, topPx, sizePx, sizePx);
		//ctx.fillStyle = "#000000";
	}

	private topLeftPosition(): GridPosition{
		return new GridPosition(
			this.position.x - (this.size /2),
			this.position.y - (this.size /2)
		);
	}
} 