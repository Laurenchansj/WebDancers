"use client";
import NewBlog from "./new-blog";
import Nav from "../../components/nav";
import BlogList from "./blog-list";
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
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Nav />
      {user ? (
        <div className="mt-20">
          <NewBlog onAddBlog={handleAddBlog} />
        </div>
      ) : (
        <p className="mt-20">Please Log In first.</p>
      )}
    </main>
  );
}
