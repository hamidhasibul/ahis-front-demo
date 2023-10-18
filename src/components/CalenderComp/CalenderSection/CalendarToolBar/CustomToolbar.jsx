import React, { useContext, useState } from "react";
import CreateEvent from "../CreateEvent/CreateEvent";
import { CalendarConntext } from "../../Context/CalendarManagement/CalendarProvider";
import CreateNote from "../CreateNote/CreateNote";
import { Dropdown } from "primereact/dropdown";
import ShowNote from "../ShowNote/ShowNote";
import { Mention } from "primereact/mention";
import UserListAPI from "../../Hooks/UserListAPI";

function CustomToolbar(toolbarProps) {
  const { label, onView, onNavigate } = toolbarProps;
  const {
    setView,
    date,
    setDate,
    view,
    selectedHost,
    selectedTaskType,
    setSelectedTaskType,
    setSelectedHost,
  } = useContext(CalendarConntext);

  const handleViewChange = (event) => {
    const selectedView = event.target.value;
    setView(selectedView);
    onView(selectedView);
  };

  const handlePrevClick = () => {
    onNavigate("PREV");

    const prevDate = new Date(date);
    if (view === "month") {
      prevDate.setMonth(prevDate.getMonth() - 1);
    } else if (view === "week") {
      prevDate.setDate(prevDate.getDate() - 7);
    } else if (view === "day") {
      prevDate.setDate(prevDate.getDate() - 1);
    }
    setDate(prevDate);
  };

  const handleTodayClick = () => {
    const now = new Date();
    onNavigate("TODAY", now);
    setDate(now);
  };

  const handleNextClick = () => {
    onNavigate("NEXT");
    const nextDate = new Date(date);
    if (view === "month") {
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else if (view === "week") {
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (view === "day") {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    setDate(nextDate);
  };

  const handleTaskTypeChange = (e) => {
    setSelectedTaskType(e.target.value);
  };

  const [userDetails] = UserListAPI();
  const [userSuggestions, setuserSuggestions] = useState([]);
  const onUserSearch = (event) => {
    setTimeout(() => {
      const query = event.query;
      let userSuggestions;

      if (!query.trim().length) {
        userSuggestions = [...userDetails];
      } else {
        userSuggestions = userDetails.filter((user) => {
          const emailMatch = user.email
            .toLowerCase()
            .startsWith(query.toLowerCase());
          const fullNameMatch = user.full_Name
            .toLowerCase()
            .startsWith(query.toLowerCase());
          const userNameMatch = user.username
            .toLowerCase()
            .startsWith(query.toLowerCase());
          return emailMatch || fullNameMatch || userNameMatch;
        });
      }

      setuserSuggestions(userSuggestions);
    }, 250);
  };
  const itemTemplate = (suggestion) => {
    return (
      <div
        className="flex align-items-center w-100"
        onClick={() => {
          if (!selectedHost.includes(suggestion.username))
            setSelectedHost((prevSelectedHost) => [
              ...prevSelectedHost,
              suggestion.username,
            ]);
        }}
      >
        <span className="flex flex-column ml-2">{suggestion.username}</span>
      </div>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-2 todo">
      <div className="date_segment d-flex align-items-center">
        <button onClick={handleTodayClick} className="btn button1">
          Today
        </button>
        <div className=" ms-3">
          <p className="m-0">{label}</p>
        </div>
      </div>

      <div className="row row-cols-2 my-2">
        <div className="col form-group">
          <Dropdown
            value={selectedTaskType}
            options={[
              { label: "All Task", value: "All" },
              { label: "Self Task", value: "Self" },
              { label: "Team Task", value: "Team" },
            ]}
            onChange={handleTaskTypeChange}
            name="task_Type"
            placeholder="Select Task Type"
            className="p-1 ps-2 text-center w-100"
          />
        </div>

        <div className="col">
          <div className=" w-100">
            <Mention
              suggestions={userSuggestions}
              onSearch={onUserSearch}
              field="username"
              placeholder="@ to Search Host"
              itemTemplate={itemTemplate}
              type="text"
              rows={1}
              className="w-100"
            />
          </div>

          <div className=" row justify-content-start align-items-center">
            {selectedHost?.map((host) => (
              <div className="col-6" key={host}>
                <div className="p-1 d-flex justify-content-center align-items-center">
                  <div className="me-2">
                    <span className="">{host}</span>
                  </div>
                  <div>
                    <i
                      class="col-2 text-center text-danger fs-4 fa-solid fa-xmark"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedHost((prevSelectedHost) =>
                          prevSelectedHost.filter(
                            (hostUserName) => hostUserName !== host
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center align-items-center me-3">
          <i
            onClick={handlePrevClick}
            className="pi pi-chevron-left"
            style={{ cursor: "pointer" }}
          ></i>

          <select
            value={view}
            onChange={handleViewChange}
            className="form-select mx-2"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
            <option value="agenda">Agenda</option>
          </select>

          <i
            onClick={handleNextClick}
            className="pi pi-chevron-right"
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <div className=" d-flex">
          <div className="me-2">
            <CreateEvent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomToolbar;
