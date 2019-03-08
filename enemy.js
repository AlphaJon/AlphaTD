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
	this.position = {
		x: pos.x,
		y: pos.y
	};
	this.currentPathPoint = 0;
};
enemy.prototype.stats = clone(baseEnemyStats);

enemy.prototype.topLeftPosition = function(){
	return {
		x: this.position.x - (this.stats.size /2),
		y: this.position.y - (this.stats.size /2)
	};
}

enemy.prototype.move = function(factor){
	var size = config.gridSquareSize;
	var destination = currentGame.level.layout.pathPoints[this.currentPathPoint];
	var deltaPosition = {
		x: destination.x + 0.5 - this.position.x,
		y: destination.y + 0.5 - this.position.y
	}
	//is in (-pi, pi), pi inclusive
	var angle = Math.atan2(deltaPosition.y,deltaPosition.x) + (Math.random()-0.5)*2;
	this.position.x = this.position.x + Math.cos(angle)* factor * this.stats.speed;
	this.position.y = this.position.y + Math.sin(angle)* factor * this.stats.speed;

	if ((deltaPosition.x * deltaPosition.x)
		+ (deltaPosition.y * deltaPosition.y) <= 0.01) {
		//console.log("x:"+this.position.x+", y: "+this.position.y);
		this.currentPathPoint++;
	}
	//console.log(this.position);
};

enemy.prototype.onTick = function(deltaTime){
	this.move(deltaTime/1000);
	//console.log(config.gridSquareSize * deltaTime/1000 * 60);
	
	//this.position.y += deltaTime/1000;
};