import { useEffect, useState, useContext } from 'react';
import AppContext from './AppContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';
import LoadingSpinner from './LoadingSpinner';
import QuantityCounter from './QuantityCounter';


export default function ProductInformation() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { user } = useContext(AppContext);

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const productRes = await fetch(`/api/products/${productId}`);
        if (!productRes.ok) throw new Error(`fetch Error ${productRes.status}`);
        const productResData = await productRes.json();
        setProduct(productResData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId]);


  async function addToCart () {
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
      const res = await fetch(`/api/mycart/${cartId}/${productId}/${quantity}`, req);
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    } catch (err) {
      setError(err);
    }
  }

  // function incrementQuantity () {
  //   quantity < 5 && setQuantity(Number(quantity) + 1);
  // }

  // function decrementQuantity() {
  //   quantity > 1 && setQuantity(Number(quantity) - 1);
  // }

  if (isLoading) return (
    <LoadingSpinner />
  );

  if (error) {
    return (
      <div>
        Error Loading Product {productId}: {error.message}
      </div>
    );
  }

  if (!product) return null;

  const { productName, image, price, description, category } = product;

  return (
    <div className="container black-bg-img">
      <div className="card shadow-sm" style={{ backgroundColor: 'rgb(255, 255, 255, 0.65)' }}>
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
              <h5 className="text-secondary">{`$${Number(price).toFixed(2)/100}`}</h5>
              <p>{description}</p>
              <QuantityCounter quantity={quantity} setQuantity={setQuantity} bgColor={'grey'} style={{ backgroundColor: 'rgb(175, 175, 175, 0.8)' }} />
              <Link to="/mycart">
                <button onClick={addToCart} className=" add-cart-button btn btn-success my-2 my-sm-0" >Add to cart</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm bg-opacity-0" style={{ backgroundColor: 'rgb(0, 0, 0, 0)' }}>
        <div className="card-body text-white">
          <RelatedProducts category={category} productId={productId}/>
        </div>
      </div>
    </div>
  );
}
