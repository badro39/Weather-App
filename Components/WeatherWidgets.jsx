// styles
import styles from "../app/page.module.css";

// Next Components
import Image from "next/image";

// Hooks
import { useDeviceDetection } from "@/hooks/deviceDetection";

const WeatherWidgets = ({ data, theme }) => {
  // variables
  const { temp, feels_like, humidity, pressure } = data.main;
  const { sunrise, sunset } = data.sys;
  const { main, icon } = data.weather[0];
  const { speed } = data.wind;
  const { visibility } = data;

  const {isMobileOnly} = useDeviceDetection()

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const widgetOptions = [
    { name: "humidity", value: humidity, class: "water", Unit: "%" },
    {
      name: "wind speed",
      value: (speed * 3.6).toFixed(0),
      class: "wind",
      Unit: "Km/h",
    },
    { name: "pressure", value: pressure, class: "speedometer", Unit: "hPa" },
    {
      name: "visibility",
      value: (visibility / 1000).toFixed(0),
      class: "eye",
      Unit: "Km",
    },
  ];

  // functions
  const ImgSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div
      className={`col-lg-7 col-sm-12 col-12 rounded-4 d-flex justify-content-around py-2 ${styles.widgets}`}
      style={{ "--widgets-color": `${theme ? "#d9d9d9" : "#444444"}` }}
    >
      <div className="col-lg-3 col-sm-4 col-4">
        <div>
          <h1
            className={styles.colorGradiant}
            style={{
              "--colorGradiant": `${theme ? "#292929, #fff" : "#fff, #292929"}`,
            }}
          >
            {temp.toFixed(0)}°C
          </h1>
          <p className="p-0">
            Feels like:{" "}
            <span className="fw-medium fs-5">{feels_like.toFixed(0)}°C</span>
          </p>
        </div>
        <div>
          <div className="d-flex align-items-end gap-2">
            <i className="d-flex bi bi-sunrise fs-4"></i>
            <p className="m-0">
              <span className="d-block fw-medium">Sunrise</span>
              <span className={`${theme ? "text-muted" : "text-light"} small`}>
                {sunriseTime} AM
              </span>
            </p>
          </div>
          <div className="d-flex align-items-end gap-2">
            <i className="d-flex bi bi-sunset fs-4"></i>
            <p className="m-0">
              <span className="d-block fw-medium">Sunset</span>
              <span className={`${theme ? "text-muted" : "text-light"} small`}>
                {sunsetTime} PM
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-3 col-3 d-flex flex-column justify-content-between ">
        <div className="h-75 d-flex">
          <Image
            src={ImgSrc}
            alt="weather icon"
            priority={true}
            width={100}
            height={100}
            className="m-auto"
          />
        </div>
        <h4 className="bg-succes text-center fw-bold">{main}</h4>
      </div>
      <div className="col-lg-3 col-sm-4 col-4 d-flex">
        <ul className="d-flex flex-wrap my-auto p-0">
          {widgetOptions.map((item, index) => {
            return (
              <li key={index} className="col-6 text-center my-1">
                <i className={`bi bi-${item.class} fs-2`}></i>
                <p className="m-0 fw-medium">
                  {item.value}
                  {item.Unit}
                </p>{" "}
                <p className="m-0 text-muted" style={{ fontSize: `${isMobileOnly ? ".7rem" : ".8rem"}` }}>
                  {item.name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default WeatherWidgets;
