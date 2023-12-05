"use client";

import { useUserAuth } from "@/app/_services/auth-context";
import Link from "next/link";
import React from "react";

export default function Nav() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="flex justify-between items-center w-full px-4 py-2 fixed top-0 bg-white shadow z-10">
      <div className="flex-grow-0">
        <Link href="../" className="text-xl font-bold text-black">
          TravelDancer
        </Link>
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
                {/* <Link href="./blogPage/myBlogs" className=" text-s text-black">
                  My Blogs
                </Link> */}
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSignIn}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
