import React, { useEffect, useState, createContext } from "react";

export const SectionContext = createContext([]);

export const SectionContextProvider = (props) => {
  const [sectionInfo, setSectionInfo] = useState([]);
  const [update, setUpdate] = useState(0);
  const getSection = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getSection`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setSectionInfo(res.message);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSection();
  }, [update]);
  return (
    <>
      <SectionContext.Provider value={{ sectionInfo, update, setUpdate }}>
        {props.children}
      </SectionContext.Provider>
    </>
  );
};
