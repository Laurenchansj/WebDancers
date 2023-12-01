"use client";
import NewBlog2 from "./new-blog-2";
import Nav from "../../components/nav";
import { useState } from "react";
import React from "react";
import { useUserAuth } from "../_services/auth-context";

export default function page() {
  const { user } = useUserAuth();
  const [blogs, setBlogs] = useState([]);

  function handleAddBlog(newBlog) {
    setBlogs((prevBlog) => {
      return [...prevBlog, newBlog];
    });
  }
  return (
    <main className='flex min-h-screen flex-col items-center bg-white'>
      <Nav />
      {user ? (
        <div>
          <div className='mt-20'>
            <NewBlog2 onAddBlog={handleAddBlog} />
          </div>
        </div>
      ) : (
        <p className='mt-20'>Please Log In first.</p>
      )}
    </main>
  );
}
