"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map() {
  //const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [locations, setLocations] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      //init a marker
      const { Marker } = await loader.importLibrary("marker");

      const position = {
        lat: 51.048615,
        lng: -114.070847,
      };

      //map options
      const mapOptions = {
        center: position,
        zoom: 14,
      };

      //setup the map
      const newMap = new Map(document.getElementById("map"), mapOptions);
      setMap(newMap);
      //put up a marker
      const marker = new Marker({
        map: newMap,
        position: position,
      });
    };

    initMap();
  }, []);

  const addLocation = () => {
    const newLocation = { id: locations.length, position: null };
    setLocations([...locations, newLocation]);
  };

  const addMarker = (location) => {
    google.maps.event.addListenerOnce(map, "click", (event) => {
      const newMarker = new google.maps.Marker({
        position: event.latLng,
        map: map,
      });

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

      setLocations(
        locations.map((loc) =>
          loc.id === location.id
            ? { ...loc, position: event.latLng.toJSON() }
            : loc
        )
      );
    });
  };

  const reset = () => {
    // Remove all markers from the map
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    // Reset locations
    setLocations([]);
  };

  return (
    <div>
      <div id="map" style={{ height: "600px", width: "100%" }} />
      <button onClick={addLocation}>Add Location</button>
      <button onClick={reset}>Reset</button>
      {locations.map((location, index) => (
        <div key={index}>
          Location{location.id}
          <button onClick={() => addMarker(location)}>Add</button>
          {location.position && (
            <p>
              Latitude: {location.position.lat}, Longitude:{" "}
              {location.position.lng}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Map;
