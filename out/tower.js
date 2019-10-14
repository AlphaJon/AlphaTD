var defaultTower = {
    cost: 0,
    attackSpeed: 5,
    damage: 1,
    range: 3,
    projectileSpeed: 3,
    effects: []
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
    }
    Tower.prototype.fireAtEnemy = function (enemy, count) {
        if (count === void 0) { count = 1; }
        console.log("Pew pew " + count + " time(s)");
        enemy.currentHealth -= this.baseDamage;
        //let tmpProjectile = new Projectile(enemy);
        //tmpProjectile.count = count;
        //tmpProjectile.position = gridToPos(this.gridPosition);
    };
    ;
    Tower.prototype.onTick = function (deltaTime) {
        this.reloadProgress += this.baseAttackSpeed * deltaTime / 1000;
        if (this.reloadProgress < 1) {
            return;
        }
        var enemies = currentGame.getEnemiesInRange(this.gridPosition, this.baseRange);
        if (enemies.length > 0) {
            var count = Math.floor(this.reloadProgress);
            this.fireAtEnemy(enemies[0], count);
            this.reloadProgress -= count;
        }
    };
    Tower.prototype.setPosition = function (position) {
        this.gridPosition = position;
    };
    Tower.prototype.render = function (ctx) {
        var pos = gridToPos(this.gridPosition);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(pos.x, pos.y, Config.gridSquareSize, Config.gridSquareSize);
        ctx.fillStyle = "#000000";
    };
    return Tower;
}());
var baseProjectileStats = {
    stats: {},
    count: 1,
    position: {
        x: 0,
        y: 0
    }
};
//baseProjectileStats.stats = baseTowerStats.stats.projectileStats;
//Constructor function
var Projectile = function (enemy) {
    this.targetEnemy = enemy;
};
Projectile.prototype.onTick = function (first_argument) {
    // body...
};
Projectile.prototype.hit = function (first_argument) {
    // body...
};
/*special = {};

special.prototype.apply = function(enemy) {
    // body...
};*/ 
//# sourceMappingURL=tower.js.map