
function cartTotalPrice(cartContent) {
  let totalPrice = 0;

  if (cartContent.length > 0) {
    function reducer(acc, cur) {
      const curPrice = (Number(cur.productDetails.price) * cur.count);
      return acc + curPrice;
    }
    totalPrice = cartContent.reduce(reducer, 0);
  }

  return totalPrice;
}

export default cartTotalPrice;
