interface TowerData {
	cost: number;
	attackSpeed: number;
	damage: number;
	range: number;
	projectileSpeed: number;
	//effects: ((_: Projectile)=>void)[];
	effects: string[];
}