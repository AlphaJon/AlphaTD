export const canvas = document.getElementById('render-canvas');
export let app = new PIXI.Application({
    view: canvas,
    width: canvas.width,
    height: canvas.height,
});
export let textures = {};
export let levels = [];
export let towers = {};
let mainTicker = PIXI.Ticker.shared;
mainTicker.autoStart = false;
mainTicker.add(function (deltaTime) {
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
    .add("levelData", "data/levels.json");
loader.onError.add(() => console.error("Failed loading"));
loader.onComplete.add(() => console.log("Success loading"));
loader.load((_loader, resources) => {
    var _a, _b, _c, _d;
    textures["grid"] = (_a = resources.grid) === null || _a === void 0 ? void 0 : _a.texture;
    textures["tower"] = (_b = resources.tower) === null || _b === void 0 ? void 0 : _b.texture;
    levels = (_c = resources.levelData) === null || _c === void 0 ? void 0 : _c.data;
    towers = (_d = resources.towerData) === null || _d === void 0 ? void 0 : _d.data;
});
//# sourceMappingURL=init.js.map