// Styles
import styles from "@/app/page.module.css";

// Next Components
import Image from "next/image";

// Hooks
import { useDeviceDetection } from "@/hooks/deviceDetection";

const WeeklyForecast = ({ forecast, theme }) => {
  // variables
  const todayForecast = forecast.list.slice(0, 5).map((item) => ({
    time: item.dt_txt.split(" ")[1],
    temp: item.main.temp,
    icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
    wind: item.wind,
  }));

  const {isMobileOnly, isDesktop} = useDeviceDetection()

  // Functions
  const convertUnixToTimeIntl = (unixTimestamp) => {
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

  const DayOrNight = (date) => {
    if (
      date > convertUnixToTimeIntl(forecast.city.sunrise) &&
      date < convertUnixToTimeIntl(forecast.city.sunset)
    )
      return "day";
    else return "night";
  };

  return (
    <div
      className={`col-lg-8 col-sm-12 col-12 rounded-4 d-flex flex-column text-center justify-content-around  ${!isDesktop ? "mb-4" : ""} ${styles.widgets}`}
      style={{ "--widgets-color": `${theme ? "#d9d9d9" : "#444444"}` }}
    >
      <h4 className="fw-bold my-md-3">Hourly Forecast:</h4>
      <ul className="p-0 col-lg-11 col-12 d-flex mx-auto justify-content-around">
        {todayForecast.map((item, index) => {
          return (
            <li
              key={index}
              className={`col-2 rounded-5 pt-2 ${
                DayOrNight(item.time) == "day" ? styles.day : styles.night
              }`}
            >
              <p className="fw-bold">{item.time.slice(0, 5)}</p>
              <Image
                src={item.icon}
                alt="weather icon"
                width={50}
                height={50}
                priority={true}
              />
              <p className="fw-medium">{item.temp.toFixed(0)}°C</p>
              <Image
                src="/communication.png"
                alt="wind icon"
                width={20}
                height={20}
                style={{ transform: `rotate(${item.wind.deg - 90}deg)` }}
              />
              <p className={`fw-medium ${isMobileOnly ? "small" : ""}`}>
                {(item.wind.speed * 3.6).toFixed(0)}Km/h
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default WeeklyForecast;
