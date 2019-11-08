import {Config, Projectile, Enemy} from "./references.js"
export { effects };

/**this interface is here to ensure that all effect functions
 * have consistent parameter lists
 * in this case, a single parameter being a Projectile
*/
interface effectFunctionObject {
    AOEeffect: (_: Projectile) => void
}

let effects: effectFunctionObject = {
    AOEeffect: function AOEeffect(projectile: Projectile) {
        let explosion = new PIXI.Graphics();
        Config.app.stage.addChild(explosion);

        let enemyPos = projectile.target.position.toPixelPos();

        explosion.lineStyle(3, 0xFF0000)
        //.beginFill(0xFF0000)
        .drawCircle(0, 0, 3*Config.gridSquareSize)
        //.endFill()
        .position.set(enemyPos.x, enemyPos.y);
        
        let enemiesinRange = Config.currentGame.getEnemiesInRange(projectile.position, 3);
        for (let index = 0; index < enemiesinRange.length; index++) {
            const element = enemiesinRange[index];
            element.currentHealth -= projectile.owner.baseDamage;
        }
        
        
        setTimeout(function name() {
            explosion.destroy();
        }, 50)
    }
}
