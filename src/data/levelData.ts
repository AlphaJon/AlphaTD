import { pointTuple } from "../utility/position";

export interface LevelData {
	startingCurrency: number;
	width: number;
	height: number;
	spawnPoint: pointTuple;
	pathPoints: pointTuple[];
	waves: WaveData[];
}

export interface WaveData {
	enemyCount: number;
	delayBetweenSpawns: number;
	enemyStats: EnemyData;
}