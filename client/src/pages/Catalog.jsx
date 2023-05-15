import { useEffect, useState } from 'react';
import { CatalogList, LoadingSpinner } from '../components'

export function Catalog() {
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
      <form className="row align-items-center my-4 mx-0" role="search">
        <div className='d-flex col-md-3 col-6 order-md-0 order-1 px-0'>
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
        <div className='col-md-6 col-12 order-md-1 order-0'>
          <h1 className="catalog-h1">Items</h1>
        </div>
        <div className='col-md-3 col-6 order-md-2 order-2 px-0'>
          <input className="form-control col-md-3" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)} />
        </div>
      </form>
      <div className="row">
          <CatalogList catalog={catalog} searchBy={searchInput} filterBy={categoryInput} sortBy={sortInput} />
      </div>
    </div>
  )
}
