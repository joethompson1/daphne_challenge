import { deployRobot, processInput } from '../robotControlRoom';
import { MarsMatrix } from '../MarsMatrix';
import { Robot } from '../Robot';

describe('deployRobot', () => {
    test('should deploy robot correctly', () => {
        const mars = new MarsMatrix(5, 5);
        const robot = new Robot([1, 2], 'N');
        const instructions = ['L', 'F', 'L', 'F', 'L', 'F', 'L', 'F', 'F'];
        const result = deployRobot(mars, robot, instructions);
        expect(result).toEqual({ position: [1, 3], direction: 'N', alive: true });
    });
});

describe('process provided data', () => {
    test('should process input correctly', () => {
        const input = '5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL';
        const result = processInput(input);
        expect(result).toEqual([
            { position: [1, 1], direction: 'E', alive: true},
            { position: [3, 3], direction: 'N', alive: false},
            { position: [2, 3], direction: 'S', alive: true},
        ]);
    });
});

describe('Place robot outside of grid', () => {
    test('Should result in error', () => {
        const input = '1 1\n2 2 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL';
        const testFunction = () => processInput(input);
        // Use toThrow matcher to check if an error is thrown
        expect(testFunction).toThrow('Robot start position is outside the grid boundaries.');
    });
});

describe('3 robots keep going straight', () => {
    test('should kill first robot and second two will remain on edge cell', () => {
        const input = '3 3\n0 0 N\nFFFFF\n0 0 N\nFFFFF\n0 0 N\nFFFFF';
        const result = processInput(input);
        expect(result).toEqual([
            { position: [0, 3], direction: 'N', alive: false},
            { position: [0, 3], direction: 'N', alive: true},
            { position: [0, 3], direction: 'N', alive: true},
        ]);
    });
});