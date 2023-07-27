// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_y0V8uihVxe3z7FnbMbadqxivW2Y0H1g",
  authDomain: "bbnn-b92d3.firebaseapp.com",
  projectId: "bbnn-b92d3",
  storageBucket: "bbnn-b92d3.appspot.com",
  messagingSenderId: "715334654205",
  appId: "1:715334654205:web:fe9e6e99cea7aa16988694",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
