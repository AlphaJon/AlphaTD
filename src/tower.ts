interface TowerData {
	cost: number;
	attackSpeed: number;
	damage: number;
	range: number;
	projectileSpeed: number;
	effects: any[];
}

let defaultTower:TowerData = {
	cost: 10,
	attackSpeed: 5,
	damage: 1,
	range: 3,
	projectileSpeed: 3,
	effects: []
}

class Tower implements Renderable, Tickable{
	//public position: GridPosition;
	public level: number;
	public cost: number;

	public baseAttackSpeed: number;
	public baseDamage: number;
	public baseRange: number;

	public projectileSpeed: number;
	public effects: any[];

	private reloadProgress: number;
	public gridPosition: GridPosition;

	constructor(baseTowerStats:TowerData) {
		console.log(this);
		this.level = 1;
		this.cost = baseTowerStats.cost;
		this.baseAttackSpeed = baseTowerStats.attackSpeed;
		this.baseRange = baseTowerStats.range;
		this.baseDamage = baseTowerStats.damage;

		this.projectileSpeed = baseTowerStats.projectileSpeed;
		this.effects = baseTowerStats.effects;
		this.reloadProgress = 0;
	}

	public fireAtEnemy(enemy: Enemy, count = 1) {
		console.log(`Pew pew ${count} time(s)`);
		enemy.currentHealth -= this.baseDamage;
		//let tmpProjectile = new Projectile(enemy);
		//tmpProjectile.count = count;
		//tmpProjectile.position = gridToPos(this.gridPosition);
	};
	
	onTick(deltaTime: number): void {
		this.reloadProgress += this.baseAttackSpeed * deltaTime/1000;
		if (this.reloadProgress < 1) {
			return;
		}
		var enemies:Enemy[] = currentGame.getEnemiesInRange(this.gridPosition, this.baseRange);
		if (enemies.length > 0) {
			var count = Math.floor(this.reloadProgress);
			this.fireAtEnemy(enemies[0], count);
			this.reloadProgress -= count;
		}
	}

	setPosition(position: GridPosition) {
		this.gridPosition = position;
	}

	render(ctx:CanvasRenderingContext2D) {
		let pos = gridToPos(this.gridPosition);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(pos.x, pos.y, Config.gridSquareSize, Config.gridSquareSize);
		ctx.fillStyle = "#000000";
	}
}

let baseProjectileStats = {
	stats: {},
	count: 1,
	position: {
		x: 0,
		y: 0
	}
};
//baseProjectileStats.stats = baseTowerStats.stats.projectileStats;

//Constructor function
let Projectile = function(enemy){
	this.targetEnemy = enemy;
}

Projectile.prototype.onTick = function(first_argument) {
	// body...
};

Projectile.prototype.hit = function(first_argument) {
	// body...
};

/*special = {};

special.prototype.apply = function(enemy) {
	// body...
};*/