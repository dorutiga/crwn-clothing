import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCG0XcXXUqtDaZY3y_G5PAvD6e8-8bvzLs",
  authDomain: "crowndb-8acee.firebaseapp.com",
  projectId: "crowndb-8acee",
  storageBucket: "crowndb-8acee.appspot.com",
  messagingSenderId: "104580412348",
  appId: "1:104580412348:web:6bba7221e3d43b169d31b9",
  measurementId: "G-SSCTVWMZBZ",
};

export const createUserProfileDocumet = async (userAuth, additionalData) => {
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
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signinWithGoogle = () => auth.signInWithPopup(provider);
