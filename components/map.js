"use client"

import React, {useEffect, useState} from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map(){

    //const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');

            //init a marker
            const { Marker } = await loader.importLibrary('marker') ;

            const position = {
                lat: 51.048615,
                lng: -114.070847
            }

            //map options
            const mapOptions = {
                center: position,
                zoom: 14,
            }

            //setup the map
            const newMap = new Map(document.getElementById("map"), mapOptions);
            setMap(newMap);
            //put up a marker
            const marker = new Marker({
                map: newMap,
                position: position
            });

            
        }

        initMap();
    },[])

    return(
       // <div style={{height: '600px'}} ref={mapRef} />
       <div id="map" style={{ height: "600px", width: "100%" }} />
    )
}

export default Map;