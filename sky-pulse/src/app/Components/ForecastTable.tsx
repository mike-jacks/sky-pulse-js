import { ForecastTableProps } from "./types";
import Image from "next/image";

export default function ForecastTable({forecast, zeroOrOneValue, isDay}: ForecastTableProps) {
    const dayOrNightArray = forecast ? forecast.filter((f) => f.isDaytime === isDay) : null;
    const dayOrNightObj: {isDaytime: boolean} = dayOrNightArray ? dayOrNightArray[0] : null;
    const dayOrNight = dayOrNightObj ? dayOrNightObj.isDaytime : null;

    return (
        <div className="rounded-lg shadow-xl border-yellow-600 p-5 bg-gray-800 border-2 flex flex-col mb-4 overflow-x-auto">
                <h2 className="text-lg font-bold text-gray-200 mb-2"> {dayOrNight ? "Daily Forecast" : "Nightly Forecast"} </h2>
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-700">
              <tr>
                {forecast
                  .filter((f) => f.isDaytime === isDay)
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
                  .filter((f) => f.isDaytime === isDay)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {period.name}
                    </td>
                  ))}
              </tr>
              <tr>
                {forecast
                  .filter((f) => f.isDaytime === isDay)
                  .map((period) => (
                    <td key={period.number} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {period.temperature}&deg;{period.temperatureUnit}
                    </td>
                  ))}
              </tr>
              <tr>
                {forecast
                  .filter((f) => f.isDaytime === isDay)
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
    )
}