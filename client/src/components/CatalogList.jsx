import './CatalogList.css'

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
  const { productName, price, image } = product;
  return (
    <li className="catalog-products list-group-item shadow-sm">
        <img className="catalog-img img-fluid" src={image} alt={productName} />
        <div className="catalog-info">
          <h5>{productName}</h5>
          <p>{`$${price}`}</p>
        </div>
    </li>
  );
}
