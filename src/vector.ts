class Vector {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public weight(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	public normalize(): Vector {
		var weight = this.weight();
		if (weight == 0) {
			return new Vector(0,0);
		}
		return new Vector(this.x / weight, this.y / weight);
	}
}