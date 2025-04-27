//import "./Grid.css"; // Styling for the grid

function Grid() {
    return (
        <div className="grid">
            {Array.from({ length: 9 }).map((_, row) => (
                <div key={row} className="grid-row">
                    {Array.from({ length: 9 }).map((_, col) => (
                        <input
                            key={col}
                            type="text"
                            maxLength="1"
                            className="grid-cell"
                            placeholder=""
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;