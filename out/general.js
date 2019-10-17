var Config = /** @class */ (function () {
    function Config() {
    }
    Config.paused = true;
    Config.gridSquareSize = 32; //size of one grid square in pixels
    Config.gridOffset = {
        x: 0,
        y: 0
    };
    Config.gridCells = {
        width: 15,
        height: 12
    };
    Config.canvas = document.getElementById('render-canvas');
    Config.canvasRender = Config.canvas.getContext("2d");
    return Config;
}());
;
var currentGame = null;
/**
 * Starts a new game based on a given level, builds level from levelData
 */
var Game = /** @class */ (function () {
    function Game(intLevel) {
        this.waveNumber = 0;
        this.level = new Level(levelDataArray[intLevel]);
        this.money = this.level.startingMoney;
        this.waveNumber = 0;
        this.towerList = [];
        this.enemyList = [];
        this.pendingEnemyList = [];
    }
    Object.defineProperty(Game.prototype, "money", {
        get: function () {
            return this._money;
        },
        set: function (value) {
            this._money = value;
            document.querySelector("#moneydisplay").innerHTML = "" + value;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.getCurrentWave = function () {
        return this.level.waves[this.waveNumber];
    };
    Game.prototype.getEnemiesInRange = function (position, range) {
        var rangeSquared = range * range;
        var result = this.enemyList.filter(function (en) {
            //Inside this function, this = position
            var enGridPos = en.position;
            var xdiff = Math.abs(this.x - enGridPos.x);
            var ydiff = Math.abs(this.y - enGridPos.y);
            return xdiff * xdiff + ydiff * ydiff <= rangeSquared;
        }, position);
        return result;
    };
    //public getEnemiesInRange(position: GridPosition, range: number): Enemy[]{
    //	console.log(position);
    //	let enemiesInRange:Enemy[] = [];
    //	let rangeSquared = range*range;
    //	for (let index = 0; index < this.enemyList.length; index++) {
    //		const en = this.enemyList[index];
    //		let xdiff = Math.abs(position.x - en.position.x);
    //		let ydiff = Math.abs(position.y - en.position.y);
    //		console.log("" + xdiff + ", " + ydiff);
    //		if (xdiff*xdiff + ydiff*ydiff <= rangeSquared) {
    //			enemiesInRange.push(en);
    //		}
    //	}
    //	return enemiesInRange;
    //}
    Game.prototype.getSpawnPoint = function () {
        var rawSpawn = this.level.spawnPoint;
        return {
            x: rawSpawn.x,
            y: rawSpawn.y,
        };
    };
    Game.prototype.launchNextWave = function () {
        var wave = this.getCurrentWave();
        for (var i = 0; i < wave.enemyCount; i++) {
            var en = new Enemy(wave.enemyStats);
            this.pendingEnemyList.push({
                enemy: en,
                delay: wave.delayBetweenSpawns * i
            });
        }
        this.waveNumber++;
    };
    Game.prototype.onTick = function (deltaTime) {
        //Note: filter does not modify non-objects
        //But here that's OK because we are processing objects
        this.pendingEnemyList = this.pendingEnemyList.filter(function (pendingEn) {
            pendingEn.delay -= deltaTime;
            if (pendingEn.delay <= 0) {
                this.enemyList.push(pendingEn.enemy);
                //Remove element from array
                return false;
            }
            //Keep element in array
            return true;
        }, this);
        this.enemyList = this.enemyList.filter(function (en) {
            //console.log(en);
            en.onTick(deltaTime);
            en.render(Config.canvasRender);
            return en.isValid();
            //return true;
        }, this);
        this.towerList.map(function (twr) {
            twr.onTick(deltaTime);
            twr.render(Config.canvasRender);
        });
    };
    Game.prototype.render = function (ctx) {
        this.level.render(ctx);
    };
    return Game;
}());
var animationFrameId = null;
var lastframe = 0;
function initGameTick(timestamp) {
    lastframe = timestamp;
    requestAnimationFrame(gameTick);
}
function gameTick(timestamp) {
    var render = Config.canvasRender;
    var deltaTime = timestamp - lastframe;
    var fps = 1000 / deltaTime;
    render.clearRect(0, 0, Config.canvas.width, Config.canvas.height);
    currentGame.render(Config.canvasRender);
    //console.log(timestamp);
    //console.log(deltaTime);
    //console.log(game.enemyList);
    currentGame.onTick(deltaTime);
    document.getElementById("fpscounter").innerHTML = "" + Math.round(fps);
    lastframe = timestamp;
    if (!(Config.paused)) {
        animationFrameId = window.requestAnimationFrame(gameTick);
    }
}
function gridToPos(gridPosition) {
    return {
        x: gridPosition.x * Config.gridSquareSize + Config.gridOffset.x,
        y: gridPosition.y * Config.gridSquareSize + Config.gridOffset.y
    };
}
function posToGrid(position) {
    return {
        x: Math.floor((position.x - Config.gridOffset.x) / Config.gridSquareSize),
        y: Math.floor((position.y - Config.gridOffset.y) / Config.gridSquareSize)
    };
}
//Thank you StackOverflow
//Note: do not use on objects than contain functions, or Date objects
//Also avoid using in CPU-intensive code unless necessary, performance cost over manually creating objects
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function play() {
    Config.paused = false;
    animationFrameId = window.requestAnimationFrame(initGameTick);
}
function pause() {
    Config.paused = true;
    window.cancelAnimationFrame(animationFrameId);
}
//# sourceMappingURL=general.js.map