import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Product } from "./Checkout";
import { AppContext, getTotalPrice, getTotalQuantity, getOrderIds, getProductsByOrderId, getFormattedDate } from "../lib";
import { LoadingSpinner } from "../components";

export function OrderHistory () {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    !user && navigate('/signin');
    const getOrderHistory = async () => {
      try {
        const token = localStorage.getItem('react-context-jwt')
        const req = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        };
        const products = await fetch(`/api/orderhistory/${user.customerId}`, req);
        if (!products.ok) {
          throw new Error(`Network response was not OK. Status Code: ${products.status}`);
        }
        const productsData = await products.json();
        setOrderHistory(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    user && getOrderHistory();
  }, [navigate, user]);

  if (isLoading) return (
    <LoadingSpinner />
  );
  return (
    <div className="container black-bg-img text-white flex-grow-1 pb-5">
      <div className="my-4 text-center">
        <h1>Order History</h1>
      </div>
      <div className="accordion accordion-flush col-12 col-md-8 m-auto" id="accordionOrderHistory">
        {
        getOrderIds(orderHistory).map((orderId) =>
          <Accordion
            key={orderId}
            uniqueId={orderId}
            orderHistory={getProductsByOrderId(orderHistory, orderId)} />
        )}
      </div>
    </div>
  )
}

function Accordion ({uniqueId, orderHistory}) {

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#'+uniqueId} aria-expanded="false" aria-controls="flush-collapseTwo">
          <span className="d-flex justify-content-between w-100">
            <span>Order #{uniqueId}</span>
            <span className="pe-3">{getFormattedDate(orderHistory[0].dateTime)}</span>
          </span>
        </button>
      </h2>
      <div id={uniqueId} className="accordion-collapse collapse" data-bs-parent="#accordionOrderHistory">
        <div className="accordion-body">
          <ul className="list-group mb-3 sticky-top">

          {orderHistory.map((product) =>
            <Product
              key={product.productId}
              product={product} />
          )}
            <li className="list-group-item d-flex justify-content-between">
              <span>Number of items</span>
              <strong>{`${getTotalQuantity(orderHistory)}`}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{`$${getTotalPrice(orderHistory)}`}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
