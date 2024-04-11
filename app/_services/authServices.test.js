import { gitHubSignIn, googleSignIn, firebaseSignOut } from "./authServices";
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

// Mock the Firebase modules used in auth-context.js to isolate tests from external dependencies
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn().mockReturnValue({}),
}));

// Mock the Firebase Authentication module.
// This allows us to simulate Firebase Auth operations without making actual network requests to Firebase servers.
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithPopup: jest.fn().mockResolvedValue({
    user: {
      // Mock signInWithPopup to simulate a successful sign-in operation.
      uid: "testUid",
      displayName: "testUser",
      email: "test@example.com",
    },
  }),
  GithubAuthProvider: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

// Mock the Firebase Firestore module.
// This allows us to simulate Firestore database operations, avoiding actual interactions with the Firestore database.
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn().mockImplementation(() =>
    // Mock getDoc to simulate retrieving a document from Firestore
    Promise.resolve({
      exists: () => true,
      data: () => ({}),
    })
  ),
  addDoc: jest.fn(),
}));

describe("authServices", () => {
  // Mocked auth and firestore objects are declared.
  // These objects are used as arguments when calling functions from authServices in each test case.
  const mockAuth = {};
  const mockFirestore = {};

  // Test case for the gitHubSignIn function
  beforeEach(() => {
    signInWithPopup.mockClear();
    GithubAuthProvider.mockClear();
    GoogleAuthProvider.mockClear();
    signOut.mockClear();
  });

  it("gitHubSignIn calls signInWithPopup with GithubAuthProvider", async () => {
    await gitHubSignIn(mockAuth, mockFirestore);

    // Use expect to verify that signInWithPopup was called as expected.
    // Check if the first argument was the mockAuth object,
    // and the second argument was an instance of GithubAuthProvider.
    expect(signInWithPopup).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(GithubAuthProvider)
    );
  });

  // Test case for the googleSignIn function
  it("googleSighIn calls signInWithPopup with GoogleAuthProvider", async () => {
    // Call the googleSignIn function with mockAuth and mockFirestore as arguments.
    await googleSignIn(mockAuth, mockFirestore);

    // Verify that signInWithPopup was called correctly with the expected arguments.
    // It should have been called with the mockAuth object and an instance of GoogleAuthProvider.
    expect(signInWithPopup).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(GoogleAuthProvider)
    );
  });

  // Test case for the firebaseSignOut function
  it("firebaseSignOut calls signOut", async () => {
    // Call the firebaseSignOut function with the mockAuth object.
    await firebaseSignOut(mockAuth);

    // Check that signOut was called.
    // This test verifies that the signOut function is invoked without specifying arguments,
    // as it only needs the auth object which is handled internally by the function.
    expect(signOut).toHaveBeenCalled();
  });
});
