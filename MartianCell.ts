export class MartianCell {
	robotGrave: boolean;
	edgeCell: boolean;

	constructor(isEdgeCell: boolean) {
		this.edgeCell = isEdgeCell;
		this.robotGrave = false;
	}

	buryRobot() {
		this.robotGrave = true;
	}
}