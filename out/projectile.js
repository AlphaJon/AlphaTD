import { Config, Vector, GridPosition } from "./references.js";
export { Projectile };
var baseProjectileStats = {
    stats: {},
    count: 1,
    position: {
        x: 0,
        y: 0
    }
};
//baseProjectileStats.stats = baseTowerStats.stats.projectileStats;
var Projectile = /** @class */ (function () {
    function Projectile(owner, target) {
        this.owner = owner;
        this.target = target;
        this.position = new GridPosition(owner.gridPosition.x + 0.5, owner.gridPosition.y + 0.5);
        this.speed = owner.projectileSpeed;
        this.size = Projectile.defaultSize;
        this._destroyed = false;
        this._endReached = false;
        this._representation = new PIXI.Graphics();
        Config.app.stage.addChild(this._representation);
    }
    Object.defineProperty(Projectile.prototype, "endReached", {
        get: function () {
            return this._endReached;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Projectile.prototype, "weight", {
        get: function () {
            return this._weight;
        },
        set: function (value) {
            this._weight = value;
            this.size = Projectile.defaultSize + Math.min(value - 1, 5);
        },
        enumerable: true,
        configurable: true
    });
    Projectile.prototype.destroy = function () {
        if (this._destroyed)
            return;
        this._destroyed = true;
        this.owner.removeProjectile(this);
        this._representation.destroy();
        this.owner = null;
        this.target = null;
        this.position = null;
    };
    Projectile.prototype.move = function (factor) {
        if (this._endReached) {
            return;
        }
        var destination = this.target.position;
        var delta = new Vector(destination.x - this.position.x, destination.y - this.position.y);
        //console.log(this.position);
        var baseVector = delta.normalize();
        //console.log(baseVector);
        this.position.x = this.position.x + baseVector.x * factor * this.speed;
        this.position.y = this.position.y + baseVector.y * factor * this.speed;
        //console.log(this.position);
        //if the projectile overlaps the enemy at 90%
        if (delta.weight() <= this.size / 10) {
            this._endReached = true;
            this.target.hit(this.owner);
            this.destroy();
        }
        //console.log(this.position);
    };
    ;
    Projectile.prototype.onTick = function (deltaTime) {
        if (this._destroyed) {
            return;
        }
        if (this.target.destroyed) {
            this.destroy();
            return;
        }
        this.move(deltaTime / 1000);
        if (!this._endReached) {
            var pos = this.position.toPixelPos();
            this._representation.position.x = pos.x;
            this._representation.position.y = pos.y;
        }
    };
    Projectile.prototype.render = function () {
        this._representation
            .lineStyle(1, 0x000000)
            .beginFill(0xFFFF00)
            .drawCircle(0, 0, this.size)
            .endFill();
    };
    Projectile.defaultSize = 5;
    return Projectile;
}());
/*special = {};

special.prototype.apply = function(enemy) {
    // body...
};*/ 
//# sourceMappingURL=projectile.js.map