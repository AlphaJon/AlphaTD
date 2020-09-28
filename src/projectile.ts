import { Enemy } from "./enemy.js";
import { app } from "./init.js";
import { Tower } from "./tower.js";
import { GridPosition } from "./utility/position.js";
import { Vector2 } from "./utility/vector.js";

let baseProjectileStats = {
	stats: {},
	count: 1,
	position: {
		x: 0,
		y: 0
	}
};

export class Projectile implements Tickable {
    static readonly defaultSize = 5;

    public owner: Tower;
    public target: Enemy;
    public position: GridPosition;
    public speed: number;
    public size!: number;

    private _destroyed: boolean;
    private _endReached: boolean;
    private _representation: PIXI.Graphics;
    private _weight!: number;

    get endReached() {
        return this._endReached;
    }

    get weight() {
        return this._weight;
    }

    set weight(value: number) {
        this._weight = value;
        this.size = Projectile.defaultSize + Math.min(value - 1, 5);
    }

    constructor(owner: Tower, target: Enemy, weight = 1) {
        this.owner = owner;
        this.target = target;
        this.position = new GridPosition(
            owner.gridPosition.x + 0.5,
            owner.gridPosition.y + 0.5
            );
        this.speed = owner.projectileSpeed;
        //this.size = Projectile.defaultSize;
        this.weight = weight;
        this._destroyed = false;
        this._endReached = false;
        this._representation = new PIXI.Graphics();
        app.stage.addChild(this._representation);
    }

    public destroy() {
        if (this._destroyed) return;

        this._destroyed = true;
        this.owner.removeProjectile(this);

        this._representation.destroy();
    }

    public move(factor: number) {
		if (this._endReached) {
			return;
		}
		var destination = this.target.position;
		var delta = new Vector2(
			destination.x - this.position.x,
			destination.y - this.position.y
        );
        //console.log(this.position);
        var baseVector = delta.normalize();
        //console.log(baseVector);
		this.position.x = this.position.x + baseVector.x * factor * this.speed;
		this.position.y = this.position.y + baseVector.y * factor * this.speed;
        //console.log(this.position);
        //if the projectile overlaps the enemy at 90%
		if (delta.weight() <= this.size/10) {
            this._endReached = true;
            this.target.hit(this);
            this.destroy();
		}
		//console.log(this.position);
    };
    
    onTick(deltaTime: number): void {
        if (this._destroyed) {
            return;
        }
        if (this.target.destroyed) {
            this.destroy();
            return;
        }
        
        this.move(deltaTime/1000);
        if (!this._endReached){
            let pos = this.position.toPixelPos();
            this._representation.position.x = pos.x;
            this._representation.position.y = pos.y;
        }
    }

    render(): void {
        this._representation
			.lineStyle(1, 0x000000)
			.beginFill(0xFFFF00)
			.drawCircle(0, 0, this.size)
            .endFill();
        
    }
}

/*special = {};

special.prototype.apply = function(enemy) {
	// body...
};*/