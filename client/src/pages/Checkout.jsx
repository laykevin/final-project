import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTotalPrice, getTotalQuantity, AppContext } from '../lib';
import { LoadingSpinner } from '../components';

export function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    !user && navigate('/signin');
    const getCatalog = async () => {
      try {
        const token = localStorage.getItem('react-context-jwt')
        const req = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        };
        const products = await fetch(`/api/mycart/${user.customerId}`, req);
        if (!products.ok) {
          throw new Error(`Network response was not OK. Status Code: ${products.status}`);
        }
        const productsData = await products.json();
        productsData.length === 0 && navigate('/mycart');
        setCart(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    user && getCatalog();
  }, [user, navigate]);

  async function removeCart (e) {
    e.preventDefault();
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
      const res = await fetch(`/api/checkout/order`, req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      navigate('/orderhistory');
    } catch (err) {
      ;
      console.error(err);
    }
  }

  if (isLoading) return (
    <LoadingSpinner />
  );

  return (
  <div className="container black-bg-img text-white flex-grow-1">
    <div className="py-5 text-center">
      <h1>Checkout form</h1>
    </div>
    <div className="row justify-content-md-center">
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span>Your cart</span>
          <span className="badge badge-secondary badge-pill">{getTotalQuantity(cart)}</span>
        </h4>
        <ul className="list-group mb-3 sticky-top">
          {isLoading && <div className=" container d-flex justify-content-center align-items-center" style={{ height: "10vh" }}>
            <span className="spinner-border text-secondary" role="status"></span>
          </div> }
          {cart.map((product) =>
          <Product
            key={product.productId}
            product={product} />
          )}
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>{`$${getTotalPrice(cart)}`}</strong>
          </li>
        </ul>
      </div>
      <div className="col-md-5 order-md-1">
        <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={removeCart}>
          <div className="row">
            <div className="col-md-6 mb-3 form-group">
              <label htmlFor="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="First Name" required />
              <div className="invalid-feedback"> Valid first name is required. </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Last Name" required />
              <div className="invalid-feedback"> Valid last name is required. </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email <span>(Optional)</span></label>
            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
            <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
            <div className="invalid-feedback"> Please enter your shipping address. </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
          </div>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="country">Country</label>
              <select className="form-select d-block w-100" id="country" required>
                <option>Choose...</option>
                <option>United States</option>
              </select>
              <div className="invalid-feedback"> Please select a valid country. </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state">State</label>
              <select className="form-select d-block w-100" id="state" required>
                <option>Choose...</option>
                <option>California</option>
              </select>
              <div className="invalid-feedback"> Please provide a valid state. </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="zip">Zip</label>
              <input type="text" className="form-control" id="zip" placeholder="" required />
              <div className="invalid-feedback"> Zip code required. </div>
            </div>
          </div>
          <h4 className="mb-3">Payment</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="cc-name">Name on card</label>
              <input type="text" className="form-control" id="cc-name" placeholder="" required />
              <small className="text-muted">Full name as displayed on card</small>
              <div className="invalid-feedback"> Name on card is required </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cc-number">Credit card number</label>
              <input type="text" className="form-control" id="cc-number" placeholder="" required />
              <div className="invalid-feedback"> Credit card number is required </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-expiration">Expiration</label>
              <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
              <div className="invalid-feedback"> Expiration date required </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-cvv">CVV</label>
              <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
              <div className="invalid-feedback"> Security code required </div>
            </div>
          </div>
          <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
        </form>
      </div>
    </div>
  </div>)
};

export function Product({ product }) {
  const { productName, price, productQuantity } = product;

  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6>{productName}</h6>
        <small className="text-muted d-block">{`Price: $${(price / 100).toFixed(2)}`}</small>
        <small className="text-muted d-block">{`Quantity: ${productQuantity}`}</small>
      </div>
      <span className="text-muted">{`$${(price * productQuantity / 100).toFixed(2)}`}</span>
    </li>
  );
}
