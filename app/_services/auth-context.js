"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "./firebase";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const gitHubSignIn = () => {
  //   const provider = new GithubAuthProvider();
  //   return signInWithPopup(auth, provider);
  // };

  const gitHubSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(
        auth,
        new GithubAuthProvider()
      );

      const user = userCredential.user;

      const userRef = collection(firestore, "users");
      const userDoc = doc(userRef, user.uid);

      const userInfo = {
        name: user.displayName,
        email: user.email,
      };

      await setDoc(userDoc, userInfo, { merge: true });
      console.log("User info added to firestore: ", userInfo);
      await checkAndAddUser(userRef, user);
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  const checkAndAddUser = async (userRef, user) => {
    const userDoc = doc(userRef, user.uid);
    const userDocSnap = await getDoc(userDoc);
    if (!userDocSnap.exists()) {
      const userDocRef = await addDoc(userDoc, {
        name: user.displayName,
        email: user.email,
      });
      console.log("User info added to firestore: ", userDocRef.id);
    } else {
      console.log("User already exists");
    }
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
