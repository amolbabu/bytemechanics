import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCEL2bTrEF54b0oJDrCSCSE0PasYMNE0TQ",
    authDomain: "collective-intelligence-f2bb1.firebaseapp.com",
    databaseURL: "https://collective-intelligence-f2bb1.firebaseio.com",
    projectId: "collective-intelligence-f2bb1",
    storageBucket: "collective-intelligence-f2bb1.appspot.com",
    messagingSenderId: "519244062558"
};

var fire = firebase.initializeApp(config);
export default fire;