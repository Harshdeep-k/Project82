import firebase from 'firebase'
require("@firebase/firestore");

  var firebaseConfig = {
    apiKey: "AIzaSyCnUJKATVPYvidMMrGq5hQfm-jqLvZ_SZA",
    authDomain: "barter-system-7f03c.firebaseapp.com",
    projectId: "barter-system-7f03c",
    storageBucket: "barter-system-7f03c.appspot.com",
    messagingSenderId: "19137163714",
    appId: "1:19137163714:web:247508a6c18dd1267d665b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
