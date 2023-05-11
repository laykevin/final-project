import { useEffect, useState } from 'react';
import CatalogList from '../components/CatalogList';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Catalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [categoryInput, setCategoyInput] = useState();
  const [sortInput, setSortInput] = useState();

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
    <LoadingSpinner />
  );

  return (
    <div className="container black-bg-img flex-grow-1">
      <h1 className="catalog-h1">Items</h1>
      <form className="d-flex justify-content-between mb-4" role="search">
        <div className='d-flex col-3'>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setSortInput(e.target.value)}>
            <option value="">A-Z</option>
            <option value="z-to-a">Z-A</option>
            <option value="desc">Highest Price</option>
            <option value="asc">Lowest Price</option>
          </select>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setCategoyInput(e.target.value)}>
            <option value="">Filter Category</option>
            <option value="projectile">Projectile</option>
            <option value="speed">Speed</option>
            <option value="trap">Trap</option>
            <option value="debuff">Debuff</option>
            <option value="defense">Defense</option>
            <option value="transform">Transform</option>
          </select>
        </div>
        <input className="form-control offset-6" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)} />
      </form>
      <div className="row">
          <CatalogList catalog={catalog} searchBy={searchInput} filterBy={categoryInput} sortBy={sortInput} />
      </div>
    </div>
  )
}
