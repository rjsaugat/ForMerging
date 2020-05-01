import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';


const firebaseConfig = {
    apiKey: "AIzaSyCYZJKrKVwFmx1wUidZ6bWFufSEPxe5XJw",
    authDomain: "dhulikhel-webapp.firebaseapp.com",
    databaseURL: "https://dhulikhel-webapp.firebaseio.com",
    projectId: "dhulikhel-webapp",
    storageBucket: "dhulikhel-webapp.appspot.com",
    messagingSenderId: "345545539561",
    appId: "1:345545539561:web:f6f09c6ebf4511f007d578",
    measurementId: "G-9MM73QZXVW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const firebaseDB = firebase.database();
const firebasePromotions = firebaseDB.ref('promotions');
//some reference for firebase https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a
//if table is not in firebase then it creates and adds data to it
/* const firebaseMessagesPush = firebaseDB.ref().child("messages");
const firebaseMessagesRead = firebaseDB.ref('messages'); */

const firebaseMessages = firebaseDB.ref('messages');
const firebaseGallery = firebaseDB.ref('gallery');
const firebaseRooms = firebaseDB.ref('rooms');
const firebaseServices = firebaseDB.ref('services');
const firebaseAboutContent = firebaseDB.ref('aboutContent');
const firebaseTariffs = firebaseDB.ref('tariffs');

export {
    firebase,
    firebaseDB,
    firebasePromotions,
    firebaseMessages,
    firebaseGallery,
    firebaseRooms,
    firebaseServices,
    firebaseAboutContent,
    firebaseTariffs
}