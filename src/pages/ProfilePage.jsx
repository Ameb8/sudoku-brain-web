import { useEffect, useState } from "react";
import { useUser } from '../components/UserProvider';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, loading } = useUser();
    const [attemptedPuzzlesCount, setAttemptedPuzzlesCount] = useState(0);
    const [solvedPuzzlesCount, setSolvedPuzzlesCount] = useState(0); // State for solved puzzles count
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        if (user) {
            setNewUsername(user.username);
            // Fetch attempted puzzles
            const fetchAttemptedPuzzles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/puzzles/secured/attempted`, {
                        credentials: "include",
                    });
                    if(!response.ok) throw new Error("Failed to fetch attempted puzzles");

                    const data = await response.json();

                    console.log(data);

                    setAttemptedPuzzlesCount(data.length); // Set attempted puzzles count
                } catch (error) {
                    console.error("Error fetching attempted puzzles:", error);
                }
            };

            // Fetch solved puzzles
            const fetchSolvedPuzzles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/puzzles/secured/solved`, {
                        credentials: "include",
                    });
                    if (!response.ok) throw new Error("Failed to fetch solved puzzles");

                    const data = await response.json();
                    setSolvedPuzzlesCount(data.length); // Set solved puzzles count
                } catch (error) {
                    console.error("Error fetching solved puzzles:", error);
                }
            };

            fetchAttemptedPuzzles();
            fetchSolvedPuzzles();
        }
    }, [user]);

    const handleUsernameUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/secured/username/${newUsername}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error("Failed to update username");

            // Ideally, refresh user data from provider or backend here
            setIsEditing(false);
            window.location.reload(); // simple workaround to see update
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="error">
                No user information available.
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src={user.profilePicture} alt="Profile" className="profile-avatar" />

                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="username-input"
                        />
                        <button onClick={handleUsernameUpdate}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h2 className="profile-username">{user.username}</h2>
                        <button onClick={() => setIsEditing(true)}>Edit Username</button>
                    </>
                )}

                <p className="profile-email">{user.email}</p>
                <p className="profile-date">
                    Joined on {new Date(user.createdOn).toLocaleDateString()}
                </p>
                <p className="profile-attempted">Puzzles Attempted: {attemptedPuzzlesCount}</p>
                <p className="profile-solved">Puzzles Solved: {solvedPuzzlesCount}</p>
            </div>
        </div>
    );
};

export default ProfilePage;






/*
import { useEffect, useState } from "react";
import { useUser } from '../components/UserProvider';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, loading } = useUser();
    const [attemptedPuzzlesCount, setAttemptedPuzzlesCount] = useState(0);
    const [solvedPuzzlesCount, setSolvedPuzzlesCount] = useState(0); // State for solved puzzles count

    useEffect(() => {
        if (user) {
            // Fetch attempted puzzles
            const fetchAttemptedPuzzles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/puzzles/secured/attempted`, {
                        credentials: "include",
                    });
                    if (!response.ok) throw new Error("Failed to fetch attempted puzzles");

                    const data = await response.json();
                    setAttemptedPuzzlesCount(data.length); // Set attempted puzzles count
                } catch (error) {
                    console.error("Error fetching attempted puzzles:", error);
                }
            };

            // Fetch solved puzzles
            const fetchSolvedPuzzles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/puzzles/secured/solved`, {
                        credentials: "include",
                    });
                    if (!response.ok) throw new Error("Failed to fetch solved puzzles");

                    const data = await response.json();
                    setSolvedPuzzlesCount(data.length); // Set solved puzzles count
                } catch (error) {
                    console.error("Error fetching solved puzzles:", error);
                }
            };

            fetchAttemptedPuzzles();
            fetchSolvedPuzzles();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="loading">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="error">
                No user information available.
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src={user.profilePicture} alt="Profile" className="profile-avatar" />
                <h2 className="profile-username">{user.username}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-date">
                    Joined on {new Date(user.createdOn).toLocaleDateString()}
                </p>
                <p className="profile-attempted">
                    Puzzles Attempted: {attemptedPuzzlesCount}
                </p>
                <p className="profile-solved">
                    Puzzles Solved: {solvedPuzzlesCount} {/* Display the solved puzzles count *}
                </p>
            </div>
        </div>
       );
    };

export default ProfilePage;
 */





