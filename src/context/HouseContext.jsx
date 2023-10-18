import React, { useState, createContext, useEffect } from "react";

export const HouseContext = createContext([]);

export const HouseContextProvider = (props) => {
  const [houseInfo, setHouseInfo] = useState([]);
  const [update, setUpdate] = useState(0);

  const getHouseInfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getHouse`, { method: "POST" })
      .then((res) => res.json())
      .then((res) => setHouseInfo(res.message))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHouseInfo();
  }, [update]);
  return (
    <HouseContext.Provider value={{ houseInfo, update, setUpdate }}>
      {props.children}
    </HouseContext.Provider>
  );
};
