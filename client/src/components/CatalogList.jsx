import './CatalogList.css'
import { Link } from 'react-router-dom';

export default function CatalogList({ catalog, searchBy, filterBy, sortBy }) {
  let catalogCopy = [...catalog];
  const sortByPriceDesc = (filteredList) => filteredList.sort((first, second) => second.price - first.price);
  const sortByPriceAsc = (filteredList) => filteredList.sort((first, second) => first.price - second.price);
  const sortByNameDesc = (filteredList) => filteredList.reverse();
  const filterByCategory = () => catalogCopy.filter((product) => product.category.toLowerCase().includes(filterBy.toLowerCase()));
  const searchByName = () => catalogCopy.filter((product) => product.productName.toLowerCase().includes(searchBy.toLowerCase()));
  const searchFilterByCategoryByName = () => filterByCategory().filter((product) => product.productName.toLowerCase().includes(searchBy.toLowerCase()));

  sortBy === 'desc' && sortByPriceDesc(catalogCopy);
  sortBy === 'asc' && sortByPriceAsc(catalogCopy);
  sortBy === 'z-to-a' && sortByNameDesc(catalogCopy);
  if (filterBy) {
    if (searchBy) {
      catalogCopy = searchFilterByCategoryByName();
    }
    catalogCopy = filterByCategory();
  }
  if (searchBy) {
    catalogCopy = searchByName();
  }

    return (
      <ul className="wrap">
        {
          catalogCopy.map((product) =>
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
      <li className="catalog-products shadow-sm">
      <Link className="catalog-products" style={{ textDecoration: 'none' }} to={`/details/${productId}`}>
          <img className="catalog-img img-fluid" src={image} alt={productName} />
          <div className="catalog-info text-white">
            <h5>{productName}</h5>
            <p>{`$${Number(price).toFixed(2)/100}`}</p>
          </div>
      </Link>
      </li>

  );
}
