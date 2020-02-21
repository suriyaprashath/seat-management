// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig =
  process.env.NODE_ENV === "development"
    ? {
      apiKey: "AIzaSyBQ0dYfZlRRSIflrycj9r06KQQwWY0cAxU",
      authDomain: "sim-staging-c6948.firebaseapp.com",
      databaseURL: "https://sim-staging-c6948.firebaseio.com",
      projectId: "sim-staging-c6948",
      storageBucket: "sim-staging-c6948.appspot.com",
      messagingSenderId: "72897748280",
      appId: "1:72897748280:web:18e373bb80161d2bc5b5cd",
      measurementId: "G-Q6RY1Y3HE7"
    }
    : {
      apiKey: "AIzaSyAQOM8RKIHxSJDOg7s2c-rYIoPrMUBEuTo",
      authDomain: "soliton-internal-managem-17caf.firebaseapp.com",
      databaseURL: "https://soliton-internal-managem-17caf.firebaseio.com",
      projectId: "soliton-internal-managem-17caf",
      storageBucket: "soliton-internal-managem-17caf.appspot.com",
      messagingSenderId: "667355081048",
      appId: "1:667355081048:web:f0b43a05ffd1a8b378dd2d",
      measurementId: "G-MYM9XZYXJT"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();

export default firebase;
