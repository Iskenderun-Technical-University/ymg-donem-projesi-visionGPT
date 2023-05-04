import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './tokens/firebaseConfigs';

const firebaseConfigs = firebaseConfig;

const app = initializeApp(firebaseConfigs);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
