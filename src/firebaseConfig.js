// Configuración de Firebase para tu proyecto
// Reemplaza estos valores con los de tu proyecto en la consola de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFh34Dk0pmRHXaQfACEB2mB0Qii5WbWWg",
  authDomain: "entregafinalreactjs-ab2ea.firebaseapp.com",
  projectId: "entregafinalreactjs-ab2ea",
  storageBucket: "entregafinalreactjs-ab2ea.firebasestorage.app",
  messagingSenderId: "100232001694",
  appId: "1:100232001694:web:fc238efcc279fc23d4c3bd",
  measurementId: "G-PG161VH8QX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 