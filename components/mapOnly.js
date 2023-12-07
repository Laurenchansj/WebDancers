"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function MapOnly({ locations }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [centerMarker, setCenterMarker] = useState(null);

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
      setCenterMarker(newMarkers[0]);
    }
  }, [map, locations]);

  useEffect(() => {
    if (map && centerMarker) {
      const centerPostion = centerMarker.getPosition();
      map.setCenter(centerPostion);
      map.setZoom(13);
    }
  }, [map, centerMarker]);

  return (
    <div>
      <div id='map' style={{ height: "300px", width: "800px", borderRadius: "10px 10px 10px 10px" }} />
    </div>
  );
}
