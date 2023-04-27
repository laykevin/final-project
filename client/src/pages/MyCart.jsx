import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../components/AppContext"
import MyCartList from "../components/MyCartList";

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

  if (isLoading) return (
    <div className=" container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );
  return (
    <div className="container text-white black-bg-img flex-grow-1">
      <h1>My Cart</h1>
      <p>{`Total: $${getTotal()/100}`}</p>
      <Link to="/checkout">
        <button className="btn btn-primary">Checkout</button>
      </Link>
      {user && <MyCartList mycart={cart} />}
    </div>
  )
}
