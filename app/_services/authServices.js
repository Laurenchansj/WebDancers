import { signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, collection, getDoc, addDoc } from "firebase/firestore";

export const gitHubSignIn = async (auth, firestore) => {
    const userCredential = await signInWithPopup(auth, new GithubAuthProvider());
    const user = userCredential.user;

    const userRef = collection(firestore, 'users');
    const userDoc = doc(userRef, user.uid);

    const userInfo = {
        name: user.displayName,
        email: user.email,
    };

    await setDoc(userDoc, userInfo, { merge: true });
    console.log('User info added to firestore: ', userInfo);
    await checkAndAddUser(userRef, user, firestore);
};

export const googleSignIn = async (auth, firestore) => {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    const userRef = collection(firestore, 'users');
    const userDoc = doc(userRef, user.uid);

    const userInfo = {
        name: user.displayName,
        email: user.email,
    };

    await setDoc(userDoc, userInfo, { merge: true });;
    console.log('User info added to firestore: ', userInfo);
    await checkAndAddUser(userRef, user, firestore);
};

const checkAndAddUser = async (userRef, user, firestore) => {
    const userDoc = doc(userRef, user.uid);
    const userDocSnap = await getDoc(userDoc);

    if(!userDocSnap.exists()) {
        await addDoc(userRef, {
            name: user.displayName,
            email: user.email,
        });
        console.log('User info added to firestore');
    } else {
        console.log('User already exists');
    }
};

export const firebaseSignOut = async (auth) => {
    await signOut(auth);
};