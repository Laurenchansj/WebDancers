"use client";

import Nav from "../components/nav";
import React from "react";
import BlogHome from "../pages/blogHome";

export default function Home() {
  // function initMap() {
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Nav />
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <BlogHome />
      </div>
    </main>
  );
}
