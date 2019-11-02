// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCvZr4WKRh60IN0yxeyXJy0vYHEU7fGdZI",
  authDomain: "soliton-internal-management.firebaseapp.com",
  databaseURL: "https://soliton-internal-management.firebaseio.com",
  projectId: "soliton-internal-management",
  storageBucket: "soliton-internal-management.appspot.com",
  messagingSenderId: "647914540217",
  appId: "1:647914540217:web:dcfbf709b09c76cf011f68",
  measurementId: "G-HDLC1WVB2M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;