import { useState, useEffect } from 'react';
import { createSaveProgress } from "./saveUserPuzzle.jsx";
import './Board.css';
import useUserPuzzle from "../models/useUserPuzzle";
import { useUser } from "./UserProvider.jsx";
import PropTypes from "prop-types";
import { useRef } from 'react';


const Board = ({ puzzle }) => {
    const { user, loading } = useUser();
    const { userPuzzle, loading: userPuzzleLoading, error } = useUserPuzzle(puzzle.puzzleId);

    const [secondsWorkedOn, setSecondsWorkedOn] = useState(0);
    const [saveProgress, setSaveProgress] = useState(null);
    const lastSavedTimeRef = useRef(0);

    const formatTime = (totalSeconds) => {
        const baseSeconds = userPuzzle?.secondsWorkedOn || 0;
        const total = totalSeconds + baseSeconds;
        const hours = Math.floor(total / 3600);
        const minutes = Math.floor((total % 3600) / 60);
        const seconds = total % 60;
        return `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        if (userPuzzle && !userPuzzleLoading) {
            const getSecondsWorkedOn = () => {
                const now = secondsWorkedOn;
                const delta = now - lastSavedTimeRef.current;
                lastSavedTimeRef.current = now; // update the last saved time
                return delta;
            };
            const save = createSaveProgress(userPuzzle, getSecondsWorkedOn);
            setSaveProgress(() => save);
        }
    }, [userPuzzle, userPuzzleLoading, secondsWorkedOn]);


    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsWorkedOn((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    // Create empty grid initially
    const [grid, setGrid] = useState(Array.from({ length: 81 }, () => ({
        value: '',
        isClue: false,
        notes: [],
        isCorrect: true,
    })));

    // When puzzle and userPuzzle are loaded, build the grid
    useEffect(() => {
        if (puzzle && userPuzzle && !userPuzzleLoading) {
            const newGrid = Array.from({ length: 81 }, (_, i) => {
                const clueVal = puzzle.puzzleVals[i];
                const userVal = userPuzzle.currentState ? userPuzzle.currentState[i] : '';

                if (clueVal >= '1' && clueVal <= '9') {
                    return {
                        value: clueVal,
                        isClue: true,
                        notes: [],
                        isCorrect: true,
                    };
                } else if (userVal >= '1' && userVal <= '9') {
                    const isCorrect = userVal === puzzle.solutionVals[i];
                    return {
                        value: userVal,
                        isClue: false,
                        notes: [],
                        isCorrect: isCorrect,
                    };
                } else {
                    return {
                        value: '',
                        isClue: false,
                        notes: [],
                        isCorrect: true,
                    };
                }
            });

            setGrid(newGrid);
        }
    }, [puzzle, userPuzzle, userPuzzleLoading]);

    // Handle cell value change
    const handleCellInput = (index, inputValue, isNote) => {
        setGrid((prevGrid) =>
            prevGrid.map((cell, i) => {
                if (i !== index) return cell;

                if (isNote) {
                    const notes = [...cell.notes];
                    if (notes.includes(inputValue)) {
                        notes.splice(notes.indexOf(inputValue), 1); // Remove the note
                    } else if (notes.length < 4) {
                        notes.push(inputValue); // Add the note (limit to 4)
                    }
                    return { ...cell, notes };
                } else {
                    const isCorrect = inputValue === puzzle.solutionVals.charAt(index);
                    return { ...cell, value: inputValue, notes: [], isCorrect };
                }
            })


        );

        if (saveProgress) {
            const currentState = grid.map((cell) => cell.value || '0').join('');
            saveProgress(currentState);
        }
    };

    // Handle arrow key navigation
    const handleNavigation = (event, index) => {
        const { key } = event;
        let newIndex = index;

        if (key === 'ArrowUp' && index - 9 >= 0) newIndex -= 9;
        if (key === 'ArrowDown' && index + 9 < 81) newIndex += 9;
        if (key === 'ArrowLeft' && index % 9 > 0) newIndex -= 1;
        if (key === 'ArrowRight' && index % 9 < 8) newIndex += 1;

        if (newIndex !== index) {
            event.preventDefault();
            document.getElementById(`cell-${newIndex}`).focus();
        }
    };

    // Styling classes for the grid
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

    if (userPuzzleLoading || loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="timer-display">
                Time: {formatTime(secondsWorkedOn)}
            </div>
        <div id="grid-container">
            {grid.map((cell, index) => (
                <div
                    id={`cell-${index}`}
                    key={index}
                    className={getCellClassName(index)}
                    tabIndex={0}
                    contentEditable={!cell.isClue}
                    suppressContentEditableWarning={true}
                    onInput={(e) => {
                        const input = e.currentTarget.innerText.trim() || e.currentTarget.textContent.trim();
                        const validInput = /^[1-9]$/.test(input) ? input : '';
                        const solutionValue = puzzle.solutionVals.charAt(index);

                        if (validInput === solutionValue)
                            e.currentTarget.style.color = 'black';
                        else
                            e.currentTarget.style.color = 'red';

                        handleCellInput(index, validInput, false);
                    }}
                    onKeyDown={(event) => {
                        const isNote = event.shiftKey || event.altKey || event.ctrlKey;

                        if (!cell.isClue) {
                            const validNumber = /^[1-9]$/.test(event.key);

                            if (validNumber) {
                                handleCellInput(index, event.key, isNote);
                                event.preventDefault();
                            } else if (event.key === 'Backspace' || event.key === '0') {
                                if (isNote) {
                                    setGrid((prevGrid) =>
                                        prevGrid.map((cell, i) => {
                                            if (i !== index) return cell;
                                            if (cell.notes.length > 0) {
                                                const updatedNotes = [...cell.notes];
                                                updatedNotes.pop();
                                                return { ...cell, notes: updatedNotes };
                                            }
                                            return cell;
                                        })
                                    );
                                } else {
                                    handleCellInput(index, '', false);
                                }
                                event.preventDefault();
                            } else {
                                event.preventDefault();
                            }
                        }
                        handleNavigation(event, index);
                    }}
                >
                    {/* Large number (main value) */    }
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

                    {/* Small numbers (notes) */}
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




