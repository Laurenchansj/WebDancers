"use client";
import { useState, useEffect } from "react";

export default function NewBlog({ onAddBlog }) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(Array(duration).fill(""));
  const [postBtn, setPostBtn] = useState(false);
  const random = Math.floor(Math.random() * 1000000000000000);
  const [id, setId] = useState(random);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    return country;
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    return city;
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    return startDate;
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    return endDate;
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    return title;
  };

  const handleDescription = (index, event) => {
    const updatedDescription = [...description];
    updatedDescription[index] = event;

    // setDescription((event) => {
    //   return [...updatedDescription, event];
    // });
    setDescription(updatedDescription);
  };

  const checkDate = () => {
    let duration = new Date(endDate) - new Date(startDate);
    duration = duration / (1000 * 3600 * 24) + 1;
    if (duration > 0) {
      setDuration(duration);
      setPostBtn(true);
    } else if (duration <= 0) {
      alert("End date must be after start date");
      setEndDate("");
    }
    return duration;
  };

  // const handleDisplayNext = () => {
  //   if (country.length === 0 && city.length === 0) {
  //     alert("Please select countries and cities first.");
  //   } else if (country.length !== 0 && city.length !== 0 && duration === "") {
  //     alert("Please select start date and end date.");
  //   } else {
  //     setDescriptionCondition(true);
  //   }
  // };

  useEffect(() => {
    if (startDate !== "" && endDate != "") {
      checkDate();
    }
  }, [startDate, endDate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (country.length === 0 || city.length === 0 || duration === 0) {
      alert("Please select countries, cities, start date and end date.");
    } else {
      alert("Your post has been submitted.");

      const Blog = {
        country: country,
        city: city,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        title: title,
        // day: Array.from({ length: duration }, (_, i) => ({
        //   day: i + 1,
        // })),
        //description: Array.from({ description }, (_, i) => ({ i })),
        description: description,
        id: id,
      };

      onAddBlog(Blog);

      setCountry("");
      setCity("");
      setStartDate("");
      setEndDate("");
      setDuration(0);
      setTitle("");
      setDescription(Array(duration).fill(""));
      setPostBtn(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="text-2xl text-cyan-600">New Post</p>
        <div className="w-fit m-2 mt-5 p-5 border border-cyan-600 rounded-lg bg-sky-50">
          <table>
            <tbody>
              <tr>
                <td className="text-right">
                  <label className="mr-5 text-cyan-800">Country: </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input w-full max-w-md p-1 mr-1 border border-gray-300 rounded"
                    placeholder="Select Countries..."
                    onChange={handleCountryChange}
                    value={country}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="text-right">
                  <label className="mr-5 text-cyan-800">City: </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input w-full max-w-md p-1 mr-1 border border-gray-300 rounded"
                    placeholder="Select Cities..."
                    onChange={handleCityChange}
                    value={city}
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="text-right">
                  <label className="mr-5 text-cyan-800">Date: </label>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-input w-40 max-w-md p-1 mr-1 border border-gray-300 rounded"
                    placeholder="Select Start Date..."
                    onChange={handleStartDateChange}
                    value={startDate}
                  ></input>
                  <input
                    type="date"
                    className="form-input w-40 max-w-md p-1 border border-gray-300 rounded"
                    placeholder="Select End Date..."
                    onChange={handleEndDateChange}
                    value={endDate}
                  ></input>
                </td>
              </tr>
              <tr className="text-right">
                <td>
                  <label className="mr-5 text-cyan-800">Title: </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input w-full max-w-md p-1 mr-1 border border-gray-300 rounded"
                    placeholder="Title..."
                    value={title}
                    onChange={handleTitleChange}
                  ></input>
                </td>
              </tr>
              {duration === 0 ? (
                <tr>
                  <td>
                    <p className="pt-8 text-cyan-800 font-bold">Description</p>
                  </td>
                  <td>
                    <p className="pt-8 pl-5 text-cyan-800"> ...</p>
                  </td>
                </tr>
              ) : (
                <tr className="text-center text-cyan-800 font-bold">
                  <td className="pt-5 pb-2">Day</td>
                  <td className="pt-5 pb-2">Description</td>
                </tr>
              )}

              {[...Array(duration)].map((_, i) => (
                <tr key={i + 1} className="text-cyan-800">
                  <td className="px-5">
                    <p>Day {i + 1}</p>
                  </td>
                  <td>
                    <textarea
                      className="form-input w-80 p-1 mr-1 border border-gray-300 rounded"
                      placeholder="Description..."
                      onChange={(description) =>
                        handleDescription(i, description.target.value)
                      }
                      value={description[i]}
                      style={{ WhiteSpace: "pre-line" }}
                    ></textarea>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {postBtn ? (
          <div className="grid justify-items-end mt-5 m-1">
            <button
              type="submit"
              className="ml-2 p-2 px-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-900"
              value={postBtn}
            >
              Post
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </form>
      <div className="border border-black my-2"></div>
    </div>
  );
}
