import React, { useContext } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {

    const { user } = useContext(AuthContext)



    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                    <span className="logo">Massai booking</span>
                </Link>

                {user ? (user.user.username) : (<> <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">
                        <Link to='/login'> Login</Link>
                    </button>
                </div></>)}

            </div>
        </div >
    )
}

export default Navbar