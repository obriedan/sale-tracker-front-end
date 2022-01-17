import ProductGrid from '../components/ProductGrid';
//import { useCollection } from '../hooks/useCollection';
import { useDocument } from '../hooks/useDocument';
import { useState, useEffect } from 'react';

import Products from '../services/Products';
import { queryBuilder } from '../services/Helpers';

import './Home.css';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

export default function Home() {
  const [products, setProducts] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [lastKey, setLastKey] = useState(null);

  const fetchMoreProducts = () => {
    if (keyboard.length > 0) {
      const nextQuery = queryBuilder(
        'products',
        ['category', '==', 'kids'],
        ['dateCreated', 'asc'],
        12,
        lastKey
      );
      Products.getProductsFromFirebase(nextQuery).then((response) => {
        setLastKey(response.lastKey);
        setProducts(products.concat(response.products));
      });
    }
  };

  useEffect(() => {
    const firstQuery = queryBuilder(
      'products',
      ['category', '==', 'kids'],
      ['dateCreated', 'asc'],
      12
    );
    Products.getProductsFromFirebase(firstQuery)
      .then((response) => {
        setProducts(response.products);
        setLastKey(response.lastKey);
      })
      .catch((err) => setProductsError(err));
  }, []);

  // const { documents: products, error: productsError } = useCollection(
  //   'products',
  //   ['category', '==', 'kids'],
  //   ['dateCreated', 'asc'],
  //   1
  // );

  const { document: activeProductMap, error: activeProductMapError } = useDocument(
    'database-info',
    'active-product-map'
  );

  const handleLoadMore = () => {};

  return (
    <>
      <ProductGrid {...{ products, productsError, activeProductMap, activeProductMapError }} />
      <button onClick={fetchMoreProducts}>Load More</button>
    </>
  );
}
