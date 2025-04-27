import { useState, useEffect } from "react";

const PageSelector = ({ pageSize, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState(""); // Keeps track of user input
    const [totalResults, setTotalResults] = useState(0);
    const [maxPages, setMaxPages] = useState(1);

    // Fetch total results from API
    useEffect(() => {
        const fetchTotalResults = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users/numUsers");
                const data = await response.json();
                setTotalResults(data.totalResults);
                setMaxPages(Math.ceil(data.totalResults / pageSize));
            } catch (error) {
                console.error("Error fetching total results:", error);
            }
        };

        fetchTotalResults();
    }, [pageSize]);

    // Handle page change
    const handlePageChange = (page) => {
        if(page >= 1 && page <= maxPages) {
            setCurrentPage(page);
            setInputPage("");
            if (onPageChange) {
                onPageChange(page);
            }
        }
    };

    const handleNext = () => {
        if (currentPage < maxPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleInputChange = (event) => {
        setInputPage(event.target.value); // Update the input value
    };

    const handleInputKeyPress = (event) => {
        if (event.key === "Enter") {
            const page = parseInt(inputPage, 10);
            if (!isNaN(page) && page >= 1 && page <= maxPages) {
                handlePageChange(page); // Change page if valid
            } else {
                setInputPage(""); // Clear invalid input
            }
        }
    };

    return (
        <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                style={{ marginRight: "0.5rem" }}
            >
                Previous
            </button>
            <input
                type="text"
                value={inputPage}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                placeholder={currentPage.toString()}
                style={{
                    width: "3rem",
                    textAlign: "center",
                    marginRight: "0.5rem",
                }}
            />
            <span>
        {currentPage} / {maxPages}
      </span>
            <button
                onClick={handleNext}
                disabled={currentPage === maxPages}
                style={{ marginLeft: "0.5rem" }}
            >
                Next
            </button>
        </div>
    );
};

export default PageSelector;