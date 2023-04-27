import { useEffect, useState } from 'react';
import CatalogList from '../components/CatalogList';

export default function Catalog() {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInput, setUserInput] = useState('');

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
      } finally {
        setIsLoading(false);
      }
    }
    getCatalog();
  }, [])

  if (isLoading) return (
    <div className=" container d-flex justify-content-center align-items-center black-bg-img flex-grow-1" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );
  return (
    <div className="container black-bg-img">
      <h1 className="catalog-h1">Items</h1>
      <form className="d-flex" role="search">
        <input onChange={(e) => setUserInput(e.target.value)} className="form-control" type="search" placeholder="Search" aria-label="Search" />
      </form>
      <div className="row">
          <CatalogList catalog={catalog} userInput={userInput} />
      </div>
    </div>
  )
}
