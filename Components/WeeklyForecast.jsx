// styles
import Image from "next/image";
import styles from "../app/page.module.css";

// React hooks
import { useEffect, useState } from "react";

// Average Daily temp
const extractWeatherData = (data) => {
  if(!data?.list) return;
  const dailyTemps = {};

  data.list.forEach(({dt_txt, main, weather}) => {
    const date = dt_txt?.split(" ")[0]; // Extract YYYY-MM-DD
    const temp = main?.temp;
    const icon = `http://openweathermap.org/img/wn/${weather[0]?.icon}.png`;

    if (!dailyTemps[date]) {
      dailyTemps[date] = { sum: 0, count: 0, icon };
    }

    dailyTemps[date].sum += temp;
    dailyTemps[date].count += 1;
  });

  return dailyTemps;
};

const calculateDailyAverages = (dailyTemps) => {
  return Object.keys(dailyTemps).map((date) => ({
    icon: dailyTemps[date].icon,
    date: new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
    }),
    avgTemp: (dailyTemps[date].sum / dailyTemps[date].count).toFixed(0),
  }));
};

const WeeklyForecast = ({ forecast, theme }) => {
  // variables
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  useEffect(() => {
    if (!forecast?.list) return;

    const dailyTemps = extractWeatherData(forecast);
    const weeklyTemps = calculateDailyAverages(dailyTemps);
    setWeeklyWeather(
      weeklyTemps.length > 5 ? weeklyTemps.slice(1) : weeklyTemps
    ); // Exclude today
  }, [forecast]);

  return (
    <div
      className={`col-lg-3 col-md-6 col-sm-12 col-12 rounded-4 d-flex flex-column justify-content-between py-2 ${styles.widgets}`}
      style={{ "--widgets-color": `${theme ? "#d9d9d9" : "#444444"}` }}
    >
      <h4 className="mx-auto fw-bold">5 Days Forecast:</h4>
      <ul className="d-flex flex-wrap m-0 p-0">
        {weeklyWeather.map((item, index) => {
          return (
            <li
              key={index}
              className="w-100 mx-auto py-0 d-flex justify-content-around "
            >
              <p>
                <Image
                  src={item.icon}
                  alt="weather icon"
                  width={30}
                  height={30}
                  priority={true}
                />
              </p>
              <p className="fw-medium">{item.avgTemp}°C</p>
              <p className="col-lg-6 col-sm-6 col-6 fw-medium">{item.date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default WeeklyForecast;
