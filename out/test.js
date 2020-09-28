import { Game } from "./game.js";
import { levels } from "./init.js";
let currentGame;
document.getElementById('level1').onclick = function (event) {
    console.log('Level 1 loaded');
    currentGame = new Game(levels[0]);
};
document.getElementById('wave').onclick = function (event) {
    var wave = currentGame.getCurrentWave();
    currentGame.launchNextWave();
    currentGame.waveNumber--;
};
document.getElementById("start").onclick = function (event) {
    currentGame.resume();
};
document.getElementById("pause").onclick = function (event) {
    currentGame.pause();
};
//# sourceMappingURL=test.js.map