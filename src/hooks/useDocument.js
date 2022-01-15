import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

// firebase imports
import { doc, getDoc } from 'firebase/firestore';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for the document

  useEffect(() => {
    const docRef = doc(db, collection, id);
    getDoc(docRef)
      .then((doc) => {
        setDocument(doc.data());
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError('There was a problem retreving the document.');
      });
  }, [collection, id]);

  return {
    document,
    error,
  };
};
