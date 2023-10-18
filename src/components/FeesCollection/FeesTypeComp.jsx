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

export const FeesTypeComp = () => {
  const toastTL = useRef(null);
  // States
  const [loader, setLoader] = useState(false);
  const [tab, setTab] = useState("add");
  const [activeid, setActiveid] = useState("");
  const [feeType, setFeeType] = useState("");
  const [feeTypeData, setFeeTypeData] = useState([]);
  const [update, setUpdate] = useState([]);
  function editdata(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
  const columns = [
    {
      name: "Fee ID",
      selector: (row) => row.id,
    },
    {
      name: "Fee Type",
      selector: (row) => row.feeType,
    },
    {
      name: "Approval Status",
      cell: (row) => <>{+row.pstatus === 1 ? <>Approved</> : <>Pending</>}</>,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          {!["Admission Fee", "Tuition Fee", "Annual Fee"].includes(
            row.feeType
          ) && (
            <>
              <i
                className="fa-solid fa-edit fa-icon me-2"
                onClick={() => {
                  setTab("edit");
                  editdata(row.id);
                }}
              ></i>
              <i className="fa-solid fa-xmark fa-icon"></i>
            </>
          )}
        </>
      ),
    },
  ];

  // Conditions
  const conditions = [feeType === ""];

  // Functions
  function editFeeType() {
    if (feeType === "") {
      alert("Cant be left empty");
      return false;
    }
    const data = new FormData();
    data.append("id", activeid);
    data.append("name", feeType);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateFeeTypeById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setUpdate(update + 1);
          setTab("add");
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err));
  }

  const addFeeType = () => {
    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Enter Fees Type!",
          life: 2000,
        });
        return false;
      }
    }
    const data = new FormData();
    data.append("feeType", feeType);

    fetch(`${import.meta.env.VITE_SERVER}/addFeeType`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        res.json();
        setUpdate(update + 1);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getAllFeeTypes = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeTypes`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeTypeData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getFeeTypesbyid = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeTypesById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeType(res.message[0].feeType);
      })
      .catch((err) => console.log(err));
  };

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  useEffect(() => {
    getAllFeeTypes();
    getFeeTypesbyid();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Fees Type</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-4 pt-2">
              {tab == "add" && (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Fees Type</label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setFeeType(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-8">
                      <div class="form-check mb-1">
                        <input
                          class="form-check-input "
                          type="checkbox"
                          value="1"
                          id="flexCheckDefault"
                          onChange={handlerChange}
                        />
                        <label
                          class="form-check-label font-11"
                          for="flexCheckDefault"
                        >
                          Are You Sure to Submit?
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 text-end">
                      <button
                        className="btn submit-btn-sm w-100"
                        onClick={addFeeType}
                        disabled={yn !== true}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </>
              )}
              {tab == "edit" && (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">
                        Edit Fees Type
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        value={feeType}
                        onChange={(e) => {
                          setFeeType(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-4 offset-8 text-end">
                      <button
                        className="btn submit-btn-sm w-100"
                        onClick={editFeeType}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Fees List</p>

              <DataTable
                columns={columns}
                data={feeTypeData}
                customStyles={customStyle}
                dense
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
