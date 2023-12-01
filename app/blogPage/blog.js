export default function Blog({ blog, dayDescription }) {
  if (!blog) {
    return (
      <p className="ml-20 mt-8"> Please completed the description form.</p>
    );
  }
  console.log(dayDescription);

  return (
    <div>
      <h1 className="ml-20 mt-2">&#10024;Submitted Result&#10024;</h1>
      <div className="ml-20 py-3 px-5 mt-2 border border-cyan-900 rounded-lg text-cyan-800">
        <p>
          Date: {blog.startDate} to {blog.endDate}
        </p>
        <p>Duration: {blog.duration} days</p>
        <p className="mt-2 text-lg font-semibold">Title: {blog.title}</p>
        {/* <p>{blog.collection("days").description}</p> */}
        {/* {description.map((_, i) => (
        <div key={i} className="mt-2">
          <p className="font-semibold">Day {i + 1}</p>
          <p style={{ whiteSpace: "pre-line" }}>{description[i]}</p>
        </div>
      ))} */}
      </div>
    </div>
  );
}
