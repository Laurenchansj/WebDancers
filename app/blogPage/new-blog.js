"use client";
import { useState, useEffect } from "react";
import { GoogleMap } from "../../components/googleMap";
// import Map from "../../components/map";
import countriesList from "../location/location.json";
import { addBlog } from "../_services/blog-service";
import { useUserAuth } from "../_services/auth-context";

// let blogArray = [];

export default function NewBlog() {
  const [writtenDate, setWrittenDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(Array(duration).fill(""));
  const [postBtn, setPostBtn] = useState(false);
  const { user } = useUserAuth();
  // const random = Math.floor(Math.random() * 1000000000000000);
  // const [id, setId] = useState(random);

  const handleWrittenDateChange = () => {
    const writtenDate = getToday();
    setWrittenDate(writtenDate);
    return writtenDate;
  };

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

    const latestDescription = updatedDescription.slice(0, duration);
    // setDescription((event) => {
    //   return [...updatedDescription, event];
    // });

    setDescription(latestDescription);

    // setDescription((event) => {
    //   return [...updatedDescription, event];
    // });
    //setDescription(updatedDescription);
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

  useEffect(() => {
    handleWrittenDateChange();
    if (startDate !== "" && endDate != "") {
      checkDate();
    }
  }, [startDate, endDate]);

  const handleSubmit = (event) => {
    if (
      country.length === 0 ||
      city.length === 0 ||
      duration === 0 ||
      title.length === 0 ||
      description.length === 0
    ) {
      alert("Please select countries, cities, start date and end date.");
    } else {
      alert("Your post has been submitted.");

      const Blog = {
        writtenDate: writtenDate,
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
        user: user.displayName,
        // id: id,
      };

      // onAddBlog(Blog);
      setCountry("");
      setCity("");
      setStartDate("");
      setEndDate("");
      setDuration(0);
      setTitle("");
      setDescription(Array(duration).fill(""));
      setPostBtn(false);
      setWrittenDate("");
    }
  };

  const countryName = Object.keys(countriesList);
  let countriesNameList = [];
  for (let i = 0; i < countryName.length; i++) {
    countriesNameList.push(countryName[i]);
  }
  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const writtenDate = `${year}-${month}-${date}`;
    return writtenDate;
  };

  return (
    <div>
      <p className="text-2xl text-cyan-600 mb-5">New Post</p>
      <form
        style={{
          display: "flex",
          gap: "20px",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          await addBlog({
            writtenDate: writtenDate,
            country: country,
            city: city,
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            title: title,
            description: description,
            user: user.displayName,
          });
          handleSubmit(e);
        }}
      >
        <div
          style={{
            // flex: "1",
            width: "800px",
            overflowX: "auto",
            maxHeight: "100hv",
          }}
        >
          <div
            className="p-5 border border-cyan-600 rounded-lg bg-sky-50"
            style={{ width: "800px" }}
          >
            <table>
              <tbody>
                <tr>
                  <td className="text-left">
                    <p className="mb-3 mr-5 text-cyan-800">
                      Written Date: {getToday()}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-left">
                    <label className="mr-5 text-cyan-800">Country: </label>
                  </td>
                  <td className="text-left">
                    <label className="mr-5 text-cyan-800">City: </label>
                  </td>
                  <td className="text-left">
                    <label className="mr-5 text-cyan-800">From: </label>
                  </td>
                  <td className="text-left">
                    <label className="mr-5 text-cyan-800">To: </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      list="countries"
                      className="form-input w-full max-w-md p-1 mr-1 border border-gray-300 rounded"
                      placeholder="Select Countries..."
                      onChange={handleCountryChange}
                      value={country}
                    ></input>
                    <datalist id="countries">
                      {countriesNameList.map((country) => {
                        return <option key={country}>{country}</option>;
                      })}
                    </datalist>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-input w-full max-w-md p-1 mr-1 border border-gray-300 rounded"
                      placeholder="Which Cities..."
                      onChange={handleCityChange}
                      value={city}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="date"
                      className="form-input w-40 max-w-md p-1 border border-gray-300 rounded"
                      onChange={handleStartDateChange}
                      value={startDate}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="date"
                      className="form-input w-40 max-w-md p-1 border border-gray-300 rounded"
                      onChange={handleEndDateChange}
                      value={endDate}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-left pt-5">
                    <label className="pt-5 text-cyan-800 col-span-4">
                      Title:
                    </label>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <input
                      type="text"
                      className="form-input w-full p-1 mr-1 border border-gray-300 rounded"
                      placeholder="Title..."
                      onChange={handleTitleChange}
                      value={title}
                    ></input>
                  </td>
                </tr>

                {[...Array(duration)].map((_, i) => (
                  <tr key={i + 1} className="text-cyan-800">
                    <td colSpan={4} className="pt-5">
                      <p>Day {i + 1}</p>
                      <textarea
                        className="form-input w-full p-1 mr-1 border border-gray-300 rounded"
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
          {/* <div className="border border-black my-2"></div> */}
        </div>
        <div
          style={{
            flex: "1",
            overflowY: "auto",
            maxHeight: "100hv",
          }}
        >
          <GoogleMap />
        </div>
      </form>
    </div>
  );
}
