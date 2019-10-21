/// <reference path="references.ts" />

export {Cloneable, Tickable, Renderable, clone}

interface Cloneable {
	clone(): any;
}

interface Tickable {
	onTick(deltaTime:number): void;
}

interface Renderable {
	render(ctx:CanvasRenderingContext2D): void;
}

//Thank you StackOverflow
//Note: do not use on objects than contain functions, or Date objects
//Also avoid using in CPU-intensive code unless necessary, performance cost over manually creating objects
function clone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}