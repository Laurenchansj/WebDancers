"use client"

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Map from "./map";

export default function BlogHome() {

  const [newBlogOpen, setNewBlogOpen] = useState(false);



  const handleOpenNewBlog = () => {
    setNewBlogOpen(true);

  };

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
                {newBlogOpen && <Map onOpenNewBlog={handleOpenNewBlog}} />}
            </section>
        </main>
      </div>
    )
  }