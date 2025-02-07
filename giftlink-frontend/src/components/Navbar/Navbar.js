import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    
    const {isLoggedIn, setIsLoggedIn, userName, setUserName} = useAppContext();
    const navigate = useNavigate();
    
    useEffect(()=>{       
        const authTokenFromSession = sessionStorage.getItem('auth-token')
        const nameFromSession = sessionStorage.getItem('name');
        if(authTokenFromSession){
            if(isLoggedIn &&  nameFromSession){
                 setUserName(nameFromSession);
            }else{
                sessionStorage.removeItem('auth-token');
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('email');
                setIsLoggedIn(false);
            }
        }
    },[isLoggedIn, setIsLoggedIn, setUserName]);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate('/app');

    };

    const profileSection = () => {
        navigate('/app/profile');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>

           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
           </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts below*/}
                    <li className='nav-item'>
                        <a className='nav-link' href="/home.html" >Home</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/app">Gifts</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href="/app/search">Search</a>
                    </li>
                    <ul className='navbar-nav ml-auto'>
                         {isLoggedIn ?
                              (
                                <>
                                   <li className="nav-item"> <span className="nav-link" style={{color: "black", cursor:"pointer"}} onClick={profileSection}>Welcome, {userName}</span> </li>
                                   <li className="nav-item"><button className="nav-link login-btn" onClick={handleLogout}>Logout</button></li>
                                </>
                              ):
                              (<>
                                  <li className="nav-item">
                                        <Link className="nav-link login-btn" to="/app/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                        <Link className="nav-link register-btn" to="/app/register">Register</Link>
                                        </li>
                              </>)
                         } 
                    </ul>
                </ul>
            </div>
        </nav>
    );
}
