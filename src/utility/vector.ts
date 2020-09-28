export class Vector2 {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public weight(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	public normalize(): Vector2 {
		var weight = this.weight();
		if (weight == 0) {
			return new Vector2(0,0);
		}
		return new Vector2(this.x / weight, this.y / weight);
	}
}