import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const config = {
  apiKey: "AIzaSyDg2LLsJg2MLQ5R1vLl3crkt_ZlWHMpd10",
  authDomain: "crwn-db-976ae.firebaseapp.com",
  projectId: "crwn-db-976ae",
  storageBucket: "crwn-db-976ae.appspot.com",
  messagingSenderId: "706275131049",
  appId: "1:706275131049:web:c508a847620912d7c333b8",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user.", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
