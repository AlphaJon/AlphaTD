import { Config } from "./references.js";
export { effects };
var effects = {
    AOEeffect: function AOEeffect(projectile) {
        var explosion = new PIXI.Graphics();
        Config.app.stage.addChild(explosion);
        var enemyPos = projectile.target.position.toPixelPos();
        explosion.lineStyle(3, 0xFF0000)
            //.beginFill(0xFF0000)
            .drawCircle(0, 0, 3 * Config.gridSquareSize)
            //.endFill()
            .position.set(enemyPos.x, enemyPos.y);
        var enemiesinRange = Config.currentGame.getEnemiesInRange(projectile.position, 3);
        for (var index = 0; index < enemiesinRange.length; index++) {
            var element = enemiesinRange[index];
            element.currentHealth -= projectile.owner.baseDamage;
        }
        setTimeout(function name() {
            explosion.destroy();
        }, 50);
    }
};
//# sourceMappingURL=effects.js.map