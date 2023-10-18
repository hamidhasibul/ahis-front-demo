import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { UserRoleContext } from "../../../../context/UserRoleContext";

export const UserConntext = createContext();
const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);
  const { username } = useContext(UserRoleContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/users/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [username]);

  return (
    <UserConntext.Provider value={{ userInfo }}>
      {children}
    </UserConntext.Provider>
  );
};

export default UserInfoProvider;
