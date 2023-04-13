import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpKiHdzmA3pgGzV391Jjgw6QTLjPWebwo",
  authDomain: "homemanager-7c19f.firebaseapp.com",
  databaseURL: "https://homemanager-7c19f-default-rtdb.firebaseio.com",
  projectId: "homemanager-7c19f",
  storageBucket: "homemanager-7c19f.appspot.com",
  messagingSenderId: "269165431910",
  appId: "1:269165431910:web:61927cf1e0b18f8926b1a7",
  measurementId: "G-Z81J4884YQ"
};

export const app = initializeApp(firebaseConfig);