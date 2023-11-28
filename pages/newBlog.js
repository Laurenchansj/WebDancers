"use client"

import React from "react";
import Map from "../components/map";
import Link from "next/link";

export default function NewBlog(){


    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
                <p>Google Map</p>
                <Map />
            </div>
            <div>
                <Link href="../">Home</Link>
            </div>
            
        </main>
    );
}