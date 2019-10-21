import {Config} from "./references.js";
export {GridPosition, PixelPosition};

interface Point2D {
    x: number;
    y: number;
}

abstract class BasePoint implements Point2D {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    static fromPoint(point: Point2D): BasePoint {
        throw new Error(`fromPoint not implemented from class ${this}`);
    }
}

class GridPosition extends BasePoint{
	x: number;
    y: number;

    static fromPoint(point: Point2D): GridPosition {
        return new GridPosition(point.x, point.y);
    }

    toPixelPos(): PixelPosition {
        return new PixelPosition(
            this.x * Config.gridSquareSize + Config.gridOffset.x,
            this.y * Config.gridSquareSize + Config.gridOffset.y
        );
    }
}

class PixelPosition extends BasePoint {
	x: number;
    y: number;

    static fromPoint(point: Point2D): PixelPosition {
        return new PixelPosition(point.x, point.y);
    }

    toGridPos(): GridPosition {
        return new GridPosition(
            Math.floor((this.x - Config.gridOffset.x)/Config.gridSquareSize),
            Math.floor((this.y - Config.gridOffset.y)/Config.gridSquareSize)
        )
    }
}