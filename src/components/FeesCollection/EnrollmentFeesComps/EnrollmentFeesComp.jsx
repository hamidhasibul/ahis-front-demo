import React, { useState, useEffect, useContext, useRef } from "react";
import { SessionContext } from "../../../context/SessionContext";
import { ClassContext } from "../../../context/ClassContext";
import { SectionContext } from "../../../context/SectionContext";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { UserRoleContext } from "../../../context/UserRoleContext";

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

export const EnrollmentFeesComp = () => {
  const toastTL = useRef(null);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  // States

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);

  const columns = [
    {
      name: "Student ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Student Name",
      selector: (row) => row.student_first_name,
    },
    {
      name: "Class",
      selector: (row) => row.Class,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    // {
    //   name: "Date of Birth",
    //   selector: (row) => row.dob,
    // },
    // {
    //   name: "Place of birth",
    //   selector: (row) => row.pob,
    // },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Religion",
      selector: (row) => row.religion,
    },
    {
      name: "Father contact",
      selector: (row) => row.father_contact,
    },
    // {
    //   name: "Mother contact",
    //   selector: (row) => row.mother_contact,
    // },

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/enrollmentfees/view/${row.id}`}>
            <i className="fa-solid fa-eye"></i>
          </Link>
          &nbsp;&nbsp;
          <i className="fa-solid fa-edit"></i> &nbsp;&nbsp;
          <i className="fa-solid fa-xmark"></i>
        </>
      ),
    },
  ];

  // Conditions

  const conditions = [selectedClass === "", selectedSection === ""];

  // Function

  const getAdmittedStudentsData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmittedStudentsData(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAdmittedStudentsData();
  }, []);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Enrollment Fees</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Class</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                      }}
                    >
                      <option selected>Select Class</option>
                      {classInfo
                        .filter((item) => {
                          return (
                            item.session === session && +item.pstatus === 1
                          );
                        })
                        .map((item) => (
                          <option key={item.id} value={item.class_name}>
                            {item.class_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Section</label>
                    <select className="form-select input1 py-0">
                      <option selected>Select Section</option>
                      {sectionInfo
                        .filter((item) => {
                          return item.class_name === selectedClass;
                        })
                        .map((item) => (
                          <option key={item.id} value={item.section_name}>
                            {item.section_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-2 offset-10 text-end">
                    <button className="btn submit-btn-sm w-100">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Search Student</label>
                    <input
                      type="text"
                      className="input1 form-control"
                      placeholder="Search..."
                    />
                  </div>
                  <div className="col-lg-2 offset-10 text-end">
                    <button className="btn submit-btn-sm w-100">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="d-flex py-2 px-3 align-items-center justify-content-between">
                <p className="font-14 fw-500">Applicant List</p>
              </div>
              <DataTable
                columns={columns}
                data={admittedStudentsData.filter((item) => {
                  return item.principal_approve === "Approved";
                })}
                customStyles={customStyle}
                dense
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
