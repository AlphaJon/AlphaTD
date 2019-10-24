/// <reference path="references.ts" />
import { Config } from "./references.js";
import { Projectile } from "./projectile.js";
export { Tower, towerList };
var defaultTower = {
    cost: 10,
    attackSpeed: 5,
    damage: 1,
    range: 3,
    projectileSpeed: 10,
    effects: []
};
var towerList = {
    "defaultTower": defaultTower
};
var Tower = /** @class */ (function () {
    function Tower(baseTowerStats) {
        console.log(this);
        this.level = 1;
        this.cost = baseTowerStats.cost;
        this.baseAttackSpeed = baseTowerStats.attackSpeed;
        this.baseRange = baseTowerStats.range;
        this.baseDamage = baseTowerStats.damage;
        this.projectileSpeed = baseTowerStats.projectileSpeed;
        this.effects = baseTowerStats.effects;
        this.reloadProgress = 0;
        this.thrownProjectiles = [];
    }
    Tower.prototype.fireAtEnemy = function (enemy, count) {
        if (count === void 0) { count = 1; }
        console.log("Pew pew " + count + " time(s)");
        var tmpProjectile = new Projectile(this, enemy);
        tmpProjectile.weight = count;
        this.thrownProjectiles.push(tmpProjectile);
        tmpProjectile.render();
    };
    ;
    Tower.prototype.onTick = function (deltaTime) {
        console.log(this.thrownProjectiles);
        this.thrownProjectiles = this.thrownProjectiles.filter(function (projectile) {
            projectile.onTick(deltaTime);
            return !projectile.endReached;
        }, this);
        this.reloadProgress += this.baseAttackSpeed * deltaTime / 1000;
        if (this.reloadProgress < 1) {
            return;
        }
        var enemies = Config.currentGame.getEnemiesInRange(this.gridPosition, this.baseRange);
        if (enemies.length > 0) {
            //if enemy in range
            var count = Math.floor(this.reloadProgress);
            this.fireAtEnemy(enemies[0], count);
            this.reloadProgress -= count;
        }
        else {
            //Can store up to 1 charge when no enemies
            this.reloadProgress = Math.max(this.reloadProgress, 1);
        }
    };
    Tower.prototype.setPosition = function (position) {
        this.gridPosition = position;
    };
    Tower.prototype.render = function () {
        var pos = this.gridPosition.toPixelPos();
        var cell = new PIXI.Sprite(PIXI.Texture.fromImage("img/tower.png"));
        cell.width = Config.gridSquareSize;
        cell.height = Config.gridSquareSize;
        cell.x = pos.x;
        cell.y = pos.y;
        Config.app.stage.addChild(cell);
    };
    return Tower;
}());
//# sourceMappingURL=tower.js.map