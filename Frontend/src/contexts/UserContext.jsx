import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { useCookies } from "react-cookie";
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [cookie, setCookie, removeCookie] = useCookies(['username']);
    const [user, setUser] = useState(null);

    const logIn = useCallback((userData) => {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    }, []);

    const logOut = useCallback(() => {
        setUser(null);
        removeCookie('username', { path: '/' });
        sessionStorage.removeItem('user');
    }, [removeCookie]);

    const checkCookies = useCallback(async () => {
        if (cookie.username) {
            const res = await axios.get(`http://localhost:8000/clientes/${cookie.username}`);
            const clienteData = res.data;
            logIn(clienteData);
        }
    }, [cookie.username, logIn]);

    return (
        <UserContext.Provider value={{ user, logIn, logOut, checkCookies }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;
