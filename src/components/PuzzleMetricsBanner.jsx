// A functional component that accepts a PuzzleMetrics object as a prop
import PuzzleMetrics from "../models/PuzzleMetrics.jsx";
import PropTypes from "prop-types";
import PuzzleRating from "./PuzzleRating.jsx";

const PuzzleMetricsBanner = ({ metrics }) => {
    return (
        <div style={styles.banner}>
            <div style={styles.item}><strong>Attempted:</strong> {metrics.numAttempted}</div>
            <div style={styles.item}><strong>Solved:</strong> {metrics.numSolved}</div>
            <div style={styles.item}><strong>Avg Solve Time:</strong> {metrics.avgSolveTime} min</div>
            <div style={styles.item}><strong>Time Worked:</strong> {metrics.timeWorkedOn} hrs</div>
            <div style={styles.item}><strong>Avg Hints Used:</strong> {metrics.avgHintsUsed}</div>
            <div style={styles.item}><strong>Total Hints Used:</strong> {metrics.totalHintsUsed}</div>
            <PuzzleRating
                rating={metrics.avgRating}
                numRates={metrics.numRated}
            />
        </div>
    );
};

// Inline styles for the banner
const styles = {
    banner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflowX: "auto",
        whiteSpace: "nowrap",
    },
    item: {
        margin: "0 15px",
        fontSize: "14px",
        textAlign: "center",
    },
}

PuzzleMetricsBanner.propTypes = {
    metrics: PropTypes.instanceOf(PuzzleMetrics).isRequired, // The metrics prop must be an instance of PuzzleMetrics
};

export default PuzzleMetricsBanner;

