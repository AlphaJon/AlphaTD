import { Projectile } from "./projectile.js";
import { TowerRenderer } from "./renderers/towerRenderer.js";
export { Tower };
class Tower {
    constructor(towerStats, position, game) {
        //console.log(this);
        this.game = game;
        this.level = 1;
        this.totalCost = towerStats.cost;
        this.baseAttackSpeed = towerStats.attackSpeed;
        this.baseRange = towerStats.range;
        this.baseDamage = towerStats.damage;
        this.projectileSpeed = towerStats.projectileSpeed;
        this.effects = []; //towerStats.effects.map((eff) => this.effects[eff]);
        this.gridPosition = position;
        this.reloadProgress = 0;
        this.thrownProjectiles = [];
        this._renderer = new TowerRenderer();
        this.render();
    }
    fireAtEnemy(enemy, count = 1) {
        console.log(`Pew pew ${count} time(s)`);
        let tmpProjectile = new Projectile(this, enemy);
        tmpProjectile.weight = count;
        this.thrownProjectiles.push(tmpProjectile);
        tmpProjectile.render();
    }
    ;
    onTick(deltaTime) {
        //console.log(this.thrownProjectiles);
        this.thrownProjectiles = this.thrownProjectiles.filter(function (projectile) {
            projectile.onTick(deltaTime);
            return !projectile.endReached;
        }, this);
        this.reloadProgress += this.baseAttackSpeed * deltaTime / 1000;
        if (this.reloadProgress < 1) {
            return;
        }
        var enemies = this.game.getEnemiesInRange(this.gridPosition, this.baseRange);
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
    }
    removeProjectile(projectile) {
        this.thrownProjectiles = this.thrownProjectiles.filter(function (element) {
            return element !== projectile;
        });
    }
    render() {
        this._renderer.render(this);
    }
}
//# sourceMappingURL=tower.js.map