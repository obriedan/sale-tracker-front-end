import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// firebase imports
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from '@firebase/auth';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        dispatch({ type: 'LOGIN', payload: response.user });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, signup };
};
