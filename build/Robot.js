"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
class Robot {
    alive;
    position;
    direction;
    directions = ['N', 'E', 'S', 'W'];
    directionIndex;
    constructor(startPosition, startDirection) {
        this.position = startPosition;
        this.direction = startDirection;
        this.directionIndex = this.directions.indexOf(startDirection);
        this.alive = true;
    }
    // Turning left or right essentially acts like a circular queue
    turnLeft() {
        this.directionIndex = this.directionIndex - 1;
        // so if turning left and directions is at N then we need to move to end of queue
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
    moveForward(mars) {
        const maxX = mars.maxX;
        const maxY = mars.maxY;
        const [x, y] = this.position;
        const robotGrave = mars.grid[y][x].robotGrave;
        // works out the new position after moving forward given robots direction
        const newPositions = {
            N: [x, y + 1],
            E: [x + 1, y],
            S: [x, y - 1],
            W: [x - 1, y]
        };
        const newPosition = newPositions[this.direction];
        const [newX, newY] = newPosition;
        // checks if the newPosition is outside boundary of Mars grid
        if (newY < 0 || newY > maxY || newX < 0 || newX > maxX) {
            // if exceeds boundary and no grave then kill robot and bury
            if (!robotGrave) {
                this.alive = false;
                mars.grid[y][x].buryRobot();
            }
        }
        else {
            this.position = newPosition;
        }
    }
}
exports.Robot = Robot;
