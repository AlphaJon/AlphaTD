import { textures } from "../init.js";
export class TowerRenderer {
    render(tower) {
        let pos = tower.gridPosition;
        let cell = new PIXI.Sprite(textures["tower"]);
        cell.width = 1;
        cell.height = 1;
        cell.x = pos.x;
        cell.y = pos.y;
        tower.game.getContainer().addChild(cell);
        //app.stage.addChild(cell);
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=towerRenderer.js.map