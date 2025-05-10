import {
  convertUnixToTimeIntl,
  DayOrNight,
} from "../Components/HourlyForecast.jsx";

describe("/Components/HourlyForecast.jsx", () => {
  
  const sunrise = new Date("2025-05-10T05:00:00Z").getTime() / 1000; // 05:00:00
  const sunset = new Date("2025-05-10T20:00:00Z").getTime() / 1000; // 20:00:00

  test("should convert Unix timestamp to 24-hour format", () => {
    const unixTimestamp = 1746882000; // Example Unix timestamp
    const expectedTime = "14:00:00"; // Expected time in 24-hour format

    const result = convertUnixToTimeIntl(unixTimestamp);

    expect(result).toBe(expectedTime);
  });

  test("should return Day", () => {
    const date = "14:00:00"; // Example date in 24-hour format
    const expectedResult = "Day"; // Expected result
    const result = DayOrNight(date, sunrise, sunset);
    expect(result).toBe(expectedResult);
  });

  test("should return Night", () => {
    const date = "21:00:00"; // Example date in 24-hour format

    const expectedResult = "Night"; // Expected result
    const result = DayOrNight(date, sunrise, sunset);
    expect(result).toBe(expectedResult);
  });
});
