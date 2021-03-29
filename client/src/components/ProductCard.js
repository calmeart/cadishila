import React from "react";

function ProductCard({ item, selectProduct }) {
  return (
    <div className="card">
      <div className="cardImg"><img src={item.imageLink} alt={item.description} /></div>
      <div className="card-body">
        <h5 className="card-title" >{item.name}</h5>
        <button className="btn bg-transparent stretched-link" value={item.id} onClick={selectProduct}><p className="card-text">TRY {item.price}</p></button>
      </div>
    </div>
  )
}

export default ProductCard;
