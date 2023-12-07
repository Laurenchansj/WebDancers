"use client";

export default function BriefBlog({ blog }) {
  const countryListLength = blog.country.length;

  return (
    <div className="px-5 py-3 m-2 border w-full border-cyan-900 rounded-lg text-cyan-800 bg-white">
      <p>
        Country:&nbsp;
        {countryListLength > 1 ? (
          blog.country.map((country, i) => (
            <span key={i}>
              {country}
              {i < blog.country.length - 1 ? ", " : ""}
            </span>
          ))
        ) : (
          <span>{blog.country}</span>
        )}
        &nbsp;|| Author: {blog.user} || Written Date:
        {blog.writtenDate}
      </p>
      <p className="mt-2 text-lg font-semibold">Title: {blog.title}</p>
    </div>
  );
}
