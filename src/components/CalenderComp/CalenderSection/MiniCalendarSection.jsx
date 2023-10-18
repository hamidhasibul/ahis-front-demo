import React, { useContext, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ProgressBar } from "react-bootstrap";
import CustomToolbar from "./CalendarToolBar/CustomToolbar";
import TaskListAPI from "../Hooks/TaskListAPI";
import GuestListAPI from "../Hooks/GuestListAPI";
import { Dialog } from "primereact/dialog";
import swal from "sweetalert";
import axios from "axios";
import { Card } from "primereact/card";
import CommentSection from "./CommentSection/CommentSection";
import { CalendarConntext } from "../Context/CalendarManagement/CalendarProvider";
import SingleTaskByUserAPI from "../Hooks/SingleTaskByUserAPI";
import { UserConntext } from "../Context/CalendarManagement/UserInfoProvider";

function MiniCalendarSection() {
    const { date, selectedHost, selectedTaskType } = useContext(CalendarConntext);
    const { userInfo } = useContext(UserConntext);
    const localizer = momentLocalizer(moment);
    const userLoggedIn = userInfo[0]?.username;
    const [taskList] = TaskListAPI(userLoggedIn, selectedTaskType, selectedHost);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedTaskID, setSelectedTaskID] = useState("");
    const [selectedGuestList] = GuestListAPI(selectedTaskID);
    const [singleTaskByUser] = SingleTaskByUserAPI(selectedTaskID, userLoggedIn);

    // Convert timestamps to Date objects
    const events = taskList.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    }));

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        // console.log(event.task_ID)
        setSelectedTaskID(event.task_ID);
    };

    const handleMarkAsDone = (task_ID) => {
        swal("Are you sure?", {
            buttons: ["No", "Yes"],
        }).then((value) => {
            if (value) {
                axios
                    .post(
                        `${import.meta.env.VITE_SERVER}/tasks/${task_ID}/${userLoggedIn}`
                    )
                    .then((response) => {
                        swal("done");
                    })
                    .catch((error) => {
                        // Handle the error or display an error message
                        console.error("Failed to mark task as done:", error);
                    });
            }
        });
    };

    const handleApproveStatus = (task_ID) => {
        swal("Are you sure? You want to do this task?", {
            buttons: ["No", "Yes"],
        }).then((value) => {
            if (value) {
                fetch(
                    `${import.meta.env.VITE_SERVER
                    }/taskstatus/${task_ID}/${userLoggedIn}`,
                    {
                        method: "POST",
                    }
                )
                    .then((response) => {
                        // Handle the response or perform any necessary actions
                        // console.log(response.data);
                        // swal("Done")
                    })
                    .catch((error) => {
                        // Handle the error or display an error message
                        console.error("Failed to mark task as done:", error);
                    });
            }
        });
    };
    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    const eventStyleGetter = (event) => {
        let backgroundColor = "";

        switch (event.task_Type) {
            case "Self":
                backgroundColor = "#13856a";
                break;
            case "Team":
                backgroundColor = "#8c60a5";
                break;
            default:
                backgroundColor = "#1b6ac4";
                break;
        }

        if (event.progress == 100) backgroundColor = "#267c3b";
        return {
            style: {
                backgroundColor,
            },
        };
    };

    return (
        <div className="todo">

            <h5 className="text-end my-3">
                {new Date().toLocaleString('en-US', {
                    weekday: "long",
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                }).split(',')}
            </h5>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                popup
                style={{ height: "55vh" }}
                components={{
                    toolbar: () => null,
                }}
                eventPropGetter={eventStyleGetter}
                view="month"
                date={date}
                className=""
            />


            <Dialog
                header={
                    <div>
                        <h5 className="fw-bold">{selectedEvent?.title}</h5>
                        <div>
                            <p className="fs-13 mb-1">
                                Hosted by{" "}
                                <b>
                                    {selectedEvent?.host_UserName === userLoggedIn
                                        ? "You"
                                        : selectedEvent?.host_UserName}
                                </b>
                            </p>
                        </div>
                        <div className="py-0 fs-13 mb-0">
                            <span className="text-primary">
                                {selectedEvent?.start.toLocaleString()}
                            </span>
                            <span>
                                {" "}
                                <i className="pi pi-chevron-right mx-2 fs-12"></i>{" "}
                            </span>
                            <span className="text-muted">
                                {" "}
                                {selectedEvent?.end.toLocaleString()}
                            </span>
                        </div>
                    </div>
                }
                visible={selectedEvent !== null}
                maximizable
                style={{ width: "40vw" }}
                onHide={handleCloseModal}
                footer={
                    <div className="d-flex justify-content-between mt-3 align-items-center">
                        <ProgressBar
                            className="w-50"
                            now={selectedEvent?.progress}
                            label={`${selectedEvent?.progress}%`}
                        />
                        <div className="d-flex align-items-center">
                            {selectedEvent?.host_UserName === userLoggedIn ? (
                                <></>
                            ) : singleTaskByUser[0]?.status === "Approved" ? (
                                <div className="me-2">
                                    <p className="m-0 fs-13 text-success">
                                        <i className="pi pi-check-circle fs-12 me-1"></i>Accepted
                                    </p>
                                </div>
                            ) : (
                                <div className="ms-2">
                                    <a
                                        className="fs-13 m-0"
                                        onClick={() => handleApproveStatus(selectedEvent?.task_ID)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Change Status
                                    </a>
                                </div>
                            )}

                            {singleTaskByUser[0]?.isComplete ||
                                (selectedEvent?.host_UserName === userLoggedIn &&
                                    selectedEvent?.task_Status === "Completed") ? (
                                <div className="me-2">
                                    <p className="fs-13 m-0 completebtn py-2 px-3">
                                        <i className="pi pi-check-circle fs-12 me-1"></i>Task
                                        Completed
                                    </p>
                                </div>
                            ) : selectedEvent?.task_Status === "Completed" ? (
                                <div className="mx-2">
                                    <p className="fs-13 m-0 notcompletebtn py-2 px-3">
                                        <i className="pi pi-times fs-12 me-1"></i>Submission over
                                        due
                                    </p>
                                </div>
                            ) : (
                                <div className="ms-2">
                                    <p
                                        className="fs-13 m-0 completebtn py-2 px-3"
                                        onClick={() => {
                                            handleMarkAsDone(selectedEvent?.task_ID);
                                        }}
                                    >
                                        <i className="fa-solid me-1 fa-check-double fa-fade"></i>
                                        Mark as Done
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                }
            >
                {selectedEvent && (
                    <div>
                        <div className="pt-2">
                            <p className="m-0 fs-12">{selectedEvent?.description}</p>
                            <a className="fs-12">
                                <i className="pi pi-link fs-12 me-1"></i>See Attachment
                            </a>
                        </div>

                        {/* gust list  */}
                        {selectedGuestList?.length > 0 ? (
                            <div className="my-3">
                                <p className="m-0 fs-14 fw-bold">Assigned Member</p>
                                {selectedGuestList.map((guest) => (
                                    <Card
                                        className="my-0 rounded-0 usercard fs-14"
                                        key={guest.username}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div className="w-30">
                                                <i className="ms-2 pi pi-user usericon"></i>
                                                <span className="mx-2 fw-bold">{guest.username}</span>
                                            </div>
                                            <div className="d-flex mx-2 align-item-center">
                                                <span className="me-2 fs-11 fw-bold bg-primary rounded-1 px-2 text-white">
                                                    <i className="pi pi-check fs-11 me-1"></i>
                                                    {guest.status}
                                                </span>
                                                <>
                                                    {guest.isComplete ? (
                                                        <span className="text-success mx-2 fs-12 fw-bold">
                                                            {" "}
                                                            Complete
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted mx-2 fs-12 fst-italic">
                                                            Work Pending. . .
                                                        </span>
                                                    )}
                                                </>

                                                <span className="mx-2 fs-12 contribute">
                                                    {guest.contribution} %
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}

                        <CommentSection
                            task_ID={selectedTaskID}
                            host_UserName={selectedEvent.host_UserName}
                        />
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default MiniCalendarSection;
