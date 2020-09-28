import { Enemy } from "./enemy.js";
import { app } from "./init.js";
import { Level } from "./level.js";
import { Tower } from "./tower.js";
/**
 * Starts a new game based on a given level, builds level from levelData
 */
export class Game {
    constructor(levelData) {
        this.paused = false;
        this.waveNumber = 0;
        this.level = new Level(levelData, this);
        this.money = levelData.startingCurrency;
        this.waveNumber = 0;
        this.towerList = [];
        this.enemyList = [];
        this.pendingEnemyList = [];
        app.ticker.add(this.onTick, this);
        this.render();
    }
    get money() {
        return this._money;
    }
    set money(value) {
        this._money = value;
        let moneyTag = document.querySelector("#moneydisplay");
        if (moneyTag !== null) {
            moneyTag.innerHTML = "" + value;
        }
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
            if (en.destroyed)
                return false;
            //Inside this function, this = position
            let enGridPos = en.position;
            let xdiff = Math.abs(position.x - enGridPos.x);
            let ydiff = Math.abs(position.y - enGridPos.y);
            return xdiff * xdiff + ydiff * ydiff <= rangeSquared;
        });
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
            var en = new Enemy(wave.enemyStats, this);
            this.pendingEnemyList.push({
                enemy: en,
                delay: wave.delayBetweenSpawns * i
            });
        }
        this.waveNumber++;
    }
    onTick(deltaTime) {
        //console.log(app.ticker.elapsedMS);
        //deltaTime = app.ticker.elapsedMS;
        deltaTime = deltaTime * 20;
        this.pendingEnemyList = this.pendingEnemyList.filter(function (pendingEn) {
            pendingEn.delay -= deltaTime;
            if (pendingEn.delay <= 0) {
                //Enemy ready to spawn
                this.enemyList.push(pendingEn.enemy);
                pendingEn.enemy.render();
                //Remove element from array
                return false;
            }
            //Keep element in array
            return true;
        }, this);
        this.enemyList = this.enemyList.filter(function (en) {
            if (en.destroyed)
                return false;
            //console.log(en);
            en.onTick(deltaTime);
            //en.render();
            return en.isValid();
            //return true;
        }, this);
        this.towerList.map(function (twr) {
            twr.onTick(deltaTime);
            //twr.render();
        });
    }
    pause() {
        this.paused = true;
        app.ticker.stop();
        //window.cancelAnimationFrame(animationFrameId);
    }
    placeTower(towerData, position) {
        if (this.money >= towerData.cost) {
            let tower = new Tower(towerData, position, this);
            this.towerList.push(tower);
        }
    }
    render() {
        this.level.render();
    }
    resume() {
        this.paused = false;
        app.ticker.start();
        //animationFrameId = window.requestAnimationFrame(initGameTick);
    }
}
//# sourceMappingURL=game.js.map