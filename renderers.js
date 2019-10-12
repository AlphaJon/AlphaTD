Enemy.prototype.render = function(ctx){
	var topLeftCoords = this.topLeftPosition();
	var leftPx = topLeftCoords.x * config.gridSquareSize + config.gridOffset;
	var topPx = topLeftCoords.y * config.gridSquareSize + config.gridOffset;
	var sizePx = this.stats.size * config.gridSquareSize;
	ctx.strokeRect(leftPx, topPx, sizePx, sizePx);
};

Game.prototype.render = function(ctx){
	var size = config.gridSquareSize;
	var currentPos = {
		x: config.gridOffset.x,
		y: config.gridOffset.y,
	};
	//ctx.fillStyle("rgb(0,0,0)");
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 12; j++) {
			if (this.grid[i][j] == 0) {
				ctx.strokeRect(currentPos.x, currentPos.y, size, size);
			} else {
				//ctx.strokeRect(currentPos.x, currentPos.y, size/2, size/2);
				//ctx.strokeRect(currentPos.x + size/2, currentPos.y + size/2, size/2, size/2);
				//ctx.fillRect(currentPos.x, currentPos.y, size, size);
			}

			currentPos.y += size;
		}
		currentPos.x += size;
		currentPos.y = config.gridOffset.y;
	}
};

Tower.prototype.render = function(ctx) {
	//TODO
};

Projectile.prototype.render = function(ctx) {
	//TODO
};