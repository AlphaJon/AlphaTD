import {BaseRenderer} from "./baseRenderer.js";
import { Tower, Config } from "../references.js";

export class TowerRenderer implements BaseRenderer {
    private reference: Tower;

    constructor(reference: Tower){
        this.reference = reference;
    }

    render(): void {
        let pos = this.reference.gridPosition.toPixelPos();
		let cell = new PIXI.Sprite(PIXI.Texture.fromImage("img/tower.png"));
		cell.width = Config.gridSquareSize;
		cell.height = Config.gridSquareSize;
		cell.x = pos.x;
		cell.y = pos.y;
		Config.app.stage.addChild(cell);
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

}