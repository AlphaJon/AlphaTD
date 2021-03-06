import { app, textures, towers } from "../init.js";
import { Level } from "../level.js";
import { PixelPosition, GridPosition } from "../utility/position.js";
export class LevelRenderer {
    constructor() {
        this.container = new PIXI.Container();
        this._destroyed = false;
    }
    render(level) {
        if (this._destroyed) {
            throw new Error("Invalid method call on a destroyed renderer");
        }
        this.container.scale.set(32, 32);
        app.stage.addChild(this.container);
        let texture = textures["grid"];
        var currentPos = new PixelPosition(0, 0);
        //ctx.fillStyle("rgb(0,0,0)");
        for (var i = 0; i < level.grid.length; i++) {
            for (var j = 0; j < level.grid[0].length; j++) {
                if (level.grid[i][j] === Level.emptyCell) {
                    var cell = new PIXI.Sprite(texture);
                    cell.width = 1;
                    cell.height = 1;
                    cell.x = currentPos.x;
                    cell.y = currentPos.y;
                    cell.interactive = true;
                    cell.on("pointertap", function () {
                        level.game.placeTower(towers["basic"], new GridPosition(0, 0));
                    });
                    this.container.addChild(cell);
                }
                else {
                    //ctx.strokeRect(currentPos.x, currentPos.y, size/2, size/2);
                    //ctx.strokeRect(currentPos.x + size/2, currentPos.y + size/2, size/2, size/2);
                    //ctx.fillRect(currentPos.x, currentPos.y, size, size);
                }
                currentPos.y += 1;
            }
            currentPos.x += 1;
            currentPos.y = 0;
        }
    }
    destroy() {
        if (this._destroyed) {
            throw new Error("Invalid method call on a destroyed renderer");
        }
        this.container.destroy();
        this._destroyed = true;
    }
}
LevelRenderer.defaultScale = 32; //size of one grid square in pixels
//# sourceMappingURL=levelRenderer.js.map