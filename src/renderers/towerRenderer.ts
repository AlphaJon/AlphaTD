import { app, textures } from "../init.js";
import { Tower } from "../tower.js";

export class TowerRenderer implements BaseRenderer {

    render(tower: Tower): void {
        let pos = tower.gridPosition;
		let cell = new PIXI.Sprite(textures["tower"]);
		cell.width = 1;
		cell.height = 1;
		cell.x = pos.x;
		cell.y = pos.y;
		app.stage.addChild(cell);
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

}