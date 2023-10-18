import React, { createContext, useState, useEffect } from "react";

export const ClassContext = createContext([]);

export const ClassContextProvider = (props) => {
  const [classInfo, setClassInfo] = useState([]);
  const [update, setUpdate] = useState(0);

  const getClass = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getClass`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setClassInfo(res.message);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getClass();
  }, [update]);

  return (
    <>
      <ClassContext.Provider
        value={{ classInfo, updateClass: update, setUpdateClass: setUpdate }}
      >
        {props.children}
      </ClassContext.Provider>
    </>
  );
};
