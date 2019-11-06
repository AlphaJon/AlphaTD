/// <reference path="references.ts" />

export {Cloneable, Tickable, Renderable}

interface Cloneable {
	clone(): any;
}

interface Tickable {
	onTick(deltaTime: number): void;
}

interface Renderable {
	render(): void;
}