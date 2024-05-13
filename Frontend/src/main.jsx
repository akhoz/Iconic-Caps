import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ProductsProvider} from "./contexts/ProductsContext.jsx";
import {UserProvider} from "./contexts/UserContext.jsx";
import { CookiesProvider } from 'react-cookie';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CookiesProvider>
      <UserProvider>
    <ProductsProvider>
          <App />
    </ProductsProvider>
      </UserProvider>
      </CookiesProvider>
  </React.StrictMode>
)
