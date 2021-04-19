import React from "react";
import { useQuery } from '@apollo/client';

import OrderCard from "./OrderCard";
import { GetOrders } from '../graphql/order-queries';

function OrderTrackAdmin() {

  const { loading, error, data } = useQuery(GetOrders);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error: {error.message}</p>;

  return data.orders.map(item => <OrderCard key={item.id} item={item} />);
}

export default OrderTrackAdmin;
