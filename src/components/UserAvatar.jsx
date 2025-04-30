import './UserAvatar.css'
import defaultAvatar from '../assets/default_avatar.png'; // Adjust path accordingly
import {useUser} from "./UserProvider.jsx";

export default function UserAvatar() {
    const { user, loading } = useUser(); // Access user data and loading state from context

    console.log("User info:", user);

    // Determine the profile picture URL or fallback to the default image
    const avatarUrl = user && user.profilePicture ? user.profilePicture : defaultAvatar;

    return (
        <div className="avatar-container">
            {loading ? (
                <div>Loading...</div> // Loading state
            ) : (
                <img
                    className="user-avatar"
                    src={avatarUrl}
                    alt={user ? user.username : "Guest"}
                    width="50"
                    height="50"
                />
            )}
        </div>
    );
}
