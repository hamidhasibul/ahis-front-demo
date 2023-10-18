import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import student from "../../assets/images/graduate-avatar.png";
import income from "../../assets/images/money.png";
import expense from "../../assets/images/expenses.png";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";

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
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
};

export const StaffInfoComp = () => {
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [staffData, setStaffData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Table Format

  // Functions

  const getstaffData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getEmployee`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setStaffData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const filteredStaff = () => {
    setFilteredData([]);
    [...staffData]?.filter((item) => {
      if (
        item.department.toLowerCase().replace(" ", "") ===
          selectedDept.toLowerCase().replace(" ", "") ||
        item.designation.toLowerCase().replace(" ", "") ===
          selectedDesignation.toLowerCase().replace(" ", "")
      ) {
        setFilteredData((prev) => [...prev, item]);
      }
    });
  };
  const getAllDesignation = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getAllDesignation`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setDesignationData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getAlldepartment = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getdepartment`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setDepartmentData(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllDesignation();
    getAlldepartment();
    getstaffData();
  }, []);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Staff Information</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Departments</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setSelectedDept(e.target.value);
                      }}
                    >
                      <option selected>Select Department</option>
                      {departmentData?.map((item) => (
                        <option key={item.id} value={item.department}>
                          {item.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Designation</label>
                    <select
                      className="form-select input1 py-0"
                      onClick={(e) => {
                        setSelectedDesignation(e.target.value);
                      }}
                    >
                      <option selected>Select Designation</option>
                      {designationData?.map((item) => (
                        <option key={item.id} value={item.designation}>
                          {item.designation}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-2 offset-10 text-end">
                    <button
                      className="btn submit-btn-sm w-100"
                      onClick={filteredStaff}
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Search Staff</label>
                    <input
                      type="text"
                      className="input1 form-control"
                      placeholder="Search..."
                      onChange={(e) => {
                        setSearchFilter(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-2 offset-10 text-end">
                    <button
                      className="btn submit-btn-sm w-100"
                      // onClick={filteredStudents}
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="d-flex py-2 px-3 align-items-center border-bottom justify-content-between">
                <p className="font-14 fw-500">Staff List</p>
                {/* <div className="d-flex align-items-center">
                  <img src={copy} className="theadicon mx-1" title="Copy" />
                  <img src={xls} className="theadicon mx-1" title="XLS" />
                  <img src={pdf} className="theadicon mx-1" title="PDF" />
                  <img src={printer} className="theadicon mx-1" title="Print" />
                </div> */}
              </div>
              <div className="container">
                <div className="row py-2">
                  {filteredData.map((item) => (
                    <>
                      <div className="col-lg-4" key={item.id}>
                        <div class="card rounded-0 mb-3">
                          <div class="d-flex">
                            <div class="">
                              <img
                                src={
                                  `${import.meta.env.VITE_IMG_SERVER}` +
                                  item.img
                                }
                                class="rounded p-1 employeecard_img"
                                alt="..."
                              />
                            </div>
                            <div class=" p-2">
                              <p className="font-14 fw-bold text-decoration-0">
                                {item.emp_fname + " " + item.emp_lname}
                              </p>
                              <p></p>
                              <Link
                                to={`/staff/view/${item.id}`}
                                className="font-12"
                              >
                                See Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              {/* <DataTable
                columns={columns}
                data={filteredData}
                customStyles={customStyle}
                dense
                pagination
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
