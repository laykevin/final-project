import { useState } from "react";
import { Link } from 'react-router-dom';
import './ProductInformation.css'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi'

export default function RelatedProductsList({ related, productId }) {
  const [page, setPage] = useState(0)
  const showThree = related.slice(page, page + 3)
  console.log(related);
  console.log(showThree);

  function handleLeftButton () {
    page > 0 && setPage(page - 3)
  }

  function handleRightButton() {
    page < related.length - 2 && setPage(page + 3)
  }

  return (
    <div className="d-flex align-items-center col-12 col-xs-4 flex-column flex-md-row">
      <button className="btn btn-outline-secondary mb-3 mb-md-0" onClick={handleLeftButton} disabled={page === 0}>
        <span className="d-none d-md-inline"><HiOutlineChevronLeft /></span>
        <span className="d-md-none d-inline"><HiOutlineChevronUp /></span>
      </button>
      <ul className="wrap flex-grow-1 pils">
      {
        showThree.map((product, index) =>
          <Product
            key={product.productId}
            product={product} />
        )
      }
      </ul>
      <button className="btn btn-outline-secondary" onClick={handleRightButton} disabled={related.length - page <= 3}>
        <span className="d-none d-md-inline"><HiOutlineChevronRight /></span>
        <span className="d-md-none d-inline"><HiOutlineChevronDown /></span>
      </button>
    </div>
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
          <p>{`$${Number(price).toFixed(2)/100}`}</p>
        </div>
      </Link>
    </li>
  );
}
