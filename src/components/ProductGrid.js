import react from 'react';

import './ProductGrid.css';

const returnInStockInventory = (string) => {
  const stockArray = JSON.parse(string);
  const inStock = stockArray.filter((variant) => Number(variant.stock));
  return inStock;
};

export default function ProductGrid({
  products,
  productsError,
  activeProductMap,
  activeProductMapError,
}) {
  return (
    <div className='cards-container'>
      {products &&
        products.map((doc) => (
          <react.Fragment key={doc.id}>
            <div className='card'>
              <div className='img-container'>
                <img src={doc.productImageURL} alt='' />
              </div>
              <div className='card-details'>
                <h3>{doc.productName}</h3>
                <div className='pricing'>
                  <p>Was €{doc.previousPrice}</p>
                  <p>Now: €{doc.currentPrice}</p>
                </div>
                <div className='stock-container'>
                  {activeProductMap &&
                    returnInStockInventory(activeProductMap[doc.id].sizes).map((variant) => (
                      <div key={Math.random()} className='stock-value'>
                        <p>{variant.size}</p>
                        <p>{variant.stock}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </react.Fragment>
        ))}
      {productsError && <div>{productsError}</div>}
    </div>
  );
}
