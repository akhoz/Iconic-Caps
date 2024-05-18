import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const CommentsContext = createContext();

export const CommentsProvider = ({children}) => {
    const [clickedComment, setClickedComment] = useState(null);

    const deleteComment = () => {
        setClickedComment(null);
        console.log(clickedComment)
    }

    return (
        <CommentsContext.Provider value={{ clickedComment, setClickedComment, deleteComment }}>
            {children}
        </CommentsContext.Provider>
    );
}

export const useComments = () => useContext(CommentsContext);

CommentsProvider.propTypes = {
    children: PropTypes.node.isRequired,
}