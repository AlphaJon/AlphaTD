baseEnemyStats = {
	maxHealth: 0,
	speed: 0,
	size: 0,
	effects: []
};

Enemy = function(stats) {
	var pos = currentGame.getSpawnPoint();
	//this.stats = clone(game.currentLevel.data.waves[game.currentWave].stats);
	this.stats = clone(stats);
	this.currentHealth = this.stats.maxHealth;
	this.position = {
		x: pos.x,
		y: pos.y
	};
	this.currentPathPoint = 0;
	this.endReached = false;
};
Enemy.prototype.stats = clone(baseEnemyStats);

Enemy.prototype.topLeftPosition = function(){
	return {
		x: this.position.x - (this.stats.size /2),
		y: this.position.y - (this.stats.size /2)
	};
}

Enemy.prototype.move = function(factor){
	if (this.endReached) {
		return;
	}
	var size = config.gridSquareSize;
	var points = currentGame.level.layout.pathPoints
	var destination = points[this.currentPathPoint];
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
		console.log(this.currentPathPoint);
		console.log(points);
		if (this.currentPathPoint == points.length) {
			this.endReached = true;
		}
	}
	//console.log(this.position);
};

Enemy.prototype.onTick = function(deltaTime){
	this.move(deltaTime/1000);
	//console.log(config.gridSquareSize * deltaTime/1000 * 60);
	
	//this.position.y += deltaTime/1000;
};

Enemy.prototype.isValid = function() {
	return !(this.endReached) && this.currentHealth > 0;
};