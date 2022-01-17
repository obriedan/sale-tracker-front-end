import { db } from '../firebase/config';

// firebase imports
import { collection, query, where, orderBy, limit, startAfter } from 'firebase/firestore';

export const queryBuilder = (dbCollection, _where, _orderBy, _limit, _startAfter) => {
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
    docs = [...docs, startAfter(_startAfter)];
  }

  const finalQuery = query(...docs);
  return finalQuery;
};
