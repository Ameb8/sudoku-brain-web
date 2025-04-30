import "./Navbar.css";
import UserProfile from "./UserProfile.jsx";
import UserAvatar from "./UserAvatar.jsx";
import LoginButton from "./LoginButton.jsx";
import { useUser} from "./UserProvider";

export default function Navbar() {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="navbar">
            <div className="navbar-title">SudokuBrain</div>

            <div className="navbar-user">
                {user ? <UserProfile /> : <LoginButton />}
            </div>
            <div className="navbar-spacer-two"></div>
            <div>
                <UserAvatar />
            </div>
            <div className="navbar-spacer"></div>
        </nav>
    );
}





/*
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
 */




