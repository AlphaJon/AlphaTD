import { Config } from "./references.js";
export { effects };
var effects = {
    AOEeffect: function AOEeffect(projectile) {
        var explosion = new PIXI.Graphics();
        Config.app.stage.addChild(explosion);
        var enemyPos = projectile.target.position.toPixelPos();
        explosion
            //.beginFill(0xFF0000)
            //.drawCircle(0, 0, 3*Config.gridSquareSize)
            //.endFill()
            .position.set(enemyPos.x, enemyPos.y);
        var enemiesinRange = Config.currentGame.getEnemiesInRange(projectile.position, 3);
        for (var index = 0; index < enemiesinRange.length; index++) {
            var element = enemiesinRange[index];
            if (element !== projectile.target) {
                element.currentHealth -= projectile.owner.baseDamage;
            }
        }
        var ticker = new PIXI.ticker.Ticker();
        var scale = 0;
        ticker.add(function (deltaTime) {
            explosion.clear();
            if (scale > 1) {
                explosion.destroy();
                ticker.destroy();
                return;
            }
            explosion
                .lineStyle(5, 0xFFFFFF)
                .drawCircle(0, 0, 3 * scale * Config.gridSquareSize)
                .lineStyle(3, 0x00FFFF)
                .drawCircle(0, 0, 3 * scale * Config.gridSquareSize);
            scale += deltaTime;
        });
        ticker.speed = 0.05;
        ticker.start();
        /*setTimeout(function() {
            explosion.destroy();
            explosion = null;
        }, 50)*/
    }
};
//# sourceMappingURL=effects.js.map