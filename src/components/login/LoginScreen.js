import React, {useContext, useReducer} from "react";
import {useNavigate } from 'react-router-dom'
import {types} from "../../types/types";
import {AuthContext} from "../../auth/authContext";

export const LoginScreen = () => {

    const { dispatch } = useContext( AuthContext )

    const navigate = useNavigate();

    const handleLogin = () => {
        dispatch({
            type: types.login,
            payload: {
                name: 'Salva'
            }
        })

        const lastPath = localStorage.getItem('lastPath') || '/marvel';

        navigate(lastPath, { replace: true });

    }

    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr/>
            <button className="btn btn-primary" onClick={ handleLogin }>
                Login
            </button>
        </div>
    )
}