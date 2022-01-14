import { useCollection } from '../hooks/useCollection';

export default function Products() {
  const { documents, error } = useCollection(
    'products',
    ['category', '==', 'home'],
    ['dateCreated', 'asc'],
    5
  );

  return (
    <div>
      <div>{documents}</div>
      {error && <div>{error}</div>}
    </div>
  );
}
