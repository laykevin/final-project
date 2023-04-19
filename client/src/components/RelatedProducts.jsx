import { useEffect, useState } from 'react';
import RelatedProductsList from './RelatedProductsList';

export default function RelatedProducts(category) {
  const [related, setRelated] = useState([]);
  useEffect(() => {
    const getRelated = async () => {
      try {
        console.log(category)
        const products = await fetch(`/api/products/details/${category.category}`);
        if (!products.ok) {
          throw new Error(`Network response was not OK. Status Code: ${products.status}`);
        }
        const productsData = await products.json();
        setRelated(productsData);
      } catch (err) {
        console.error(err);
      }
    }
    getRelated();
  }, [category])
  return (
    <>
      <h3>Related Products</h3>
      <RelatedProductsList related={related}/>
    </>
  )
}
