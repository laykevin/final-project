import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
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
        const products = await fetch(`/api/mycart/${user.username}`, req);
        if (!products.ok) {
          throw new Error(`Network response was not OK. Status Code: ${products.status}`);
        }
        const productsData = await products.json();
        setCart(productsData);
      } catch (err) {
        console.error(err);
      }
    }
    user && getCatalog();
  }, [user, navigate]);

  async function removeCart () {
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
      const res = await fetch(`/api/checkout/${cartId}`, req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    } catch (err) {
      ;
      console.error(err);
    }
  }
  const getTotal = () => cart.reduce((acc, item) => acc += item.price * item.productQuantity, 0);
  const getTotalQuantity = () => cart.reduce((acc, item) => acc += item.productQuantity, 0);

  return (
  <div className="container black-bg-img text-white">
    <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h2>Checkout form</h2>
    </div>
      <div className="row justify-content-md-center">
        <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span>Your cart</span>
                <span className="badge badge-secondary badge-pill">{getTotalQuantity()}</span>
            </h4>
            <ul className="list-group mb-3 sticky-top">
              {cart.map((product) =>
              <Product
                key={product.productId}
                product={product} />
              )}
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
              <strong>{`$${getTotal() / 100}`}</strong>
                </li>
            </ul>
            <form className="card p-2">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Promo code" />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-secondary">Redeem</button>
                    </div>
                </div>
            </form>
        </div>
        <div className="col-md-5 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noalidate="">
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
                    <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
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
                        <select className="custom-select d-block w-100" id="country" required>
                            <option>Choose...</option>
                            <option>United States</option>
                        </select>
                        <div className="invalid-feedback"> Please select a valid country. </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="state">State</label>
                        <select className="custom-select d-block w-100" id="state" required>
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
                <Link to="/orderhistory">
                  <button onClick={removeCart} className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                </Link>
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
        <h6 className="my-0">{productName}</h6>
        <small className="text-muted">{`Quantity: ${productQuantity}`}</small>
      </div>
      <span className="text-muted">{`$${price * productQuantity / 100}`}</span>
    </li>
  );
}
