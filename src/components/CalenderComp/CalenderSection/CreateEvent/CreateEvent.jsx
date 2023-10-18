import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Datetime from "react-datetime";
import swal from "sweetalert";
import { Mention } from "primereact/mention";
import { InputNumber } from "primereact/inputnumber";
import UserListAPI from "../../Hooks/UserListAPI";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { Calendar as DateTimePicker } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { UserConntext } from "../../Context/CalendarManagement/UserInfoProvider";

function CreateEvent() {
  const { userInfo } = useContext(UserConntext);
  const userLoggedIn = userInfo[0]?.username;

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    start: "",
    description: "",
  });
  const [totalContributions, setTotalContributions] = useState(0);
  const [taskFiles, setTaskFiles] = useState();
  const [newGuest, setNewGuest] = useState({
    username: "",
    contribution: "",
    status: "Pending",
  });
  const [guests, setGuests] = useState([]);
  useEffect(() => {
    setTotalContributions(
      guests.reduce((sum, guest) => sum + guest.contribution, 0)
    );
  }, [guests]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: '',
    end: '',
    allDay: 0,
    description: "",
    guest: [],
    host_UserName: userLoggedIn,
    priority: "",
    attached_File: "",
    task_Type: "",
    progress: 0,
    isComment: 0,
  });
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
        className="flex align-items-center todo"
        onClick={() => {
          if (newGuest.username !== suggestion.username) {
            setNewGuest({
              ...newGuest,
              username: suggestion.username,
            });
          }
        }}
      >
        <span className="flex flex-column ml-2">{suggestion.username}</span>
      </div>
    );
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: '',
      end: '',
      allDay: 0,
      description: "",
      guest: [],
      host_UserName: userLoggedIn,
      priority: "",
      attached_File: "",
      task_Type: "",
      progress: 0,
      isComment: 0,
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    if (e.target.type === "file") {
      const file = e.target.files[0];
      setNewEvent((prevState) => ({
        ...prevState,
        attached_File: file,
      }));
    } else {
      setNewEvent((prevState) => ({
        ...prevState,
        [e.target.name]: value,
      }));
    }
  };

  const handleStartChange = (start) => {
    setNewEvent((prevState) => ({
      ...prevState,
      start, end: start
    }));
  };

  const handleEndChange = (end) => {
    // if (newEvent.start >= newEvent.end) {
    //     swal("Error", "Start date cannot be greater than end date", "error");
    //     return;
    // }
    setNewEvent((prevState) => ({
      ...prevState,
      end,
    }));
  };

  const handleAllDayChange = (e) => {
    const { checked } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      allDay: checked,
      end: newEvent.start,
    }));
  };

  const handleAddGuest = () => {
    if (
      newGuest !== "" &&
      !newEvent.guest.some((guest) => guest.username === newGuest.username)
    ) {
      if (newGuest.username && newGuest.contribution > 0) {
        if (totalContributions + newGuest.contribution <= 100) {
          setGuests([...guests, newGuest]);
          newEvent.guest = [...newEvent.guest, newGuest];
          setNewGuest({ username: "", contribution: "", status: "Pending" });
        } else {
          swal("Total contributions exceed 100");
        }
      }
    } else {
      swal("User already added");
    }
  };

  const handleRemoveGuest = (guest) => {
    const updatedGuests = newEvent.guest.filter(
      (g) => g.username !== guest.username
    );
    newEvent.guest = updatedGuests;
    setGuests(updatedGuests);
  };

  const handleCreateEvent = () => {
    newEvent.host_UserName = userLoggedIn;

    let isValid = true;
    const { title, start, priority, task_Type } = newEvent;
    const newErrors = {
      title: "",
      start: "",
      priority: "",
      task_Type: ''
    };
    if (title.trim() === "") {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (priority.trim() === "") {
      newErrors.priority = "Priority is required";
      isValid = false;
    }
    if (task_Type.trim() === "") {
      newErrors.task_Type = "Task Type is required";
      isValid = false;
    }
    if (!start) {
      newErrors.start = "Start date is required";
      isValid = false;
    }
    setErrors(newErrors);
    if (isValid) {
      console.log(newEvent);

      swal("Are you sure you want to add this Event?", {
        buttons: ["No", "Yes"],
      }).then((value) => {
        if (value) {
          fetch(`${import.meta.env.VITE_SERVER}/addtasks`, {
            method: "POST",
            body: JSON.stringify(newEvent),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res) {
              swal({
                title: "Congratulation",
                text: "Event created",
                icon: "success",
                button: "Done",
              });

              setGuests([]);
            } else {
              swal("Sorry!", "Some Error occure", "error");
            }
          });
        }
      });
      handleModalClose();
      setNewEvent({
        title: "",
        start: '',
        end: '',
        allDay: 0,
        description: "",
        guest: [],
        host_UserName: userLoggedIn,
        priority: "",
        attached_File: "",
        task_Type: "",
        progress: 0,
        isComment: 0,
      });
    }
  };

  return (
    <div className="todo">
      <Button
        icon="pi pi-check-square fs-13"
        className="createbtn"
        onClick={handleModalOpen}
        label="Create Task"
      />

      <Dialog
        headerClassName="pt-2 pb-2"
        contentClassName="p-0"
        maximizable
        header="Create Task"
        visible={showModal}
        onHide={handleModalClose}
        footer={
          <div className="mt-3 d-flex justify-content-between">
            <p class="mb-0 fs-12 me-3 text-start ">
              <span class="text-primary ">*Note: </span> Please carefully read
              and check the following information <br />
              before creating task.
            </p>

            <Button
              className="createbtn me-0"
              label="Create"
              icon="pi pi-check fs-14"
              onClick={handleCreateEvent}
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
              value={newEvent.title}
              onChange={handleInputChange}
              className="inputfield task_field w-100 fs-14"
              placeholder="Task Name"
            />
            {errors.title && (
              <small className="text-danger">*{errors.title}</small>
            )}
          </div>

          <div className="d-flex align-items-center my-2">
            <Checkbox
              className="me-2 check_box"
              type="checkbox"
              name="allDay"
              checked={newEvent.allDay}
              onChange={handleAllDayChange}
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
              value={newEvent.start}
              onChange={(e) => handleStartChange(e.target.value)}
              type="datetime-local"
              className="form-control input1"
            />
            {errors.start && (
              <small className="text-danger">*{errors.start}</small>
            )}

            {!newEvent.allDay && (
              <>
                <p className="m-0 mx-2">
                  <i className="pi pi-chevron-right fs-12"></i>
                </p>
                <input
                  value={newEvent.end}
                  onChange={(e) => handleEndChange(e.target.value)}
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
              value={newEvent.priority}
              options={[
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
              ]}
              onChange={handleInputChange}
              name="priority"
              placeholder="Select"
              className="w-30 p-1 dropSelect"
            />
            {errors.priority && (
              <small className="text-danger">*{errors.priority}</small>
            )}
          </div>

          <div className="d-flex align-items-center my-2">
            <label className="w-25 fs-13">
              {" "}
              <i className="pi pi-bars fs-12 me-2 text-muted"></i>Task Type
            </label>
            <Dropdown
              value={newEvent.task_Type}
              options={[
                { label: "Self Task", value: "Self" },
                { label: "Team Task", value: "Team" },
              ]}
              onChange={handleInputChange}
              name="task_Type"
              placeholder="Select"
              className="w-30 p-1 dropSelect"
            />
            {errors.task_Type && (
              <small className="text-danger">*{errors.task_Type}</small>
            )}
          </div>

          {newEvent.task_Type === "Team" && (
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
                  className="inputfield2 me-2 w-100"
                />

                <InputNumber
                  className="inputfield2 me-2"
                  placeholder="0%"
                  value={newGuest.contribution}
                  onValueChange={(e) =>
                    setNewGuest({
                      ...newGuest,
                      contribution: e.target.value,
                    })
                  }
                  min={0}
                  max={100 - totalContributions}
                />

                <p
                  onClick={handleAddGuest}
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
                {guests.map((guest) => (
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
                        onClick={() => handleRemoveGuest(guest)}
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
                value={newEvent.description}
                onChange={handleInputChange}
                className=" border-0 rounded-0 inputArea p-2"
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
              onChange={(e) => {
                setTaskFiles(e.target.files[0]);
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateEvent;
