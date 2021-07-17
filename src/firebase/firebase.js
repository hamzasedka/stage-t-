import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBGDjpvhdxyqDc_GrrMu-7gmtUVWs3oTAw",
    authDomain: "fir-project-1be7a.firebaseapp.com",
    databaseURL: "https://fir-project-1be7a-default-rtdb.firebaseio.com",
    projectId: "fir-project-1be7a",
    storageBucket: "fir-project-1be7a.appspot.com",
    messagingSenderId: "410545160776",
    appId: "1:410545160776:web:1dc7c87384249252c28e7d",
    measurementId: "G-YPRYTY46L2"
  };


        firebase.initializeApp(firebaseConfig);
       

export default firebase;