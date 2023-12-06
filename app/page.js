
"use client";

import Nav from "../components/nav";
import React from "react";
import { useState, useEffect } from "react";
import { useUserAuth } from "./_services/auth-context";
import BlogHome from "../pages/blogHome";
import Footer from "@/components/footer";


export default function Home() {
  const { user } = useUserAuth();

  return (
    <main className='flex flex-col min-h-screen items-center bg-white'>      
      <Nav />
      {/* {user ? <p className='m-4 text-black pt-20'>Welcome, {user.displayName}</p> : <p></p>} */}
      <div className='flex flex-1 flex-col lg:flex-row w-full min-h-full mt-20 pl-10'>
        <div>
          <p className='text-3xl mb-4 font-bold text-cyan-900'>
            Latest Blog &#10024;
          </p>          
        </div>
        <div>
          <BlogHome />
        </div>
      </div>
      <Footer />        
    </main>
  );
}
