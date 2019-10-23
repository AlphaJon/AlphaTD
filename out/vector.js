var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.weight = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    ;
    Vector.prototype.normalize = function () {
        var weight = this.weight();
        if (weight == 0) {
            return new Vector(0, 0);
        }
        return new Vector(this.x / weight, this.y / weight);
    };
    return Vector;
}());
export { Vector };
//# sourceMappingURL=vector.js.map