// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log('🔵 Iniciando configuración de Firebase');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6ZurEoGl3uCokpEtIC_90pFyNkn4HTqg",
  authDomain: "edcode-system.firebaseapp.com",
  projectId: "edcode-system",
  storageBucket: "edcode-system.firebasestorage.app",
  messagingSenderId: "11388507368",
  appId: "1:11388507368:web:016a958452c1f6a137255d",
  measurementId: "G-PKNM3XHT8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log('✅ Firebase inicializado correctamente');

export { auth };
