import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBrhRVz3_HkfqM-9IS2zy86XsKdSBOmwG8',
  authDomain: 'react-redux-firebase-ecommerce.firebaseapp.com',
  projectId: 'react-redux-firebase-ecommerce',
  storageBucket: 'react-redux-firebase-ecommerce.appspot.com',
  messagingSenderId: '1060009792498',
  appId: '1:1060009792498:web:e1cab63f39183e710f916b',
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
