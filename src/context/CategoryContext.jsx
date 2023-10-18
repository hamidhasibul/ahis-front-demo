import React, { useState, useEffect, createContext } from "react";

export const CategoryContext = createContext([]);

export const CategoryContextProvider = (props) => {
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [update, setUpdate] = useState(0);

  const getCategory = (props) => {
    fetch(`${import.meta.env.VITE_SERVER}/getCategory`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setCategoryInfo(res.message);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategory();
  }, [update]);
  return (
    <CategoryContext.Provider value={{ categoryInfo, update, setUpdate }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
