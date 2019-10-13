let baseTowerStats = {
	stats: {
		level: 1,
		cost: 0,
		attackSpeed: 1,
		projectileStats: {
			damage: 0,
			range: 0,
			speed: 1,
			specials: []
		}
	},
	currentProjectileProgress: 0,
	gridPosition: {
		x: 0,
		y: 0
	}
};

class Tower implements Tickable{
	
	public level: number;
	public cost: number;
	public attackSpeed: number;

	public baseDamage: number;
	public baseRange: number;
	public projectileSpeed: number;
	public effects: any[];

	private reloadProgress: number;
	public gridPosition: GridPosition;

	constructor() {
		console.log(this);
	}

	public fireAtEnemy(enemy, count = 1) {
		let tmpProjectile = new Projectile(enemy);
		tmpProjectile.count = count;
		tmpProjectile.position = gridToPos(this.gridPosition);
	};
	
	onTick(deltaTime: number): void {
		this.reloadProgress += this.attackSpeed * deltaTime;
		if (this.reloadProgress >= 1) {
			var count = Math.floor(this.reloadProgress);
			this.fireAtEnemy(/* TODO */null, count);
			this.reloadProgress -= count;
		}
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
baseProjectileStats.stats = baseTowerStats.stats.projectileStats;

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