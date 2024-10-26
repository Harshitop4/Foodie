import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    const [token, setToken] = useState("")

    const navigate=useNavigate();

    useEffect(()=>{
        setToken(localStorage.getItem('authToken'))
    },[])

    const handleLogout=()=>{
        localStorage.removeItem('authToken');
        setToken("");
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:"sticky",zIndex:"100" ,top:'0'}}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-4 " to="/">Foodie</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                            </ul>
                        {token ? <>
                        <div className="btn btn-danger me-3" onClick={handleLogout}>
                            Logout
                        </div>
                            <div className="btn btn-success me-3" onClick={()=>navigate('/profile')}>
                                My Profile
                            </div></>
                            :
                            <><div className="btn btn-success me-3" onClick={()=>navigate('/login')}>
                                Login
                        </div>
                            <div className="btn btn-success me-3" onClick={()=>navigate('/signup')}>
                                SignUp
                            </div></>
                        }
                    
                </div>
            </div>
        </nav>
    )
}
