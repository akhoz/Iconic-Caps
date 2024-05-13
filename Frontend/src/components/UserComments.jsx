import axios from 'axios'
import { useEffect, useState } from 'react';
import {useUser} from "../contexts/UserContext.jsx";
import Stars from "./Stars.jsx";
import PropTypes from "prop-types";

function UserComments(props) {
    const { user } = useUser();
    const URI = `http://localhost:8000/comentarios/cedula/${user.CedulaCliente}`
    const [comentarios, setComentarios] = useState([])
    useEffect( ()=>{
        getComentarioByCedula()
    },[])

    const getComentarioByCedula = async () => {
        const res = await axios.get(URI)
        setComentarios(res.data)
    }

    console.log(URI)
    return (
        <>
            <div className="flex-grow bg-black w-full text-white mt-20 py-20 relative">
                <h1 className="font-bold text-2xl absolute top-8 left-8">
                    Your Comments
                </h1>
                <p className={`${comentarios.length > 0 ? 'hidden' : ''} text-lg ml-8`}>
                    You haven't made any comments yet
                </p>
                <div className="flex w-full justify-center">
                    <div className="grid grid-cols-1 gap-x-10 gap-y-20 mx-8 w-full md:grid-cols-2 lg:grid-cols-3">
                        {comentarios.map((comentario) => (
                            <button
                                key={comentario.id}
                                className="transition-transform transform hover:scale-105"
                                onClick={props.handleClickComment}>
                                <div className="flex flex-row justify-between items-center">
                                    <h2 className="font-bold text-lg">
                                        {comentario.ModeloProducto}
                                    </h2>
                                    <Stars rating={comentario.Estrellas}/>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p>
                                        {`${comentario.Fecha} ${comentario.Hora}`}
                                    </p>
                                </div>
                                <p className="text-sm mt-3 text-justify">
                                    {comentario.Comentario}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

UserComments.propTypes = {
    handleClickComment: PropTypes.func.isRequired
}

export default UserComments;