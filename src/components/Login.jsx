import { useUser } from "./UserProvider.jsx"; // Import the context
import { useState } from "react";
import "./UsernameDisplay.css"; // Import the CSS file
export default function UsernameDisplay() {
    const { user, loading } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const username = loading ? "Loading..." : user ? user.username : "Logged out";

    return (
        <div className="user-container">
            {}
            <button className="username-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {username}
            </button>

            {}
            {dropdownOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
}