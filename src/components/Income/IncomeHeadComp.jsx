import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Toast } from "primereact/toast";

// Table Styles

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

export const IncomeHeadComp = () => {
  const toastTL = useRef(null);
  // States
  const [loader, setLoader] = useState(false);
  const [incomeHead, setIncomeHead] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [tab, setTab] = useState("add");
  const [activeid, setActiveid] = useState("");

  // Table Format
  function edit(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Income Head",
      selector: (row) => row.income_head,
    },
    {
      name: "Income Type",
      selector: (row) => row.income_type,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          {/* <Link to={`/applicantlist/view/${row.id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
 */}
          <i
            className="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              edit(row.id);
              setTab("edit");
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Validation Condition

  const conditions = [incomeHead === "", incomeType === ""];

  // Functions

  const addIncomeHead = (e) => {
    e.preventDefault();

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }
    const data = new FormData();
    data.append("incomeHead", incomeHead);
    data.append("incomeType", incomeType);
    fetch(`${import.meta.env.VITE_SERVER}/addincome_head`, {
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
  const editIncomeHead = (e) => {
    e.preventDefault();

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }
    const data = new FormData();
    data.append("id", activeid);
    data.append("incomeHead", incomeHead);
    data.append("incomeType", incomeType);
    fetch(`${import.meta.env.VITE_SERVER}/Updateincome_head`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res);
        setUpdate(update + 1);
        setTab("add");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getincomeheadById = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getincomeheadById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setIncomeHead(res.message[0].income_head);
        setIncomeType(res.message[0].income_type);
      })
      .catch((err) => console.log(err));
  };

  const getAllincomehead = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getincome_head`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setIncomeData(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getincomeheadById();
    getAllincomehead();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        {tab == "add" ? (
          <>
            <p className="header-font">Income Head</p>
          </>
        ) : (
          <>
            <p className="header-font">Edit Income Head</p>
          </>
        )}
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-4 pt-2">
              {tab == "add" && (
                <>
                  <form id="form" onSubmit={addIncomeHead}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Income Head</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            setIncomeHead(e.target.value);
                          }}
                          aria-label="form-control example"
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Income Type</label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setIncomeType(e.target.value);
                          }}
                        >
                          <option selected disabled value={""}>
                            Select
                          </option>
                          <option>Student</option>
                          <option>General</option>
                        </select>
                      </div>
                      <div className="col-lg-4 offset-8 text-end">
                        <button
                          className="btn submit-btn-sm w-100"
                          type="submit"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
              {tab == "edit" && (
                <>
                  {" "}
                  <form id="form" onSubmit={editIncomeHead}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Income Head</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={incomeHead}
                          onChange={(e) => {
                            setIncomeHead(e.target.value);
                          }}
                          aria-label="form-control example"
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Income Type</label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setIncomeType(e.target.value);
                          }}
                        >
                          <option selected>{incomeType}</option>
                          <option>Student</option>
                          <option>General</option>
                        </select>
                      </div>
                      <div className="col-lg-4 offset-8 text-end">
                        <button
                          className="btn submit-btn-sm w-100"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Income List</p>

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
        </div>
      </div>
    </div>
  );
};
