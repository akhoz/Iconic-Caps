import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react'
import './App.css'
import Home from "./views/Home.jsx";
import Footer from "./components/Footer.jsx";
import About from "./views/About.jsx";
import Shop from "./views/Shop.jsx";
import OurTeam from "./views/OurTeam.jsx";
import LogIn from "./views/LogIn.jsx";
import SignUp from "./views/SignUp.jsx";
import Header from "./components/Header.jsx";
import Account from "./views/Account.jsx";
import LocalStores from "./views/LocalStores.jsx";
import ProductView from "./views/ProductView.jsx";

function App() {
    const URI = 'http://localhost:8000/productos/'

    const [productos, setProducto] = useState([])
    useEffect( ()=>{
        getProductos()
    },[])

    const getProductos = async () => {
        const res = await axios.get(URI)
        setProducto(res.data)
    }
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HeaderFooterLayout><Home/></HeaderFooterLayout>}/>
                    <Route path="/Shop" element={<HeaderFooterLayout><Shop/></HeaderFooterLayout>}/>
                    <Route path="/About" element={<HeaderFooterLayout><About/></HeaderFooterLayout>}/>
                    <Route path="/OurTeam" element={<HeaderFooterLayout><OurTeam/></HeaderFooterLayout>}/>
                    <Route path="/LocalStores" element={<HeaderFooterLayout><LocalStores/></HeaderFooterLayout>}/>
                    <Route path="/Product/:modelo" element={<HeaderFooterLayout><ProductView productos={productos}/></HeaderFooterLayout>} />

                    <Route path="/LogIn" element={<LogIn/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                    <Route path="/Account" element={<Account/>}/>
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