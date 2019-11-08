/// <reference path="references.ts" />

import {Config, Renderable, Tickable, GridPosition, Enemy, Projectile, effects } from "./references.js";
export {Tower, towerList}

interface TowerData {
	cost: number;
	attackSpeed: number;
	damage: number;
	range: number;
	projectileSpeed: number;
	effects: ((_: Projectile)=>void)[];
}

let defaultTower:TowerData = {
	cost: 10,
	attackSpeed: 5,
	damage: 1,
	range: 3,
	projectileSpeed: 10,
	effects: [effects.AOEeffect]
}

let towerList = {
	"defaultTower": defaultTower
}

class Tower implements Renderable, Tickable{
	//public position: GridPosition;
	public level: number;
	public cost: number;

	public baseAttackSpeed: number;
	public baseDamage: number;
	public baseRange: number;

	public projectileSpeed: number;
	public effects: ((_: Projectile)=>void)[];

	private reloadProgress: number;
	public gridPosition: GridPosition;
	private thrownProjectiles: Projectile[];

	constructor(baseTowerStats:TowerData) {
		//console.log(this);
		this.level = 1;
		this.cost = baseTowerStats.cost;
		this.baseAttackSpeed = baseTowerStats.attackSpeed;
		this.baseRange = baseTowerStats.range;
		this.baseDamage = baseTowerStats.damage;

		this.projectileSpeed = baseTowerStats.projectileSpeed;
		this.effects = baseTowerStats.effects;
		this.reloadProgress = 0;
		this.thrownProjectiles = [];
	}

	public fireAtEnemy(enemy: Enemy, count = 1) {
		console.log(`Pew pew ${count} time(s)`);
		
		let tmpProjectile = new Projectile(this, enemy);
		tmpProjectile.weight = count;
		this.thrownProjectiles.push(tmpProjectile);
		tmpProjectile.render();
	};
	
	onTick(deltaTime: number): void {
		//console.log(this.thrownProjectiles);
		this.thrownProjectiles = this.thrownProjectiles.filter(function(projectile: Projectile) {
			projectile.onTick(deltaTime);
			return !projectile.endReached;
		}, this);

		this.reloadProgress += this.baseAttackSpeed * deltaTime/1000;
		if (this.reloadProgress < 1) {
			return;
		}
		var enemies:Enemy[] = Config.currentGame.getEnemiesInRange(this.gridPosition, this.baseRange);
		if (enemies.length > 0) {
			//if enemy in range
			var count = Math.floor(this.reloadProgress);
			this.fireAtEnemy(enemies[0], count);
			this.reloadProgress -= count;
		} else {
			//Can store up to 1 charge when no enemies
			this.reloadProgress = Math.min(this.reloadProgress, 1);
		}
		
	}

	setPosition(position: GridPosition) {
		this.gridPosition = position;
	}

	removeProjectile(projectile: Projectile) {
		this.thrownProjectiles = this.thrownProjectiles.filter(function(element){
			return element !== projectile;
		});
	}

	render() {
		let pos = this.gridPosition.toPixelPos();
		let cell = new PIXI.Sprite(PIXI.Texture.fromImage("img/tower.png"));
		cell.width = Config.gridSquareSize;
		cell.height = Config.gridSquareSize;
		cell.x = pos.x;
		cell.y = pos.y;
		Config.app.stage.addChild(cell);
	}
}