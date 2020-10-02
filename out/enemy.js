import { textures } from "./init.js";
import { GridPosition } from "./utility/position.js";
import { Vector2 } from "./utility/vector.js";
export class Enemy {
    constructor(stats, game) {
        this.game = game;
        var pos = game.getSpawnPoint();
        //this.stats = clone(game.currentLevel.data.waves[game.currentWave].stats);
        this.maxHealth = stats.maxHealth;
        this.speed = stats.speed;
        this.size = stats.size;
        this.effects = stats.effects;
        this._currentHealth = this.maxHealth;
        this._destroyed = false;
        this.position = GridPosition.fromPoint(pos);
        this.currentPathPoint = 0;
        this.endReached = false;
        this._representation = new PIXI.Sprite(textures["tower"]);
        this.render();
        this.game.getContainer().addChild(this._representation);
        //app.stage.addChild(this._representation);
    }
    get currentHealth() {
        return this._currentHealth;
    }
    set currentHealth(value) {
        if (this._currentHealth <= 0)
            return;
        if (value <= 0) {
            this.destroy();
        }
        else {
            this.render();
        }
        this._currentHealth = value;
    }
    get destroyed() {
        return this._destroyed;
    }
    destroy() {
        if (this._destroyed)
            return;
        this._destroyed = true;
        this._representation.destroy();
    }
    hit(origin) {
        origin.owner.effects.forEach(function (effect) {
            effect(origin);
        });
        this.currentHealth -= origin.owner.baseDamage;
    }
    isValid() {
        return !(this.endReached) && this._currentHealth > 0;
    }
    ;
    move(factor) {
        if (this.endReached) {
            return;
        }
        var size = 1;
        var points = this.game.level.pathPoints;
        var destination = points[this.currentPathPoint];
        var delta = new Vector2(destination.x - this.position.x, destination.y - this.position.y);
        var baseVector = delta.normalize();
        this.position.x = this.position.x + baseVector.x * factor * this.speed;
        this.position.y = this.position.y + baseVector.y * factor * this.speed;
        if (delta.weight() <= 0.01) {
            console.log("x:" + this.position.x + ", y: " + this.position.y);
            this.currentPathPoint++;
            //console.log(this.currentPathPoint);
            //console.log(points);
            if (this.currentPathPoint == points.length) {
                this.endReached = true;
                this.destroy();
            }
        }
        //console.log(this.position);
    }
    ;
    onTick(deltaTime) {
        if (this._destroyed)
            return;
        this.move(deltaTime / 1000);
        if (this.isValid()) {
            let pos = this.position; //.toPixelPos();
            this._representation.position.x = pos.x;
            this._representation.position.y = pos.y;
            //this._representation.moveTo(pos.x, pos.y);
        }
        //console.log(config.gridSquareSize * deltaTime/1000 * 60);
        //this.position.y += deltaTime/1000;
    }
    ;
    render() {
        //let topLeftCoords = this.topLeftPosition();
        //let leftPx = topLeftCoords.x * Config.gridSquareSize + Config.gridOffset.x;
        //let topPx = topLeftCoords.y * Config.gridSquareSize + Config.gridOffset.y;
        let sizePx = this.size;
        let colorHealth = Math.floor((this._currentHealth / this.maxHealth) * 255);
        this._representation.width = 1;
        this._representation.height = 1;
        this._representation.anchor.set(0.5, 0.5);
        this._representation.position.set(this.position.x, this.position.y);
        /*this._representation
            .lineStyle(1, 0x000000)
            .beginFill(colorHealth*256)
            .drawCircle(0, 0, sizePx)
            .endFill();*/
        //ctx.fillStyle = colorStr;
        //ctx.fillRect(leftPx, topPx, sizePx, sizePx);
        //ctx.fillStyle = "#000000";
    }
    topLeftPosition() {
        return new GridPosition(this.position.x - (this.size / 2), this.position.y - (this.size / 2));
    }
}
//# sourceMappingURL=enemy.js.map