interface Point2D {
    x: number;
    y: number;
}

export type pointTuple = [number, number];

abstract class BasePoint implements Point2D, Cloneable {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    abstract clone(): BasePoint;

    static fromPoint(point: Point2D): BasePoint {
        throw new Error(`fromPoint not implemented [${this}]`);
    }
}

export class GridPosition extends BasePoint{
    static fromPoint(point: Point2D): GridPosition {
        return new GridPosition(point.x, point.y);
    }

    clone(): GridPosition {
        return new GridPosition(this.x, this.y);
    }

    toPixelPos(scalefactor: number = 32): PixelPosition {
        return new PixelPosition(
            this.x * scalefactor, // + Config.gridOffset.x,
            this.y * scalefactor //+ Config.gridOffset.y
        );
    }
}

export class PixelPosition extends BasePoint {
    static fromPoint(point: Point2D): PixelPosition {
        return new PixelPosition(point.x, point.y);
    }

    clone(): PixelPosition {
        return new PixelPosition(this.x, this.y);
    }

    toGridPos(scalefactor: number = 32): GridPosition {
        return new GridPosition(
            Math.floor((this.x - 0)/scalefactor),
            Math.floor((this.y - 0)/scalefactor)
        )
    }
}