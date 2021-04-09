import React from "react";
import { useQuery } from '@apollo/client';
import { GetOrders } from '../graphql/order-queries';

function OrderTrack() {
  const { loading, error, data } = useQuery(GetOrders);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error: {error.message}</p>;

  return data.orders.map(item => (
    <div className="card">
      <div class="card-header d-flex">
        <p>{item.status}</p>
        <p>{item.createdAt}</p>
        <p>{item.deliveredAt}</p>
      </div>
      <div class="card-body">
        <div className="row m-3">
          <div className="col-md-4">
            <p>{item.id}</p>
          </div>
          <div className="col-md-4">
            <p>{item.productName}</p>
            <p>{item.productSize}</p>
            <p>{item.productPrice}</p>
          </div>
          <div className="col-md-4">
          <p>{item.userId}</p>
          <p>{item.deliveryMethod}</p>
          <p>{item.deliveryAddress}</p>
          </div>
        </div>
      </div>
    </div>

  )
  );
}

export default OrderTrack;
