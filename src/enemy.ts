interface EnemyData {
	maxHealth: number;
	speed: number;
	size: number;
	worth: number;
	effects: any[];
}

class Enemy implements Renderable, Tickable{
	
	public position: GridPosition;
	public maxHealth: number;
	private _currentHealth: number;
	public speed: number;
	public size: number;
	public effects: any[]; //TODO

	private currentPathPoint: number;
	private endReached: boolean;

	get currentHealth() {
		return this._currentHealth;
	}

	set currentHealth(value: number) {
		this._currentHealth = value;
		if (this._currentHealth <= 0){
			//TODO: setup destruction?
		}
	}

	constructor(stats: EnemyData) {
		var pos = currentGame.getSpawnPoint();
		//this.stats = clone(game.currentLevel.data.waves[game.currentWave].stats);

		this.maxHealth = stats.maxHealth;
		this.speed = stats.speed;
		this.size = stats.size;
		this.effects = stats.effects;

		this._currentHealth = this.maxHealth;
		this.position = {
			x: pos.x,
			y: pos.y
		};
		this.currentPathPoint = 0;
		this.endReached = false;
	}

	public isValid() {
		return !(this.endReached) && this._currentHealth > 0;
	};

	public move(factor: number){
		if (this.endReached) {
			return;
		}
		var size = Config.gridSquareSize;
		var points = currentGame.level.pathPoints
		var destination = points[this.currentPathPoint];
		var delta = new Vector(
			destination.x - this.position.x,
			destination.y - this.position.y
		);
		var baseVector = delta.normalize();
		this.position.x = this.position.x + baseVector.x * factor * this.speed;
		this.position.y = this.position.y + baseVector.y * factor * this.speed;
	
		if (delta.weight() <= 0.01) {
			//console.log("x:"+this.position.x+", y: "+this.position.y);
			this.currentPathPoint++;
			console.log(this.currentPathPoint);
			console.log(points);
			if (this.currentPathPoint == points.length) {
				this.endReached = true;
			}
		}
		//console.log(this.position);
	};

	public onTick(deltaTime){
		this.move(deltaTime/1000);
		//console.log(config.gridSquareSize * deltaTime/1000 * 60);
		
		//this.position.y += deltaTime/1000;
	};
	
	public render(ctx: CanvasRenderingContext2D){
		var topLeftCoords = this.topLeftPosition();
		var leftPx = topLeftCoords.x * Config.gridSquareSize + Config.gridOffset.x;
		var topPx = topLeftCoords.y * Config.gridSquareSize + Config.gridOffset.y;
		var sizePx = this.size * Config.gridSquareSize;
		var colorHealth = (this._currentHealth/this.maxHealth)*120;
		var colorStr = `hsl(${colorHealth}, 100%, 50%)`;
		ctx.fillStyle = colorStr;
		ctx.fillRect(leftPx, topPx, sizePx, sizePx);
		ctx.fillStyle = "#000000";
	}

	public topLeftPosition(): GridPosition{
		return {
			x: this.position.x - (this.size /2),
			y: this.position.y - (this.size /2)
		};
	}
} 