import { useReducer, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, doc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null };
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = () => {
  // state
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (collectionParam, document) => {
    dispatch({ type: 'IS_PENDING' });
    const collectionRef = collection(db, collectionParam);

    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocumentRef = await addDoc(collectionRef, { ...document, createdAt });
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocumentRef });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };
  // delete document
  const deleteDocument = async (collectionParam, id) => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });

    try {
      await deleteDoc(doc(db, collectionParam, id));
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete document' });
    }
  };

  // update document
  const updateDocument = async (collectionParam, docID, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const docRef = doc(db, collectionParam, docID);
      await updateDoc(docRef, updates);
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: docRef });
      return docRef;
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response, updateDocument };
};
