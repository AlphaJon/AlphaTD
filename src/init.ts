import { LevelData } from "./data/levelData.js";
//import * as PIXI from "pixi.js"
import { Game } from "./game.js";
export const canvas = document.getElementById('render-canvas') as HTMLCanvasElement;

export let app = new PIXI.Application({
	view: canvas,
	width: canvas.width,
	height: canvas.height,
	//forceCanvas: true
});

export let textures: {[key: string] : PIXI.Texture | undefined } = {};
export let levels: LevelData[] = [];
export let towers: Record<string, TowerData> = {};

let mainTicker = PIXI.Ticker.shared
mainTicker.autoStart = false;
mainTicker.add(function (deltaTime: number) {
	//currentGame.onTick(deltaTime);
	let fpscounter = document.getElementById("fpscounter");
	if (fpscounter !== null) {
		fpscounter.innerHTML = "" + mainTicker.FPS;
	}
	
});

let loader = PIXI.Loader.shared;
loader.add("grid", "img/grid.png")
      .add("tower", "img/tower.png")
      .add("towerData", "data/towers.json")
      .add("levelData", "data/levels.json")

loader.onError.add(() => console.error("Failed loading"));
loader.onComplete.add(() => console.log("Success loading"));

loader.load((_loader, resources) => {
	textures["grid"] = resources.grid?.texture!;
	textures["tower"] = resources.tower?.texture!;
	levels = resources.levelData?.data;
	towers = resources.towerData?.data;
});
