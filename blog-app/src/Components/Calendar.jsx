import { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const DaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  /**
   * Updates the state to navigate to the previous month.
   * If the current month is January, it sets the month to December of the previous year.
   * Otherwise, it decrements the current month.
   */

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  /**
   * Updates the state to navigate to the next month.
   * If the current month is December, it sets the month to January of the next year.
   * Otherwise, it increments the current month.
   */
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calendar">
      <div className="navigate-date">
        <h2 className="month">{monthOfYear[currentMonth]},</h2>
        <h2 className="years">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={prevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {/* Render empty spans for days before the first day of the month */}
        {Array.from({ length: firstDayOfMonth }, (_, index) => (
          <span key={index}></span>
        ))}
        {/* Render the days of the month */}
        {Array.from({ length: DaysInMonth }, (_, index) => (
          <span
            key={index + 1}
            className={
              index === currentDate.getDate() - 1 &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
                ? "current-day"
                : null
            }
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
