"use client";

// React hooks
import { useEffect, useState } from "react";

// Hooks
import { useDeviceDetection } from "@/hooks/deviceDetection";

const Header = ({
  location,
  setLocation,
  setWeather,
  setForecast,
  setError,
  theme,
  setTheme,
}) => {
  // variables
  const [search, setSearch] = useState(location);
  const {isMobileOnly, isDesktop} = useDeviceDetection()

  // functions
  const handleClick = (e) => {
    if (e.key === "Enter") setLocation(search);
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setWeather(null);
      setForecast(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => setError(error.message)
      );
    } else {
      setError(true);
      const timeout = setTimeout(() => setError(false), 5000);
      return () => clearTimeout(timeout);
    }
  };

  useEffect(() => {
    setSearch(location); // Update when `location` prop changes
  }, [location]);

  return (
    <header className={`col-11 mx-auto d-flex justify-content-between align-items-center ${!isDesktop ? "mt-3" : ""}`}>
      <div className={`${isMobileOnly ? "col-2" : ""}`}>
        <div
          onClick={() => setTheme(!theme)}
          className={`border rounded-5 d-flex justify-content-${
            theme ? "start" : "end"
          }`}
          style={{
            cursor: "pointer",
            backgroundColor: `${theme ? "#d9d9d9" : "#444444"}`,
            transition: "all 0.3s ease",
          }}
        >
          <i
            className={`bi bi-${!theme ? "sun-fill" : "moon-stars-fill"} mx-1`}
          ></i>
        </div>
        <span style={{ fontSize: ".8rem", transition: "all 0.3s ease" }} className="fw-bold d-lg-flex d-md-flex d-none">
          {theme ? "Light" : "Dark"} mode
        </span>
      </div>
      <div className="position-relative col-lg-7 col-sm-6 col-6 border rounded-5 d-flex align-items-center">
        <i
          className="bi bi-search position-absolute mx-3"
          style={{ color: `${theme ? "#6e6e6e" : "#fff"}`, cursor: "pointer" }}
          onClick={() => setLocation(search)}
        ></i>
        <input
          type="text"
          className={`form-control rounded-5 px-5 ${
            theme ? "text-dark" : "text-light"
          }`}
          style={{
            border: "1px solid rgb(140, 140, 140)",
            backgroundColor: `${theme ? "#d9d9d9" : "#444444"}`,
          }}
          placeholder="Search for your preffered city..."
          onKeyDown={(e) => handleClick(e)}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div>
        <button
          className="btn btn-success rounded-5 d-flex"
          onClick={getCurrentLocation}
        >
          <i className="bi bi-geo-alt"></i>
          <span className="px-2 d-lg-block d-md-block d-none">Current Location</span>
        </button>
      </div>
    </header>
  );
};
export default Header;
