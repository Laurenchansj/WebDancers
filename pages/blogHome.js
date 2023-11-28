"use client"

import React, { useEffect, useState } from "react";
import NewBlog from "./newBlog"
import { useRouter } from "next/navigation";


export default function BlogHome() {
  const router = useRouter();
  // const [newBlogOpen, setNewBlogOpen] = useState(false);

  // const handleOpenNewBlog = () => {
  //   setNewBlogOpen(true);
  // };

  const handleOpenNewBlog = () => {
    router.push('/newBlog');
  };

  // const handleOpenNewBlog = () => {
  //   router.push('/newBlog');
  // };

    return (
      <div>
        <main>
            <header>
                <h1>Blog</h1>
            </header>
            <section>
                <div className="border-spacing-1 rounded bg-white text-black">
                  <p>Blog Contents</p>
                </div>
                <button style={buttonStyles} onClick={handleOpenNewBlog}>
                    Create Blog
                  </button>
                {/* {newBlogOpen && <NewBlog />} */}
            </section>
        </main>
      </div>
    )
  }

  const buttonStyles = {
    backgroundColor: '#32CD32',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };
  