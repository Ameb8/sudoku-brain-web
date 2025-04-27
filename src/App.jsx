//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import QuickPlay from "./pages/QuickPlay";
import LeaderBoardPage from "./pages/LeaderBoardPage.jsx";
import './App.css'
import {UserProvider} from "./components/UserProvider.jsx";



function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/QuickPlay" element={<QuickPlay />} />
                    <Route path="/LeaderBoardPage" element={<LeaderBoardPage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App
