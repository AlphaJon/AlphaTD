/// <reference path="references.ts" />
import { Config, Projectile, effects } from "./references.js";
import { TowerRenderer } from "./renderers/towerRenderer.js";
export { Tower, towerList };
var defaultTower = {
    cost: 10,
    attackSpeed: 1,
    damage: 1,
    range: 3,
    projectileSpeed: 5,
    effects: ["AOEeffect"]
};
var towerList = {
    "defaultTower": defaultTower
};
function JSONtoTower(jsonData) {
    return JSON.parse(jsonData);
}
var Tower = /** @class */ (function () {
    function Tower(baseTowerStats) {
        var _a, _b, _c, _d, _e;
        //console.log(this);
        this.level = 1;
        this.totalCost = (_a = baseTowerStats.cost) !== null && _a !== void 0 ? _a : 0;
        this.baseAttackSpeed = (_b = baseTowerStats.attackSpeed) !== null && _b !== void 0 ? _b : 1;
        this.baseRange = (_c = baseTowerStats.range) !== null && _c !== void 0 ? _c : 1;
        this.baseDamage = (_d = baseTowerStats.damage) !== null && _d !== void 0 ? _d : 0;
        this.projectileSpeed = (_e = baseTowerStats.projectileSpeed) !== null && _e !== void 0 ? _e : 1;
        this.effects = baseTowerStats.effects ? baseTowerStats.effects.map(function (eff) { return effects[eff]; }) : [];
        this.reloadProgress = 0;
        this.thrownProjectiles = [];
        this.renderer = new TowerRenderer(this);
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
        //console.log(this.thrownProjectiles);
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
            this.reloadProgress = Math.min(this.reloadProgress, 1);
        }
    };
    Tower.prototype.setPosition = function (position) {
        this.gridPosition = position;
    };
    Tower.prototype.removeProjectile = function (projectile) {
        this.thrownProjectiles = this.thrownProjectiles.filter(function (element) {
            return element !== projectile;
        });
    };
    Tower.prototype.render = function () {
        this.renderer.render();
    };
    return Tower;
}());
//# sourceMappingURL=tower.js.map