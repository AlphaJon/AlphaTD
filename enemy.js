baseEnemyStats = {
	maxHealth: 0,
	position: {
		x: 0,
		y: 0
	},
	speed: 0,
	size: 0,
	effects: []
};

enemy = function(stats) {
	this.stats = clone(stats);
	this.currentHealth = this.maxHealth;
	this.position = clone(game.currentLevel.spawnPosition);
};
enemy.prototype.stats = clone(baseEnemyStats);

enemy.prototype.move = function(){

};

enemy.prototype.onTick = function(){

};