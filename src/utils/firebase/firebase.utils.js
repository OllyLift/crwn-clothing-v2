import { initializeApp } from 'firebase/app';
import { 
        getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyBXAd2bA-R--LqRHXDx8PpmHDTbh0QNlbo",
    authDomain: "crwn-db-8d444.firebaseapp.com",
    projectId: "crwn-db-8d444",
    storageBucket: "crwn-db-8d444.appspot.com",
    messagingSenderId: "1053094478822",
    appId: "1:1053094478822:web:c3dc6efdd501378b0a4c27"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists())
    {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
};