import ProductGrid from '../components/ProductGrid';
import { useCollection } from '../hooks/useCollection';
import { useDocument } from '../hooks/useDocument';
import './Home.css';

export default function Products() {
  const { documents: products, error: productsError } = useCollection(
    'products',
    ['category', '==', 'kids'],
    ['dateCreated', 'asc'],
    10
  );

  const { document: activeProductMap, error: activeProductMapError } = useDocument(
    'database-info',
    'active-product-map'
  );

  return (
    <>
      <ProductGrid {...{ products, productsError, activeProductMap, activeProductMapError }} />
      <button>Load More</button>
    </>
  );
}
