baseTowerStats = {
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

Tower = function () {
	console.log(this);
	//this = baseTowerStats;
};
Tower.prototype.rawStats = baseTowerStats;

Tower.prototype.fireAtEnemy = function(enemy, count = 1) {
	tmpProjectile = new Projectile(enemy);
	tmpProjectile.stats = this.stats.projectileStats;
	tmpProjectile.count = count;
	tmpProjectile.position = gridToPos(this.gridPosition);
};

Tower.prototype.onTick = function(first_argument) {
	this.currentProjectileProgress += attackSpeed / config.ticksPerSecond;
	if (this.currentProjectileProgress >= 1) {
		var count = Math.floor(this.currentProjectileProgress);
		this.fireAtEnemy(/* TODO */null, count);
		this.currentProjectileProgress -= count;
	}
};

baseProjectileStats = {
	stats: {},
	count: 1,
	position: {
		x: 0,
		y: 0
	}
};
baseProjectileStats.stats = baseTowerStats.stats.projectileStats;

//Constructor function
Projectile = function(enemy){
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