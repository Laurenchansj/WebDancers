"use client";

export default function BriefBlog({ blog }) {
  return (
    <div className="px-5 py-3 m-2 border w-full border-cyan-900 rounded-lg text-cyan-800 bg-white">
      <p>
        Country: {blog.country} || Author: {blog.user} || Written Date:
        {blog.writtenDate}
      </p>
      <p className="mt-2 text-lg font-semibold">Title: {blog.title}</p>
    </div>
  );
}
