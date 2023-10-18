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
import logo from "../../assets/images/ahis-logo.png";
import cambridge from "../../assets/images/site-logo.png";
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
    },
  },
};

export const IdCardComp = () => {
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [studentInfoById, setStudentInfoById] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [mode, setMode] = useState("all");

  // Table Format
  const columns = [
    {
      name: "Student ID",
      cell: (row) => (
        <div
          onClick={() => {
            makeidcard(row.student_id);
          }}
        >
          {row.student_id}
        </div>
      ),
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
      name: "Section",
      selector: (row) => row.section,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
  ];

  // Functions
  function makeidcard(id) {
    setActiveid(id);
    setUpdate(update + 1);
    setMode("indu");
  }

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

  const getstudentById = () => {
    const data = new FormData();
    data.append("student_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIDCardViewByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setStudentInfoById(res.message[0]);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
    getstudentById();
  }, [update]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Students's Information</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-6 py-1 border-end">
                <div className="row">
                  <div className="col-lg-12">
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
                          onClick={(e) => {
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
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Search Student
                        </label>
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
                          onClick={filteredStudents}
                        >
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="d-flex py-2 px-3 align-items-center justify-content-between">
                    <p className="font-14 fw-500">Student List</p>
                    {/* <div className="d-flex align-items-center">
                      <img src={copy} className="theadicon mx-1" title="Copy" />
                      <img src={xls} className="theadicon mx-1" title="XLS" />
                      <img src={pdf} className="theadicon mx-1" title="PDF" />
                      <img
                        src={printer}
                        className="theadicon mx-1"
                        title="Print"
                      />
                    </div> */}
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
              <div className="col-lg-6 py-2 px-0" style={{ overflowX: "auto" }}>
                <div className="d-flex py-2 px-2 align-items-center justify-content-between border-bottom">
                  <p className="font-13 fw-500">Admit Card View</p>
                  <div className="d-flex align-items-center">
                    <img src={pdf} className="theadicon mx-1" title="PDF" />
                    <img
                      src={printer}
                      className="theadicon mx-1"
                      title="Print"
                    />
                  </div>
                </div>
                <div className="row px-2">
                  {mode == "all" && (
                    <>
                      {filteredData.map((item) => {
                        return (
                          <>
                            <div className="py-2">
                              <div
                                className="idcard rounded border"
                                key={item.id}
                              >
                                <div
                                  className="d-flex justify-content-center pt-3"
                                  style={{
                                    backgroundColor: "#f9f9f9",
                                    height: "90px",
                                  }}
                                >
                                  <img src={logo} style={{ height: "60px" }} />
                                </div>
                                <div className="row justify-content-center py-2">
                                  <div className="col-lg-6">
                                    <div className="text-center">
                                      <p
                                        className="mb-0 rounded-pill font-14 py-1 text-white"
                                        style={{
                                          backgroundColor: "cornflowerblue",
                                        }}
                                      >
                                        STUDENT ID
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-lg-3">
                                    <img
                                      src={
                                        `${import.meta.env.VITE_IMG_SERVER}` +
                                        item.student_picture
                                      }
                                      className="ID_Card_img"
                                      style={{ height: "120px" }}
                                    />
                                  </div>
                                  <div className="col-lg-5">
                                    <table className="border-0">
                                      <tr>
                                        <th
                                          className="py-1  font-14"
                                          width="20%"
                                        >
                                          Name
                                        </th>
                                        <td
                                          className="py-1 font-18 fw-bold"
                                          width="80%"
                                        >
                                          :{" "}
                                          {item.student_first_name +
                                            " " +
                                            item.student_last_name}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th
                                          className="py-1 font-14"
                                          width="20%"
                                        >
                                          ID
                                        </th>
                                        <td
                                          className="py-1 font-14"
                                          width="80%"
                                        >
                                          : {item.student_id}
                                        </td>
                                      </tr>

                                      <tr>
                                        <th
                                          className="py-1 font-14"
                                          width="20%"
                                        >
                                          Class
                                        </th>
                                        <td
                                          className="py-1 font-14"
                                          width="80%"
                                        >
                                          : {item.Class}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th
                                          className="py-1 font-14"
                                          width="20%"
                                        >
                                          Section
                                        </th>
                                        <td
                                          className="py-1 font-14"
                                          width="80%"
                                        >
                                          : {item.section}
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                  <div className="col-lg-4 mt-5">
                                    <p className="fs-12 fst-italic mb-1">
                                      Affiliated With
                                    </p>
                                    <img
                                      src={cambridge}
                                      className=""
                                      style={{ height: "25px" }}
                                    />
                                  </div>
                                </div>
                                <div className="row justify-content-between px-3">
                                  <div className="col-lg-4">
                                    <p className=" font-13 pt-3">
                                      <span className="fw-bold">
                                        Validity :
                                      </span>{" "}
                                      {session}
                                    </p>
                                  </div>

                                  <div className="col-lg-4 text-center">
                                    <div>
                                      <p className="border-bottom font-14">
                                        Sign
                                      </p>
                                      <p className="font-11">Director, STAD</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                  {mode == "indu" && (
                    <>
                      <div className="py-2">
                        <div className="idcard rounded border">
                          <div
                            className="d-flex justify-content-center pt-3"
                            style={{
                              backgroundColor: "#f9f9f9",
                              height: "90px",
                            }}
                          >
                            <img src={logo} style={{ height: "60px" }} />
                          </div>
                          <div className="row justify-content-center py-2">
                            <div className="col-lg-6">
                              <div className="text-center">
                                <p
                                  className="mb-0 rounded-pill font-14 py-1 text-white"
                                  style={{
                                    backgroundColor: "cornflowerblue",
                                  }}
                                >
                                  STUDENT ID
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row p-3">
                            <div className="col-lg-3">
                              <img
                                src={
                                  `${import.meta.env.VITE_IMG_SERVER}` +
                                  studentInfoById?.student_picture
                                }
                                className="ID_Card_img"
                                style={{ height: "120px" }}
                              />
                            </div>
                            <div className="col-lg-5">
                              <table className="border-0">
                                <tr>
                                  <th className="py-1 font-14" width="20%">
                                    Name
                                  </th>
                                  <td
                                    className="py-1 font-18 fw-bold"
                                    width="80%"
                                  >
                                    :{" "}
                                    {studentInfoById?.student_first_name +
                                      " " +
                                      studentInfoById?.student_last_name}
                                  </td>
                                </tr>

                                <tr>
                                  <th className="py-1 font-14" width="20%">
                                    ID
                                  </th>
                                  <td className="py-1 font-14" width="80%">
                                    : {studentInfoById?.student_id}
                                  </td>
                                </tr>

                                <tr>
                                  <th className="py-1 font-14" width="20%">
                                    Class
                                  </th>
                                  <td className="py-1 font-14" width="80%">
                                    : {studentInfoById?.Class}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="py-1 font-14" width="20%">
                                    Section
                                  </th>
                                  <td className="py-1 font-14" width="80%">
                                    : {studentInfoById?.section}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div className="col-lg-4 mt-5">
                              <p className="fs-12 fst-italic mb-1">
                                Affiliated With
                              </p>
                              <img
                                src={cambridge}
                                className=""
                                style={{ height: "25px" }}
                              />
                            </div>
                          </div>
                          <div className="row justify-content-between px-3">
                            <div className="col-lg-6">
                              <p className=" font-13 pt-3">
                                <span className="fw-bold">Validity :</span>{" "}
                                {session}
                              </p>
                            </div>
                            <div className="col-lg-4 text-center">
                              <div>
                                <p className="border-bottom font-14">Sign</p>
                                <p className="font-11">Director, STAD</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
