import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from './AppContext';

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
    } catch (err) {;
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <Link className="btn text-secondary" to="/catalog">
                &lt; Back to catalog
              </Link>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-5">
              <img src={image} alt={productName} className="image" />
            </div>
            <div className="col-12 col-sm-6 col-md-7">
              <h2>{productName}</h2>
              <h5 className="text-secondary">{`$${Number(price).toFixed(2) / 100}`}</h5>
              <p>{description}</p>
              <p>{`Quantity: ${productQuantity}`}</p>
                <button onClick={removeFromCart} className=" add-cart-button btn btn-outline-success my-2 my-sm-0" >Remove from cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
