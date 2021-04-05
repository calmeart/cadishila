import React from "react";
import { Link } from 'react-router-dom';

function ProductCard({ item }) {
  const pathname = "/products/" + item.id;

  return (
    <div className="card">
      <div className="cardImg"><img src={item.imageLink} alt={item.description} /></div>
      <div className="card-body">
        <h5 className="card-title" >{item.name}</h5>
        <Link className="btn bg-transparent stretched-link" to={pathname}><p className="card-text">TRY {item.price}</p></Link>
      </div>
    </div>
  )
}

export default ProductCard;
