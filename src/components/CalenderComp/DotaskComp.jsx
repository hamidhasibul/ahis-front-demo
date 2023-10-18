import "./DotaskCompCSS.css";
import CalendarSection from "./CalenderSection/CalendarSection";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import RightPanel from "./RightPanel/RightPanel";
import { useState } from "react";
import mPairLogo from "./images/mPairLogo.svg";
import CalendarProvider from "./Context/CalendarManagement/CalendarProvider";
import UserInfoProvider from "./Context/CalendarManagement/UserInfoProvider";
import ShowNote from "./CalenderSection/ShowNote/ShowNote";

function DotaskComp() {
  const [leftPanel, setLeftPanel] = useState("calendarView");

  return (
    <div className="App container-fluid todo ">
      <UserInfoProvider>
        <CalendarProvider>
          <div className="row">
            <div className="col-lg-2">
              <RightPanel leftPanel={leftPanel} setLeftPanel={setLeftPanel} />
            </div>
            <div className="col-lg-10">
              {leftPanel === "calendarView" ? (
                <CalendarSection />
              ) : (
                <ShowNote />
              )}
            </div>
          </div>

          {/* <div className="row">
            <div className="col-lg-2">
              <RightPanel />
            </div>
            <div className="col-lg-10">
              <CalendarSection />
            </div>
          </div> */}
        </CalendarProvider>
      </UserInfoProvider>
    </div>
  );
}

export default DotaskComp;
