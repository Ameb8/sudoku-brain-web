import { useState, useEffect } from "react";
import { useUser } from "../components/UserProvider.jsx";

const useUserPuzzle = (puzzleId) => {
    const { user, loading: userLoading } = useUser();
    const [userPuzzle, setUserPuzzle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userLoading || !user) return;

        const fetchUserPuzzle = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/puzzles/secured/userpuzzle/${puzzleId}`, {
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Failed to fetch puzzle progress");

                const data = await response.json();
                setUserPuzzle(data);
            } catch (err) {
                setError(err.message);
                setUserPuzzle(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPuzzle();
    }, [puzzleId, user, userLoading]);

    return { userPuzzle, loading, error };
};

export default useUserPuzzle;
