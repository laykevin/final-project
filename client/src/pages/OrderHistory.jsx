import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import AppContext from "../components/AppContext";
import { Product } from "./Checkout";

export default function OrderHistory () {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  // const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    !user && navigate('/signin');
    const getOrderHistory = async () => {
      console.log(user.customerId)
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
  console.log(orderHistory);
  // let orderTotal = 0;
  function getOrderIds () {
    const orderIds = []
    orderHistory.forEach((product) => {
      if (!orderIds.includes(product.orderId)) {
        orderIds.push(product.orderId);
      }
    })
    return orderIds;
  }

  function getProductsByOrderId (orderId) {
    return orderHistory.filter((product) => product.orderId === orderId)
  }

  // const getTotal = () => cart.reduce((acc, item) => acc += item.price * item.productQuantity, 0)

  if (isLoading) return (
    <div className=" container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );
  return (
    <div className="container black-bg-img text-white flex-grow-1 pb-5">
      <div className="py-5 text-center">
        {/* <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" /> */}
        <h2>Order History</h2>
      </div>
      <div className="accordion accordion-flush col-12 col-md-8 m-auto" id="accordionOrderHistory">
        {
        getOrderIds().map((orderId) =>
          <Accordion
            key={orderId}
            uniqueId={orderId}
            orderHistory={getProductsByOrderId(orderId)} />
        )}
      </div>
    </div>
  )
}

function Accordion ({uniqueId, orderHistory}) {
  const getTotal = () => orderHistory.reduce((acc, item) => acc += item.price * item.productQuantity, 0)
  const getTotalQuantity = () => orderHistory.reduce((acc, item) => acc += item.productQuantity, 0);
  const getFormattedDate = (dateString) => (new Date(dateString)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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
              <strong>{`${getTotalQuantity()}`}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{`$${(getTotal() / 100).toFixed(2)}`}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
