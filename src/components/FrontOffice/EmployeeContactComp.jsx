import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";

import { ClassContext } from "../../context/ClassContext";
import { SessionContext } from "../../context/SessionContext";
import { Toast } from "primereact/toast";

const customStyle = {
  rows: {
    style: {
      fontSize: "11px",
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

export const EmployeeContactComp = () => {
  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);

  const toastTL = useRef(null);

  // Employees States

  const [tab, setTab] = useState("add");
  const [tab2, setTab2] = useState("");

  const [empId, setEmpId] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeMobileNumber, setEmployeeMobileNumber] = useState("");
  const [employeeMobileNumber2, setEmployeeMobileNumber2] = useState("");

  const [employeeContactData, setEmployeeContactData] = useState([]);
  const [editempData, setEditempData] = useState([]);
  const [update, setUpdate] = useState([]);

  // Table Format

  const columns = [
    {
      name: "Name",
      selector: (row) => row.emp_name,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Employee Type",
      selector: (row) => row.emp_type,
    },
    {
      name: "Mobile No",
      cell: (row) => (
        <>
          {row.phone}
          {row.phone2 !== "" && ", " + row.phone2}
        </>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            class="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              editdata(row.id);
              setTab("edit");
              setEmpId(row.id);
            }}
          ></i>
        </>
      ),
    },
  ];
  function editdata(id) {
    setEmpId(id);
    setUpdate(update + 1);
  }

  // Functions

  const addEmployeeContact = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("session", session);
      data.append("emp_type", employeeType);
      data.append("emp_name", employeeName);
      data.append("designation", employeeDesignation);
      data.append("phone", employeeMobileNumber);
      data.append("phone2", employeeMobileNumber2);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/addEmployeeContact`,
        { method: "POST", body: data }
      );

      const res = await response.json();
      setUpdate(update + 1);

      toastTL.current.show({
        severity: "success",
        summary: "Success",
        detail: `Employee Contact added!`,
        life: 2000,
      });
      resetStates();
    } catch (error) {
      console.log(error);
    }
  };
  const editEmployeeContact = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("id", empId);
      data.append("session", session);
      data.append("emp_type", employeeType);
      data.append("emp_name", employeeName);
      data.append("designation", employeeDesignation);
      data.append("phone", employeeMobileNumber);
      data.append("phone2", employeeMobileNumber2);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/UpdateEmployeeContact`,
        { method: "POST", body: data }
      );

      const res = await response.json();
      setUpdate(update + 1);
      setTab("add");
    } catch (error) {
      console.log(error);
    }
  };
  const getEmployeeContactData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getEmployeeContactData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setEmployeeContactData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getEditEmployeeContactData = () => {
    const data = new FormData();
    data.append("id", empId);
    fetch(`${import.meta.env.VITE_SERVER}/getEmployeeContactDataById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setEmployeeType(res.message[0].emp_type);
        setEmployeeName(res.message[0].emp_name);
        setEmployeeDesignation(res.message[0].designation);
        setEmployeeMobileNumber(res.message[0].phone);
        setEmployeeMobileNumber2(res.message[0].phone2);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  const resetStates = () => {
    setEmpId("");
    setEmployeeType("");
    setEmployeeName("");
    setEmployeeDesignation("");
    setEmployeeMobileNumber("");
    setEmployeeMobileNumber2("");
  };

  useEffect(() => {
    getEditEmployeeContactData();
    getEmployeeContactData();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}
      <Toast ref={toastTL} position="top-right" />
      <div className="d-flex py-2 px-3 border-b align-items-center">
        {tab == "add" && (
          <>
            {" "}
            <p className="header-font">Employees Contact</p>
          </>
        )}
        {tab == "edit" && (
          <>
            {" "}
            <p className="header-font">Edit Employees Contact</p>
          </>
        )}
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-3 pt-2">
              {tab == "add" && (
                <>
                  <form id="form" onSubmit={addEmployeeContact}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Employee Type
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setEmployeeType(e.target.value);
                          }}
                          value={employeeType}
                        >
                          <option value={""}>Select</option>
                          <option>A</option>
                          <option>B</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Employee Name
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setEmployeeName(e.target.value);
                          }}
                          value={employeeName}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Designation</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setEmployeeDesignation(e.target.value);
                          }}
                          value={employeeDesignation}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Mobile Number
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setEmployeeMobileNumber(e.target.value);
                          }}
                          value={employeeMobileNumber}
                        />
                        {tab2 == "p2" && (
                          <>
                            <label className="form-label label1">
                              Mobile Number2
                            </label>
                            <input
                              className="form-control input1 relative"
                              type="text"
                              value={employeeMobileNumber2}
                              onChange={(e) => {
                                setEmployeeMobileNumber2(e.target.value);
                              }}
                            />
                          </>
                        )}
                        {tab2 == "" && (
                          <>
                            <small
                              className="font-11"
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setTab2("p2");
                              }}
                            >
                              Add More Number
                            </small>
                          </>
                        )}
                      </div>

                      <div className="col-lg-4 offset-8 text-end mb-2">
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
                  <form id="form" onSubmit={editEmployeeContact}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Employee Type
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setEmployeeType(e.target.value);
                          }}
                        >
                          <option>{employeeType}</option>
                          <option>A</option>
                          <option>B</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Employee Name
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          value={employeeName}
                          onChange={(e) => {
                            setEmployeeName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Designation</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          value={employeeDesignation}
                          onChange={(e) => {
                            setEmployeeDesignation(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Mobile Number
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          value={employeeMobileNumber}
                          onChange={(e) => {
                            setEmployeeMobileNumber(e.target.value);
                          }}
                        />
                        {employeeMobileNumber2 !== "" && (
                          <>
                            <label className="form-label label1">
                              Mobile Number2
                            </label>
                            <input
                              className="form-control input1 relative"
                              type="text"
                              value={employeeMobileNumber2}
                              onChange={(e) => {
                                setEmployeeMobileNumber2(e.target.value);
                              }}
                            />
                          </>
                        )}
                      </div>

                      <div className="col-lg-4 offset-8 text-end mb-2">
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
            <div className="col-lg-9 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Employee Contact List</p>

              <DataTable
                columns={columns}
                customStyles={customStyle}
                paginationPerPage={[20]}
                data={employeeContactData}
                paginationRowsPerPageOptions={[20]}
                dense
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
