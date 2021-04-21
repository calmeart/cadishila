import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function NavBar() {
  const context = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeLink, setActiveLink] = useState(path);

  const { innerWidth } = window;
  const [isMobile] = useState( (innerWidth < 576) ? true : false );

  function handleNavbarClick(e) {
    setActiveLink(e.target.name);
    const navbarList = document.getElementById("navbarSupportedContent");
    navbarList.className = "collapse navbar-collapse";
  };

  return (

      <nav className="navbar fixed-top navbar-expand-sm navbar-dark">
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
                <Link className={activeLink === "products" ? "nav-link active" : "nav-link"} to="/products" name="products" onClick={handleNavbarClick} >Products</Link>
              </li>
              {!isMobile &&
              <li className="nav-item">
                <a id="cartButton" className="nav-link" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Cart
                </a>
              </li> }
              {context.user ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/dummy" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {context.user.username}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to={'/users/' + context.user.id} name={context.user.username} >View Profile</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to={'/users/' + context.user.id + "/products"} >Saved Products</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={'/users/' + context.user.id + "/orders"} >My Orders</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={'/users/' + context.user.id + "/reviews"} >My Reviews</Link>
                    </li>
                    {context.user.isAdmin && (
                      <>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <Link className="dropdown-item" to={'/users/' + context.user.id + "/admin"} >Admin Portal</Link>
                      </li>
                      </>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/login" name="logout" onClick={context.logout} >Logout</Link>
                    </li>
                  </ul>

                </li>
              ) : (
                <li className="nav-item">
                  <Link className={activeLink === "login" ? "nav-link active" : "nav-link"} to="/login" name="login" onClick={handleNavbarClick} >Login</Link>
                </li>
              )}
            </ul>
          </div>
          {isMobile && <a id="cartButton" className="nav-item nav-link" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Cart
          </a>}
        </div>
      </nav>

  )
}

export default NavBar ;
