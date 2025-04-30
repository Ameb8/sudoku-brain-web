import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AttemptedPuzzles.css"; // Import the external CSS

const AttemptedPuzzles = () => {
    const [progressList, setProgressList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/puzzles/secured/attempted", {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch progress data");

                const data = await response.json();
                console.log("Fetched progress data:", data);
                setProgressList(data);
            } catch (error) {
                console.error("Error fetching progress data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    const handleButtonClick = async (puzzleId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/puzzles/${puzzleId}`, {
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to fetch puzzle data");

            const puzzle = await response.json();
            console.log("Fetched puzzle:", puzzle);

            // Navigate to PlayPuzzle page and pass the puzzle as state
            navigate("/PlayPuzzle", { state: { puzzle } });
        } catch (error) {
            console.error("Error fetching puzzle data:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="attempted-puzzles-container">
            <h2>Your Puzzle Progress</h2>
            {progressList.map((item, index) => (
                <button
                    key={index}
                    className="puzzle-button"
                    onClick={() => handleButtonClick(item.id.puzzleId)}
                >
                    Puzzle {item.id.puzzleId} – Seconds Worked: {item.secondsWorkedOn}
                </button>
            ))}
        </div>
    );
};

export default AttemptedPuzzles;

