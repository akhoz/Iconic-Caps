import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const CommentsContext = createContext();

export const CommentsProvider = ({children}) => {
    const [clickedComment, setClickedComment] = useState(null);

    return (
        <CommentsContext.Provider value={{ clickedComment, setClickedComment }}>
            {children}
        </CommentsContext.Provider>
    );
}

export const useComments = () => useContext(CommentsContext);

CommentsProvider.propTypes = {
    children: PropTypes.node.isRequired,
}