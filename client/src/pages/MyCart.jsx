import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../components/AppContext"
import MyCartList from "../components/MyCartList";
import LoadingSpinner from "../components/LoadingSpinner";
import { HiOutlineChevronLeft } from 'react-icons/hi'


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

  async function removeCart() {
    try {
      const token = localStorage.getItem('react-context-jwt')
      const cartId = user.cartId;
      const req = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId }),
      };
      const res = await fetch(`/api/checkout/clearcart`, req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      setCart([]);
    } catch (err) {
      ;
      console.error(err);
    }
  }

  if (isLoading) return (
    <LoadingSpinner />
  );
  // if (cart.length === 0) return (
  //   <div className="container text-white black-bg-img flex-grow-1">
  //     <h2>Your Kart is empty!</h2>
  //   </div>
  // )
  return (
    <div className="container text-white black-bg-img flex-grow-1">
      <div className="d-flex justify-content-between my-4 position-relative">
        <Link className="btn btn-outline-light position-absolute top-50 translate-middle-y" to="/catalog">
          <HiOutlineChevronLeft /> Back to Items
        </Link>
        <h1 className="text-center flex-grow-1">My Kart</h1>
      </div>
      <div className="row justify-content-md-center">
        {cart.length > 0 &&
        <div className="col-md-3 order-md-2 mb-4">
          <ul className="list-group mb-3 sticky-top">
            <li className="list-group-item">
              <span className="d-flex flex-wrap justify-content-between">
                <span>Number of Items</span>
                <strong>{getTotalQuantity()}</strong>
              </span>
              <hr />
              <span className="d-flex flex-wrap justify-content-between">
                <span>Total (USD)</span>
                <strong>{`$${(getTotal() / 100).toFixed(2)}`}</strong>
              </span>
              <hr />
              <Link to="/checkout" className="w-100">
                <button className="btn btn-primary w-100 mb-2">Checkout</button>
              </Link>
              {/* <!-- Button trigger modal --> */}
              <button type="button" className="btn btn-danger w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Empty Cart
              </button>
            </li>
          </ul>
        </div>}
          <div className="col-md-8 order-md-1">
            {cart.length === 0 && <h1 className="text-center mt-5">Your Kart is empty!</h1> }
            {user && <MyCartList mycart={cart} />}
          </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ marginBottom: '12rem'}}>
            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <h1 className="modal-title fs-5 text-black" id="exampleModalLabel">🚨Are you sure you want to empty your kart?🚨</h1>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={removeCart} type="button" className="btn btn-danger" data-bs-dismiss="modal">Remove all items</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
