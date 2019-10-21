/// <reference path="references.ts" />
import { Config, Level, Enemy } from "./references.js";
export { Game };
/**
 * Starts a new game based on a given level, builds level from levelData
 */
class Game {
    constructor(intLevel) {
        this.waveNumber = 0;
        this.level = new Level(intLevel);
        this.money = this.level.startingMoney;
        this.waveNumber = 0;
        this.towerList = [];
        this.enemyList = [];
        this.pendingEnemyList = [];
        this.render(Config.canvasRender);
    }
    get money() {
        return this._money;
    }
    set money(value) {
        this._money = value;
        document.querySelector("#moneydisplay").innerHTML = "" + value;
    }
    getCurrentWave() {
        return this.level.waves[this.waveNumber];
    }
    getSpawnPoint() {
        return this.level.spawnPoint;
    }
    getEnemiesInRange(position, range) {
        let rangeSquared = range * range;
        let result = this.enemyList.filter(function (en) {
            //Inside this function, this = position
            let enGridPos = en.position;
            let xdiff = Math.abs(this.x - enGridPos.x);
            let ydiff = Math.abs(this.y - enGridPos.y);
            return xdiff * xdiff + ydiff * ydiff <= rangeSquared;
        }, position);
        return result;
    }
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
    launchNextWave() {
        var wave = this.getCurrentWave();
        for (var i = 0; i < wave.enemyCount; i++) {
            var en = new Enemy(wave.enemyStats);
            this.pendingEnemyList.push({
                enemy: en,
                delay: wave.delayBetweenSpawns * i
            });
        }
        this.waveNumber++;
    }
    onTick(deltaTime) {
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
    }
    pause() {
        Config.paused = true;
        window.cancelAnimationFrame(animationFrameId);
    }
    render(ctx) {
        this.level.render(ctx);
    }
    resume() {
        Config.paused = false;
        animationFrameId = window.requestAnimationFrame(initGameTick);
    }
}
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
    Config.currentGame.render(Config.canvasRender);
    //console.log(timestamp);
    //console.log(deltaTime);
    //console.log(game.enemyList);
    Config.currentGame.onTick(deltaTime);
    document.getElementById("fpscounter").innerHTML = "" + Math.round(fps);
    lastframe = timestamp;
    if (!(Config.paused)) {
        animationFrameId = window.requestAnimationFrame(gameTick);
    }
}
//# sourceMappingURL=game.js.map