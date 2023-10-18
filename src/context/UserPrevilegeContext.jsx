import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const UserPrevilegeContext = createContext([]);

import React from "react";

export const UserPrevilegeContextProvider = (props) => {
  const [previlegeData, setPrevilegeData] = useState([]);

  const getPrevilege = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getprivileges`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setPrevilegeData(res.message);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPrevilege();
  }, []);

  return (
    <>
      <UserPrevilegeContext.Provider value={{ previlegeData }}>
        {props.children}
      </UserPrevilegeContext.Provider>
    </>
  );
};
