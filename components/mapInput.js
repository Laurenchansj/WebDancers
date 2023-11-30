"use client";

import React, { useState, useRef } from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export function MapInput({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { suggestions, setValue, clearSuggestions } = usePlacesAutocomplete();

  const handleSelect = async ({ description }) => {
    setValue(description, false);
    clearSuggestions();
    // setSelectedPlace("");

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      const newPlace = { lat, lng, description };
      setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
      onSelectPlace({ lat, lng, description });
      console.log(
        `Selected Location: ${description} - lat: ${lat}, lng: ${lng}`
      );
      const formattedDescription = description.split(",")[0].trim();
      setSelectedPlace(formattedDescription);
    } catch (e) {
      console.error("Error adding marker: ", e);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    setValue("");
    clearSuggestions();
    setSelectedPlace("");
    // setSelectedPlace(null);
    console.log(setValue);
  };

  return (
    <div>
      <input
        // value={selectedPlace ? selectedPlace : suggestions.value}
        value={selectedPlace}
        onChange={(e) => {
          setValue(e.target.value);
          setSelectedPlace(e.target.value);
        }}
        placeholder='Enter a location'
        className='border border-gray-300 rounded'
      />
      <button type='button' onClick={handleClear}>
        Clear
      </button>
      <ul>
        {suggestions.data?.map((suggestion) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleSelect(suggestion)}
          >
            {suggestion.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
