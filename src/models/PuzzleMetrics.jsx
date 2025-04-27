import axios from "axios";

export default class PuzzleMetrics {
    constructor(numAttempted, numSolved, avgRating, numRated, avgSolveTime, timeWorkedOn, avgHintsUsed, totalHintsUsed, record, recordHolder, recordDate) {
        this.numAttempted = numAttempted;
        this.numSolved = numSolved;
        this.avgRating = avgRating;
        this.numRated = numRated;
        this.avgSolveTime = avgSolveTime;
        this.timeWorkedOn = timeWorkedOn;
        this.avgHintsUsed = avgHintsUsed;
        this.totalHintsUsed = totalHintsUsed;
        this.record = record;
        this.recordHolder = recordHolder;
        this.recordDate = recordDate;
    }

    static async fetchMetrics(puzzleId) {
        const apiUrl = `http://localhost:8080/api/puzzles/${puzzleId}/metrics`; // Construct the full URL using the puzzle ID

        try {
            const response = await axios.get(apiUrl);
            const data = response.data;

            console.log("Fetched puzzle metrics: ", data);

            // Map the API response to the PuzzleMetrics constructor
            return new PuzzleMetrics(
                data.numAttempted,
                data.numSolved,
                data.avgRating,
                data.numRated,
                data.avgSolveTime,
                data.timeWorkedOn,
                data.avgHintsUsed,
                data.totalHintsUsed,
                data.record,
                data.recordHolder,
                data.recordDate
            );
        } catch (error) {
            console.error('Error fetching PuzzleMetrics:', error);
            throw error; // Rethrow the error to let the caller handle it
        }
    }
}