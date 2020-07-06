//// <reference path="references.ts" />
import { PixelPosition } from "./references.js";
export { Config };
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.paused = true;
    Config.gridSquareSize = 32; //size of one grid square in pixels
    Config.gridOffset = new PixelPosition(0, 0);
    Config.gridCells = {
        width: 15,
        height: 12
    };
    Config.canvas = document.getElementById('render-canvas');
    //static canvasRender = Config.canvas.getContext("2d");
    Config.app = new PIXI.Application({
        view: Config.canvas,
        width: Config.canvas.width,
        height: Config.canvas.height,
    });
    return Config;
}());
;
Config.app.loader
    .add("grid", "img/grid.png")
    .add("tower", "img/tower.png")
    .load(function (loader, resources) {
    resources.forEach(function resourceHandle(res) {
        //TODO
    });
});
Config.app.ticker.autoStart = false;
Config.app.ticker.add(function (deltaTime) {
    //Config.currentGame.onTick(deltaTime);
    var fpscounter = document.getElementById("fpscounter");
    if (fpscounter !== null) {
        fpscounter.innerHTML = "" + Config.app.ticker.FPS;
    }
});
//# sourceMappingURL=config.js.map