import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import AppContext from "../components/AppContext";
import { Product } from "./Checkout";

export default function OrderHistory () {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    !user && navigate('/signin');
    const getCatalog = async () => {
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
    user && getCatalog();
  }, [navigate, user]);
  console.log(orderHistory);

  function getOrderIds () {
    const orderIds = []
    orderHistory.forEach((product) => {
      if (!orderIds.includes(product.orderId)) {
        orderIds.push(product.orderId)
      }
    })
    return orderIds;
  }

  function getProductsByOrderId (orderId) {
    return orderHistory.filter((product) => product.orderId === orderId)
  }

  if (isLoading) return (
    <div className=" container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );
  return (
    <div className="container black-bg-img text-white flex-grow-1">
      <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h2>Order History</h2>
      </div>
      <div className="accordion accordion-flush col-8 offset-2" id="accordionFlushExample">
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
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#'+uniqueId} aria-expanded="false" aria-controls="flush-collapseTwo">
          Order #{uniqueId}
        </button>
      </h2>
      <div id={uniqueId} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">
          {orderHistory.map((product) =>
            <Product
              key={product.productId}
              product={product} />
          )}
        </div>
      </div>
    </div>
  )
}
