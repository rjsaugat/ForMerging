import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyDV208EkhC7vVDe0X5L-2Lx8FCjqZQ55_E",
    authDomain: "dhulikhel-react.firebaseapp.com",
    databaseURL: "https://dhulikhel-react.firebaseio.com",
    projectId: "dhulikhel-react",
    storageBucket: "dhulikhel-react.appspot.com",
    messagingSenderId: "412639242675",
    appId: "1:412639242675:web:6ba484293ca3bb2efc83c6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebasePromotions = firebaseDB.ref('promotions');
//some reference for firebase https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a
//if table is not in firebase then it creates and adds data to it
/* const firebaseMessagesPush = firebaseDB.ref().child("messages");
const firebaseMessagesRead = firebaseDB.ref('messages'); */

const firebaseMessages = firebaseDB.ref('messages');

export {
    firebase,
    firebaseDB,
    firebasePromotions,
    firebaseMessages
}