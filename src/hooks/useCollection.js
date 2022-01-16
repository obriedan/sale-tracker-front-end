import { useState, useRef, useEffect } from 'react';
import { db } from '../firebase/config';

// firebase imports
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export const useCollection = (dbCollection, _where, _orderBy, _limit) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // useRef prevents useEffect loop with _query and _orderBy
  const whereParams = useRef(_where).current;
  const orderByParams = useRef(_orderBy).current;

  useEffect(() => {
    const ref = collection(db, dbCollection);

    try {
      getDocs(query(ref, where(...whereParams), orderBy(...orderByParams), limit(_limit))).then(
        (snapshot) => {
          let results = [];
          snapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setDocuments(results);
          setError(null);
        }
      );
    } catch (e) {
      console.log(e);
      setError('Could not fetch the data');
    }
  }, [_limit, dbCollection, orderByParams, whereParams]);

  return { documents, error };
};
