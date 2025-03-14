"use client";

// react hooks
import { useEffect, useState } from "react";

// Components
import Header from "@/Components/Header";
import HourlyForecast from "@/Components/HourlyForecast";
import TimeLocation from "@/Components/TimeLocation";
import WeatherWidgets from "@/Components/WeatherWidgets";
import WeeklyForecast from "@/Components/WeeklyForecast";

// Hooks
import { useDeviceDetection } from "@/hooks/deviceDetection";

export default function Home() {
  const [location, setLocation] = useState("El Oued");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState(true);
  const { isTablet } = useDeviceDetection();

  // Get instant weather data
  const handleGet = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${
          typeof location == "string"
            ? `q=${location}`
            : `lat=${location.lat}&lon=${location.lon}`
        }&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Get 5 Days / 3h Forecast
  const DailyForecast = async () => {
    try {
      if (!location) return;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?${
          typeof location == "string"
            ? `q=${location}`
            : `lat=${location.lat}&lon=${location.lon}`
        }&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setForecast(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGet();
    DailyForecast();
  }, [location]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "light" : "dark"
    ); // Set theme
    document.documentElement.style.setProperty(
      "--widgets-color",
      "transparent"
    ); // set widgets bg-color
    localStorage.setItem("theme", theme); // Save to localStorage
  }, [theme]);

  return (
    <div
      className="d-flex flex-column"
      style={{
        background: `linear-gradient(135deg, ${
          theme ? "#fff , #466173" : "#9e9e9e, #383838"
        })`,
        minHeight: "100dvh",
      }}
    >
      {error && (
        <div
          className="position-absolute bottom-0 alert alert-danger d-flex mx-5 py-2"
          role="alert"
        >
          <i className="bi bi-x d-flex my-auto"></i>
          <p className="m-0">Geolocation is not supported by your browser</p>
        </div>
      )}
      <div>
        <Header
          location={weather ? weather.name : ""}
          setLocation={setLocation}
          setWeather={setWeather}
          setForecast={setForecast}
          setError={setError}
          theme={theme}
          setTheme={setTheme}
        />
        <main
          className="col-11 m-auto mt-lg-5 mt-md-5 mt-4 d-flex flex-wrap justify-content-between"
          style={{ gap: "30px" }}
        >
          {!weather || !forecast ? (
            <h1 className="m-auto">Loading...</h1>
          ) : (
            <>
              {!isTablet ? (
                <>
                  <TimeLocation name={weather.name} theme={theme} />
                  <WeatherWidgets data={weather} theme={theme} />
                </>
              ) : (
                <>
                  <WeatherWidgets data={weather} theme={theme} />
                  <TimeLocation name={weather.name} theme={theme} />
                </>
              )}
              <WeeklyForecast forecast={forecast} theme={theme} />
              <HourlyForecast forecast={forecast} theme={theme} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
