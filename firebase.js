import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: //firebase config 
  authDomain: //firebase config 
  projectId: //firebase config 
  storageBucket: //firebase config 
  messagingSenderId: //firebase config 
  appId: //firebase config 
  measurementId: //firebase config 
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
