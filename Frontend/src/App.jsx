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
                <Routes>
                    <Route path="/" element={<HeaderFooterLayout><Home/></HeaderFooterLayout>}/>
                    <Route path="/Shop" element={<HeaderFooterLayout><Shop/></HeaderFooterLayout>}/>
                    <Route path="/About" element={<HeaderFooterLayout><About/></HeaderFooterLayout>}/>
                    <Route path="/OurTeam" element={<HeaderFooterLayout><OurTeam/></HeaderFooterLayout>}/>

                    <Route path="/LogIn" element={<LogIn/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                </Routes>
            </Router>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function HeaderFooterLayout({ children }) {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
}



export default App;
