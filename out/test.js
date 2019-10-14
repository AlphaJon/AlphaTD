Config.canvas.onclick = function (event) {
    // https://stackoverflow.com/questions/55677/
    var rect = Config.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //console.log(event);
    //console.log(`clicked at ${event.x}, ${event.y}`);
    testSpawnTower(posToGrid({ x: x, y: y }));
};
document.getElementById('level1').onclick = function (event) {
    console.log('Level 1 loaded');
    currentGame = new Game(0);
};
document.getElementById('wave').onclick = function (event) {
    //var level = currentGame.currentLevel;
    //console.log(level);
    var wave = currentGame.getCurrentWave();
    currentGame.launchNextWave();
    currentGame.waveNumber--;
};
//function drawSquare(x,y,size) {
//	var render = Config.canvasRender;
//	var gridSize = Config.gridSquareSize;
//	render.fillRect(x*gridSize, y*gridSize, size*gridSize, size*gridSize);
//}
function testSpawnEnemy() {
    //console.log(config.canvas);
    //console.log(event);
    var wave = currentGame.getCurrentWave();
    var en = new Enemy(wave.enemyStats);
    console.log(wave);
    currentGame.enemyList.push(en);
    console.log(en.position);
    console.log(currentGame.enemyList);
}
function testSpawnTower(position) {
    var twr = new Tower(defaultTower);
    twr.setPosition(position);
    currentGame.towerList.push(twr);
}
//# sourceMappingURL=test.js.map