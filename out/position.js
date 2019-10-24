var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Config } from "./references.js";
export { GridPosition, PixelPosition };
var BasePoint = /** @class */ (function () {
    function BasePoint(x, y) {
        this.x = x;
        this.y = y;
    }
    BasePoint.fromPoint = function (point) {
        throw new Error("fromPoint not implemented [" + this + "]");
    };
    return BasePoint;
}());
var GridPosition = /** @class */ (function (_super) {
    __extends(GridPosition, _super);
    function GridPosition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridPosition.fromPoint = function (point) {
        return new GridPosition(point.x, point.y);
    };
    GridPosition.prototype.clone = function () {
        return new GridPosition(this.x, this.y);
    };
    GridPosition.prototype.toPixelPos = function () {
        return new PixelPosition(this.x * Config.gridSquareSize + Config.gridOffset.x, this.y * Config.gridSquareSize + Config.gridOffset.y);
    };
    return GridPosition;
}(BasePoint));
var PixelPosition = /** @class */ (function (_super) {
    __extends(PixelPosition, _super);
    function PixelPosition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PixelPosition.fromPoint = function (point) {
        return new PixelPosition(point.x, point.y);
    };
    PixelPosition.prototype.clone = function () {
        return new PixelPosition(this.x, this.y);
    };
    PixelPosition.prototype.toGridPos = function () {
        return new GridPosition(Math.floor((this.x - Config.gridOffset.x) / Config.gridSquareSize), Math.floor((this.y - Config.gridOffset.y) / Config.gridSquareSize));
    };
    return PixelPosition;
}(BasePoint));
//# sourceMappingURL=position.js.map