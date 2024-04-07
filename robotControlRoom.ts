import * as fs from 'fs';

import { MarsMatrix } from './MarsMatrix';
import { Robot } from './Robot';

interface RobotResult {
    position: [number, number];
    direction: string;
    alive: boolean;
}

export function deployRobot(mars: MarsMatrix, robot: Robot, instructions: string[]) {
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

export function processInput(fileContent: string) {
	// Read the file
  	const lines = fileContent.trim().split('\n');
	
  	// Extract the grid dimensions
  	const [gridX, gridY] = lines[0].split(' ').map(Number);
  	const mars = new MarsMatrix(gridX, gridY);
  	const results: RobotResult[] = [];

  	for (let i = 1; i < lines.length; i+=2) {
  		// Extract the initial position and direction
	  	const [startXString, startYString, startDirection] = lines[i].split(' ');
	  	const startX = Number(startXString)
	  	const startY = Number(startYString)

	  	// Validate start position
	    if (startX < 0 || startX > gridX || startY < 0 || startY > gridY) {
	        throw new Error('Robot start position is outside the grid boundaries.');
	    }

	  	const robot: Robot = new Robot([startX, startY], startDirection)
	  	const instructions: string[] = lines[i+1].split('');
	  	const result: RobotResult = deployRobot(mars, robot, instructions);
	  	results.push(result)
  	}
  	return results;
}

// Check if the script is being run directly
if (!module.parent) {
  	if (process.argv.length < 3) {
    	console.error('Please provide the file path as a command-line argument.');
    	process.exit(1);
  	}

  	const inputFilePath = process.argv[2];
  	const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
  	const results: RobotResult[] = processInput(fileContent);
  	for (const robot of results) {
		console.log(robot.position[0], robot.position[1], robot.direction, (!robot.alive ? 'Lost': ''));
	}
}