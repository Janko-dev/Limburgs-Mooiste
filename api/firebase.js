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

    logoutUser: () => {
        return firebase.auth().signOut();
    },

    getUserFromDB: (uid) => {
        return firebase.firestore().collection("users").doc(uid).get();
    },

    getUsers: () => {
        return firebase.firestore().collection("users").get();
    },

    onUsersChange: (callback) => {
        return firebase.firestore().collection("users").onSnapshot(callback);
    },

    createNewUserRecord: (uid, skillLevel, username) => {
        return firebase.firestore().collection("users").doc(uid).set(
            {
                username,
                skillLevel,
                exp: 0,
                maxExp: 10,
                level: 1,
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

    getArticles: () => {
        return firebase.firestore().collection("articles").get()
    },

    getCoaches: () => {
        return firebase.firestore().collection("coach").get()
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

    getSchedule: (id) => {
        return firebase.firestore().collection("trainingsSchema").doc(id).get();
    },

    setActiveSchedule: (uid, scheduleId, trainingsDays) => {
        return firebase.firestore().collection("users").doc(uid).update({
            activeSchedule: {
                currentSession: 1,
                currentWeek: 1,
                id: scheduleId,
                startDate: new firebase.firestore.Timestamp.fromDate(new Date()),
                trainingsDays
            }
        })
    },

    incrementCurrentScheduleWeek: (uid, activeSchedule) => {
        return firebase.firestore().collection("users").doc(uid).update({
            activeSchedule: {
                ...activeSchedule,
                currentWeek: activeSchedule.currentWeek + 1,
                currentSession: 1
            }
        })
    },

    deleteActiveSchedule: (uid) => {
        return firebase.firestore().collection("users").doc(uid).update({
            activeSchedule: null
        })
    },

    getRoute: (routeId) => {
        return firebase.database().ref(routeId).once("value");
    },

    getAllRoutes: (callback) => {
        return firebase.database().ref().once("value", callback);
    },

    setProgression: (exp, maxExp, level, uid) => {
        return firebase.firestore().collection("users").doc(uid).update({
            exp,
            maxExp,
            level 
        })
    },

    setExp: (exp, uid) => {
        return firebase.firestore().collection("users").doc(uid).update({
            exp
        })
    },

    updatePreviousTrainingSession: (uid, previousTrainingSessions) => {
        return firebase.firestore().collection("users").doc(uid).update({previousTrainingSessions})
    }
}