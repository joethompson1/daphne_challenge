import { MarsMatrix } from './MarsMatrix';

export class Robot {
	alive: boolean;
	position: [number, number]; 
	direction: string;
	directions: string[] = ['N','E','S','W'];
	directionIndex: number;

	constructor(startPosition: [number, number], startDirection: string) {
		this.position = startPosition;
		this.direction = startDirection;
		this.directionIndex = this.directions.indexOf(startDirection);
		this.alive = true;
	}

	// Turning left or right essentially acts like a circular queue
	turnLeft() {
		this.directionIndex = this.directionIndex - 1;
		// so if turning left and its at N then we need to move to end of queue
		if (this.directionIndex < 0) {
			this.directionIndex = this.directions.length - 1;
		}
		this.direction = this.directions[this.directionIndex];
	}
	
	turnRight() {
		this.directionIndex = this.directionIndex + 1;
		// and if turning right and its at W then we need to move to front of queue
		if (this.directionIndex > this.directions.length - 1) {
			this.directionIndex = 0;
		}
		this.direction = this.directions[this.directionIndex];
	}

	moveForward(mars: MarsMatrix) {
		const maxX: number = mars.maxX;
		const maxY: number = mars.maxY;

		const robotGrave: boolean = mars.grid[this.position[1]][this.position[0]].robotGrave

		switch(this.direction) {
			case 'N':
				this.position[1] += 1;
				// checks if robot is over boundry of the map and if its a robots grave
				// if its not then make the move
				if (this.position[1] > maxY) {
					this.position[1] -= 1;

					if (!robotGrave) {
						this.alive = false;
						mars.grid[this.position[1]][this.position[0]].robotGrave = true;
					}
					return;
				}
				break;
			case 'E':
				this.position[0] += 1;
				if (this.position[0] > maxX) {
					this.position[0] -= 1;

					if (!robotGrave) {
						this.alive = false;
						mars.grid[this.position[1]][this.position[0]].robotGrave = true;
					}
					return;
				}
				break;
			case 'S':
				this.position[1] -= 1;
				if (this.position[1] < 0) {
					this.position[1] += 1;

					if (!robotGrave) {
						this.alive = false;
						mars.grid[this.position[1]][this.position[0]].robotGrave = true;
					}
					return;
				}
				break;
			case 'W':
				this.position[0] -= 1;
				if (this.position[0] < 0) {
					this.position[0] += 1;

					if (!robotGrave) {
						this.alive = false;
						mars.grid[this.position[1]][this.position[0]].robotGrave = true;
					} 
					return;
				}
				break;
		}
	}
}