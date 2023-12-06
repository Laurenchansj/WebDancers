"use client";
import Nav from "../../components/nav";
import { useEffect, useState } from "react";
import React from "react";
import { useUserAuth } from "../_services/auth-context";
import { getUserBlogs } from "../_services/blog-service";
import BriefBlog from "../blogPage/brief-blog";
import Link from "next/link";

export default function page() {
  const { user } = useUserAuth();
  const thisUser = user?.uid;
  const [thisUserBlogs, setThisUserBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const thisData = await getUserBlogs(thisUser);
      thisData.sort((a, b) => {
        if (a.writtenDate != b.writtenDate) {
          if (a.writtenDate > b.writtenDate) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.country > b.country) {
            console.log("doing");
            return 1;
          } else {
            return -1;
          }
        }
      });
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
