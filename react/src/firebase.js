import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCbXRKj9_-gt9Hq6IMgbOAw6Mwxw_jTB1M",
    authDomain: "fir-project-1c83d.firebaseapp.com",
    projectId: "fir-project-1c83d",
    storageBucket: "fir-project-1c83d.appspot.com",
    messagingSenderId: "150040764645",
    appId: "1:150040764645:web:8bba9a3af3bf2bcd8ef40c"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();