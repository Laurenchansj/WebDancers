export const signInWithPopup = jest.fn();
export const signOut = jest.fn();
export const onAuthStateChanged = jest.fn();
export const getAuth = jest.fn().mockImplementation(() => ({
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  githubSignIn,
  googleSignIn,
}));
