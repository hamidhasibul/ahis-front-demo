import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Mention } from "primereact/mention";
import React, { useContext, useState } from "react";
import UserListAPI from "../../Hooks/UserListAPI";
import { UserConntext } from "../../Context/CalendarManagement/UserInfoProvider";
import swal from "sweetalert";
import { Card } from "primereact/card";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";

function CreateNote() {
  const { userInfo } = useContext(UserConntext);
  const userLoggedIn = userInfo[0]?.username;
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [userDetails] = UserListAPI();
  const [userSuggestions, setuserSuggestions] = useState([]);
  const [newNote, setNewNote] = useState({
    note_Type: "Self",
    guest: [],
    host_UserName: userInfo[0]?.username,
    note: "",
  });

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
          const isGuestAdded = newNote.guest.some(
            (g) => g === suggestion.username
          );
          if (!isGuestAdded) {
            setNewNote((prevNote) => ({
              ...prevNote,
              guest: [...prevNote.guest, suggestion.username],
            }));
          } else {
            swal("user Already added");
          }
        }}
      >
        <span className="flex flex-column ml-2">{suggestion.username}</span>
      </div>
    );
  };

  const handleCreateNote = () => {
    newNote.host_UserName = userLoggedIn;
    console.log(newNote);
    let isValid = true;
    const { note } = newNote;

    if (note.trim() === "") {
      setErrors("note is required");
      isValid = false;
    }

    if (isValid) {
      swal("Are you sure you want to add this Note?", {
        buttons: ["No", "Yes"],
      }).then((value) => {
        if (value) {
          axios
            .post(`${import.meta.env.VITE_SERVER}/addnote`, newNote)
            .then((res) => {
              if (res.data) {
                swal({
                  title: "Congratulation",
                  text: "Note created",
                  icon: "success",
                  button: "Done",
                });
              } else {
                swal("Sorry!", "Some Error occure", "error");
              }
            });
        }
      });

      setShowModal(false);
    }
  };

  const handleRemoveGuest = (guest) => {
    const updatedGuests = newNote.guest.filter((g) => g !== guest);
    setNewNote((prevNote) => ({
      ...prevNote,
      guest: updatedGuests,
    }));
  };

  return (
    <div className="todo">
      <Button
        icon="pi pi-check-square fs-13"
        className="createbtn"
        onClick={() => setShowModal(true)}
        label="Create Note"
      />
      <Dialog
        header="Create Note"
        visible={showModal}
        style={{ width: "30vw" }}
        onHide={() => setShowModal(false)}
        footer={
          <div className="mt-3 d-flex justify-content-end">
            <Button
              className="createbtn me-0"
              label="Create"
              icon="pi pi-check fs-14"
              onClick={handleCreateNote}
              autoFocus
            />
          </div>
        }
      >
        <div className="mt-3">
          <InputTextarea
            name="noteText"
            onChange={(e) => {
              newNote.note = e.target.value;
            }}
            className="w-100 border-0 rounded-0 inputArea p-2"
            rows={2}
            placeholder="Type here. . ."
          />
          {errors && <small className="text-danger ">*Note required</small>}
        </div>

        <div className="d-flex align-items-center my-2">
          <label className="w-25 fs-13">
            {" "}
            <i className="pi pi-bars fs-12 me-2 text-muted"></i>Task Type
          </label>
          <Dropdown
            value={newNote.note_Type}
            options={[
              { label: "Self Note", value: "Self" },
              { label: "Team Note", value: "Team" },
            ]}
            onChange={(e) => {
              setNewNote((prevNote) => ({
                ...prevNote,
                note_Type: e.target.value,
              }));
            }}
            name="note_Type"
            placeholder="Select"
            className="w-30 p-1 dropSelect"
          />
        </div>

        {newNote.note_Type === "Team" && (
          <div>
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
            </div>

            <div className="mb-3">
              {newNote.guest.map((guest) => (
                <Card className="my-2 rounded-0 usercard2" key={guest}>
                  <div className="d-flex align-items-center justify-content-between px-2">
                    <div className="name">
                      <i className="ms-2 pi pi-user usericon fs-13"></i>
                      <span className="ms-2 fs-13 fw-bold">{guest}</span>
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
      </Dialog>
    </div>
  );
}

export default CreateNote;
