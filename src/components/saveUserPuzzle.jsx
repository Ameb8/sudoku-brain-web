// saveUserPuzzle.js
import { debounce } from 'lodash';

export function createSaveProgress(userPuzzle, getSecondsWorkedOn) {
    return debounce(async (updatedState) => {
        const attempted = {
            id: userPuzzle.id,
            user: userPuzzle.user,
            puzzle: userPuzzle.puzzle,
            currentState: updatedState,
            secondsWorkedOn: getSecondsWorkedOn(), // call function to get latest seconds
            hintsUsed: 0, // default for now
            startedOn: userPuzzle.startedOn,
        };

        // Log the attempted object to see exactly what is being sent
        console.log('Sending the following JSON:', JSON.stringify(attempted, null, 2));

        try {
            await fetch('http://localhost:8080/api/puzzles/secure/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attempted),
                credentials: "include",
            });

            console.log('Seconds worked on: ', attempted.secondsWorkedOn)
            console.log('Progress saved!');
        } catch (error) {
            console.error('Failed to save progress', error);
        }
    }, 1500); // debounce by 1.5s
}



/*
import { debounce } from 'lodash';

export function createSaveProgress(userPuzzle, getSecondsWorkedOn) {
    return debounce(async (updatedState) => {
        const attempted = {
            id: userPuzzle.id,
            user: userPuzzle.user,
            puzzle: userPuzzle.puzzle,
            currentState: updatedState,
            secondsWorkedOn: getSecondsWorkedOn(), // call function to get latest seconds
            hintsUsed: 0, // default for now
            startedOn: userPuzzle.startedOn,
        };

        // Log the attempted object to see exactly what is being sent
        console.log('Sending the following JSON:', JSON.stringify(attempted, null, 2));

        try {
            await fetch('http://localhost:8080/api/puzzles/secure/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attempted),
                credentials: "include",
            });

            console.log('Seconds worked on: ', attempted.secondsWorkedOn)
            console.log('Progress saved!');
        } catch (error) {
            console.error('Failed to save progress', error);
        }
    }, 1500); // debounce by 1.5s
}
 */
