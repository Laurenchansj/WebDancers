"use client";
import NewBlog2 from "../blogPage/new-blog-3";
import Nav from "../../components/nav";
import { useState } from "react";
import React from "react";
import { useUserAuth } from "../_services/auth-context";

export default function Page() {
  const { user } = useUserAuth();
  const [newBlogs, setNewBlogs] = useState([]);

  function handleAddBlog(newBlog) {
    setNewBlogs((prevNewBlogs) => {
      return [...prevNewBlogs, newBlog];
    });
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-white">
        <Nav />
        <p className="mt-20">Please Log In first.</p>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Nav />
      <div className="mt-20">
        <NewBlog2 onAddBlog={handleAddBlog} />
      </div>
    </main>
  );
}
