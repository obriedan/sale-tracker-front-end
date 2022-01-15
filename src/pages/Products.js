import react from 'react';
import { useCollection } from '../hooks/useCollection';
import { useDocument } from '../hooks/useDocument';
import './Products.css';

const returnInStockInventory = (string) => {
  const stockArray = JSON.parse(string);
  const inStock = stockArray.filter((variant) => Number(variant.stock));
  return inStock;
};

export default function Products() {
  const { documents: products, error: productsError } = useCollection(
    'products',
    ['category', '==', 'mens'],
    ['dateCreated', 'asc'],
    10
  );

  const { document: activeProductMap, error: activeProductMapError } = useDocument(
    'database-info',
    'active-product-map'
  );

  return (
    <div className='cards-container'>
      {products &&
        products.map((doc) => (
          <react.Fragment key={doc.id}>
            <div className='card'>
              <div className='img-container'>
                <img src={doc.productImageURL} alt='' />
              </div>
              <h3>{doc.productName}</h3>
              <div className='pricing'>
                <p>Was: €{doc.previousPrice}</p>
                <p>Now: €{doc.currentPrice}</p>
              </div>
              <div className='stock-values'>
                {activeProductMap &&
                  returnInStockInventory(activeProductMap[doc.id].sizes).map((variant) => (
                    <react.Fragment>
                      <p>Size: {variant.size}</p>
                      <p>Quantity: {variant.stock}</p>
                    </react.Fragment>
                  ))}
              </div>
            </div>
          </react.Fragment>
        ))}
      {productsError && <div>{productsError}</div>}
    </div>
  );
}
