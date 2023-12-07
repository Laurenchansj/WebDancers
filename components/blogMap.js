"use client";

import React, { useEffect, useState } from "react";

import { Loader } from "@googlemaps/js-api-loader";

export default function BlogMap({ blog }) {
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
  }, []);

  useEffect(() => {
    if (map && blog && blog.days) {
      markers.forEach((marker) => marker.setMap(null));

      let bounds = new google.maps.LatLngBounds();

      blog.days.forEach((day) => {
        day.dayLocations.forEach((location) => {
          const markerPosition = new google.maps.LatLng(
            location.lat,
            location.lng
          );

          bounds.extend(markerPosition);

          const marker = new google.maps.Marker({
            position: markerPosition,

            map: map,
          });

          markers.push(marker);
        });
      });

      map.fitBounds(bounds);
    }
  }, [map, blog]);

  return (
    <div>
      <div id="map" style={{ height: "500px", width: "800px" }} />
    </div>
  );
}
