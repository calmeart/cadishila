import React from 'react';

function CartContainer({ cartContent, increment, decrement, remove }) {

  let totalPrice = 0;

if (cartContent.length > 0) {
  function reducer(acc, cur) {

    const curPrice = (Number(cur.productDetails.price) * cur.count);
    return acc + curPrice;
  }
  totalPrice = cartContent.reduce(reducer, 0);
}

  return (
    <div className="collapse cartContainer" id="collapseExample">
      <div>
        {cartContent.map(item => {
          return (
            <div key={item.productDetails.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-6">
                  <div style={{backgroundColor: "gray", width: "calc(100%-1rem)", height: "66%", margin: "1rem 0 1rem 1rem"}} >
                    <img style={{width: "100%"}} src={item.productDetails.imageLink} alt={item.productDetails.description} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body position-relative">
                    <button type="button" className="btn-close position-absolute top-0 end-0" name={item.productDetails.id} onClick={remove} aria-label="Close"></button>
                    <h5 className="card-title">{item.productDetails.name}</h5>
                    <p className="card-text">{item.productDetails.description}</p>
                    <p className="card-text">{item.productDetails.size}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex justify-content-between cartButton align-items-center">
                    <button type="button" className="btn btn-secondary px-2" name={item.productDetails.id} onClick={decrement}>-</button>
                    <p className="card-text m-0">{item.count}</p>
                    <button type="button" className="btn btn-secondary px-2" name={item.productDetails.id} onClick={increment}>+</button>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="card-text"><strong>{Number(item.productDetails.price) * item.count}</strong></p>
                </div>
              </div>
            </div>
          )
        })}

        <p className="text-center"><strong>Total Price: TRY {totalPrice}</strong></p>
        <button type="button" className="btn btn-primary w-100">Check Out</button>
      </div>
    </div>
  )
};

export default CartContainer;
