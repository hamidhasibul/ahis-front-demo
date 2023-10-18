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
import CreateEvent from "./CreateEvent/CreateEvent";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Mention } from "primereact/mention";
import UserListAPI from "../Hooks/UserListAPI";
import { useEffect } from "react";

function CalendarSection() {
  const { view, date, selectedHost, selectedTaskType, setDate, setView } = useContext(CalendarConntext);
  const toastTL = useRef(null);
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

  const handleSelectSlot = (slotInfo) => {
    if (slotInfo.action === "click") {
      // console.log(slotInfo)
    }
  };

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
  const handleNavigate = (date, view) => {
    setDate(date);
    console.log(date);
    setView("day");
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

  const [totalContributions, setTotalContributions] = useState(0);
  const [editTaskView, seteditTaskView] = useState(false);
  const [editedEventdetails, setEditedEventdetails] = useState([]);
  const [editguests, setEditGuests] = useState([]);
  useEffect(() => {
    setTotalContributions(
      editguests.reduce((sum, guest) => sum + guest.contribution, 0)
    );
  }, [editguests]);
  const itemTemplate = (suggestion) => {
    return (
      <div
        className="flex align-items-center todo"
        onClick={() => {
          if (editguests.username !== suggestion.username) {
            setEditGuests({
              ...editguests,
              username: suggestion.username,
            });
          }
        }}
      >
        <span className="flex flex-column ml-2">{suggestion.username}</span>
      </div>
    );
  };
  const [newGuest, setNewGuest] = useState({
    username: "",
    contribution: "",
    status: "Pending",
  });
  const handleAddEditGuest = () => {

  };


  const handleTaskEdit = (eventdetails) => {

    setEditedEventdetails(eventdetails)
    console.log(editedEventdetails)
    setEditGuests(selectedGuestList)
    setSelectedTaskID(eventdetails.task_ID)
    editTaskView ? seteditTaskView(false) : seteditTaskView(true)

    handleCloseModal();
  }

  const handleEditEvent = () => {
    console.log("edit click", editedEventdetails)

  }


  return (
    <div className="todo">
      <Toast ref={toastTL} position="top-right" />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onNavigate={handleNavigate}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        popup
        style={{ height: "88vh" }}
        components={{
          toolbar: CustomToolbar,
        }}
        eventPropGetter={eventStyleGetter}
        view={view}
        date={date}
        className=""
      />

      <Dialog
        header={
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">{selectedEvent?.title}</h5>
              {userLoggedIn === selectedEvent?.host_UserName && (
                <i
                  className="pi pi-pencil cursorPointer"
                  onClick={() =>
                    handleTaskEdit(selectedEvent)
                  }
                />
              )}
            </div>
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

      <Dialog header="Edit Task" maximizable visible={editTaskView} style={{ width: '50vw' }} onHide={() => seteditTaskView(false)}
        headerClassName="pt-2 pb-2"
        contentClassName="p-0"
        footer={
          <div className="mt-3 d-flex justify-content-between">
            <p class="mb-0 fs-12 me-3 text-start ">
              <span class="text-primary ">*Note: </span> Please carefully read
              and check the following information <br />
              before editing task.
            </p>

            <Button
              className="createbtn me-0"
              label="Edit"
              icon="pi pi-check fs-14"
              onClick={handleEditEvent}
              autoFocus
            />
          </div>
        }
      >


        <div className="container px-4">
          <div className="d my-4">
            <InputText
              type="text"
              name="title"
              value={editedEventdetails.title}
              onChange={(e) => setEditedEventdetails({ ...editedEventdetails, title: e.target.value })}
              className="inputfield task_field w-100 fs-14"
              placeholder="Task Name"
            />
            {/* {errors.title && (
              <small className="text-danger">*{errors.title}</small>
            )} */}
          </div>

          <div className="d-flex align-items-center my-2">
            <Checkbox
              className="me-2 check_box"
              type="checkbox"
              name="allDay"
              checked={Boolean(editedEventdetails.allDay)}
              onChange={(e) => {
                const { checked } = e.target;
                setEditedEventdetails((prevState) => ({
                  ...prevState,
                  allDay: checked,
                  end: editedEventdetails.start,
                }));
              }}
              style={{ borderRadius: 0 }}
            />
            <label className="fw-bold fs-14">Full Day Task</label>
          </div>

          <div className="d-flex align-items-center my-2">
            <label className="w-25 fs-13">
              <i className="pi pi-clock fs-12 me-2 text-muted"></i>
              Task Date
            </label>

            <input

              value={(editedEventdetails != '') && new Date(new Date(editedEventdetails?.start).getTime() + (6 * 60 * 60 * 1000)).toISOString().slice(0, 16)}
              onChange={(e) => {
                const newDate = e.target.value;
                setEditedEventdetails({ ...editedEventdetails, start: newDate, end: newDate });
              }}
              type="datetime-local"
              className="form-control input1"
            />
            {/* {errors.start && (
              <small className="text-danger">*{errors.start}</small>
            )} */}

            {!editedEventdetails.allDay && (
              <>
                <p className="m-0 mx-2">
                  <i className="pi pi-chevron-right fs-12"></i>
                </p>
                <input
                  value={(editedEventdetails != '') && new Date(new Date(editedEventdetails?.end).getTime() + (6 * 60 * 60 * 1000)).toISOString().slice(0, 16)}
                  onChange={(e) => setEditedEventdetails({ ...editedEventdetails, end: e.target.value })}
                  type="datetime-local"
                  className="form-control input1"
                />
              </>
            )}
          </div>

          <div className="d-flex align-items-center my-2">
            <label className="w-25 fs-13">
              {" "}
              <i className="pi pi-flag fs-12 me-2 text-muted"></i>Task Priority
            </label>
            <Dropdown
              value={editedEventdetails.priority}
              options={[
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
              ]}
              onChange={(e) => setEditedEventdetails({ ...editedEventdetails, priority: e.target.value })}
              name="priority"
              placeholder="Select"
              className="w-30 p-1 dropSelect"
            />
            {/* {errors.priority && (
              <small className="text-danger">*{errors.priority}</small>
            )} */}
          </div>

          <div className="d-flex align-items-center my-2">
            <label className="w-25 fs-13">
              {" "}
              <i className="pi pi-bars fs-12 me-2 text-muted"></i>Task Type
            </label>
            <Dropdown
              value={editedEventdetails.task_Type}
              options={[
                { label: "Self Task", value: "Self" },
                { label: "Team Task", value: "Team" },
              ]}
              onChange={(e) => setEditedEventdetails({ ...editedEventdetails, task_Type: e.target.value })}
              name="task_Type"
              placeholder="Select"
              className="w-30 p-1 dropSelect"
            />
            {/* {errors.task_Type && (
              <small className="text-danger">*{errors.task_Type}</small>
            )} */}
          </div>

          {editedEventdetails.task_Type === "Team" && (
            <div>
              <div>
                <p className="mb-1 fs-12">
                  <span className="fs-13 text-primary">*</span> Mention your
                  team member and add his/her contribution % to make this task
                  more alive.
                </p>
              </div>
              <div className="d-flex align-items-center">
                <label className="fs-13 w-25">
                  <i className="pi pi-user fs-12 me-2 text-muted"></i>Add Member
                </label>

                <Mention
                  suggestions={userSuggestions}
                  onSearch={onUserSearch}
                  field="username"
                  placeholder="@to add"
                  itemTemplate={itemTemplate}
                  type="text"
                  rows={1}
                  className="inputfield2 me-2"
                />

                <InputNumber
                  className="inputfield2 me-2"
                  placeholder="0%"
                  value={editedEventdetails.contribution}
                  onValueChange={(e) =>
                    setEditedEventdetails({
                      ...editedEventdetails,
                      contribution: e.target.value,
                    })
                  }
                  min={0}
                  max={100 - totalContributions}
                />

                <p
                  onClick={handleAddEditGuest}
                  className="m-0 ms-2 fs-6"
                  style={{ cursor: "pointer", color: "#2ca589" }}
                >
                  {" "}
                  <i class="pi pi-user-plus"></i>
                </p>
              </div>

              {totalContributions ? (
                <ProgressBar
                  className="my-2"
                  style={{
                    height: "15px",
                    borderRadius: "50px",
                    fontSize: "12px",
                  }}
                  value={totalContributions}
                />
              ) : (
                <></>
              )}

              <div className="mb-3">
                {editguests?.map((guest) => (
                  <Card
                    className="my-2 rounded-0 usercard2"
                    key={guest.username}
                  >
                    <div className="d-flex align-items-center justify-content-between px-2">
                      <div className="name">
                        <i className="ms-2 pi pi-user usericon fs-13"></i>
                        <span className="ms-2 fs-13 fw-bold">
                          {guest.username}
                        </span>

                        <span className="mx-3 contribute">
                          {guest.contribution}%
                        </span>
                      </div>

                      <i
                        class="px-2 text-muted fs-14 fa-solid fa-trash-can"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveEditGuest(guest)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <hr />
          <div className="d-flex my-2">
            <label className="w-25 fs-13">Description</label>
            <div className="w-100">
              <InputTextarea
                name="description"
                value={editedEventdetails.description}
                onChange={(e) => setEditedEventdetails({ ...editedEventdetails, description: e.target.value })}
                className=" border-0 rounded-0 inputArea p-2 w-100"
                rows={2}
                placeholder="Type here. . ."
              />
            </div>
          </div>

          <div className="d-flex my-2 mb-3 align-items-center">
            <label className="w-25 fs-13">Atatchment</label>
            <input
              type="file"
              name="attached_File"
              onChange={(e) => setEditedEventdetails({ ...editedEventdetails, description: e.target.files[0] })}
            />
          </div>
        </div>






      </Dialog>


    </div >
  );
}

export default CalendarSection;
