import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";
import "./UsernameDisplay.css";

export default function UserProfile() {
    const { user, loading } = useContext(UserContext); // Access user info and loading state from context
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const username = loading ? "Loading..." : user ? user.username : "Logged out";

    return (
        <div className="user-container">
            <button className="username-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {username}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li>
                            <Link to="/Profile">Profile</Link>
                        </li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
