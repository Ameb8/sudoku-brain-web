import { useEffect, useState } from "react";
import Header from "../components/Header";
import Board from "../components/Board.jsx";
import PuzzleMetricsBanner from "../components/PuzzleMetricsBanner";
import axios from "axios";
import PuzzleMetrics from "../models/PuzzleMetrics"; // Import the PuzzleMetrics class
import LoginButton from "../components/LoginButton.jsx";
import Navbar from "../components/Navbar.jsx";

function QuickPlay() {
    const [puzzle, setPuzzle] = useState(null); // State to store the puzzle
    const [puzzleMetrics, setPuzzleMetrics] = useState(null); // State to store the PuzzleMetrics object
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    // Fetch random puzzle from the API when the component mounts
    useEffect(() => {
        const fetchPuzzleAndMetrics = async () => {
            try {
                const puzzleResponse = await axios.get("http://localhost:8080/api/puzzles/random");
                const puzzleData = puzzleResponse.data;

                const newPuzzle = {
                    puzzleId: puzzleData.puzzleId,
                    puzzleVals: puzzleData.puzzleVals,
                    solutionVals: puzzleData.solutionVals,
                };
                setPuzzle(newPuzzle);

                const metrics = await PuzzleMetrics.fetchMetrics(puzzleData.puzzleId)

                setPuzzleMetrics(metrics);
                setLoading(false);
            } catch (err) {
                console.log("Failed to load metrics...");
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchPuzzleAndMetrics();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!puzzle) {
        return <div>No puzzle data found.</div>;
    }

    return (
        <div>
            <Navbar />
            <Board puzzle={puzzle} />
            {puzzleMetrics && <PuzzleMetricsBanner metrics={puzzleMetrics} />}
        </div>
    );
}

export default QuickPlay;

