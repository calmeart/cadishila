import React, { useState } from 'react';

function CartContainer() {

  const [cartContent, setCartContent] = useState([]);

  return (
    <div className="collapse cartContainer" id="collapseExample">
      <div>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-6">
              <div style={{backgroundColor: "gray", width: "calc(100%-1rem)", height: "66%", margin: "1rem 0 1rem 1rem"}} />
            </div>
            <div className="col-md-6">
              <div className="card-body position-relative">
                <button type="button" className="btn-close position-absolute top-0 end-0" aria-label="Close"></button>
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text">Size: M</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex justify-content-between cartButton align-items-center">
                <button type="button" className="btn btn-secondary px-2">-</button>
                <p className="card-text m-0">2</p>
                <button type="button" className="btn btn-secondary px-2">+</button>
              </div>
            </div>
            <div className="col-md-6">
              <p className="card-text"><strong>Price: TRY 65.00</strong></p>
            </div>
          </div>
        </div>
        <p className="text-center"><strong>Total Price: TRY 300.00</strong></p>
        <button type="button" className="btn btn-primary w-100">Check Out</button>
      </div>
    </div>
  )
};

export default CartContainer;
