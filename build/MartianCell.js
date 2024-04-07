"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianCell = void 0;
class MartianCell {
    robotGrave;
    constructor() {
        this.robotGrave = false;
    }
    buryRobot() {
        this.robotGrave = true;
    }
}
exports.MartianCell = MartianCell;
