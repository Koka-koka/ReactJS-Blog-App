import { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Tbilisi");

  /**
   * Fetches weather data for the specified location.
   *
   * Constructs a URL using the current location state and sends a GET request to the OpenWeatherMap API.
   * If the API response indicates a successful data retrieval, updates the state with the fetched data
   * and clears the location input. If the location is not found, updates the state to reflect that.
   * Logs an error message for any other errors that occur during the API call.
   *
   * @return {Promise<void>} A Promise that resolves when the weather data has been fetched and states are updated.
   */

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=0857bdfbf9822bcb5f4d0f481d5e160a`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("An error occurred", error);
      }
    }
  };

  useEffect(() => {
    search();
  }, []);

  /**
   * Handles the input change event for the location input.
   *
   * Updates the state with the current value of the location input.
   *
   * @param {Event} e - The input change event.
   */
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  /**
   * Handles the key press event for the location input.
   *
   * Calls the search function when the Enter key is pressed.
   *
   * @param {Event} e - The key press event.
   */
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className=" bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Haze":
        return <i className="bx bxs-cloud-haze"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      default:
        return <i className="bx bxs-sun"></i>;
    }
  };

  return (
    <div className="weather">
      <div className="weather__search">
        <div className="weather__search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">
            {data.notFound ? "Unknown" : data.name}
          </div>
        </div>
        <div className="weather__search-location">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {/* Displays the weather data or a message if the location is not found */}
      {data.notFound ? (
        <div className="weather__notFound"> 😒 Location not found </div>
      ) : (
        <div className="weather__data">
          {data.weather ? getWeatherIcon(data.weather[0].main) : null}
          <div className="weather__type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="weather__temp">
            {data.main ? `${Math.floor(data.main.temp)} °` : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
