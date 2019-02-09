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

tower = function () {
	console.log(this);
	//this = baseTowerStats;
};
tower.prototype = baseTowerStats;

tower.prototype.fire = function(enemy, count = 1) {
	tmpProjectile = new projectile(enemy);
	tmpProjectile.stats = this.stats.projectileStats;
	tmpProjectile.count = count;
	tmpProjectile.position = gridToPos(this.gridPosition);
};

tower.prototype.onTick = function(first_argument) {
	this.currentProjectileProgress += attackSpeed / config.ticksPerSecond;
	if (this.currentProjectileProgress >= 1) {
		var count = Math.floor(this.currentProjectileProgress);
		this.fire(/* TODO */null, count);
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
projectile = function(enemy){
	this.targetEnemy = enemy;
}

projectile.prototype.onTick = function(first_argument) {
	// body...
};

projectile.prototype.hit = function(first_argument) {
	// body...
};

/*special = {};

special.prototype.apply = function(enemy) {
	// body...
};*/