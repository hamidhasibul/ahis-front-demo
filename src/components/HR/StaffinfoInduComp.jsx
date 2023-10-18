import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserRoleContext } from "../../context/UserRoleContext";
import { useContext } from "react";

const customStyle = {
  rows: {
    style: {
      fontSize: "12px",
    },
  },
  headCells: {
    style: {
      fontSize: "11px",
      fontWeight: 600,
      backgroundColor: "#dddddd",
    },
  },
};

export const StaffinfoInduComp = () => {
  const params = useParams();
  const { id } = params;
  const [staffData, setStaffData] = useState([]);

  //   const update = () => {
  //     const data = new FormData();
  //     data.append("id", id);
  //     fetch(`${import.meta.env.VITE_SERVER}/demo`, {
  //       method: "POST",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const getStuffdata = () => {
    const data = new FormData();
    data.append("id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getEmployeeByID`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setStaffData(res.message[0]);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  console.log(id);
  useEffect(() => {
    getStuffdata();
  }, []);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">
          {staffData.emp_fname + " " + staffData.emp_lname}
        </p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">{staffData.assigned_class}</div>
        </div>
      </div>
    </div>
  );
};
