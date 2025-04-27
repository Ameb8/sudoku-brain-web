import "./Navbar.css";
import UserProfile from "./UserProfile.jsx";
import UserAvatar from "./UserAvatar.jsx"; // Import the CSS file

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-title">SudokuBrain</div>

            <div className="navbar-user">
                <UserProfile />
            </div>
            <div className="navbar-spacer-two"></div>
            <div>
                <UserAvatar />
            </div>
            <div className="navbar-spacer"></div>
        </nav>
    );
}





/*import "./Navbar.css";
import UsernameDisplay from "./Login.jsx";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">SudokuBrain</div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">services</a></li>
                <li><a href="#contact">profile</a></li>
                <li>
                    <UsernameDisplay />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;*/