"use client";
import NewBlog from "./new-blog";
import Nav from "../nav";
import BlogList from "./blog-list";
import { useState } from "react";

export default function page() {
  const [blogs, setBlogs] = useState([]);

  function handleAddBlog(newBlog) {
    setBlogs((prevBlog) => {
      return [...prevBlog, newBlog];
    });
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Nav />
      <div className="mt-20">
        <NewBlog onAddBlog={handleAddBlog} />
      </div>
      <BlogList blogs={blogs} className="mb-5" />
    </main>
  );
}
