/// <reference path="references.ts" />
import { Config, Level, Enemy } from "./references.js";
export { Game };
/**
 * Starts a new game based on a given level, builds level from levelData
 */
var Game = /** @class */ (function () {
    function Game(intLevel) {
        this.waveNumber = 0;
        this.level = new Level(intLevel);
        this.money = this.level.startingMoney;
        this.waveNumber = 0;
        this.towerList = [];
        this.enemyList = [];
        this.pendingEnemyList = [];
        Config.app.ticker.add(this.onTick, this);
        this.render();
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
    Game.prototype.getSpawnPoint = function () {
        return this.level.spawnPoint;
    };
    Game.prototype.getEnemiesInRange = function (position, range) {
        var rangeSquared = range * range;
        var result = this.enemyList.filter(function (en) {
            if (en.destroyed)
                return false;
            //Inside this function, this = position
            var enGridPos = en.position;
            var xdiff = Math.abs(this.x - enGridPos.x);
            var ydiff = Math.abs(this.y - enGridPos.y);
            return xdiff * xdiff + ydiff * ydiff <= rangeSquared;
        }, position);
        return result;
    };
    //note: probably more efficient but unstable when there are holes in array
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
    /*public getSpawnPoint():GridPosition {
        var rawSpawn = this.level.spawnPoint;
        return rawSpawn;
    }*/
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
        //console.log(Config.app.ticker.elapsedMS);
        //deltaTime = Config.app.ticker.elapsedMS;
        deltaTime = deltaTime * 20;
        //Note: filter does not modify non-objects
        //But here that's OK because we are processing objects
        this.pendingEnemyList = this.pendingEnemyList.filter(function (pendingEn) {
            pendingEn.delay -= deltaTime;
            if (pendingEn.delay <= 0) {
                this.enemyList.push(pendingEn.enemy);
                pendingEn.enemy.render();
                //Remove element from array
                return false;
            }
            //Keep element in array
            return true;
        }, this);
        this.enemyList = this.enemyList.filter(function (en) {
            //console.log(en);
            en.onTick(deltaTime);
            //en.render();
            return !en.destroyed && en.isValid();
            //return true;
        }, this);
        this.towerList.map(function (twr) {
            twr.onTick(deltaTime);
            //twr.render();
        });
    };
    Game.prototype.pause = function () {
        Config.paused = true;
        Config.app.ticker.stop();
        //window.cancelAnimationFrame(animationFrameId);
    };
    Game.prototype.render = function () {
        this.level.render();
    };
    Game.prototype.resume = function () {
        Config.paused = false;
        Config.app.ticker.start();
        //animationFrameId = window.requestAnimationFrame(initGameTick);
    };
    return Game;
}());
//# sourceMappingURL=game.js.map