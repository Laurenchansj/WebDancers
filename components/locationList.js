import React from "react";

const LocationList = ({ locations, onDelete }) => {
  return (
    <>
      {locations.map((location, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>
            {location.description.split(",")[0]}
          </span>
          <button
            type='button'
            onClick={() => onDelete(index)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              textAlign: "center",
              lineHeight: "20px",
              padding: "0",
            }}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
};

export default LocationList;
