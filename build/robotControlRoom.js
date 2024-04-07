"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processInput = exports.deployRobot = void 0;
const fs = __importStar(require("fs"));
const MarsMatrix_1 = require("./MarsMatrix");
const Robot_1 = require("./Robot");
function deployRobot(mars, robot, instructions) {
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        if (instruction === 'L')
            robot.turnLeft();
        if (instruction === 'R')
            robot.turnRight();
        if (instruction === 'F')
            robot.moveForward(mars);
        if (!robot.alive) {
            break;
        }
    }
    return {
        position: robot.position,
        direction: robot.direction,
        alive: robot.alive
    };
}
exports.deployRobot = deployRobot;
function processInput(fileContent) {
    // Read the file
    const lines = fileContent.trim().split('\n');
    // Extract the grid dimensions
    const [gridX, gridY] = lines[0].split(' ').map(Number);
    const mars = new MarsMatrix_1.MarsMatrix(gridX, gridY);
    const results = [];
    for (let i = 1; i < lines.length; i += 2) {
        // Extract the initial position and direction
        const [startXString, startYString, startDirection] = lines[i].split(' ');
        const startX = Number(startXString);
        const startY = Number(startYString);
        // Validate start position
        if (startX < 0 || startX > gridX || startY < 0 || startY > gridY) {
            throw new Error('Robot start position is outside the grid boundaries.');
        }
        const robot = new Robot_1.Robot([startX, startY], startDirection);
        const instructions = lines[i + 1].split('');
        const result = deployRobot(mars, robot, instructions);
        results.push(result);
    }
    return results;
}
exports.processInput = processInput;
// Check if the script is being run directly
if (!module.parent) {
    if (process.argv.length < 3) {
        console.error('Please provide the file path as a command-line argument.');
        process.exit(1);
    }
    const inputFilePath = process.argv[2];
    const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
    const results = processInput(fileContent);
    for (const robot of results) {
        console.log(robot.position[0], robot.position[1], robot.direction, (!robot.alive ? 'Lost' : ''));
    }
}
