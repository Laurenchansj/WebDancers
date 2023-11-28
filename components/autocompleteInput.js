"use client";

import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export function AutoCompleteGoogleMap() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { suggestions, setValue, clearSuggestions } = usePlacesAutocomplete();

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });

      try {
        await loader.load();
        // const { Map, Marker } = await loader.loadModules(["Map", "Marker"]);
        const { Map } = await loader.importLibrary("maps");
        const { Marker } = await loader.importLibrary("marker");

        const newMap = new Map(document.getElementById("map"), {
          center: { lat: 51.044308, lng: -114.063087 },
          zoom: 12,
        });

        const marker = new Marker({
          map: newMap,
          position: newMap.getCenter(),
        });

        setMap(newMap);
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  const handleSelect = async ({ description }) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      const newPlaces = [...places, { lat, lng, description }];
      setPlaces(newPlaces);

      if (map) {
        const newMarker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: description,
        });
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

        console.log(
          `Selected Location: ${description} - lat: ${lat}, lng: ${lng}`
        );
        // new google.maps.Marker({
        //   position: { lat, lng },
        //   map,
        //   title: description,
        // });
      }
    } catch (e) {
      console.error("Error adding marker: ", e);
    }
  };

  return (
    <div>
      <h1>Map</h1>
      <div id='map' style={{ height: "600px", width: "600px" }} />

      <div>
        <input
          value={suggestions.value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Enter a location'
        />
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
    </div>
  );
}
