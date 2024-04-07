export class MartianCell {
	robotGrave: boolean;

	constructor() {
		this.robotGrave = false;
	}

	buryRobot() {
		this.robotGrave = true;
	}
}