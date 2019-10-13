var baseTowerStats = {
    stats: {
        level: 1,
        cost: 0,
        attackSpeed: 1,
        projectileStats: {
            damage: 0,
            range: 0,
            speed: 1,
            specials: []
        }
    },
    currentProjectileProgress: 0,
    gridPosition: {
        x: 0,
        y: 0
    }
};
var Tower = /** @class */ (function () {
    function Tower() {
        console.log(this);
    }
    Tower.prototype.fireAtEnemy = function (enemy, count) {
        if (count === void 0) { count = 1; }
        var tmpProjectile = new Projectile(enemy);
        tmpProjectile.count = count;
        tmpProjectile.position = gridToPos(this.gridPosition);
    };
    ;
    Tower.prototype.onTick = function (deltaTime) {
        this.reloadProgress += this.attackSpeed * deltaTime;
        if (this.reloadProgress >= 1) {
            var count = Math.floor(this.reloadProgress);
            this.fireAtEnemy(/* TODO */ null, count);
            this.reloadProgress -= count;
        }
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
baseProjectileStats.stats = baseTowerStats.stats.projectileStats;
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
