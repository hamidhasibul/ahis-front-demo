import React, { useEffect } from "react";
import { useContext } from "react";
import { ClassContext } from "../../../context/ClassContext";
import { SectionContext } from "../../../context/SectionContext";
import copy from "../../../assets/images/copy.png";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { SessionContext } from "../../../context/SessionContext";
import { Link } from "react-router-dom";

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

export const CollectFeesComp = () => {
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);

  const columns = [
    {
      name: "Student ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Student Name",
      selector: (row) => row.student_first_name + " " + row.student_last_name,
    },
    {
      name: "Class",
      selector: (row) => row.Class,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
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

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/collectfees/view/${row.id}`}>
            <i className="fa-solid fa-eye"></i>
          </Link>
        </>
      ),
    },
  ];

  //   Functions

  const getAdmittedStudentsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`,
        { method: "POST" }
      );

      const res = await response.json();

      setAdmittedStudentsData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = () => {
    setFilteredData([]);
    [...admittedStudentsData]?.filter((item) => {
      if (
        item.Class.toLowerCase().replace(" ", "") ===
          selectedClass.toLowerCase().replace(" ", "") &&
        item.section.toLowerCase().replace(" ", "") ===
          selectedSection.toLowerCase().replace(" ", "") &&
        item.principal_approve === "Approved"
      ) {
        setFilteredData((prev) => [...prev, item]);
      }
    });
  };

  useEffect(() => {
    getAdmittedStudentsData();
  }, []);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Collect Fees</p>
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
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setSelectedSection(e.target.value);
                      }}
                    >
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
                    <button
                      className="btn submit-btn-sm w-100"
                      onClick={filteredStudents}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
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
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="d-flex py-2 px-3 align-items-center justify-content-between">
                <p className="font-14 fw-500">Student List</p>
                <div className="d-flex align-items-center">
                  <img src={copy} className="theadicon mx-1" title="Copy" />
                  <img src={xls} className="theadicon mx-1" title="XLS" />
                  <img src={pdf} className="theadicon mx-1" title="PDF" />
                  <img src={printer} className="theadicon mx-1" title="Print" />
                </div>
              </div>
              <DataTable
                columns={columns}
                data={filteredData}
                customStyles={customStyle}
                dense
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
