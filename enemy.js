baseEnemyStats = {
	maxHealth: 0,
	speed: 0,
	size: 0,
	effects: []
};

enemy = function(stats) {
	var pos = currentGame.getSpawnPoint();
	//this.stats = clone(game.currentLevel.data.waves[game.currentWave].stats);
	this.stats = clone(stats);
	this.currentHealth = this.maxHealth;
	this.position = pos;
	this.currentPathPoint = 0;
};
enemy.prototype.stats = clone(baseEnemyStats);

enemy.prototype.move = function(factor){
	var size = config.gridSquareSize;
	var destination = currentGame.layout.pathPoints[this.currentPathPoint];
	var deltaPosition = {
		x: destination.x - this.position.x,
		y: destination.y - this.position.y
	}
	//is in (-pi, pi), pi inclusive
	var angle = Math.atan2(y,x);
	this.position.x = this.position.x + Math.cos(angle)* factor * this.stats.speed;
	this.position.y = this.position.y + Math.sin(angle)* factor * this.stats.speed;

	if (deltaPosition.x * deltaPosition.x
		+ deltaPosition.y * deltaPosition.y <= 1) {
		this.currentPathPoint++;
	}
};

enemy.prototype.onTick = function(deltaTime){
	this.move(deltaTime/1000);
	//console.log(config.gridSquareSize * deltaTime/1000 * 60);
	
	//this.position.y += deltaTime/1000;
};