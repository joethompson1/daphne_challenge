import * as fs from 'fs';

import { MarsMatrix } from './MarsMatrix';
import { Robot } from './Robot';

interface RobotResult {
    position: [number, number];
    direction: string;
    alive: boolean;
}

function deployRobot(mars: MarsMatrix, robot: Robot, instructions: string[]) {
	for (let i = 0; i < instructions.length; i++) {
		const instruction: string  = instructions[i];
		if (instruction === 'L') robot.turnLeft();
		if (instruction === 'R') robot.turnRight();
		if (instruction === 'F') robot.moveForward(mars);
		if (!robot.alive) {
			break;
		}
	}
	return {
		position: robot.position,
		direction: robot.direction,
		alive: robot.alive
	}
}

function processInput(filePath: string) {
	// Read the file
  	const fileContent = fs.readFileSync(filePath, 'utf-8');
  	const lines = fileContent.trim().split('\n');
	
  	// Extract the grid dimensions
  	const [gridX, gridY] = lines[0].split(' ').map(Number);
  	const mars = new MarsMatrix(gridX, gridY);
  	const results: RobotResult[] = [];

  	for (let i = 1; i < lines.length; i+=2) {
  		// Extract the initial position and direction
	  	const [startX, startY, startDirection] = lines[i].split(' ');
	  	const robot: Robot = new Robot([Number(startX), Number(startY)], startDirection)
	  	const instructions: string[] = lines[i+1].split('');
	  	const result = deployRobot(mars, robot, instructions);
	  	results.push(result)
  	}
  	return results;
}

// Get the file path from the command-line arguments
if (process.argv.length < 3) {
  	console.error('Please provide the file path as a command-line argument.');
  	process.exit(1);
}

const inputFilePath = process.argv[2];
const output = processInput(inputFilePath);
for (const robot of output) {
	console.log(robot.position[0], robot.position[1], robot.direction, (!robot.alive ? 'Lost': ''));
}