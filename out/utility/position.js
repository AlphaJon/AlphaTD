class BasePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromPoint(point) {
        throw new Error(`fromPoint not implemented [${this}]`);
    }
}
export class GridPosition extends BasePoint {
    static fromPoint(point) {
        return new GridPosition(point.x, point.y);
    }
    clone() {
        return new GridPosition(this.x, this.y);
    }
    toPixelPos(scalefactor = 32) {
        return new PixelPosition(this.x * scalefactor, // + Config.gridOffset.x,
        this.y * scalefactor //+ Config.gridOffset.y
        );
    }
}
export class PixelPosition extends BasePoint {
    static fromPoint(point) {
        return new PixelPosition(point.x, point.y);
    }
    clone() {
        return new PixelPosition(this.x, this.y);
    }
    toGridPos(scalefactor = 32) {
        return new GridPosition(Math.floor((this.x - 0) / scalefactor), Math.floor((this.y - 0) / scalefactor));
    }
}
//# sourceMappingURL=position.js.map