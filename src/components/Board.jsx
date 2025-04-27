/*import  { useState } from 'react';
import './Board.css';
import { useUser } from "./UserProvider.jsx";
import useUserPuzzle from "../models/useUserPuzzle";
import PropTypes from "prop-types";

const Board = ({ puzzle }) => {
    const { user, loading: userLoading } = useUser();
    const { userPuzzle, loading: puzzleLoading, error } = useUserPuzzle(puzzle.puzzleId);

    if (userLoading || puzzleLoading) return <p>Loading...</p>;

    // Create the initial grid based on the puzzle values
    const initialGrid = Array.from({ length: 81 }, (_, i) => ({
        value: puzzle.puzzleVals[i] >= '1' && puzzle.puzzleVals[i] <= '9' ? puzzle.puzzleVals[i] : '',
        isClue: puzzle.puzzleVals[i] >= '1' && puzzle.puzzleVals[i] <= '9',
        notes: [], // To store small numbers
        isCorrect: true,
    }));

    const [grid, setGrid] = useState(initialGrid);

    // Handle cell value change
    const handleCellInput = (index, inputValue, isNote) => {
        setGrid((prevGrid) =>
            prevGrid.map((cell, i) => {
                if(i !== index)
                    return cell;

                if(isNote) {
                    const notes = [...cell.notes];
                    if(notes.includes(inputValue)) {
                        notes.splice(notes.indexOf(inputValue), 1); // Remove the note
                    } else if(notes.length < 4) {
                        notes.push(inputValue); // Add the note (limit to 4)
                    }

                    return {...cell, notes};
                } else {
                    const isCorrect = inputValue === puzzle.solutionVals.charAt(index);
                    return {...cell, value: inputValue, notes: [], isCorrect};
                }
            })
        );
    };

    // Handle navigation using arrow keys
    const handleNavigation = (event, index) => {
        const { key } = event;
        let newIndex = index;

        if(key === 'ArrowUp' && index - 9 >= 0) newIndex -= 9;
        if(key === 'ArrowDown' && index + 9 < 81) newIndex += 9;
        if(key === 'ArrowLeft' && index % 9 > 0) newIndex -= 1;
        if(key === 'ArrowRight' && index % 9 < 8) newIndex += 1;

        if(newIndex !== index) {
            event.preventDefault();
            document.getElementById(`cell-${newIndex}`).focus();
        }
    };

    const getCellClassName = (index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        return [
            'cell',
            row % 3 === 0 && 'border-top',
            col % 3 === 0 && 'border-left',
            row === 8 && 'border-bottom',
            col === 8 && 'border-right',
            grid[index].isClue && 'clue',
        ]
            .filter(Boolean)
            .join(' ');
    };

    return (
        <div id="grid-container">
            {grid.map((cell, index) => (
                <div
                    id={`cell-${index}`}
                    key={index}
                    //className={`cell ${cell.isClue ? 'clue' : ''}`}
                    className={getCellClassName(index)}
                    tabIndex={0}
                    contentEditable={!cell.isClue}
                    suppressContentEditableWarning={true}
                    onInput={(e) => {
                        const input = e.currentTarget.innerText.trim() || e.currentTarget.textContent.trim();
                        const validInput = /^[1-9]$/.test(input) ? input : '';
                        const solutionValue = puzzle.solutionVals.charAt(index);

                        if(validInput === solutionValue)
                            e.currentTarget.style.color = 'black';
                        else
                            e.currentTarget.style.color = 'red';


                        handleCellInput(index, validInput, false);
                    }}
                    onKeyDown={(event) => {
                        const isNote = event.shiftKey || event.altKey || event.ctrlKey;

                        if(!cell.isClue) {
                            const validNumber = /^[1-9]$/.test(event.key);

                            if(validNumber) { //display input
                                handleCellInput(index, event.key, isNote);
                                event.preventDefault();
                            } else if (event.key === 'Backspace' || event.key === '0') { //delete
                                if(isNote) { //delete note
                                    setGrid((prevGrid) =>
                                        prevGrid.map((cell, i) => {
                                            if(i !== index)
                                                return cell;
                                            if(cell.notes.length > 0) {
                                                const updatedNotes = [...cell.notes];
                                                updatedNotes.pop();

                                                return { ...cell, notes: updatedNotes };
                                            }

                                            return cell;
                                        })
                                    );
                                } else { //delete input
                                    handleCellInput(index, '', false);
                                }

                                event.preventDefault()
                            } else { //prevent behavior on non-numeric characters
                                event.preventDefault();
                            }
                        }
                        handleNavigation(event, index);
                    }}
                >
                    {/* Large number display }
                    {cell.value && (
                        <div
                            className="large-number"
                            style={{
                                color: cell.isClue
                                    ? 'black'
                                    : cell.isCorrect
                                        ? 'black'
                                        : 'red',
                            }}
                        >
                            {cell.value}
                        </div>
                    )}

                    {/* Small number (notes) display }
                    {cell.notes.map((note, i) => (
                        <div
                            key={i}
                            className={`small-number ${
                                ['top-left', 'top-right', 'bottom-left', 'bottom-right'][i]
                            }`}
                        >
                            {note}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

Board.propTypes = {
    puzzle: PropTypes.shape({
        puzzleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        puzzleVals: PropTypes.string.isRequired,
        solutionVals: PropTypes.string.isRequired,
    }).isRequired,
};

export default Board;
*/



















import  { useState } from 'react';
import './Board.css';
import { useUser } from "./UserProvider.jsx";
import PropTypes from "prop-types";

const Board = ({ puzzle }) => {
    const { user, loading } = useUser();

    // Create the initial grid based on the puzzle values
    const initialGrid = Array.from({ length: 81 }, (_, i) => ({
        value: puzzle.puzzleVals[i] >= '1' && puzzle.puzzleVals[i] <= '9' ? puzzle.puzzleVals[i] : '',
        isClue: puzzle.puzzleVals[i] >= '1' && puzzle.puzzleVals[i] <= '9',
        notes: [], // To store small numbers
        isCorrect: true,
    }));

    const [grid, setGrid] = useState(initialGrid);

    // Handle cell value change
    const handleCellInput = (index, inputValue, isNote) => {
        setGrid((prevGrid) =>
            prevGrid.map((cell, i) => {
                if(i !== index)
                    return cell;

                if(isNote) {
                    const notes = [...cell.notes];
                    if(notes.includes(inputValue)) {
                        notes.splice(notes.indexOf(inputValue), 1); // Remove the note
                    } else if(notes.length < 4) {
                        notes.push(inputValue); // Add the note (limit to 4)
                    }

                    return {...cell, notes};
                } else {
                    const isCorrect = inputValue === puzzle.solutionVals.charAt(index);
                    return {...cell, value: inputValue, notes: [], isCorrect};
                }
            })
        );
    };

    // Handle navigation using arrow keys
    const handleNavigation = (event, index) => {
        const { key } = event;
        let newIndex = index;

        if(key === 'ArrowUp' && index - 9 >= 0) newIndex -= 9;
        if(key === 'ArrowDown' && index + 9 < 81) newIndex += 9;
        if(key === 'ArrowLeft' && index % 9 > 0) newIndex -= 1;
        if(key === 'ArrowRight' && index % 9 < 8) newIndex += 1;

        if(newIndex !== index) {
            event.preventDefault();
            document.getElementById(`cell-${newIndex}`).focus();
        }
    };

    const getCellClassName = (index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        return [
            'cell',
            row % 3 === 0 && 'border-top',
            col % 3 === 0 && 'border-left',
            row === 8 && 'border-bottom',
            col === 8 && 'border-right',
            grid[index].isClue && 'clue',
        ]
            .filter(Boolean)
            .join(' ');
    };

    return (
        <div id="grid-container">
            {grid.map((cell, index) => (
                <div
                    id={`cell-${index}`}
                    key={index}
                    //className={`cell ${cell.isClue ? 'clue' : ''}`}
                    className={getCellClassName(index)}
                    tabIndex={0}
                    contentEditable={!cell.isClue}
                    suppressContentEditableWarning={true}
                    onInput={(e) => {
                        const input = e.currentTarget.innerText.trim() || e.currentTarget.textContent.trim();
                        const validInput = /^[1-9]$/.test(input) ? input : '';
                        const solutionValue = puzzle.solutionVals.charAt(index);

                        if(validInput === solutionValue)
                            e.currentTarget.style.color = 'black';
                        else
                            e.currentTarget.style.color = 'red';


                        handleCellInput(index, validInput, false);
                    }}
                    onKeyDown={(event) => {
                        const isNote = event.shiftKey || event.altKey || event.ctrlKey;

                        if(!cell.isClue) {
                            const validNumber = /^[1-9]$/.test(event.key);

                            if(validNumber) { //display input
                                handleCellInput(index, event.key, isNote);
                                event.preventDefault();
                            } else if (event.key === 'Backspace' || event.key === '0') { //delete
                                if(isNote) { //delete note
                                    setGrid((prevGrid) =>
                                        prevGrid.map((cell, i) => {
                                            if(i !== index)
                                                return cell;
                                            if(cell.notes.length > 0) {
                                                const updatedNotes = [...cell.notes];
                                                updatedNotes.pop();

                                                return { ...cell, notes: updatedNotes };
                                            }

                                            return cell;
                                        })
                                    );
                                } else { //delete input
                                    handleCellInput(index, '', false);
                                }

                                event.preventDefault()
                            } else { //prevent behavior on non-numeric characters
                                event.preventDefault();
                            }
                        }
                        handleNavigation(event, index);
                    }}
                >
                    {/* Large number display */}
                    {cell.value && (
                        <div
                            className="large-number"
                            style={{
                                color: cell.isClue
                                    ? 'black'
                                    : cell.isCorrect
                                        ? 'black'
                                        : 'red',
                            }}
                        >
                            {cell.value}
                        </div>
                    )}

                    {/* Small number (notes) display */}
                    {cell.notes.map((note, i) => (
                        <div
                            key={i}
                            className={`small-number ${
                                ['top-left', 'top-right', 'bottom-left', 'bottom-right'][i]
                            }`}
                        >
                            {note}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

Board.propTypes = {
    puzzle: PropTypes.shape({
        puzzleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        puzzleVals: PropTypes.string.isRequired,
        solutionVals: PropTypes.string.isRequired,
    }).isRequired,
};

export default Board;
