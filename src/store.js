import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyA7qmQRMyiMVsutk2uOBcub6n8WucvYnyo",
  authDomain: "reactclientpanel-6c85f.firebaseapp.com",
  databaseURL: "https://reactclientpanel-6c85f.firebaseio.com",
  projectId: "reactclientpanel-6c85f",
  storageBucket: "reactclientpanel-6c85f.appspot.com",
  messagingSenderId: "847576620040"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "user",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// the following three lines were needed in the instructor's work to get rid of an error but for my case, I didn't get any error when the following three lines were commented out
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
