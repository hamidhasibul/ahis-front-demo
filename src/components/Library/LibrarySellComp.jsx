import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";

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

export const LibrarySellComp = () => {
  // States
  const [loader, setLoader] = useState(false);
  const [incomeHead, setIncomeHead] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const [update, setUpdate] = useState([]);
  const columns = [
    {
      name: "Payment ID",
      selector: (row) => row.payment_id,
    },
    {
      name: "Student ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Student Name",
      selector: (row) => row.student_name,
    },
    {
      name: "Payment Head",
      selector: (row) => row.ihead,
    },
    {
      name: "Note",
      selector: (row) => row.note,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.status == 1 ? (
            <>
              <p className="m-0 px-2 bg-warning rounded-pill status_py font-11">
                Pending
              </p>
            </>
          ) : (
            <>
              <p className="m-0 px-2 bg-success text-white rounded-pill status_py font-11">
                Sold
              </p>
            </>
          )}
        </>
      ),
      //   selector: (row) => row.status,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          {row.status == 1 ? (
            <>
              <i
                class="fa-solid fa-circle-check text-success fa-icon"
                onClick={() => {
                  sell(row.id);
                }}
              ></i>
            </>
          ) : (
            <>
              <i class="fa-solid fa-circle-check text-muted fa-icon"></i>
            </>
          )}
          <i className="fa-solid fa-xmark fa-icon mx-2"></i>
        </>
      ),
    },
  ];

  // Functions
  function sell(id) {
    const data = new FormData();
    data.append("id", id);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateLibrarySell`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          alert(res.message);
          setUpdate(update + 1);
        } else {
          alert(res.message);
        }
      })
      .catch((err) => console.log(err));
  }
  const getAllincomehead = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIncome`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setIncomeData(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllincomehead();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}
      <div className="d-flex py-2 px-3 border-b align-items-center justify-content-between">
        <p className="header-font">Library Sell</p>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="search-bar rounded-pill mx-3 px-3 border-bord bg1"
            placeholder="Search..."
          />
          <img src={copy} className="theadicon mx-1" title="Copy" />
          <img src={xls} className="theadicon mx-1" title="XLS" />
          <img src={pdf} className="theadicon mx-1" title="PDF" />
          <img src={printer} className="theadicon mx-1" title="Print" />
        </div>
      </div>

      <div className="scroll-element">
        <DataTable
          columns={columns}
          data={incomeData}
          customStyles={customStyle}
          dense
          paginationPerPage={[20]}
          paginationRowsPerPageOptions={[20]}
          pagination
        />
      </div>
    </div>
  );
};
