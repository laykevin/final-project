import { useContext, useState } from 'react';
import { AppContext } from '../lib';
import { QuantityCounter } from '../components';

export function MyCartList({ mycart, setCart }) {

  return (
    <div className="">
      {
        mycart.map((product) =>
          <Product
            key={product.productId}
            setCart={setCart}
            product={product} />
        )
      }
    </div>
  );
}

function Product({ product, setCart }) {
  const { productName, price, image, productQuantity, description, productId } = product;
  const [quantity, setQuantity] = useState(productQuantity);
  const { user } = useContext(AppContext);

  const customerId = user.customerId;

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
        body: JSON.stringify({ cartId, productId, customerId }),
      };
      const res = await fetch('/api/remove', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      setCart(prev => prev.filter((cartedProduct) =>
      cartedProduct.cartedProductId !== product.cartedProductId
      ));
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
      const res = await fetch('/api/mycart/update', req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      setCart(prev => prev.map((cartedProduct) =>
        cartedProduct.cartedProductId === product.cartedProductId
          ? {...product, productQuantity: quantity }
          : cartedProduct
      ));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm mb-3">
        <div className="card-body pb-0">
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
                {Number(productQuantity) !== Number(quantity) &&
                <div className='d-flex align-items-center'>
                  <button onClick={updateCart} className="save-fade active btn btn-outline-success my-2 my-sm-0" data-mdb-animation="fade-in">UPDATE</button>
                  <button onClick={() => setQuantity(productQuantity)} type="button" className="btn-close ms-2" aria-label="Close"></button>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
