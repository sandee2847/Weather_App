import React, { useState } from "react";

function WeatherApp() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const api_key = "efd7366fa25a3f054614dd64ab7b4e86";

    async function getWeather() {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`
        );
        const data = await response.json();
        setWeather(data);
    }

    function handleSearch(event) {
        event.preventDefault();
        getWeather();
        setQuery("");
    }

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter a city name"
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
            {weather.main && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Feels like: {weather.main.feels_like}°C</p>
                    <p>Description: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
