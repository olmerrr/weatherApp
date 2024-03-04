import './App.css';
import { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Input from "./components/Input";

const App = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ location, setLocation ] = useState(localStorage.getItem("savedLocation") || "");
  const [ , setDisplayLocation ] = useState("")
  const [ weather, setWeather ] = useState({})

  const handleLocation = (e) => setLocation(e.target.value);

  const fetchWeather = async (e) => {
    e.preventDefault();

    function convertToFlag(countryCode) {
      const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    }

    if ( !location ) return alert("Please input your location for search");

    try {
      setIsLoading(true);
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      setIsLoading(true);

      const geoData = await geoRes.json();

      if ( !geoData.results ) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      setDisplayLocation(`${name} ${convertToFlag(country_code)}`)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
    } catch ( err ) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    localStorage.setItem("savedLocation", location);
    let savedLocation = localStorage.getItem("savedLocation" || "");
    if ( savedLocation !== location ) savedLocation = location;
  }, [ location ]);


  return <>
    <h1>Weather app</h1>
    <form onSubmit={fetchWeather} className="search-form">
      <Input location={location} handleLocation={handleLocation}/>
      <button className="btn btn-big" type="submit">Search</button>
      {isLoading && <span className="loader"></span>}
    </form>

    {weather?.weathercode && <Weather weather={weather} location={location}/>}
  </>
}

export default App;
