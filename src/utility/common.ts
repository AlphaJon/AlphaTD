interface Cloneable {
	clone(): Cloneable;
}

interface Tickable {
	onTick(deltaTime: number): void;
}