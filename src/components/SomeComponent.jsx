import useUserPuzzle from "../models/useUserPuzzle.jsx";

const SomeComponent = ({ puzzleId }) => {
    const { userPuzzle, loading, error } = useUserPuzzle(puzzleId);

    if (loading) return <p>Loading user puzzle...</p>;
    if (error) return <p>Error: {error}</p>;

    return <p>Current state: {userPuzzle?.currentState}</p>;
};

export default SomeComponent;