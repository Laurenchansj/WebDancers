


import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer 
        className="flex justify-center items-center w-full px-4 py-2 mt-24 bg-cyan-700 z-10"
    >        
        <div className="container mx-auto flex justify-around items-center text-white">
        <div>
          <p className="font-bold ">About Us:</p>
            <p className="text-xs">Web Development 2 Final Project | 
              <Link target="_blank" href="https://github.com/Laurenchansj/WebDancers"
                    className="text-white hover:underline pl-1"
              >
              GitHub Repository
              </Link>
            </p>
          <p className="text-xs">Created by: Haewon Lee, Jiyeon Heo, Tze-chi Chan , Parinthorn Songsana</p>
        </div>
        <div className="flex-shrink-0 text-xs ml-0">            
            © 2023 TravelDancer. All rights reserved.
        </div>        
        {/* <div className="flex: 1">
          <p className="font-bold">Contact us:</p>
          <p className="text-xs">contact info?</p>
        </div> */}
      </div>
  </footer>
  );
}