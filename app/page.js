"use client";

import Nav from "../components/nav";
import React from "react";
import { useState, useEffect } from "react";
import { useUserAuth } from "./_services/auth-context";
// import BlogHome from "../pages/blogHome";

import {
  getUserBlogs,
  getAllUsersId,
  getAllBlogs,
} from "./_services/blog-service";
import Link from "next/link";
import BriefBlog from "./blogPage/brief-blog";
import { get } from "http";

export default function Home() {
  const { user } = useUserAuth();
  const [blogs, setBlogs] = useState([]);
  const { gotBlogs, setGotBlogs } = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const userIdList = getAllUsersId();
      console.dir(userIdList);
      const usersListLength = (await userIdList).length;

      for (let i = 0; i < usersListLength; i++) {
        const userId = (await userIdList)[i].id;
        const fetchedBlogs = await getUserBlogs(userId);
        // console.dir(fetchedBlogs);

        setBlogs((prevBlogs) => {
          if (prevBlogs[i] != null && prevBlogs[i].id === fetchedBlogs[i].id) {
            return [...prevBlogs];
          }
          return [...prevBlogs, ...fetchedBlogs];
        });
      }

      // const allBlogs = await getAllBlogs();
      // console.log("allBlogs in home page: ", allBlogs[0].blogs[0]);

      // blogs.sort((a, b) => {
      //   if (a.writtenDate != b.writtenDate) {
      //     if (a.writtenDate > b.writtenDate) {
      //       return -1;
      //     } else {
      //       return 1;
      //     }
      //     console.log("doing");
      //   } else {
      //     if (a.title > b.title) {
      //       return 1;
      //     } else {
      //       return -1;
      //     }
      //   }
      // });
    };
    fetchBlogs();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     fetchBlogs(user);
  //   }
  // }, [user]);

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
