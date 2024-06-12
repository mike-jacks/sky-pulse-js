"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import GoogleMapComponent from "./Components/GoogleMapComponent";

export default function Home() {
  const stGeorgeCenter = {
    lat: 37.1, // Latitude for St. George, Utah
    lng: -113.6, // Longitude for St. George, Utah
  };

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(stGeorgeCenter);
  const [locationData, setLocationData] = useState<any>(null);
  const [weatherDataUrl, setWeatherDataUrl] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);

  const [relativeLocation, setRelativeLocation] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("");

  const [forecast, setForecast] = useState<any[]>([]);

  const fetchLocationData = useCallback(async (coords: { lat: number; lng: number }) => {
    try {
      const response = await fetch(`https://api.weather.gov/points/${coords.lat},${coords.lng}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchWeatherData = useCallback(async (url: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const storeLocationData = useCallback(
    async (coords: { lat: number; lng: number }) => {
      const data = await fetchLocationData(coords);
      setLocationData(data);
      if (data && data.properties) {
        setWeatherDataUrl(data.properties.forecast);
      } else {
        setWeatherDataUrl("");
      }
    },
    [fetchLocationData]
  );

  const storeForecastData = useCallback(
    async (coords: { lat: number; lng: number }) => {
      const data = await fetchWeatherData(weatherDataUrl);
      setWeatherData(data);
      if (data && data.properties) {
        setForecast(data.properties.periods);
      }
    },
    [fetchWeatherData, weatherDataUrl]
  );

  useEffect(() => {
    if (locationData && locationData.status === 404) {
      setCity("");
      setState("");
      setWeatherData(null);
    }
  }, [locationData]);

  useEffect(() => {
    if (locationData && locationData.properties) {
      const { relativeLocation, timeZone } = locationData.properties;
      if (relativeLocation && relativeLocation.properties) {
        setRelativeLocation(relativeLocation);
        setCity(relativeLocation.properties.city);
        setState(relativeLocation.properties.state);
      }
      setTimeZone(timeZone);
    }
  }, [locationData]);

  useEffect(() => {
    if (weatherDataUrl) {
      storeForecastData(coordinates);
    }
  }, [weatherDataUrl, storeForecastData, coordinates]);

  useEffect(() => {
    console.log(forecast);
  }, [forecast]);

  return (
    <div className="flex flex-col items-center">
      <GoogleMapComponent
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        storeWeatherData={storeLocationData}
        storeForecastData={storeForecastData}
      />
      <h1 className="font-bold">
        {city ? city + ", " : "Out of United States"}
        {state ? state : ""}
      </h1>
      <div className="flex flex-col gap-5 justify-center w-full">
        {/* Daily Forecast */}
        <div className="rounded-lg shadow-xl border-yellow-600 p-5 bg-gray-800 border-2 flex flex-col mb-4 overflow-x-auto">
          {forecast
            .filter((f) => f.number === 1)
            .map((period) => {
              return (
                <h2 key={period.number} className="text-lg font-bold text-gray-200 mb-2">
                  {period.isDaytime ? "Daily Forecast" : "Nightly Forecast"}
                </h2>
              );
            })}
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-700">
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 1)
                  .map((period) => {
                    const date = new Date(period.startTime);
                    const monthShort = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
                    const day = date.getUTCDate();
                    const year = date.getUTCFullYear();
                    return (
                      <th key={period.number} className="px-6 py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">
                        {monthShort} {day}, {year}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 1)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {period.name}
                    </td>
                  ))}
              </tr>
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 1)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {period.temperature}&deg;{period.temperatureUnit}
                    </td>
                  ))}
              </tr>
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 1)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      <div className="flex justify-center items-center">
                        <Image className="rounded-full" src={period.icon} alt={`${period.name} image`} width="40" height="40" />
                      </div>
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
        {/* Nightly Forecast */}
        <div className="rounded-lg shadow-xl border-yellow-600 p-5 bg-gray-800 border-2 flex flex-col overflow-x-auto">
          {forecast
            .filter((f) => f.number === 2)
            .map((period) => {
              return (
                <h2 key={period.number} className="text-lg font-bold text-gray-200 mb-2">
                  {period.isDaytime ? "Daily Forecast" : "Nightly Forecast"}
                </h2>
              );
            })}
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-700">
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 0)
                  .map((period) => {
                    const date = new Date(period.startTime);
                    const monthShort = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
                    const day = date.getUTCDate();
                    const year = date.getUTCFullYear();
                    return (
                      <th key={period.number} className="px-6 py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">
                        {monthShort} {day}, {year}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 0)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {period.name}
                    </td>
                  ))}
              </tr>
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 0)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {period.temperature}&deg;{period.temperatureUnit}
                    </td>
                  ))}
              </tr>
              <tr>
                {forecast
                  .filter((f) => f.number % 2 === 0)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      <div className="flex justify-center items-center">
                        <Image className="rounded-full" src={period.icon} alt={`${period.name} image`} width="40" height="40" />
                      </div>
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
