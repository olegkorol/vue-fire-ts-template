// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you've enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add extra Firebase products that you want to use here
// Firebase Auth, Firestore and Storage will be loaded asynchronously on demand - there is no need to import them here

const env = process.env.VUE_APP_FIREBASE_ENV;
console.info(env);

const firebaseConfig: any = {
  dev: {
    apiKey: "<REPLACE_ME>",
    authDomain: "<REPLACE_ME>",
    databaseURL: "<REPLACE_ME>",
    projectId: "<REPLACE_ME>",
    storageBucket: "<REPLACE_ME>",
    messagingSenderId: "<REPLACE_ME>",
    appId: "<REPLACE_ME>",
    measurementId: "<REPLACE_ME>",
  },
  prod: {
    apiKey: "<REPLACE_ME>",
    authDomain: "<REPLACE_ME>",
    databaseURL: "<REPLACE_ME>",
    projectId: "<REPLACE_ME>",
    storageBucket: "<REPLACE_ME>",
    messagingSenderId: "<REPLACE_ME>",
    appId: "<REPLACE_ME>",
    measurementId: "<REPLACE_ME>",
  },
};

firebase.initializeApp(firebaseConfig[env]);
firebase.analytics();
