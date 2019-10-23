/// <reference path="references.ts" />
import { Game, PixelPosition } from "./references.js";
export { Config };
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.currentGame = null;
    Config.paused = true;
    Config.gridSquareSize = 32; //size of one grid square in pixels
    Config.gridOffset = new PixelPosition(0, 0);
    Config.gridCells = {
        width: 15,
        height: 12
    };
    Config.canvas = document.getElementById('render-canvas');
    Config.canvasRender = Config.canvas.getContext("2d");
    Config.app = new PIXI.Application({
        view: Config.canvas,
        width: Config.canvas.width,
        height: Config.canvas.height,
        forceCanvas: true
    });
    return Config;
}());
;
Config.app.loader
    .add("grid", "img/grid.png")
    .add("tower", "img/tower.png")
    .onComplete.add(function () {
    Config.currentGame = new Game(0);
    //Config.currentGame.render();
});
//# sourceMappingURL=config.js.map