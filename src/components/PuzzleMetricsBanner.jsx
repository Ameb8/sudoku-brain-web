import PuzzleMetrics from "../models/PuzzleMetrics.jsx";
import PropTypes from "prop-types";
import PuzzleRating from "./PuzzleRating.jsx";
import "./PuzzleMetricsBanner.css"


const PuzzleMetricsBanner = ({ metrics }) => {
    return (
        <div className="puzzle-metrics-banner">
            <div className="puzzle-metrics-item"><strong>Attempted</strong> {metrics.numAttempted}</div>
            <div className="puzzle-metrics-item"><strong>Solved</strong> {metrics.numSolved}</div>
            <div className="puzzle-metrics-item"><strong>Avg Solve Time</strong> {metrics.avgSolveTime} min</div>
            <div className="puzzle-metrics-item"><strong>Time Worked</strong> {metrics.timeWorkedOn} hrs</div>
            <div className="puzzle-metrics-item"><strong>Avg Hints Used</strong> {metrics.avgHintsUsed}</div>
            <div className="puzzle-metrics-item"><strong>Total Hints Used</strong> {metrics.totalHintsUsed}</div>
            <PuzzleRating
                rating={metrics.avgRating}
                numRates={metrics.numRated}
            />
        </div>
    );
};

PuzzleMetricsBanner.propTypes = {
    metrics: PropTypes.instanceOf(PuzzleMetrics).isRequired,
};

export default PuzzleMetricsBanner;




