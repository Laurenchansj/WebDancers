"use client";
import { useState, useEffect } from "react";
import { MapOnly } from "@/components/mapOnly";
import { MapInput } from "@/components/mapInput-3";
import { useUserAuth } from "../_services/auth-context";
import { collection, addDoc, Timestamp, doc } from "firebase/firestore";
import { auth, firestore as db } from "../_services/firebase";
import LocationList from "@/components/locationList";
import Blog from "../blogPage/blog";

export default function NewBlog2({ onAddBlog }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState(Array(duration).fill(""));
  const [postBtn, setPostBtn] = useState(false);
  const [blog, setBlog] = useState(null); // [{startDate, endDate, duration, title, memo} ]
  const [writtenDate, setWrittenDate] = useState("");

  const [locations, setLocations] = useState([]); // [{lat, lng, description}
  const { user } = useUserAuth();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear().toString().padStart(4, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const date = today.getDate().toString().padStart(2, "0");
    const writtenDate = `${year}-${month}-${date}`;
    return writtenDate;
  };

  const handleSelectPlace = (place, day) => {
    setSelectedPlace(place);
    setLocations((prevLocations) => [...prevLocations, { ...place, day }]);
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

  const handleMemo = (index, event) => {
    const updatedMemo = [...memo];
    updatedMemo[index] = event;

    const latestMemo = updatedMemo.slice(0, duration);

    setMemo(latestMemo);
  };

  const handleDelete = (index) => {
    const updatedPlaces = [...locations];
    updatedPlaces.splice(index, 1);

    setLocations(updatedPlaces);
  };

  const handleWrittenDateChange = () => {
    const writtenDate = getToday();
    setWrittenDate(writtenDate);
    return writtenDate;
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (duration === 0 || title.length === 0 || memo.length === 0) {
      alert("Please input start date, end date, title, and description.");
    } else {
      try {
        const daysData = Array.from({ length: duration }, (_, i) => {
          const dayId = `${i + 1}`;
          const dayLocations = locations
            .filter((location) => location.day === `day${dayId}`)
            .map(({ lat, lng, description }) => ({
              lat,
              lng,
              description,
            }));

          const dayMemo = memo[i];
          console.log("dayLocations: ", dayLocations);
          console.log("dayMemo: ", dayMemo);
          return { dayLocations, dayMemo };
        });
        console.log("daysData: ", daysData);

        // get country name from description
        const lengthForCountry =
          daysData[0].dayLocations[0].description.split(",").length;
        const country = daysData[0].dayLocations[0].description
          .split(",")
          [lengthForCountry - 1].trim();
        console.log("country: ", country);

        const blogDocRef = await addDoc(
          collection(db, `users/${user.uid}/blogs2`),
          {
            // startDate: Timestamp.fromDate(new Date(startDate)),
            // endDate: Timestamp.fromDate(new Date(endDate)),
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            title: title,
            days: daysData,
            //new added
            writtenDate: writtenDate,
            user: user.displayName,
            country: country,
          }
        );

        console.log("blogDocRef: ", blogDocRef);

        alert("Your post has been submitted.");

        const blog = {
          startDate: startDate,
          endDate: endDate,
          duration: duration,
          title: title,
          days: daysData,
          writtenDate: writtenDate,
          user: user.displayName,
          // memo: memo,
        };

        setBlog(blog);

        onAddBlog(blog);

        setStartDate("");
        setEndDate("");
        setDuration(0);
        setTitle("");
        setMemo(Array(duration).fill(""));
        setPostBtn(false);
        setLocations([]);
      } catch (e) {
        alert("Error adding document: ", e);
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <p className="text-2xl text-cyan-600">New Post</p>
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          maxHeight: "100hv",
        }}
      >
        <ul className="mx-4 mt-2 text-xl text-cyan-600 list-disc">
          <li>
            <p>Map</p>
          </li>
        </ul>
        <MapOnly locations={locations} />
      </div>
      <form
        style={{
          display: "flex",
          gap: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            // flex: "1",
            width: "800px",
            overflowX: "auto",
            maxHeight: "100hv",
          }}
        >
          <ul className="mx-4 mt-2 text-xl text-cyan-600 list-disc">
            <li>
              <p>Description</p>
            </li>
          </ul>

          <div
            className="p-5 border border-cyan-600 rounded-lg bg-sky-50"
            style={{ width: "800px" }}
          >
            <table>
              <tbody>
                <tr>
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
                      <MapInput
                        onSelectPlace={(place) =>
                          handleSelectPlace(place, `day${i + 1}`)
                        }
                      />
                      <LocationList
                        locations={locations.filter(
                          (location) => location.day === `day${i + 1}`
                        )}
                        onDelete={handleDelete}
                      />
                      <textarea
                        className="form-input w-full p-1 mr-1 border border-gray-300 rounded"
                        placeholder="Description..."
                        onChange={(memo) => handleMemo(i, memo.target.value)}
                        value={memo[i]}
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
            <div>
              {blog ? (
                <div>
                  <Blog blog={blog} />
                </div>
              ) : (
                <p className="ml-20 mt-8">
                  Please completed the description form.
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
