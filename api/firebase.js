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
    },

    loginWithCredentials: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    getCurrentUser: () => {
        return firebase.auth().currentUser;
    },

    getUserFromDB: (uid) => {
        return firebase.firestore().collection("users").doc(uid).get();
    },

    getUsers: () => {
        return firebase.firestore().collection("users").get();
    },

    createNewUserRecord: (uid, skillLevel, trainingDays) => {
        return firebase.firestore().collection("users").doc(uid).set(
            {
                skillLevel, 
                exp: 0, 
                maxExp: 10,
                activeSchedule: null,
                achievements: [],
                previousTrainingSessions: []
            })
    },

    createNewUserAuth: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    },

    getFAQ: () => {
        return firebase.firestore().collection("FAQ").get()
    },

    onUserDataChange: (uid, callback) => {
        return firebase.firestore().collection("users").doc(uid).onSnapshot(callback);
    },

    getSchedules: () => {
        return firebase.firestore().collection("trainingsSchema").get();
    },

    getAchievements: () => {
        return firebase.firestore().collection("achievements").get();
    },
}