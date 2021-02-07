import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyDMxjncDzMGE6pL_F7EggJvddcQw7Diz2I",
    authDomain: "instagram-clone-ceba4.firebaseapp.com",
    databaseURL: "https://instagram-clone-ceba4-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-ceba4",
    storageBucket: "instagram-clone-ceba4.appspot.com",
    messagingSenderId: "1098493757698",
    appId: "1:1098493757698:web:ef29e73b98685d8ca61a1b"

})

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };