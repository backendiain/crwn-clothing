import firebase from 'firebase/app';
import 'firebase/firestore'; // db
import 'firebase/auth'; // authentication

const config = {
    apiKey: "AIzaSyC5Q4i3l7Y8auK4KfhrlW3OTS_VH64901c",
    authDomain: "crwn-project-clothing.firebaseapp.com",
    projectId: "crwn-project-clothing",
    storageBucket: "crwn-project-clothing.appspot.com",
    messagingSenderId: "653629294539",
    appId: "1:653629294539:web:c0b9413eceef584e68184e",
    measurementId: "G-R2XSQ1P9P9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch(e) {
            console.log('error creating user', e.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// always trigger the google auth popup whenever we use this google auth provider for auth/sign-in
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;