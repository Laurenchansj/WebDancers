"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "./firebase";
import { doc, setDoc, collection, getDoc, addDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const gitHubSignIn = async () => {
    try {
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
      await checkAndAddUser(userRef, user);
    } catch (error) {
      console.error('Error signing in: ', error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = userCredential.user;

      const userRef = collection(firestore, 'users');
      const userDoc = doc(userRef, user.uid);

      const userInfo = {
        name: user.displayName,
        email: user.email,
      };

      await setDoc(userDoc, userInfo, { merge: true });
      console.log('User info added to firestore: ', userInfo);
      await checkAndAddUser(userRef, user);
    } catch (error) {
      console.error('Error signing in with Google: ', error.message);
    }
  };

  const checkAndAddUser = async (userRef, user) => {
    const userDoc = doc(userRef, user.uid);
    const userDocSnap = await getDoc(userDoc);

    if (!userDocSnap.exists()) {
      await addDoc(userRef, {
        name: user.displayName,
        email: user.email,
      });
      console.log('User info added to firestore');
    } else {
      console.log('User already exists');
    }
  };

  const firebaseSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, googleSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
