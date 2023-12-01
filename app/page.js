"use client";

import Nav from "../components/nav";
import React from "react";
import { useState, useEffect } from "react";
// import BlogList from "./blogPage/blog-list";
import { useUserAuth } from "./_services/auth-context";
// import BlogHome from "@/pages/blogHome";
import { getAllBlogs } from "./_services/blog-service";
import Link from "next/link";
import BriefBlog from "./blogPage/brief-blog";

export default function Home() {
  const { user } = useUserAuth();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getAllBlogs();
      setBlogs(blogs);
      blogs.sort((a, b) => {
        if (a.writtenDate != b.writtenDate) {
          if (a.writtenDate > b.writtenDate) {
            return -1;
          } else {
            return 1;
          }
          console.log("doing");
        } else {
          if (a.country > b.country) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    };
    fetchBlogs();
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <Nav />
      {user ? <p className="m-4">Welcome, {user.displayName}</p> : <p></p>}
      <div className="flex flex-col w-full">
        <div>
          <p className="text-3xl mb-4 font-bold text-cyan-900">
            Latest Blogs &#10024;
          </p>
        </div>
        <div>
          {/* <BlogHome /> */}
          {blogs &&
            blogs.map((blog) => (
              <div key={blog.id}>
                <Link href={`/blogPage/${blog.id}`}>
                  <BriefBlog blog={blog} />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
