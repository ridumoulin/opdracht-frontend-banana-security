import React, { useContext } from 'react';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { isAuth, user, logout } = useContext(AuthContext);

  console.log("Authentication Status:", isAuth);

  const handleLogout = () => {
    logout();
  };


  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

        <div>
            {isAuth ? (
                <>
                    <p>Welkom {user}!</p>
                    <button type="button" onClick={handleLogout}>
                    Uitloggen
                    </button>
                </>
            ) : (
                <>
                    <button type="button" onClick={() => navigate('/signin')}>
                        Log in
                    </button>
                    <button type="button" onClick={() => navigate('/signup')}>
                        Registreren
                    </button>
                </>
            )}
        </div>
    </nav>
  );
}

export default NavBar;