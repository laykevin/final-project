export const getTotalPrice = (list) => {
  const totalPrice = list.reduce((acc, item) => acc += item.price * item.productQuantity, 0);
  return (totalPrice / 100).toFixed(2)};

export const getTotalQuantity = (list) => list.reduce((acc, item) => acc += item.productQuantity, 0);

export const getOrderIds = (orderHistory) => {
  const orderIds = []
  orderHistory.forEach((product) => {
    if (!orderIds.includes(product.orderId)) {
      orderIds.push(product.orderId);
    }
  })
  return orderIds;
};

export const getProductsByOrderId = (orderHistory, orderId) => {
  return orderHistory.filter((product) => product.orderId === orderId)
};

export const getFormattedDate = (dateString) => (new Date(dateString)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const randomize = (values) => {
  let index = values.length;
  let randomIndex;
  while (index !== 0) {
    randomIndex = Math.floor(Math.random() * index);
    index--;
    [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
  }
  return values;
};
