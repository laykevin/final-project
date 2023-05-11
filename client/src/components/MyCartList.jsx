import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AppContext from './AppContext';
import QuantityCounter from './QuantityCounter';

export default function MyCartList({ mycart }) {

  return (
    <div className="">
      {
        mycart.map((product) =>
          <Product
            key={product.productId}
            product={product} />
        )
      }
    </div>
  );
}

function Product({ product }) {
  const { productName, price, image, productQuantity, description, productId } = product;
  const [quantity, setQuantity] = useState(productQuantity);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  async function removeFromCart() {
    try {
      const token = localStorage.getItem('react-context-jwt')
      const cartId = user.cartId;
      const req = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId, productId }),
      };
      console.log(cartId, productId);
      const res = await fetch(`/api/remove/${cartId}/${productId}`, req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const result = await res.json();
      console.log(result);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateCart() {
    try {
      const token = localStorage.getItem('react-context-jwt')
      const cartId = user.cartId;
      const req = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId, productId, quantity }),
      };
      console.log(cartId, productId);
      const res = await fetch('/api/mycart/update', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm mb-3">
        <div className="card-body pb-0">
          <div className="row">
            <div className="col">
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-5">
              <img src={image} alt={productName} className="cart-image" />
            </div>
            <div className="col-12 col-sm-6 col-md-7">
              <span className='d-flex justify-content-between'>
                <h3>{productName}</h3>
                <h4 className="text-secondary">{`$${(Number(price) * Number(productQuantity) / 100).toFixed(2)}`}</h4>
              </span>
              <h5 className="text-secondary">{`$${Number(price).toFixed(2) / 100}`}</h5>
              <p>{description}</p>
              <QuantityCounter quantity={quantity} setQuantity={setQuantity}/>
              <div className='d-flex flex-row-reverse justify-content-between pt-4'>
                <button onClick={removeFromCart} className="btn btn-outline-danger my-2 my-sm-0" >Remove from cart</button>
                {Number(productQuantity) !== Number(quantity) && <button onClick={updateCart} className="save-fade active btn btn-outline-success my-2 my-sm-0" data-mdb-animation="fade-in">UPDATE</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
