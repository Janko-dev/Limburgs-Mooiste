import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCptly9vk-dt45alZRqRKbnDJQwgqydTeY",
    authDomain: "limburgs-mooiste-app.firebaseapp.com",
    databaseURL: "https://limburgs-mooiste-app.firebaseio.com",
    projectId: "limburgs-mooiste-app",
    storageBucket: "limburgs-mooiste-app.appspot.com",
    messagingSenderId: "184868661679",
    appId: "1:184868661679:web:b11d8f5eb19f3ee0ce275a",
    measurementId: "G-N85E6RSLYW"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default {

    onAuthChange: (callback) => {
        return firebase.auth().onAuthStateChanged(callback);
    },

    getFacebookLoginCredential: (token) => {
        return firebase.auth.FacebookAuthProvider.credential(token);
    },

    loginWithFacebook: (credential) => {
        return firebase.auth().signInWithCredential(credential);
    }

}