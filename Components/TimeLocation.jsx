// Styles
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";

const timeFormat = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: false, // Set to `true` for AM/PM format
});

const date = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const TimeLocation = ({ name, theme }) => {
  const [time, setTime] = useState(timeFormat);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`rounded-4 col-lg-4 col-md-5 col-sm-12 col-12 d-flex flex-column justify-content-center text-center ${styles.widgets}`}
      style={{ "--widgets-color": `${theme ? "#d9d9d9" : "#444444"}` }}
    >
      <div className="py-3">
        <div>
          <h4>{name}</h4>
        </div>
        <div>
          <span className="fw-bold" style={{ fontSize: "4rem" }}>
            {time}
          </span>
          <p style={{ fontSize: ".9rem" }}>{date}</p>
        </div>
      </div>
    </div>
  );
};
export default TimeLocation;
