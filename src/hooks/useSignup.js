import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

// firebase imports
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, firstName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (!response) {
        throw new Error('Could not complete signup');
      }

      // generate and upload user thumbnail
      // const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;
      // const image = await projectStorage.ref(uploadPath).put(thumbnail);
      // const imageUrl = await image.ref.getDownloadURL();

      // add display name to user
      // await response.user.updateProfile({ displayName, photoURL: imageUrl });

      // create a user document
      await setDoc(doc(db, 'users', response.user.uid), {
        name: firstName,
        state: 'CA',
        country: 'USA',
      });

      dispatch({ type: 'LOGIN', payload: response.user });

      // set state
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, signup };
};
