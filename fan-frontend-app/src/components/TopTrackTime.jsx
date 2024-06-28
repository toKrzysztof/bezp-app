import { useState } from "react";

export function TopTrackTime({name}) {
  const [timeOnTop, setTimeOnTop] = useState("");
  const now = new Date();

  const startDate = new Date('2021-01-01T00:00:00Z');

  const startTime = startDate.getTime();

  setInterval(() => {
  let elapsedTime = now - startDate;

  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30.4375; 
  const msPerYear = msPerDay * 365.25;

  const years = Math.floor(elapsedTime / msPerYear);
  elapsedTime -= years * msPerYear;

  const months = Math.floor(elapsedTime / msPerMonth);
  elapsedTime -= months * msPerMonth;

  const days = Math.floor(elapsedTime / msPerDay);
  elapsedTime -= days * msPerDay;

  const hours = Math.floor(elapsedTime / msPerHour);
  elapsedTime -= hours * msPerHour;

  const minutes = Math.floor(elapsedTime / msPerMinute);
  elapsedTime -= minutes * msPerMinute;

  const seconds = Math.floor(elapsedTime / msPerSecond);
    setTimeOnTop(`${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
  }, 1000);

  return <div>
    <h2>"{name}" time on top: {timeOnTop}</h2>
  </div>
}