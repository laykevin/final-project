import { useEffect, useState } from 'react';
import { RelatedProductsList, LoadingSpinner } from '../components';
import { randomize } from '../lib';

export function RelatedProducts({ category, productId }) {
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

  if (isLoading) return (
    <LoadingSpinner viewHeight={'30vh'} />
  );

  return (
    <>
      <h3 className="related-h3">Related Products</h3>
      <RelatedProductsList related={related} productId={productId}/>
    </>
  )
}
