"use client";

import React, { useEffect, useState } from "react";
import { getBlog } from "@/app/_services/blog-service";
import Blog from "@/app/blogPage/blog";
import Nav from "@/components/nav";

export default function Page({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await getBlog(params.id);
      setBlog(blog);
      setLoading(false);
    };
    fetchBlog();
  }, []);

  return (
    <main>
      <Nav />
      {loading ? (
        <p className="h-screen flex justify-center pt-20">Loading...</p>
      ) : (
        <div className="h-screen flex justify-center pt-20">
          <Blog blog={blog} />
        </div>
      )}
    </main>
  );
}
