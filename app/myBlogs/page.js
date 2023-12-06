"use client";
import Nav from "../../components/nav";
import { useEffect, useState } from "react";
import React from "react";
import { useUserAuth } from "../_services/auth-context";
import {
  getUserBlogs,
  getAllUsersId,
  getAllBlogs,
} from "../_services/blog-service";
import BriefBlog from "../blogPage/brief-blog";
import Link from "next/link";

export default function page() {
  const { user } = useUserAuth();
  const [newBlogs, setNewBlogs] = useState([]);
  const thisUser = user?.uid;
  const [thisUserBlogs, setThisUserBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const thisData = await getUserBlogs(thisUser);
      setThisUserBlogs(thisData);
    };
    fetchBlogs();
  }, [thisUser]);

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
        {thisUserBlogs &&
          thisUserBlogs.map((blog) => (
            <div key={blog.id}>
              <Link href={`/blogPage/${blog.id}`}>
                <BriefBlog blog={blog} />
              </Link>
            </div>
          ))}
      </div>
    </main>
  );
}
