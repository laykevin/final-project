import { useEffect, useState, useContext } from 'react';
import AppContext from './AppContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';

export default function ProductInformation() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { user } = useContext(AppContext);
  console.log(user);
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
      const result = await res.json();
      console.log(result);
    } catch (err) {
      setError(err);
    }
  }

  if (isLoading) return (
    <div className=" container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
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
  console.log(image);
  return (
    <div className="container black-bg-img">
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
              <h5 className="text-secondary">{`$${Number(price).toFixed(2)/100}`}</h5>
              <p>{description}</p>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">Quantity</span>
                <input max="5" min="1" className="form-control" type="number" placeholder="1" value={quantity} onKeyDown={(e) => e.preventDefault()} onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              <Link to="/mycart">
                <button onClick={addToCart} className=" add-cart-button btn btn-outline-success my-2 my-sm-0" >Add to cart</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <RelatedProducts category={category} productId={productId}/>
        </div>
      </div>
    </div>
  );
}
