import { GoogleMap } from "../app/components/googleMap";
import { AutoCompleteGoogleMap } from "../app/components/autocompleteInput";
import { GetData } from "../app/components/getData";

export default function Home() {
  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <h1>My App</h1>
        {/* <GetData /> */}
        <AutoCompleteGoogleMap />
        <h2>why?</h2>
      </div>
    </main>
  );
}
