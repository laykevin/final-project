import './CatalogList.css'
import { Link } from 'react-router-dom';

export default function CatalogList({ catalog, userInput, selectInput, sortPrice }) {
  const copy = () => catalog.map((copy) => copy);
  let catalogSort = copy();
  const filterByCategory = () => catalogSort.filter((product) => product.category.toLowerCase().includes(selectInput.toLowerCase()));
  const nameSearch = () => filterByCategory().filter((product) => product.productName.toLowerCase().includes(userInput.toLowerCase()));
  const sortByPriceDesc = (filteredList) => filteredList.sort((first, second) => second.price - first.price);
  const sortByPriceAsc = (filteredList) => filteredList.sort((first, second) => first.price - second.price);
  sortPrice === 'desc' && sortByPriceDesc(catalogSort);
  sortPrice === 'asc' && sortByPriceAsc(catalogSort);
  if (!sortPrice) {
    catalogSort = copy();
  }

  if (selectInput) {
    if (userInput) {
      return (
        <ul className="wrap">
          {
            nameSearch().map((product) =>
              <Product
                key={product.productId}
                product={product} />
            )
          }
        </ul>
      );
    }
    return (
      <ul className="wrap">
        {
          filterByCategory().map((product) =>
            <Product
              key={product.productId}
              product={product} />
          )
        }
      </ul>
    );
  }
  if (userInput) {
    const nameSearch = () => catalog.filter((product) => product.productName.toLowerCase().includes(userInput.toLowerCase()));
    return (
      <ul className="wrap">
        {
          nameSearch().map((product) =>
            <Product
              key={product.productId}
              product={product} />
          )
        }
      </ul>
    );
  }
  //  else if (sortPrice) {
  //   return (
  //     <ul className="wrap">
  //       {
  //         catalogSort.map((product) =>
  //           <Product
  //             key={product.productId}
  //             product={product} />
  //         )
  //       }
  //     </ul>
  //   );
  // }
   else {
    return (
      <ul className="wrap">
        {
          catalogSort.map((product) =>
            <Product
              key={product.productId}
              product={product} />
          )
        }
      </ul>
    );
  }
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
