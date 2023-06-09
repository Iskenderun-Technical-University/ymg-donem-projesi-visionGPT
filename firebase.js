import { initializeApp } from 'firebase/app';
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import secretTokens from './tokens/SecretTokens';


const firebaseConfig = secretTokens.firebase_settings;

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
