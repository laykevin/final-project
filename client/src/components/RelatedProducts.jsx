import { useEffect, useState } from 'react';
import RelatedProductsList from './RelatedProductsList';

export default function RelatedProducts({ category, productId }) {
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryArray = category.split(' ');
  const firstCategory = categoryArray[0]

  useEffect(() => {
    const getRelated = async () => {
      try {
        const products = await fetch(`/api/products/details/${firstCategory}/${productId}`);
        if (!products.ok) {
          throw new Error(`Network response was not OK. Status Code: ${products.status}`);
        }
        const productsData = await products.json();
        setRelated(randomize(productsData));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getRelated();
  }, [firstCategory,productId])

  function randomize(values) {
    let index = values.length,
      randomIndex;
    while (index !== 0) {
      randomIndex = Math.floor(Math.random() * index);
      index--;
      [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }
    return values;
  }

  if (isLoading) return (
      <div className=" container d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>
        <span className="spinner-border text-secondary" role="status"></span>
      </div>
  );

  return (
    <>
      <h3 className="related-h3">Related Products</h3>
      <RelatedProductsList related={related} productId={productId}/>
    </>
  )
}
