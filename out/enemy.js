/// <reference path="references.ts" />
import { Config, GridPosition, Vector } from "./references.js";
export { Enemy };
class Enemy {
    constructor(stats) {
        var pos = Config.currentGame.getSpawnPoint();
        //this.stats = clone(game.currentLevel.data.waves[game.currentWave].stats);
        this.maxHealth = stats.maxHealth;
        this.speed = stats.speed;
        this.size = stats.size;
        this.effects = stats.effects;
        this._currentHealth = this.maxHealth;
        this.position = GridPosition.fromPoint(pos);
        this.currentPathPoint = 0;
        this.endReached = false;
    }
    get currentHealth() {
        return this._currentHealth;
    }
    set currentHealth(value) {
        this._currentHealth = value;
        if (this._currentHealth <= 0) {
            //TODO: setup destruction?
        }
    }
    isValid() {
        return !(this.endReached) && this._currentHealth > 0;
    }
    ;
    move(factor) {
        if (this.endReached) {
            return;
        }
        var size = Config.gridSquareSize;
        var points = Config.currentGame.level.pathPoints;
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
    }
    ;
    onTick(deltaTime) {
        this.move(deltaTime / 1000);
        //console.log(config.gridSquareSize * deltaTime/1000 * 60);
        //this.position.y += deltaTime/1000;
    }
    ;
    render(ctx) {
        let topLeftCoords = this.topLeftPosition();
        let leftPx = topLeftCoords.x * Config.gridSquareSize + Config.gridOffset.x;
        let topPx = topLeftCoords.y * Config.gridSquareSize + Config.gridOffset.y;
        let sizePx = this.size * Config.gridSquareSize;
        let colorHealth = (this._currentHealth / this.maxHealth) * 120;
        let colorStr = `hsl(${colorHealth}, 100%, 50%)`;
        ctx.fillStyle = colorStr;
        ctx.fillRect(leftPx, topPx, sizePx, sizePx);
        ctx.fillStyle = "#000000";
    }
    topLeftPosition() {
        return new GridPosition(this.position.x - (this.size / 2), this.position.y - (this.size / 2));
    }
}
//# sourceMappingURL=enemy.js.map