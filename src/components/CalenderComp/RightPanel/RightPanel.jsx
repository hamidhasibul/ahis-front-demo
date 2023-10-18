import React, { useEffect, useState, useContext } from "react";
import mPairLogo from "../images/mPairLogo.svg";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import { Mention } from "primereact/mention";
import UserListAPI from "../Hooks/UserListAPI";
import { CalendarConntext } from "../Context/CalendarManagement/CalendarProvider";
import ShowNote from "../CalenderSection/ShowNote/ShowNote";
import { Button } from "primereact/button";

const RightPanel = ({ leftPanel, setLeftPanel }) => {
  const { setView, date, setDate } = useContext(CalendarConntext);

  const localizer = momentLocalizer(moment);
  const handleNavigate = (date, view) => {
    setDate(date);
    console.log(date);
    setView("day");
  };

  return (
    <div className="container-fluid todo">
      {/* <div className="d-flex align-items-center">
        <img
          className="me-2"
          width="50"
          height="50"
          src={mPairLogo}
          alt="mPair Logo "
        />
        <span className="fs-5"> Do Task</span>
      </div> */}

      <div
        className={`w-100 tab-view ${
          leftPanel === "calendarView" && "tab-view-active"
        } `}
        onClick={() => setLeftPanel("calendarView")}
      >
        Calender
      </div>
      <div
        className={`w-100 tab-view  ${
          leftPanel === "noteView" && "tab-view-active"
        }`}
        onClick={() => setLeftPanel("noteView")}
      >
        Notes
      </div>

      <div className="my-3">
        <Calendar
          localizer={localizer}
          view={"month"}
          date={date}
          onNavigate={handleNavigate}
          components={{
            toolbar: () => null,
          }}
          style={{ height: "25vh" }}
          className="miniCalender"
        />
      </div>
    </div>
  );
};

export default RightPanel;
