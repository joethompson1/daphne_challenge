"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsMatrix = void 0;
const MartianCell_1 = require("./MartianCell");
class MarsMatrix {
    grid;
    maxX;
    maxY;
    constructor(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.grid = [];
        for (let y = maxY; y >= 0; y--) {
            this.grid[y] = [];
            for (let x = 0; x <= maxX; x++) {
                this.grid[y][x] = new MartianCell_1.MartianCell();
            }
        }
    }
}
exports.MarsMatrix = MarsMatrix;
