import { MartianCell as Cell } from './MartianCell'

export class MarsMatrix {
	grid: Cell[][];
	maxX: number;
	maxY: number;

	constructor(maxX: number, maxY: number) {
		this.maxX = maxX;
		this.maxY = maxY;
		this.grid = [];
		for (let y = maxY; y >= 0; y--) {
			this.grid[y] = [];
			for (let x = 0; x <= maxX; x++) {
				const isEdge = x === 0 || y === 0 || x === maxX - 1 || y === maxY - 1;
				this.grid[y][x] = new Cell(isEdge);
			}
		}
	}
}