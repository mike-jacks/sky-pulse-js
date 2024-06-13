export type Coordinates = {
    lat: number;
    lng: number;
  }
  
export type GoogleMapComponentProps = {
    coordinates: Coordinates;
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
    storeWeatherData: (coordinates: Coordinates) => void;
    storeForecastData: (coordinates: Coordinates) => void;
  }

  export type ForecastTableProps = {
    forecast: any[]
    zeroOrOneValue: number
  }