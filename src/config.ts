/// <reference path="references.ts" />

import {Game, PixelPosition} from "./references.js";
export {Config};

class Config {
	static currentGame:Game = null;
	static paused = true;
	static gridSquareSize = 32; //size of one grid square in pixels
	static gridOffset: PixelPosition = new PixelPosition(0, 0);
	static gridCells = {
		width: 15,
		height: 12
	};
	static canvas = document.getElementById('render-canvas') as HTMLCanvasElement;
	static canvasRender = Config.canvas.getContext("2d");
};