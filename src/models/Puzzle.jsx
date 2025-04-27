
export default class Puzzle {
    constructor(puzzleId, puzzleVals, solutionVals) {
        this.puzzleId = puzzleId;
        this.puzzleVals = puzzleVals;
        this.solutionVals = solutionVals;
    }

    isCellCorrect(index, value) {
        // Check if a given cell's value matches the solution
        return this.solutionVals.charAt(index) === value;
    }
}