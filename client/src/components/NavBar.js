import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function NavBar() {
  const context = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeLink, setActiveLink] = useState(path);

  function handleNavbarClick(e) {
    setActiveLink(e.target.name);
  };

  return (
    context.user ? (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={activeLink === "home" ? "nav-link active" : "nav-link"} to="/" name="home" onClick={handleNavbarClick} >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={'/users/' + context.user.id} name={context.user.username} >{context.user.username}</Link>
              </li>
              <li className="nav-item">
                <a id="cartButton" className="nav-link" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" name="logout" onClick={context.logout} >Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    ) : (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={activeLink === "home" ? "nav-link active" : "nav-link"} to="/" name="home" onClick={handleNavbarClick} >Home</Link>
              </li>
              <li className="nav-item">
                <Link className={activeLink === "about" ? "nav-link active" : "nav-link"} to="/about" name="about" onClick={handleNavbarClick} >About</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <Link className={activeLink === "login" ? "nav-link active" : "nav-link"} to="/login" name="login" onClick={handleNavbarClick} >Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  )
}

export default NavBar ;
