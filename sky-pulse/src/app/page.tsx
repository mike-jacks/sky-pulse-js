"use client";

import { useState } from "react";
import Chart from "./Components/Chart";
import GoogleMapComponent from "./Components/GoogleMapComponent";

export default function Home() {
  const [coordinates, setCooordinates] = useState<{lat: number, lng: number} | null>(null);

  async function getWeatherDate() {
    const response = await fetch("https:://api.weather.gov")
  }
  return (
    <div className="flex flex-col items-center">
    <p>Homepage</p>
    <GoogleMapComponent coordinates={{coordinates}}/>
   </div>
  );
}
