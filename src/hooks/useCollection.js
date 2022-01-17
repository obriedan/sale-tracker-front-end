import { useState, useRef, useEffect } from 'react';
import { db } from '../firebase/config';

// firebase imports
import { collection, query, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';

const queryBuilder = (dbCollection, _where, _orderBy, _limit, _startAfter) => {
  let docs = [collection(db, dbCollection)];
  if (_where) {
    docs = [...docs, where(..._where)];
  }
  if (_orderBy) {
    docs = [...docs, orderBy(..._orderBy)];
  }
  if (_limit) {
    docs = [...docs, limit(_limit)];
  }
  if (_startAfter) {
    docs = [...docs, startAfter(..._startAfter)];
  }

  return docs;
};

export const useCollection = (dbCollection, _where, _orderBy, _limit, _startAfter) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(undefined);

  const getProducts = async (dbCollection, whereParams, orderByParams, _limit, lastProduct) => {
    try {
      const queryParams = queryBuilder(
        dbCollection,
        whereParams,
        orderByParams,
        _limit,
        lastProduct
      );
      const docs = await getDocs(query(...queryParams));

      let products = [];
      let lastKey = docs.docs[docs.docs.length - 1];
      setLastVisible(lastKey);
      docs.forEach((doc) => {
        products.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      if (documents) {
        setDocuments(documents.concat(products));
        setError(null);
      } else {
        setDocuments(products);
        setError(null);
      }
      return { products, lastKey };
    } catch (error) {}
  };

  // useRef prevents useEffect loop with _query and _orderBy
  const whereParams = useRef(_where).current;
  const orderByParams = useRef(_orderBy).current;

  useEffect(() => {
    // const queryBuild = queryBuilder(dbCollection, whereParams, orderByParams, _limit, _startAfter);
    try {
      getProducts(dbCollection, whereParams, orderByParams, _limit, lastVisible);

      // getDocs(query(...queryBuild)).then((snapshot) => {
      //   let results = [];
      //   snapshot.forEach((doc) => {
      //     results.push({ ...doc.data(), id: doc.id });
      //   });
      //   setDocuments(results);
      //   setError(null);
      // });
    } catch (e) {
      console.log(e);
      setError('Could not fetch the data');
    }
  }, [_limit, _startAfter, dbCollection, lastVisible, orderByParams, whereParams]);

  return { documents, error };
};
