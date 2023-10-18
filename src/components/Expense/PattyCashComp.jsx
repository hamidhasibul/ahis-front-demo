import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Toast } from "primereact/toast";
import converter from "number-to-words";
import noData from "../../assets/images/no_data.png";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";

// Table Styling

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

export const PattyCashComp = () => {
  // States

  const toastTL = useRef(null);
  const [loader, setLoader] = useState(false);
  const [allpattycash, setAllpattycash] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [tab, setTab] = useState("");

  // Tabole Format
  const columns = [
    {
      name: "Payment ID",
      selector: (row) => row.payment_id,
    },
    {
      name: "Description",
      selector: (row) => row.note,
    },

    {
      name: "Campus",
      selector: (row) => row.campus,
      width: 200,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.verified === "0" ? (
            <p className="mb-0">Pending</p>
          ) : (
            <p className="mb-0">Verified</p>
          )}
        </>
      ),
    },
    {
      name: "Adjustment",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              setActiveid(row.payment_id);
            }}
          ></i>
        </>
      ),
    },
  ];

  // Functions

  const addExpense_head = (e) => {
    e.preventDefault();
    if (expense_head === "") {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Enter Expense Head!",
        life: 2000,
      });
      return false;
    }
    const data = new FormData();
    data.append("expense_head", expense_head);
    fetch(`${import.meta.env.VITE_SERVER}/addExpense_head`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllPattyCash = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getPattyCashFromPayment`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAllpattycash(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllPattyCash();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">PattyCashComp</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-8 pt-2">
              <DataTable
                columns={columns}
                data={allpattycash}
                customStyles={customStyle}
                dense
                pagination
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
              />
            </div>
            <div className="col-lg-4 pt-2 border-start">
              {tab == "" ? (
                <>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 text-center my-5">
                        <p className="font-22 fw-400 text-muted">
                          {" "}
                          No Data Selected
                        </p>
                        <p className="font-12">
                          Select data from list to view the Fund Request
                          details.{" "}
                        </p>

                        <img src={noData} className="nodata" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
