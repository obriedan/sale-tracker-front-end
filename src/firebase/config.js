import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCTWNWR8Tl62eYKQH3kTUh5g2C0Zgn4jr8',
  authDomain: 'irish-online-sale-tracker.firebaseapp.com',
  projectId: 'irish-online-sale-tracker',
  storageBucket: 'irish-online-sale-tracker.appspot.com',
  messagingSenderId: '203528539352',
  appId: '1:203528539352:web:8d765c3a27ee02464a9bad',
  measurementId: 'G-N8WK8CM6R5',
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

export { db, auth };
