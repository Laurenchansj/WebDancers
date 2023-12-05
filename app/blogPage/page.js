"use client";
import NewBlog2 from "./new-blog-3";
import Nav from "../../components/nav";
import { useState } from "react";
import React from "react";
import { useUserAuth } from "../_services/auth-context";
import { usePathname } from "next/navigation";

export default function page() {
  const { user } = useUserAuth();
  const [blogs, setBlogs] = useState([]);
  const pathName = usePathname();
  console.log("pathName: ", pathName);
  // const router = useRouter();
  // const { query } = router;
  // const pageName = query.type;
  // console.log("pageName: ", pageName);

  function handleAddBlog(newBlog) {
    setBlogs((prevBlog) => {
      return [...prevBlog, newBlog];
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
      {/* {router.asPath === "./newBlog" ? (
        <div>
          <div className="mt-20">
            <NewBlog2 onAddBlog={handleAddBlog} />
          </div>
        </div>
      ) : (
        <p className="mt-20">Here is my blogs.</p>
      )} */}
      {user ? (
        <div>
          <div className="mt-20">
            <NewBlog2 onAddBlog={handleAddBlog} />
          </div>
        </div>
      ) : (
        <p className="mt-20">Please Log In first.</p>
      )}
    </main>
  );
}
