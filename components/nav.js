

import React, { useState } from "react";
import { useUserAuth } from "@/app/_services/auth-context";
import Link from "next/link";
import Footer from "./footer";

export default function Nav() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  // const [signIn, setSignIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handleSignIn(provider) {
    try {
      if (provider === "github") {
        await gitHubSignIn();
      }
      if (provider === "google") {
        await googleSignIn();
      }
      setShowModal(false); // close the Modal popup window after sign in
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header className="flex justify-between items-center w-full px-4 py-2 fixed top-0 bg-[#ffffff] shadow z-10">
        <div className="flex-grow-0">
          <p className="text-xl font-bold text-black">TravelDancer</p>
        </div>
        <div className="flex-grow justify-center hidden sm:flex">
          <input
            type="text"
            className="form-input w-full max-w-md border border-gray-300 rounded-md py-2 px-4 block"
            placeholder="Search Country or City..."
          />
        </div>

        <div className="flex-grow-0">
          <div>
            {user ? (
              <div className="flex flex-row">
                <div className="py-2 px-4">
                  <Link href="./blogPage" className=" text-s text-black mx-12">
                    New Blog
                  </Link>
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSignOut}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowModal(true)}
                >
                  Log In
                </button>

                {showModal && (
                  <div 
                  className="fixed top-1/2 left-1/2 bg-black bg-opacity-50 flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 rounded-lg">                             
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] bg-opacity-70 
                                 border-black border-4 p-20 rounded-md"
                      
                      >
                      <div>
                        <span                        
                          className="absolute top-10 right-10 text-2xl cursor-pointer"
                          onClick={() => setShowModal(false)}
                          >
                          &times;
                        </span> 
                        <div>
                          <div className="mb-10 text-2xl font-bold flex justify-center">Sign-in to edit</div>                  
                          <button
                            className="p-2 ml-5 m-1 w-44 rounded-lg text-white bg-black hover:bg-gray-700 items-center justify-center"
                            onClick={() => handleSignIn("github")}
                          >
                            Sign in with GitHub
                          </button>
                          <button
                            className="p-2 ml-5 m-1 w-44 rounded-lg text-white bg-red-600 hover:bg-red-700 items-center justify-center"
                            onClick={() => handleSignIn("google")}
                          >
                            Sign in with Google
                          </button> 
                        </div>                   
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
}