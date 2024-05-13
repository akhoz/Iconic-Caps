import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const logIn = (userData) => {
        setUser(userData);
    }

    const logOut = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;