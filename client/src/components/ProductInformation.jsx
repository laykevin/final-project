import { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../lib';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi'
// import { AiOutlineCheckCircle } from 'react-icons/ai'
import { RelatedProducts, LoadingSpinner, QuantityCounter } from '../components'


export function ProductInformation() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { user } = useContext(AppContext);
  const popover = useRef(null);

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const productRes = await fetch(`/api/products/${productId}`);
        if (!productRes.ok) throw new Error(`This is not a shortcut`);
        const productResData = await productRes.json();
        setProduct(productResData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      } finally {
        // setIsLoading(false);
        // setQuantity(1);
        // setAddedToCart(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId]);


  async function addToCart () {
    setButtonLoading(true);
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
      const res = await fetch('/api/mycart/addtocart', req);
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error)
      };
      setAddedToCart(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setButtonLoading(false);
    }
  }

  useEffect(() => {
    if (addedToCart) {
      // eslint-disable-next-line no-undef
      popover.current = bootstrap.Popover.getOrCreateInstance('#addedButton');
      popover.current?.show();
    }
  }, [addedToCart]);

  useEffect(() => {
    return () => {
      popover.current?.dispose();
    }
  }, []);

  if (isLoading) return (
    <LoadingSpinner />
  );

  if (error) {
    return (
      <div className= "container text-white black-bg-img flex-grow-1">
        Error Loading Product {productId}: {error}
      </div>
    );
  }

  if (!product) return null;

  const { productName, image, price, description, category } = product;

  return (
    <div className="container black-bg-img flex-grow-1">
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
              <QuantityCounter quantity={quantity} setQuantity={setQuantity} bgColor={'grey'} disable={addedToCart} />
              {addedToCart ?
                <Link to="/mycart">
                  <button id="addedButton" className="add-cart-button btn btn-success my-2 my-sm-0" data-bs-toggle="popover" data-bs-content={`Added ${quantity} to Kart!`} data-bs-trigger="manual" data-bs-placement="top">
                    Go to My Kart <HiOutlineChevronRight />
                  </button>
                </Link>
              :
                <button onClick={addToCart} className="add-cart-button btn btn-success my-2 my-sm-0" disabled={buttonLoading}>
                  {buttonLoading
                    ? <span className="spinner-border spinner-border-sm text-secondary" role="status"></span>
                    : 'Add to cart'
                  }
                </button>}
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
