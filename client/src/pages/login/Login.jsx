import React, { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,

    })

    const Navigate = useNavigate()

    const { loading, error, dispatch, user } = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value

        })

        )
    }


    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            Navigate('/')
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data })
        }

    }

    console.log(user)

    return (
        <div className="login">
            <div className="lContainer">
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleClick} className="lButton">
                    Login
                </button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )

}

export default Login