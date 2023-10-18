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

export const AdmitCardGenerateComp = () => {
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const [examName, setExamName] = useState("");
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
      name: "St. ID",
      cell: (row) => (
        <div
          onClick={() => {
            makeidcard(row.student_id);
          }}
        >
          {row.student_id}
        </div>
      ),
      width: "20%",
    },
    {
      name: "St. Name",
      selector: (row) => row.sname,
      width: "25%",
    },
    {
      name: "Class",
      selector: (row) => row.Class,
      width: "15%",
    },
    {
      name: "Section",
      selector: (row) => row.section,
      width: "20%",
    },
    {
      name: "Status",
      selector: (row) => row.gender,
      width: "20%",
    },
  ];

  // Functions
  function makeidcard(id) {
    setActiveid(id);
    setUpdate(update + 1);
    setMode("indu");
  }

  const getAdmittedStudentsData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchEligibleStudents`, {
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
    fetch(`${import.meta.env.VITE_SERVER}/getEligibleStudentIDCardViewByid`, {
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
          selectedSection.toLowerCase().replace(" ", "")
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
          <p className="header-font">Admit Card Generate</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-5 py-1 border-end">
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
                              return item.session === session && +item.pstatus;
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
                      <div className="col-lg-12">
                        <label className="form-label label1">
                          Examination Name
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setExamName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-12">
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
                  </div> */}
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
              <div className="col-lg-7 py-2 admitcardView px-0">
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
                <div className="row px-2 ">
                  {mode == "all" && (
                    <>
                      {filteredData.map((item) => {
                        return (
                          <>
                            <div className="py-2">
                              <div
                                className="admitcard rounded border"
                                key={item.id}
                              >
                                <div
                                  className="d-flex justify-content-center pt-2"
                                  style={{
                                    backgroundColor: "#f9f9f9",
                                    height: "90px",
                                  }}
                                >
                                  <img src={logo} style={{ height: "60px" }} />
                                </div>
                                <div className="row justify-content-center pb-2">
                                  <div className="col-lg-6">
                                    <div className="text-center py-2">
                                      <p
                                        className="mb-0 rounded-pill border font-14 py-1 fw-bold text-dark"
                                        style={{
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {examName}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between px-3 py-2 backgroundlogo">
                                  <div className="div" style={{ width: "70%" }}>
                                    <table className="table mb-0">
                                      <tr>
                                        <th
                                          className="py-1 font-12"
                                          width="20%"
                                        >
                                          ID
                                        </th>
                                        <td
                                          className="py-1 font-12 border-bottom"
                                          width="80%"
                                        >
                                          : {item.student_id}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th
                                          className="py-0  font-12"
                                          width="20%"
                                        >
                                          Name
                                        </th>
                                        <td
                                          className="py-1 font-12 border-bottom"
                                          width="80%"
                                        >
                                          : {item.sname}
                                        </td>
                                      </tr>
                                    </table>
                                    <table className="table m-0 p-0">
                                      <tr>
                                        <th
                                          className="py-1 font-12"
                                          width="20%"
                                        >
                                          Class
                                        </th>
                                        <td
                                          className="py-1 font-12 border-bottom"
                                          width="30%"
                                        >
                                          : {item.Class}
                                        </td>
                                        <th
                                          className="py-1 font-12"
                                          width="20%"
                                        >
                                          Section
                                        </th>
                                        <td
                                          className="py-1 font-12 border-bottom"
                                          width="30%"
                                        >
                                          : {item.section}
                                        </td>
                                      </tr>
                                    </table>
                                  </div>

                                  <div className="">
                                    {item.student_picture == "" ? (
                                      <>No Image</>
                                    ) : (
                                      <>
                                        <img
                                          src={
                                            `${
                                              import.meta.env.VITE_IMG_SERVER
                                            }` + item?.student_picture
                                          }
                                          className="ID_Card_img"
                                          style={{ height: "100px" }}
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="row justify-content-between px-3 mt-4">
                                  <div className="col-lg-6">
                                    <p className=" font-11 pt-3">
                                      <span className="fw-bold font-11">
                                        Session:
                                      </span>{" "}
                                      {session}
                                    </p>
                                  </div>
                                  <div className="col-lg-6 text-center">
                                    <div>
                                      <p className="border-bottom font-14">
                                        Sign
                                      </p>
                                      <p className="font-10">Director, STAD</p>
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
                      <div className="col-lg-8 py-2">
                        <div className="admitcard rounded border">
                          <div
                            className="d-flex justify-content-center pt-2"
                            style={{
                              backgroundColor: "#f9f9f9",
                              height: "55px",
                            }}
                          >
                            <img src={logo} style={{ height: "35px" }} />
                          </div>
                          <div className="row justify-content-center pb-2">
                            <div className="col-lg-6">
                              <div className="text-center py-1">
                                <p
                                  className="mb-0 rounded-pill border font-13 text-dark"
                                  style={{
                                    backgroundColor: "#f9f9f9",
                                  }}
                                >
                                  {examName}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between px-3 pb-1 backgroundlogo">
                            <div className="div" style={{ width: "100%" }}>
                              <table className="table m-0">
                                <tr>
                                  <th className="py-1 font-12" width="20%">
                                    ID
                                  </th>
                                  <td
                                    className="py-1 font-12 border-bottom"
                                    width="80%"
                                  >
                                    : {studentInfoById?.student_id}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="py-0  font-12" width="20%">
                                    Name
                                  </th>
                                  <td
                                    className="py-1 font-12 border-bottom"
                                    width="80%"
                                  >
                                    :{studentInfoById?.sname}
                                  </td>
                                </tr>
                              </table>
                              <table class=" table m-0">
                                <tr>
                                  <th className="py-1 font-12" width="20%">
                                    Class
                                  </th>
                                  <td
                                    className="py-1 font-12 border-bottom"
                                    width="30%"
                                  >
                                    : {studentInfoById?.Class}
                                  </td>
                                  <th className="py-1 font-12" width="20%">
                                    Section
                                  </th>
                                  <td
                                    className="py-1 font-12 border-bottom"
                                    width="30%"
                                  >
                                    : {studentInfoById?.section}
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <div className="row justify-content-between px-3 mt-3">
                            <div className="col-lg-6">
                              <p className=" font-11 pt-3">
                                <span className="fw-bold font-11">
                                  Session:
                                </span>{" "}
                                {session}
                              </p>
                            </div>
                            <div className="col-lg-6 text-center">
                              <div>
                                <p className="border-bottom font-14">Sign</p>
                                <p className="font-10">Director, STAD</p>
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
