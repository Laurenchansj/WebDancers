import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MapOnly } from "./mapOnly";
import "@testing-library/jest-dom";
import { Loader } from "@googlemaps/js-api-loader";

// Mocking @googlemaps/js-api-loader
jest.mock("@googlemaps/js-api-loader", () => ({
  Loader: jest.fn().mockImplementation(() => ({
    load: jest.fn().mockResolvedValue(true),
    importLibrary: jest.fn().mockResolvedValue({
      Map: function () {
        return { setCenter: jest.fn(), setZoom: jest.fn() };
      },
    }),
  })),
}));

global.google = {
  maps: {
    Marker: jest.fn().mockImplementation(function (options) {
      return {
        setMap: jest.fn(),
        getPosition: jest.fn().mockReturnValue({
          lat: options.position.lat,
          lng: options.position.lng,
        }),
        getTitle: jest.fn().mockReturnValue(options.title),
      };
    }),
    Map: jest.fn().mockImplementation(() => ({
      setCenter: jest.fn(),
      setZoom: jest.fn(),
    })),
    // Add any additional mocked objects or methods as needed
  },
};

describe("MapOnly Component", () => {
    // Testing if the MapOnly component renders correctly without any locations.
  it("renders correctly", () => {
    const { getByTestId } = render(<MapOnly locations={[]} />);
    // Verifies that the map container is present in the document.
    expect(getByTestId("map")).toBeInTheDocument();
  });

  // Testing if markers are created based on the locations prop.
  it("creates markers based on locations prop", async () => {
    const locations = [
      { lat: 37.7749, lng: -122.4194, description: "San Francisco" },
      { lat: 34.0522, lng: -118.2437, description: "Los Angeles" },
    ];

    render(<MapOnly locations={locations} />);

    // Waits for the Google Maps Marker constructor to be called for each location.
    await waitFor(() => {
      expect(global.google.maps.Marker).toHaveBeenCalledTimes(locations.length);

      // Verifies that each marker is created with the correct position and title.
      locations.forEach((location, index) => {
        expect(global.google.maps.Marker).toHaveBeenCalledWith({
          position: { lat: location.lat, lng: location.lng },
          map: expect.anything(),
          title: location.description,
        });
      });
    });
  });

  // Testing if markers are updated when the locations prop changes.
  it("updates markers based on locations props change", async () => {
    const { rerender } = render(
      <MapOnly
        locations={[
          { lat: 37.7749, lng: -122.4194, description: "San Francisco" },
        ]}
      />
    );

    // Waits for the marker to be created for the initial locations.
    await waitFor(() => {
      expect(global.google.maps.Marker).toHaveBeenCalledTimes(2);
    });

    // Clears the mock call history to isolate subsequent calls.
    global.google.maps.Marker.mockClear();

    // Rerenders the component with new locations.
    rerender(
      <MapOnly
        locations={[
          { lat: 34.0522, lng: -118.2437, description: "Los Angeles" },
          { lat: 40.7128, lng: -74.006, description: "New York" },
        ]}
      />
    );

    // Waits for new markers to be created for the updated locations.
    await waitFor(() => {
      // Confirms that new markers are created for the new locations.
      expect(global.google.maps.Marker).toHaveBeenCalledTimes(2);
      expect(global.google.maps.Marker).toHaveBeenCalledWith({
        position: { lat: 34.0522, lng: -118.2437 },
        map: expect.anything(),
        title: "Los Angeles",
      });
      expect(global.google.maps.Marker).toHaveBeenCalledWith({
        position: { lat: 40.7128, lng: -74.006 },
        map: expect.anything(),
        title: "New York",
      });
    });
  });

  // Testing if the Google Maps API key is correctly loaded from the environment variables.
  it('loads Google Maps API key from envrionment variable', async () => {
    const originalEnv = process.env;
    const apiKey = "fake_api_key";
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = apiKey;

    render(<MapOnly locations={[]} />);
    // Verifies that the Loader is called with the correct API key.
    expect(Loader).toHaveBeenCalledWith(
        expect.objectContaining({ apiKey: apiKey, })
    );

    process.env = originalEnv;
  });
});
