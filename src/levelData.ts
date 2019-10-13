class Level implements Renderable{
	public spawnPoint: GridPosition;
	public pathPoints: GridPosition[];
	public waves: WaveData[];
	public grid: number[][];

	constructor(data:LevelData){
		this.spawnPoint = data.spawnPoint;
		this.pathPoints = data.pathPoints;
		this.waves = data.waves;
		this.generateGrid();
	}

	private generateGrid(): void {
		var startPoint:GridPosition = {
			x: Math.floor(this.spawnPoint.x),
			y: Math.floor(this.spawnPoint.y)
		}
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
				this.grid[startPoint.x][startPoint.y] = 1;
			}
			
		}
	}

	render(ctx: CanvasRenderingContext2D): void {
		var size = Config.gridSquareSize;
		var currentPos = {
			x: Config.gridOffset.x,
			y: Config.gridOffset.y,
		};
		//ctx.fillStyle("rgb(0,0,0)");
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 12; j++) {
				if (this.grid[i][j] == 0) {
					ctx.strokeRect(currentPos.x, currentPos.y, size, size);
				} else {
					//ctx.strokeRect(currentPos.x, currentPos.y, size/2, size/2);
					//ctx.strokeRect(currentPos.x + size/2, currentPos.y + size/2, size/2, size/2);
					//ctx.fillRect(currentPos.x, currentPos.y, size, size);
				}
	
				currentPos.y += size;
			}
			currentPos.x += size;
			currentPos.y = Config.gridOffset.y;
		}
	}
}

interface LevelData {
	spawnPoint: GridPosition;
	pathPoints: GridPosition[];
	waves: WaveData[];
}

interface WaveData {
	enemyCount: number;
	delayBetweenSpawns: number;
	enemyStats: EnemyData;
}

let levelDataArray:LevelData[] = [];

levelDataArray[0] = {
	spawnPoint: {
		x: 0,
		y: 3.5,
	},
	pathPoints : [
		{x: 5.5, y: 3.5},
		{x: 5.5, y: 8.5},
		{x: 12.5, y: 8.5},
		{x: 12.5, y: 12.5}
	],
	waves: [
		{
			enemyCount: 5,
			delayBetweenSpawns: 500,
			enemyStats: {
				maxHealth: 10,
				speed: 1,
				size: 0.3,
				effects: []
			}
		}
	]
};