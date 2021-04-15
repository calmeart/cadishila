import React from 'react';

function Footer() {

  return (
    <footer className="footer mt-5 py-3 bg-dark">
      <div className="container">
        <div id="footerLinks">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-4">Categories</h5>
            </div>
            <div>
              <h5 className="mb-4">About Us</h5>
              <p>CadiShila</p>
              <p>How Do We Work</p>
              <p>Materials</p>
              <p>Size & Measurements</p>
              <p>Payment & Delivery</p>
            </div>
            <div>
              <h5 className="mb-4">Social Media</h5>
              <p>Instagram</p>
              <p>Facebook</p>
            </div>
            <div>
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
