/// <reference path="references.ts" />
import { PixelPosition } from "./references.js";
export { Config };
class Config {
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
;
//# sourceMappingURL=config.js.map