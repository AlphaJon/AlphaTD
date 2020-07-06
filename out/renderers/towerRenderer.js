import { Config } from "../references.js";
var TowerRenderer = /** @class */ (function () {
    function TowerRenderer(reference) {
        this.reference = reference;
    }
    TowerRenderer.prototype.render = function () {
        var pos = this.reference.gridPosition.toPixelPos();
        var cell = new PIXI.Sprite(PIXI.Texture.fromImage("img/tower.png"));
        cell.width = Config.gridSquareSize;
        cell.height = Config.gridSquareSize;
        cell.x = pos.x;
        cell.y = pos.y;
        Config.app.stage.addChild(cell);
    };
    TowerRenderer.prototype.destroy = function () {
        throw new Error("Method not implemented.");
    };
    return TowerRenderer;
}());
export { TowerRenderer };
//# sourceMappingURL=towerRenderer.js.map