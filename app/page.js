"use client";

import Nav from "./nav";
import React from "react";
import BlogHome from "../components/blogHome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav />
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <BlogHome />
      </div>
      

    </main>
  )
}
