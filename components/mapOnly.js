"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import usePlaceAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// export function MapOnly({ selectedPlace }) {

export function MapOnly({ locations }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });

      try {
        await loader.load();
        const { Map } = await loader.importLibrary("maps");

        const newMap = new Map(document.getElementById("map"), {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        });

        setMap(newMap);
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  // useEffect(() => {
  //   if (map && selectedPlace) {
  //     const newMarker = new google.maps.Marker({
  //       position: { lat: selectedPlace.lat, lng: selectedPlace.lng },
  //       map,
  //       title: selectedPlace.description,
  //     });
  //     setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  //   }
  //   }, [map, selectedPlace]);

  useEffect(() => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    if (map && locations.length > 0) {
      const newMarkers = locations.map((locations) => {
        const newMarker = new google.maps.Marker({
          position: { lat: locations.lat, lng: locations.lng },
          map,
          title: locations.description,
        });
        return newMarker;
      });
      setMarkers(newMarkers);
    }
  }, [map, locations]);

  return (
    <div>
      <div id='map' style={{ height: "300px", width: "800px" }} />
    </div>
  );
}