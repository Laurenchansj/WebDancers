export default function Blog({ blog }) {
  if (!blog) {
    return (
      <p className="ml-20 mt-8"> Please completed the description form.</p>
    );
  }
  // for (let i = 0; i < blog.days.length; i++) {
  //   for (let j = 0; j < blog.days[i].dayLocations.length; j++) {
  //     console.log(blog.days[i].dayLocations[j].description);
  //   }
  //   console.log(blog.days[i].dayMemo);
  // }

  return (
    <div>
      {/* <h1 className="ml-20 mt-2">&#10024;Submitted Result&#10024;</h1> */}
      <div className="ml-20 py-3 px-5 mt-2 border border-cyan-900 rounded-lg text-cyan-800">
        <p>Country: {blog.country}</p>
        <p>
          Date: {blog.startDate} to {blog.endDate}
        </p>
        <p>Duration: {blog.duration} days</p>
        <p>Author: {blog.user}</p>
        <p>Written Date: {blog.writtenDate}</p>
        <p className="mt-2 text-lg font-semibold">Title: {blog.title}</p>
        {blog.days.map((day, i) => (
          <div key={i} className="mt-2">
            <p className="font-semibold">Day {i + 1}</p>
            {day.dayLocations.map((location, j) => (
              <div key={j} className="mt-2">
                <p className="font-semibold">Location {j + 1}</p>
                <p>{location.name}</p>
                <p>{location.description}</p>
              </div>
            ))}
            <p className="font-semibold">Day {i + 1} Description</p>
            <p style={{ whiteSpace: "pre-line" }}>{day.dayMemo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
