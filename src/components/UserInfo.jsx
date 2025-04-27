import { useState } from "react";

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch("/api/users/me", {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data = await response.json();

            setUser({ username: data.username });
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div>
            <button onClick={fetchUserInfo}>Get My Info</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user && (
                <div>
                    <h3>User Info:</h3>
                    <p><strong>Username:</strong> {user.username}</p>
                </div>
            )}
        </div>
    );

};

export default UserInfo;