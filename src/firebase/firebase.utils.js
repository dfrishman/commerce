import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDyS4pHd_w6cDi80HTYqOqWe0GTJ3nl3Wo",
    authDomain: "crwn-db-b4a06.firebaseapp.com",
    databaseURL: "https://crwn-db-b4a06.firebaseio.com",
    projectId: "crwn-db-b4a06",
    storageBucket: "",
    messagingSenderId: "132697844977",
    appId: "1:132697844977:web:03e9f90fdf793963"
  };

  export const createUserProfileDocument = async (userAuth, ...additionalData ) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set ({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters( {prompt: 'select_account'} );
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

