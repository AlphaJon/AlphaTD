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
	//static canvasRender = Config.canvas.getContext("2d");
	static app = new PIXI.Application({
		view: Config.canvas,
		width: Config.canvas.width,
		height: Config.canvas.height,
		//forceCanvas: true
	});
};

Config.app.loader
	.add("grid", "img/grid.png")
	.add("tower", "img/tower.png");
