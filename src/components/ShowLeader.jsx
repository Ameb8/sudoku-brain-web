import PropTypes from "prop-types";
import Leader from "../models/Leader.jsx";

const ShowLeader = ({leader, index}) => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid black',
        padding: '10px',
        marginBottom: '10px',
    };

    const indexStyle = {
        fontWeight: 'bold',
        marginRight: '15px',
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            {/* Index */}
            <div style={indexStyle}>{index}</div>

            {/* Columns */}
            <div style={columnStyle}>
                <strong>Username:</strong>
                <div>{leader.username}</div>
            </div>
            <div style={columnStyle}>
                <strong>Puzzles Solved:</strong>
                <div>{leader.numSolved}</div>
            </div>
            <div style={columnStyle}>
                <strong>Avg. Solve Time:</strong>
                <div>{leader.avgSolveTime}</div>
            </div>
        </div>
    );
};


ShowLeader.propTypes = {
    leader: PropTypes.instanceOf(Leader).isRequired,
    index: PropTypes.objectOf(PropTypes.number).isRequired,
};


export default ShowLeader;