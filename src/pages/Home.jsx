
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./Home.css";
import LoginButton from "../components/LoginButton.jsx";
import UserInfo from "../components/UserInfo.jsx";
import SomeComponent from "../components/SomeComponent.jsx";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <Navbar></Navbar>
            <div className="button-container">
                <button className="main-button" onClick={() => navigate("/QuickPlay")}>Quick Play</button>
                <button className="main-button" onClick={() => navigate("/LeaderBoardPage")}>Leader Board</button>
                <button className="main-button" onClick={() => navigate("/AttemptedPuzzles")}>Continue Puzzle</button>
            </div>
        </div>
    );
}

export default Home;