import React from "react";

const LocationList = ({ locations, onDelete }) => {
  return (
    <>
      {locations.map((location, index) => (
        <div key={index}>
          <button type='button' onClick={() => onDelete(index)}>
            {location.description.split(",")[0]}
          </button>
        </div>
      ))}
    </>
  );
};

export default LocationList;
