import { useAuthContext } from './useAuthContext';
import { useState, useEffect } from 'react';
// firebse imports
import { auth } from '../firebase/config';
import { signOut } from '@firebase/auth';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setisPending(true);

    try {
      await signOut(auth);
      console.log('User signed out');
      dispatch({ type: 'LOGOUT' });

      if (!isCancelled) {
        setError(null);
        setisPending(false);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCancelled) {
        setError(error.message);
        setisPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
