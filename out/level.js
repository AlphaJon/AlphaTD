/// <reference types="pixi.js.d.ts" />
import { GridPosition, Config, PixelPosition } from "./references.js";
//import * as PIXI from "./pixi.js";
export { Level };
var Level = /** @class */ (function () {
    function Level(intLevel) {
        var data = levelDataArray[intLevel];
        this.startingMoney = data.startingCurrency;
        this.spawnPoint = data.spawnPoint;
        this.pathPoints = data.pathPoints;
        this.waves = data.waves;
        this.generateGrid();
    }
    Level.prototype.generateGrid = function () {
        var startPoint = new GridPosition(Math.floor(this.spawnPoint.x), Math.floor(this.spawnPoint.y));
        this.grid = [];
        for (var i = 0; i < Config.gridCells.width; i++) {
            this.grid[i] = [];
            for (var j = 0; j < Config.gridCells.height; j++) {
                this.grid[i][j] = 0;
            }
        }
        this.grid[startPoint.x][startPoint.y] = 1;
        for (var i = 0; i < this.pathPoints.length; i++) {
            var nextPoint = {
                x: Math.floor(this.pathPoints[i].x),
                y: Math.floor(this.pathPoints[i].y)
            };
            var moved = true;
            while (moved) {
                moved = false;
                //Going left
                if (startPoint.x - nextPoint.x >= 1) {
                    moved = true;
                    startPoint.x -= 1;
                }
                //Going right
                if (startPoint.x - nextPoint.x <= -1) {
                    moved = true;
                    startPoint.x += 1;
                }
                //Going up
                if (startPoint.y - nextPoint.y <= -1) {
                    moved = true;
                    startPoint.y += 1;
                }
                //Going down
                if (startPoint.y - nextPoint.y >= 1) {
                    moved = true;
                    startPoint.y -= 1;
                }
                this.grid[startPoint.x][startPoint.y] = 1;
            }
        }
    };
    Level.prototype.render = function () {
        var app = Config.app;
        var container = new PIXI.Container();
        app.stage.addChild(container);
        var texture = PIXI.Texture.fromImage("img/grid.png");
        var size = Config.gridSquareSize;
        var currentPos = new PixelPosition(Config.gridOffset.x, Config.gridOffset.y);
        //ctx.fillStyle("rgb(0,0,0)");
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 12; j++) {
                if (this.grid[i][j] == 0) {
                    var cell = new PIXI.Sprite(texture);
                    cell.width = size;
                    cell.height = size;
                    cell.x = currentPos.x;
                    cell.y = currentPos.y;
                    container.addChild(cell);
                }
                else {
                    //ctx.strokeRect(currentPos.x, currentPos.y, size/2, size/2);
                    //ctx.strokeRect(currentPos.x + size/2, currentPos.y + size/2, size/2, size/2);
                    //ctx.fillRect(currentPos.x, currentPos.y, size, size);
                }
                currentPos.y += size;
            }
            currentPos.x += size;
            currentPos.y = Config.gridOffset.y;
        }
    };
    return Level;
}());
var levelDataArray = [];
levelDataArray[0] = {
    startingCurrency: 100,
    spawnPoint: new GridPosition(0, 3.5),
    pathPoints: [
        GridPosition.fromPoint({ x: 5.5, y: 3.5 }),
        GridPosition.fromPoint({ x: 5.5, y: 8.5 }),
        GridPosition.fromPoint({ x: 12.5, y: 8.5 }),
        GridPosition.fromPoint({ x: 12.5, y: 12 })
    ],
    waves: [
        {
            enemyCount: 5,
            delayBetweenSpawns: 500,
            enemyStats: {
                maxHealth: 10,
                speed: 1,
                size: 0.3,
                worth: 5,
                effects: []
            }
        }
    ]
};
//# sourceMappingURL=level.js.map