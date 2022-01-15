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
  const limitParams = useRef(_limit).current;

  useEffect(() => {
    let ref = collection(db, dbCollection);
    let queryParams = [];

    if (whereParams) {
      const w = where(...whereParams);
      queryParams.push(w);
    }

    if (orderByParams) {
      const o = orderBy(...orderByParams);
      queryParams.push(o);
    }

    if (limitParams) {
      const l = limit(limitParams);
      queryParams.push(l);
    }
    try {
      getDocs(
        query(ref, where(...whereParams), orderBy(...orderByParams), limit(limitParams))
      ).then((snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      });
    } catch (e) {
      console.log(e);
      setError('Could not fetch the data');
    }

    // const unsub = (ref, (snapshot) => {
    //   let results = [];
    //   snapshot.docs.forEach((doc) => {
    //     results.push({ ...doc.data(), id: doc.id });
    //   });
    //   setDocuments(results);
    // });

    // return () => unsub;
  }, [dbCollection, limitParams, orderByParams, whereParams]);

  return { documents, error };
};
