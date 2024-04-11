import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Nav from "./nav";
import { useUserAuth } from "@/app/_services/auth-context";

// Mock the useUserAuth hook to control return values and isolate the component from its dependencies
jest.mock("@/app/_services/auth-context", () => ({
  useUserAuth: jest.fn(),
}));

beforeEach(() => {
  // Before each test, define the default mock implementation of useUserAuth
  // This sets the initial state for each test to a user not logged in and mock functions for signIn and signOut
  useUserAuth.mockImplementation(() => ({
    user: null, // Simulates no user logged in
    gitHubSignIn: jest.fn(), // Mock function for GitHub sign-in
    googleSignIn: jest.fn(), // Mock function for Google sign-in
    firebaseSignOut: jest.fn(), // Mock function for sign-out
  }));
});

describe("Nav Component", () => {
  // Test if clicking on the GitHub login button correctly triggers the gitHubSignIn function
  test("Login modal displays correctly, and GitHub login function is called", async () => {
    // Setup the mock implementation specific to this test case
    const gitHubSignInMock = jest.fn();
    // Mock signIn function
    useUserAuth.mockImplementation(() => ({
      user: null,
      gitHubSignIn: gitHubSignInMock,
      googleSignIn: jest.fn(),
      firebaseSignOut: jest.fn(),
    }));

    // Render the Nav component and simulate user interactions
    render(<Nav />);
    // Simulate clicking the login button to open the modal
    fireEvent.click(screen.getByText("Log In"));
    // Simulate clicking the GitHub sign-in button
    fireEvent.click(screen.getByText("Sign in with GitHub"));

    // Verify if the gitHubSignIn function was called as a result of the user interaction
    expect(gitHubSignInMock).toHaveBeenCalled();
  });

  // Test if clicking on the Google sign-in button correctly triggers the googleSignIn function
  test("Google sign-in button click calls the googleSignIn function", async () => {
    const googleSignInMock = jest.fn();
    useUserAuth.mockImplementation(() => ({
      user: null,
      gitHubSignIn: jest.fn(),
      googleSignIn: googleSignInMock,
      firebaseSignOut: jest.fn(),
    }));

    // Render the Nav component and simulate clicking the Google sign-in button
    render(<Nav />);
    // Open the login modal
    fireEvent.click(screen.getByText("Log In"));
    // Click the Google sign-in button
    fireEvent.click(screen.getByText("Sign in with Google"));

    // Check if the googleSignIn function was triggered by the click
    expect(googleSignInMock).toHaveBeenCalled();
  });

  // Test if clicking the logout button correctly triggers the firebaseSignOut function
  test("Logout button click calls the logout function", async () => {
    const firebaseSignOutMock = jest.fn();
    useUserAuth.mockImplementation(() => ({
      user: { displayName: "Test User" },
      gitHubSignIn: jest.fn(),
      googleSignIn: jest.fn(),
      firebaseSignOut: firebaseSignOutMock,
    }));

    // Render the Nav component
    render(<Nav />);
    fireEvent.click(screen.getByText("Log Out"));

    // Assertion: Check if the mock signOut function was called
    expect(firebaseSignOutMock).toHaveBeenCalled();
  });
});
