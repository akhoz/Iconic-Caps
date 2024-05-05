import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Home from "./views/Home.jsx";
import Footer from "./components/Footer.jsx";
import About from "./views/About.jsx";
import Shop from "./views/Shop.jsx";
import OurTeam from "./views/OurTeam.jsx";
import LogIn from "./views/LogIn.jsx";
import SignUp from "./views/SignUp.jsx";
import Header from "./components/Header.jsx";


function App() {
    return (
        <div>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Shop" element={<Shop/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/OurTeam" element={<OurTeam/>}/>
                    <Route path="/LogIn" element={<LogIn/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    )
}

export default App;