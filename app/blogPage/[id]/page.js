"use client";

import React, { useEffect, useState } from "react";
import {
  getAuthorId,
  getUserBlogs,
  getAllUsersId,
  getBlog,
} from "@/app/_services/blog-service";
import Blog from "@/app/blogPage/blog";
import Nav from "@/components/nav";
import { useUserAuth } from "../../_services/auth-context";

export default function Page({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  let authorId = null;
  useEffect(() => {
    const fetchBlog = async () => {
      const userIdList = getAllUsersId();
      const usersListLength = (await userIdList).length;
      for (let i = 0; i < usersListLength; i++) {
        const userId = (await userIdList)[i].id;
        const blogs = await getUserBlogs(userId);
        for (let j = 0; j < blogs.length; j++) {
          if (blogs[j].id === params.id) {
            authorId = userId;
          }
        }
      }
      console.log("find authorId: ", authorId);
      const blog = await getBlog(authorId, params.id);
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
