import { useEffect, useState } from 'react';
import CatalogList from '../components/CatalogList';

// const url = (path) => `${process.env.REACT_APP_BASE_URL}${path}`;

export default function Catalog() {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const getCatalog = async () => {
      try {
        const products = await fetch('/api/products');
        if (!products.ok) {
          throw new Error(`Network response was not OK. Status Code: ${products.status}`);
        }
        const productsData = await products.json();
        setCatalog(productsData);
      } catch (err) {
        console.error(err);
      }
    }
    getCatalog();
  }, [])
  return (
    <div className="container">
      <h3 className="catalog-h3">Catalog</h3>
      <div className="row">
          <CatalogList catalog={catalog} />
      </div>
    </div>
  )
}
