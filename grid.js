levelData = {
	0: {
		layout:{
			spawn: {
				x: 0,
				y: 3,
				edge: "left"
			}
		},
		waves: {
			1: {
				count: 5,
				delay: 500,
				stats: {
					maxHealth: 10,
					speed: 1,
					size: 10,
					effects: []
				}
			}
		}
	}
}

level = function (intLevel) {
	this.data = clone(levelData[intLevel]);
}

level.prototype.launchWave = function() {
	game.isRunning = true;
	game.currentWave++;
	var currentWaveData = this.data.waves[game.currentWave];
	for (var i = 0; i < currentWaveData.length; i++) {
		setTimeout(function () {
			var enemy = new enemy(currentWaveData.stats);
			game.spawnEnemy(enemy);
		}, i*currentWaveData.delay);
	}
};