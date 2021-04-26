import React from 'react';

function Footer() {

  return (
    <footer className="footer mt-5 py-3 bg-dark">
      <div className="container">
        <div id="footerLinks">
          <div className="row justify-content-between">
            <div className="col-sm-3 col-6">
              <h5 className="mb-4">Categories</h5>
            </div>
            <div className="col-sm-3 col-6">
              <h5 className="mb-4">About Us</h5>
              <a className="nav-link" href="/about#shilaburda"><p>ShilaBurda</p></a>
              <a className="nav-link" href="/about#howdowework"><p>How Do We Work</p></a>
              <a className="nav-link" href="/about#material"><p>Material</p></a>
              <a className="nav-link" href="/about#measurements"><p>Size & Measurements</p></a>
              <p className="nav-link text-muted">Payment & Delivery</p>
            </div>
            <div className="col-sm-3 col-6">
              <h5 className="mb-4">Social Media</h5>
              <p>Instagram</p>
              <p>Facebook</p>
            </div>
            <div className="col-sm-3 col-6">
              <h5 className="mb-4">Contacts</h5>
              <p>Phone Number</p>
              <p>Email Address</p>
              <p>City, Country</p>
            </div>
          </div>
        </div>
        <div id="footerNote" className="d-flex justify-content-between">
          <p>CadiShila 2021</p>
          <p>Website made by calmeart</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
