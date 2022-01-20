import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: 'LOGIN', payload: response.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  });

  return { error, login, isPending };
};
