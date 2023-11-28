"use client";

import Nav from "../components/nav";
import React from "react";
import { useState, useEffect } from "react";
import BlogList from "./blogPage/blog-list";

import Image from "next/image";
import { useUserAuth } from "./_services/auth-context";
import BlogHome from "@/pages/blogHome";

export default function Home() {
  const { user } = useUserAuth();

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <Nav />
      {user ? <p className="m-4">Welcome, {user.displayName}</p> : <p></p>}
      <div className="flex flex-col lg:flex-row w-full">
        <div>
          <p className="text-3xl mb-4 font-bold text-cyan-900">
            Latest Blog &#10024;
          </p>
          {/* <BlogList blogs={blogs} className="mb-5" /> */}
        </div>
        <div>
          <BlogHome />
        </div>
      </div>
    </main>
  );
}
