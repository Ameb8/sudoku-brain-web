import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Board from "../components/Board.jsx";
import PuzzleMetricsBanner from "../components/PuzzleMetricsBanner";
import PuzzleMetrics from "../models/PuzzleMetrics";
import Navbar from "../components/Navbar.jsx";

const PlayPuzzle = () => {
    const location = useLocation();
    const { puzzle } = location.state || {};

    console.log("PlayPuzzle Reached")
    console.log(puzzle);

    return (
        <div className="play-puzzle-container">
            <Navbar />
            <Board puzzle={puzzle} />
        </div>
    );
};

PlayPuzzle.propTypes = {
    puzzle: PropTypes.shape({
        puzzleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        puzzleVals: PropTypes.string.isRequired,
        solutionVals: PropTypes.string.isRequired,
    }).isRequired,
};

export default PlayPuzzle;
