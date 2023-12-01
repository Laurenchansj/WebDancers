export default function Blog({ blog }) {
  if (!blog) {
    return <p> Error: Blog data is undefined.</p>;
  }

  return (
    <div className="px-5 py-3 m-2 border border-cyan-900 rounded-lg text-cyan-800 bg-white w-6/12">
      <p>Country: {blog.country}</p>
      <p>City: {blog.city}</p>
      <p>
        Date: {blog.startDate} to {blog.endDate}
      </p>
      <p>Duration: {blog.duration} days</p>
      <p className="mt-2 text-lg font-semibold">Title: {blog.title}</p>

      {blog.description.map((_, i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold">Day {i + 1}</p>
          <p style={{ whiteSpace: "pre-line" }}>{blog.description[i]}</p>
        </div>
      ))}
    </div>
  );
}
