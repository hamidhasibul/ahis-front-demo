import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
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
export const StudentPurchaseComp = () => {
  const [studentData, setStudentData] = useState([]);
  const [getStudentIncomeInfo, setGetStudentIncomeInfo] = useState([]);
  const params = useParams();
  const { id } = params;
  const columns2 = [
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Description",
      selector: (row) => row.note,
    },
    {
      name: "Student ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "Income Head",
      selector: (row) => row.ihead,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
    },
    {
      name: "Action",
      button: true,
      cell: () => (
        <>
          <i className="fa-solid fa-edit fa-icon me-2"></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Functions
  const getStudentData = async () => {
    try {
      const data = new FormData();
      data.append("id", id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getStudentViewByid`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      setStudentData(res.message[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllStudentIncomeInfo = async () => {
    try {
      const data = new FormData();
      data.append("student_id", studentData.student_id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getStudentIncomeById`,
        { method: "POST", body: data }
      );
      const res = await response.json();
      setGetStudentIncomeInfo(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudentIncomeInfo();
  }, [studentData.student_id]);
  useEffect(() => {
    getStudentData();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row py-2">
        <div className="col-lg-12">
          <DataTable
            columns={columns2}
            data={getStudentIncomeInfo}
            customStyles={customStyle}
            className="mb-2 border"
            dense
          />
        </div>
      </div>
    </div>
  );
};
