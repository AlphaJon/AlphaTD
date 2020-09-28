export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    weight() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    ;
    normalize() {
        var weight = this.weight();
        if (weight == 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(this.x / weight, this.y / weight);
    }
}
//# sourceMappingURL=vector.js.map