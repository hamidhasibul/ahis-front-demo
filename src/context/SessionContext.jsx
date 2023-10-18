import React, { useState, useEffect, createContext } from "react";

export const SessionContext = createContext([]);

export const SessionContextProvider = (props) => {
  const [sessionData, setSessionData] = useState([]);
  const [session, setSession] = useState("");

  const getSessionData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getSession`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setSessionData(res.message);

        if (sessionData.length > 0) {
          setSession(sessionData[0].session);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSessionData();
  }, []);

  useEffect(() => {
    const initialSession =
      sessionData.find((item) => item.status === 1)?.session || "";
    setSession(initialSession);
  }, [sessionData]);

  return (
    <SessionContext.Provider
      value={{ sessionData, setSessionData, session, setSession }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};
