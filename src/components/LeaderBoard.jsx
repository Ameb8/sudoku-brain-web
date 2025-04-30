import { useState, useEffect } from "react";
import PageSizeSelector from "./PageSizeSelector";
import PageSelector from "./PageSelector";
import ShowLeader from "./ShowLeader";
import Leader from "../models/Leader";

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]); // List of Leader objects
    const [pageSize, setPageSize] = useState(10); // Results per page
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch leaderboard data
    const fetchLeaders = async (page, size) => {

        setIsLoading(true);
        setError(null); // Reset error state
        try {
            const response = await fetch(`http://localhost:8080/api/users/leaderboard/${page - 1}/${size}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();

            const fetchedLeaders = data.map(
                (item) => new Leader(item.username, item.puzzlesSolved, item.avgSolveTime, item.avgHintsUsed)
            );
            setLeaders(fetchedLeaders);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data when page or pageSize changes
    useEffect(() => {
        fetchLeaders(currentPage, pageSize);
    }, [currentPage, pageSize]);

    // Handle page size change
    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to page 1 when page size changes
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ width: "40%", margin: "auto", textAlign: "center" }}>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div
                style={{
                    border: "3px solid black",
                    borderRadius: "8px",
                    padding: "1rem",
                    height: "4%",
                    overflowY: "scroll",
                    background : "lightyellow"
                }}
            >
                {leaders.length === 0 && !isLoading && <p>No data available</p>}
                {leaders.map((leader, index) => (
                    <ShowLeader key={index} leader={leader} index = {index + 1}/>
                ))}
            </div>
            <PageSizeSelector onChange={handlePageSizeChange} />
            <PageSelector pageSize={pageSize} onPageChange={handlePageChange} />
        </div>
    );
};

export default Leaderboard;