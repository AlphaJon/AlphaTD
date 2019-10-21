import { Config } from "./references.js";
export { GridPosition, PixelPosition };
class BasePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromPoint(point) {
        throw new Error(`fromPoint not implemented from class ${this}`);
    }
}
class GridPosition extends BasePoint {
    static fromPoint(point) {
        return new GridPosition(point.x, point.y);
    }
    toPixelPos() {
        return new PixelPosition(this.x * Config.gridSquareSize + Config.gridOffset.x, this.y * Config.gridSquareSize + Config.gridOffset.y);
    }
}
class PixelPosition extends BasePoint {
    static fromPoint(point) {
        return new PixelPosition(point.x, point.y);
    }
    toGridPos() {
        return new GridPosition(Math.floor((this.x - Config.gridOffset.x) / Config.gridSquareSize), Math.floor((this.y - Config.gridOffset.y) / Config.gridSquareSize));
    }
}
//# sourceMappingURL=position.js.map