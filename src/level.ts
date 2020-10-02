import { WaveData, LevelData } from "./data/levelData.js";
import { Game } from "./game.js";
import { app, textures } from "./init.js";
import { GameRenderer } from "./renderers/gameRenderer.js";
import { GridPosition } from "./utility/position.js";

export class Level {
	static readonly emptyCell = 0;
	static readonly pathCell = 1;

	public game: Game;
	public spawnPoint: GridPosition;
	public pathPoints: GridPosition[];
	public waves: WaveData[];
	public grid!: number[][];
	public startingMoney: number;

	get width() {
		return this.grid.length;
	}

	get height() {
		return this.grid[0].length;
	}
	
	constructor(data: LevelData, game: Game){
		this.startingMoney = data.startingCurrency;
		this.spawnPoint = new GridPosition(...data.spawnPoint);
		this.pathPoints = data.pathPoints.map(
			point => new GridPosition(...point)
		);
		this.waves = data.waves;
		this.generateGrid(data.width, data.height);
		this.game = game;
	}

	private generateGrid(width: number, height: number): void {
		var startPoint:GridPosition = new GridPosition(
			Math.floor(this.spawnPoint.x),
			Math.floor(this.spawnPoint.y)
		)
		this.grid = [];
		for (var i = 0; i < width; i++) {
			this.grid[i] = [];
			for (var j = 0; j < height; j++) {
				this.grid[i][j] = Level.emptyCell;
			}
		}
		this.grid[startPoint.x][startPoint.y] = Level.pathCell;
	
		for (var i = 0; i < this.pathPoints.length; i++) {
			var nextPoint = {
				x: Math.floor(this.pathPoints[i].x),
				y: Math.floor(this.pathPoints[i].y)
			};
			var moved = true;
			while (moved){
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
				this.grid[startPoint.x][startPoint.y] = Level.pathCell;
			}
			
		}
	}

}
