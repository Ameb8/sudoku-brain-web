import { useState } from "react";

const ResultsPerPageSelector = ({ onChange }) => {
    const [selectedValue, setSelectedValue] = useState(10);

    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="results-per-page" style={{ marginRight: "0.5rem" }}>
                Results per page:
            </label>
            <select
                id="results-per-page"
                value={selectedValue}
                onChange={handleChange}
                style={{ padding: "0.5rem" }}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
};

export default ResultsPerPageSelector;