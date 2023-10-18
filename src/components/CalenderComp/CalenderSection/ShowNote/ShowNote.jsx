import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useContext, useRef, useState } from "react";
import { UserConntext } from "../../Context/CalendarManagement/UserInfoProvider";
import NoteListAPI from "../../Hooks/NoteListAPI";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Mention } from "primereact/mention";
import UserListAPI from "../../Hooks/UserListAPI";
import CreateNote from "../CreateNote/CreateNote";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";

function ShowNote() {
  const toast = useRef(null);
  const [selectedNoteType, setSelectedNoteType] = useState("All");
  const [editNoteMap, setEditNoteMap] = useState({});
  const [editNoteText, setEditNoteText] = useState("");
  const [selectedHost, setSelectedHost] = useState([]);
  const { userInfo } = useContext(UserConntext);
  const userLoggedIn = userInfo[0]?.username;
  const [myNotes] = NoteListAPI(userLoggedIn, selectedNoteType, selectedHost);
  const [userDetails] = UserListAPI();

  const handleTaskTypeChange = (e) => {
    setSelectedNoteType(e.value);
  };
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
        <span className="flex flex-column ml-2">{suggestion.full_Name}</span>
      </div>
    );
  };

  const handleNoteEdit = (id, noteText) => {
    setEditNoteMap((prevEditNoteMap) => ({
      ...prevEditNoteMap,
      [id]: !prevEditNoteMap[id],
    }));
    setEditNoteText(noteText);
  };
  const handleEditNoteText = (id) => {
    fetch(`${import.meta.env.VITE_SERVER}/editnote/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteText: editNoteText }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Note text updated successfully.");
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Note Updated Successfully",
            life: 2000,
          });
        } else {
          throw new Error("Failed to update note text.");
        }
      })
      .catch((error) => {
        console.error("Error updating note text:", error);
        alert("Error updating note text:", error);
      });

    setEditNoteMap((prevEditNoteMap) => ({
      ...prevEditNoteMap,
      [id]: !prevEditNoteMap[id],
    }));
  };

  return (
    <div className="todo">
      <Toast ref={toast} />
      <div className=" mb-1 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h5 className="">My Notes</h5>
          <div className="row  ms-2">
            <div className="col">
              <div className="form-group">
                <Dropdown
                  value={selectedNoteType}
                  options={[
                    { label: "All Notes", value: "All" },
                    { label: "Self Notes", value: "Self" },
                    { label: "Team Notes", value: "Team" },
                  ]}
                  onChange={handleTaskTypeChange}
                  placeholder="Select Note Type"
                  className="p-1 ps-2 text-center w-100"
                />
              </div>
            </div>

            <div className="col d-flex">
              <Mention
                suggestions={userSuggestions}
                onSearch={onUserSearch}
                field="username"
                placeholder="@ to Search Host"
                itemTemplate={itemTemplate}
                type="text"
                rows={1}
                className="w-100 me-2"
              />

              <div className="col row justify-content-start align-items-center">
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
        </div>

        <CreateNote />
      </div>

      <div className="container noteitem_back mt-2">
        <div className="row my-1 ">
          {myNotes &&
            myNotes.map((note) => (
              <div className="col-lg-3 mb-2" key={note.sticky_ID}>
                <Card className="shadow-sm p-2 py-1 border">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 fw-bold fs-13">
                      <i className="pi pi-user me-1 fs-12"></i>{" "}
                      {note.host_UserName}
                    </p>
                    {userLoggedIn === note?.host_UserName && (
                      <i
                        className="pi pi-pencil cursorPointer"
                        onClick={() =>
                          handleNoteEdit(note.sticky_ID, note.note)
                        }
                      />
                    )}
                  </div>
                  <small
                    className={`${
                      note?.note_Type === "Self" ? "bg-status" : "bg-status2"
                    } fs-11 rounded-1 px-2`}
                  >
                    {note.note_Type}
                  </small>
                  <p className=" fs-12 py-2">{note.note}</p>

                  {editNoteMap[note.sticky_ID] && (
                    <>
                      <InputTextarea
                        rows={5}
                        className="editNoteText fs-12 py-2 d-block w-100"
                        value={editNoteText}
                        onChange={(e) => setEditNoteText(e.target.value)}
                      />
                      <Button
                        className="btn createbtn my-2"
                        onClick={() => handleEditNoteText(note.sticky_ID)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ShowNote;
