import react from 'react';
import { useCollection } from '../hooks/useCollection';
import './Products.css';

export default function Products() {
  const { documents, error } = useCollection(
    'products',
    ['category', '==', 'womens'],
    ['dateCreated', 'asc'],
    10
  );

  console.log(Array.isArray(documents));

  return (
    <div className='cards-container'>
      {documents &&
        documents.map((doc) => (
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
            </div>
          </react.Fragment>
        ))}
      {error && <div>{error}</div>}
    </div>
  );
}
