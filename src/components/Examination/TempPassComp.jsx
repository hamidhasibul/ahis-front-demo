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
import { UserRoleContext } from "../../context/UserRoleContext";

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

export const TempPassComp = () => {
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [studentInfoById, setStudentInfoById] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [mode, setMode] = useState("all");

  const [examName, setExamName] = useState("");
  const [passStart, setPassStart] = useState("");
  const [passEnd, setPassEnd] = useState("");

  const [tempPassData, setTempPassData] = useState([]);

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
    },
    {
      name: "St. Name",
      selector: (row) => row.sname,
    },
    {
      name: "Exam Name",
      selector: (row) => row.ename,
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
      name: "Session",
      selector: (row) => row.session,
    },
    {
      name: "Approval Status",
      cell: (row) => (
        <>
          {+row.status === 1 ? (
            <>Approved</>
          ) : +row.status === 0 ? (
            <>Rejected</>
          ) : (
            <>Pending</>
          )}
        </>
      ),
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

  const getstudentById = (id) => {
    const data = new FormData();
    data.append("student_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIDCardViewByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setStudentInfoById(res.message[0]);
      })
      .catch((err) => console.log(err));
  };

  const createTempPass = async () => {
    const data = new FormData();

    data.append("session", session);
    data.append("student_id", studentInfoById.student_id);
    data.append(
      "sname",
      studentInfoById.student_first_name +
        " " +
        studentInfoById.student_last_name
    );
    data.append("Class", studentInfoById.Class);
    data.append("section", studentInfoById.section);
    data.append("ename", examName);
    data.append("pstart", passStart);
    data.append("pend", passEnd);
    data.append("compile", username + "," + designation + "," + user);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/addtmpPass`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      console.log(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getTempPassData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/gettmpPassdata`,
        {
          method: "POST",
        }
      );

      const res = await response.json();

      setTempPassData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdmittedStudentsData();
    getTempPassData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Temporary Exam Pass</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-4 py-1 border-end">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
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
                      <div className="col-lg-12 mb-2">
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

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Student</label>
                        <select
                          className="form-select input1 py-0"
                          onClick={(e) => {
                            getstudentById(e.target.value);
                          }}
                        >
                          <option selected>Select Student</option>
                          {admittedStudentsData
                            .filter((item) => {
                              return (
                                item.Class === selectedClass &&
                                item.section === selectedSection &&
                                item.principal_approve === "Approved"
                              );
                            })
                            .map((item) => (
                              <option key={item.id} value={item.student_id}>
                                {item.student_first_name}{" "}
                                {item.student_last_name} {item.student_id}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
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
                      <div className="col-lg-6">
                        <label className="form-label label1">Pass Start</label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPassStart(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-6">
                        <label className="form-label label1">Pass End</label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPassEnd(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 text-center mx-auto">
                        <button
                          className="btn submit-btn w-100 my-2"
                          type="submit"
                          onClick={createTempPass}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="d-flex py-2 px-3 align-items-center justify-content-between">
                  <p className="font-14 fw-500">Student List</p>
                  <div className="d-flex align-items-center">
                    <img src={copy} className="theadicon mx-1" title="Copy" />
                    <img src={xls} className="theadicon mx-1" title="XLS" />
                    <img src={pdf} className="theadicon mx-1" title="PDF" />
                    <img
                      src={printer}
                      className="theadicon mx-1"
                      title="Print"
                    />
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={tempPassData}
                  customStyles={customStyle}
                  dense
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
