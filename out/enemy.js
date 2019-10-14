var Enemy = /** @class */ (function () {
    function Enemy(stats) {
        var pos = currentGame.getSpawnPoint();
        //this.stats = clone(game.currentLevel.data.waves[game.currentWave].stats);
        this.maxHealth = stats.maxHealth;
        this.speed = stats.speed;
        this.size = stats.size;
        this.effects = stats.effects;
        this.currentHealth = this.maxHealth;
        this.position = {
            x: pos.x,
            y: pos.y
        };
        this.currentPathPoint = 0;
        this.endReached = false;
    }
    Enemy.prototype.isValid = function () {
        return !(this.endReached) && this.currentHealth > 0;
    };
    ;
    Enemy.prototype.move = function (factor) {
        if (this.endReached) {
            return;
        }
        var size = Config.gridSquareSize;
        var points = currentGame.level.pathPoints;
        var destination = points[this.currentPathPoint];
        var delta = new Vector(destination.x - this.position.x, destination.y - this.position.y);
        var baseVector = delta.normalize();
        this.position.x = this.position.x + baseVector.x * factor * this.speed;
        this.position.y = this.position.y + baseVector.y * factor * this.speed;
        if (delta.weight() <= 0.01) {
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
    ;
    Enemy.prototype.onTick = function (deltaTime) {
        this.move(deltaTime / 1000);
        //console.log(config.gridSquareSize * deltaTime/1000 * 60);
        //this.position.y += deltaTime/1000;
    };
    ;
    Enemy.prototype.render = function (ctx) {
        var topLeftCoords = this.topLeftPosition();
        var leftPx = topLeftCoords.x * Config.gridSquareSize + Config.gridOffset.x;
        var topPx = topLeftCoords.y * Config.gridSquareSize + Config.gridOffset.y;
        var sizePx = this.size * Config.gridSquareSize;
        var colorHealth = (this.currentHealth / this.maxHealth) * 120;
        var colorStr = "hsl(" + colorHealth + ", 100%, 50%)";
        ctx.fillStyle = colorStr;
        ctx.fillRect(leftPx, topPx, sizePx, sizePx);
        ctx.fillStyle = "#000000";
    };
    Enemy.prototype.topLeftPosition = function () {
        return {
            x: this.position.x - (this.size / 2),
            y: this.position.y - (this.size / 2)
        };
    };
    return Enemy;
}());
//# sourceMappingURL=enemy.js.map