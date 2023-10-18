import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserRoleContext = createContext([]);

export const UserRoleContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [designation, setDesignation] = useState("");
  let navigate = useNavigate();

  const getuser = () => {
    const data = new FormData();
    data.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_SERVER}/getusertoken`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message.length !== 0) {
          setUser(res.message[0].role);
          setUsername(res.message[0].username);
          setUserid(res.message[0].emp_id);
        } else {
          localStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const getuserimg = () => {
    const data = new FormData();
    data.append("emp_id", userid);
    fetch(`${import.meta.env.VITE_SERVER}/getEmployeeByID`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setDesignation(res.message[0].designation);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getuser();
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    getuserimg();
  }, [userid]);
  return (
    <>
      <UserRoleContext.Provider value={{ user, username, userid, designation }}>
        {props.children}
      </UserRoleContext.Provider>
    </>
  );
};
