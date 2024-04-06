import * as fs from 'fs';

import { MarsMatrix } from './MarsMatrix';
import { Robot } from './Robot';

type InstructionFunction = (robot: Robot, mars: MarsMatrix) => void;

const instructionsTransformer: Record<string, InstructionFunction> = {
	'L': (robot: Robot, mars: MarsMatrix) => {
		// console.log('moving robot left');
		// console.log('robots old direction: ', robot.direction);
		robot.turnLeft();
		// console.log('robots new direction: ', robot.direction);
	},
	'R': (robot: Robot, mars: MarsMatrix) => {
		robot.turnRight();
	},
	'F': (robot: Robot, mars: MarsMatrix) => {
		// console.log('moving robot forward');
		// console.log('robots old position: ', robot.position);
		// console.log(mars.grid);
		robot.moveForward(mars);
		// console.log('robots new position: ', robot.position);
	},
}


function runSimulation(mars: MarsMatrix, robot: Robot, instructions: string[]) {
	for (let i = 0; i < instructions.length; i++) {
		const instruction: string  = instructions[i];
		const instructionFunction: InstructionFunction | undefined = instructionsTransformer[instruction];
		instructionFunction(robot, mars);
		if (!robot.alive) {
			break;
		}
	}
	console.log("position: ", robot.position);
	console.log("direction: ", robot.direction);
	console.log("alive: ", robot.alive);
}

function processInput(filePath: string) {
	// Read the file
  	const fileContent = fs.readFileSync(filePath, 'utf-8');
  	const lines = fileContent.trim().split('\n');
	
  	// Extract the grid dimensions
  	const [gridX, gridY] = lines[0].split(' ').map(Number);
  	const mars = new MarsMatrix(gridX, gridY);

  	for (let i = 1; i < lines.length; i+=2) {
  		// Extract the initial position and direction
	  	const [startX, startY, startDirection] = lines[i].split(' ');
	  	const robot: Robot = new Robot([Number(startX), Number(startY)], startDirection)
	  	const instructions: string[] = lines[i+1].split('');
	  	runSimulation(mars, robot, instructions);
  	}
}

// Get the file path from the command-line arguments
if (process.argv.length < 3) {
  	console.error('Please provide the file path as a command-line argument.');
  	process.exit(1);
}

const inputFilePath = process.argv[2];

processInput(inputFilePath);




