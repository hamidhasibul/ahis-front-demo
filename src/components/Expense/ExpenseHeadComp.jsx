import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Toast } from "primereact/toast";

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

export const ExpenseHeadComp = () => {
  // States

  const toastTL = useRef(null);
  const [loader, setLoader] = useState(false);
  const [feeType, setFeeType] = useState("");
  const [expense_head, setExpense_head] = useState("");
  const [feeTypeData, setFeeTypeData] = useState([]);
  const [update, setUpdate] = useState([]);

  // Tabole Format
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Expesne Head",
      selector: (row) => row.expense_head,
    },
    {
      name: "Action",
      button: true,
      cell: () => (
        <>
          {/* <Link to={`/applicantlist/view/${row.id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
 */}
          <i className="fa-solid fa-edit fa-icon me-2"></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
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

  const getAllFeeTypes = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getExpense_head`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeTypeData(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllFeeTypes();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Expense Head</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-4 pt-2">
              <form onSubmit={addExpense_head} id="form">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Expense Head</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setExpense_head(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4 offset-8 text-end">
                    <button className="btn submit-btn-sm w-100" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Expense List</p>

              <DataTable
                columns={columns}
                data={feeTypeData}
                customStyles={customStyle}
                dense
                pagination
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
