import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../components/AppContext"
import MyCartList from "../components/MyCartList";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyCart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    !user && navigate('/signin');
    const getCart = async () => {
      try {
        const token = localStorage.getItem('react-context-jwt')
        const req = {
          method: 'GET',
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        };
        const products = await fetch(`/api/mycart/${user.username}`, req);
        if (!products.ok) {
          throw new Error(`Network response was not OK. Status Code: ${products.status}`);
        }
        const productsData = await products.json();
        setCart(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    user && getCart();
  },[user, navigate]);

  const getTotal = () => cart.reduce((acc, item) => acc += item.price * item.productQuantity, 0 )
  const getTotalQuantity = () => cart.reduce((acc, item) => acc += item.productQuantity, 0);


  if (isLoading) return (
    <LoadingSpinner />
  );
  return (
    <div className="container text-white black-bg-img flex-grow-1">

        <h1>My Cart</h1>
      <Link className="btn text-secondary" to="/catalog">
        &lt; Back to catalog
      </Link>
      <div className="row justify-content-md-center">
        <div className="col-md-3 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span>Your cart</span>
            <span className="badge badge-secondary badge-pill">{getTotalQuantity()}</span>
          </h4>
          <ul className="list-group mb-3 sticky-top">
            {/* {cart.map((product) =>
              <Product
                key={product.productId}
                product={product} />
            )} */}
            <li className="list-group-item d-flex flex-wrap justify-content-between">
              <span>Total (USD)</span>
              <strong>{`$${(getTotal() / 100).toFixed(2)}`}</strong>
              <Link to="/checkout" className="w-100">
                <button className="btn btn-primary w-100">Checkout</button>
              </Link>
            </li>
          </ul>
          {/* <form className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </div>
          </form> */}
        </div>

          <div className="col-md-8 order-md-1">
        {/* <Link to="/checkout">
          <button className="btn btn-primary">Checkout</button>
        </Link> */}
        {user && <MyCartList mycart={cart} />}

        </div>
      </div>
    </div>
  )
}
