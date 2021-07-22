import  firebase from 'firebase';
require("@firebase/firestore")
const firebaseConfig = {
   apiKey: "AIzaSyDdxH1p2V0C4XV3uaVvplneH8tBilyYnmQ",
    authDomain: "bed-time-stories-203e8.firebaseapp.com",
    projectId: "bed-time-stories-203e8",
    storageBucket: "bed-time-stories-203e8.appspot.com",
    messagingSenderId: "596367730658",
    appId: "1:596367730658:web:ee71e2097608b2e05dbbbb"
};

if( !firebase.apps.length){
    firebase.initializeApp(firebaseConfig)}


export default firebase.firestore();