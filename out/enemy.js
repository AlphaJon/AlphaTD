/// <reference path="references.ts" />
import { Config, GridPosition, Vector } from "./references.js";
export { Enemy };
var Enemy = /** @class */ (function () {
    function Enemy(stats) {
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
        this._representation = new PIXI.Graphics();
        Config.app.stage.addChild(this._representation);
    }
    Object.defineProperty(Enemy.prototype, "currentHealth", {
        get: function () {
            return this._currentHealth;
        },
        set: function (value) {
            this._currentHealth = value;
            if (this._currentHealth <= 0) {
                //TODO: setup destruction?
                this._representation.destroy();
            }
            else {
                this.render();
            }
        },
        enumerable: true,
        configurable: true
    });
    Enemy.prototype.hit = function (origin) {
        this.currentHealth -= origin.baseDamage;
    };
    Enemy.prototype.isValid = function () {
        return !(this.endReached) && this._currentHealth > 0;
    };
    ;
    Enemy.prototype.move = function (factor) {
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
            //console.log(this.currentPathPoint);
            //console.log(points);
            if (this.currentPathPoint == points.length) {
                this.endReached = true;
            }
        }
        //console.log(this.position);
    };
    ;
    Enemy.prototype.onTick = function (deltaTime) {
        this.move(deltaTime / 1000);
        if (this.isValid()) {
            var pos = this.position.toPixelPos();
            this._representation.position.x = pos.x;
            this._representation.position.y = pos.y;
            //this._representation.moveTo(pos.x, pos.y);
        }
        //console.log(config.gridSquareSize * deltaTime/1000 * 60);
        //this.position.y += deltaTime/1000;
    };
    ;
    Enemy.prototype.render = function () {
        //let topLeftCoords = this.topLeftPosition();
        //let leftPx = topLeftCoords.x * Config.gridSquareSize + Config.gridOffset.x;
        //let topPx = topLeftCoords.y * Config.gridSquareSize + Config.gridOffset.y;
        var sizePx = this.size * Config.gridSquareSize;
        var colorHealth = Math.floor((this._currentHealth / this.maxHealth) * 255);
        this._representation
            .lineStyle(1, 0x000000)
            .beginFill(colorHealth * 256)
            .drawCircle(0, 0, sizePx)
            .endFill();
        //ctx.fillStyle = colorStr;
        //ctx.fillRect(leftPx, topPx, sizePx, sizePx);
        //ctx.fillStyle = "#000000";
    };
    Enemy.prototype.topLeftPosition = function () {
        return new GridPosition(this.position.x - (this.size / 2), this.position.y - (this.size / 2));
    };
    return Enemy;
}());
//# sourceMappingURL=enemy.js.map