import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function BlogMap({ locations }) {
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
    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));

    if (map && locations.length > 0) {
      const newMarkers = locations.map((location) => {
        const newMarker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.description,
        });
        return newMarker;
      });

      // Set the markers
      setMarkers(newMarkers);

      // Calculate the center of all markers
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });

      // Fit the map to the bounds of all markers
      map.fitBounds(bounds);

      // Set a reasonable max zoom level
      const maxZoom = 15;
      if (map.getZoom() > maxZoom) {
        map.setZoom(maxZoom);
      }
    }
  }, [map, locations]);

  return (
    <div>
      <div id="map" style={{ height: "300px", width: "800px" }} />
    </div>
  );
}
