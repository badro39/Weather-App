// Styles
import styles from "@/app/page.module.css";

// Next Components
import Image from "next/image";

// Hooks
import { useDeviceDetection } from "@/hooks/deviceDetection";

// functions
const convertUnixToTimeIntl = (unixTimestamp) => {
  if (!unixTimestamp) return;
  // Convert Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Force 24-hour format
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Ensures 24-hour format
  });
};

const DayOrNight = (date, sunrise, sunset) => {
  if (!date || !sunrise || !sunset) return;
  return date > convertUnixToTimeIntl(sunrise) &&
    date < convertUnixToTimeIntl(sunset)
    ? "Day"
    : "Night";
};

const HourlyForecast = ({ forecast, theme }) => {
  // variables
  const todayForecast = forecast.list
    .slice(0, 5)
    .map(({ dt_txt, main, weather, wind }) => ({
      time: dt_txt?.split(" ")[1],
      temp: main?.temp,
      icon: `http://openweathermap.org/img/wn/${weather[0]?.icon}.png`,
      wind: wind,
    }));

  const { isMobileOnly, isDesktop } = useDeviceDetection();

  // Functions
  const isDay = (date) =>
    DayOrNight(date, forecast.city.sunrise, forecast.city.sunset);

  return (
    <div
      className={`col-lg-8 col-sm-12 col-12 rounded-4 d-flex flex-column text-center justify-content-around  ${
        !isDesktop ? "mb-4" : ""
      } ${styles.widgets}`}
      style={{ "--widgets-color": `${theme ? "#d9d9d9" : "#444444"}` }}
    >
      <h4 className="fw-bold my-md-3">Hourly Forecast:</h4>
      <ul className="p-0 col-lg-11 col-12 d-flex mx-auto justify-content-around">
        {todayForecast.map(({ time, icon, temp, wind }, index) => {
          return (
            <li
              key={index}
              className={`col-2 rounded-5 pt-2 ${
                isDay(time) == "Day" ? styles.day : styles.night
              }`}
            >
              <p className="fw-bold">{time.slice(0, 5)}</p>
              <Image
                src={icon}
                alt="weather icon"
                width={50}
                height={50}
                priority={true}
              />
              <p className="fw-medium">{temp.toFixed(0)}°C</p>
              <Image
                src="/communication.png"
                alt="wind icon"
                width={20}
                height={20}
                style={{ transform: `rotate(${wind?.deg - 90}deg)` }}
              />
              <p className={`fw-medium ${isMobileOnly ? "small" : ""}`}>
                {(wind?.speed * 3.6).toFixed(0)}Km/h
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export { convertUnixToTimeIntl, DayOrNight, HourlyForecast };
