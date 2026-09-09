// Firebase configuration for Serendib Journeys

const firebaseConfig = {
  apiKey: "AIzaSyBsXHxPlXDcYR6khjpis-0a12AZeOwZxlU",
  authDomain: "serendib-v2.firebaseapp.com",
  projectId: "serendib-v2",
  storageBucket: "serendib-v2.firebasestorage.app",
  messagingSenderId: "1019532842306",
  appId: "1:1019532842306:web:ecac0912eb17a5615524db",
  measurementId: "G-K5RWBGBS4N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create global Firebase services
const auth = firebase.auth();
const db = firebase.firestore();