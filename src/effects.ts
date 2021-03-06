import { app } from "./init.js";
import { Projectile } from "./projectile.js";

/**this interface is here to ensure that all effect functions
 * have consistent parameter lists
 * in this case, a single parameter being a Projectile
*/
interface effectFunctionObject {
    [key: string]: (_: Projectile) => void
}

let effects: effectFunctionObject = {
    AOEeffect: function AOEeffect(projectile: Projectile) {
        let explosion = new PIXI.Graphics();
        app.stage.addChild(explosion);

        let enemyPos = projectile.target.position.toPixelPos();

        explosion
        //.beginFill(0xFF0000)
        //.drawCircle(0, 0, 3*Config.gridSquareSize)
        //.endFill()
        .position.set(enemyPos.x, enemyPos.y);
        
        let enemiesinRange = projectile.owner.game.getEnemiesInRange(projectile.position, 3);
        for (let index = 0; index < enemiesinRange.length; index++) {
            const element = enemiesinRange[index];
            if (element !== projectile.target){
                element.currentHealth -= projectile.owner.baseDamage;
            }
            
        }

        let ticker = new PIXI.Ticker();
        let scale = 0;
        ticker.add(function(deltaTime: number){
            explosion.clear();
            if (scale > 1){
                explosion.destroy();
                ticker.destroy();
                return;
            }
            
            explosion
                .lineStyle(5, 0xFFFFFF)
                .drawCircle(0, 0, 3*scale)
                .lineStyle(3, 0x00FFFF)
                .drawCircle(0, 0, 3*scale)
                ;
            scale += deltaTime;
        });
        ticker.speed = 0.05;
        ticker.start();
        
        /*setTimeout(function() {
            explosion.destroy();
            explosion = null;
        }, 50)*/
    }
}