import './CatalogList.css'
import { Link } from 'react-router-dom';

export default function CatalogList({ catalog }) {
  return (
    <ul className="wrap">
      {
        catalog.map((product) =>
          <Product
            key={product.productId}
            product={product} />
        )
      }
    </ul>
  );
}

function Product({ product }) {
  const { productName, price, image, productId } = product;
  return (
      <li className="catalog-products list-group-item shadow-sm">
      <Link className="catalog-products" style={{ textDecoration: 'none' }} to={`/details/${productId}`}>
          <img className="catalog-img img-fluid" src={image} alt={productName} />
          <div className="catalog-info">
            <h5>{productName}</h5>
            <p>{`$${Number(price).toFixed(2)}`}</p>
          </div>
      </Link>
      </li>

  );
}
