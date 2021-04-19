import React from "react";
import { useQuery } from '@apollo/client';

import OrderCard from "./OrderCard";
import { GetUserOrders } from '../graphql/order-queries';

function OrderTrack({ email }) {

  const { loading, error, data } = useQuery(GetUserOrders, {
    variables: { email }
  });

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error: {error.message}</p>;

  return data.getUserOrders.map(item => <OrderCard key={item.id} item={item} />);
}

export default OrderTrack;
