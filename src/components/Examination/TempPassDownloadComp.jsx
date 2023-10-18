import React, { useEffect } from "react";
import { useContext } from "react";
import DataTable from "react-data-table-component";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";
import { useState } from "react";
import logo from "../../assets/images/ahis-logo.png";

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

export const TempPassDownloadComp = () => {
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [tempPassData, setTempPassData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [mode, setMode] = useState("all");
  const [activeid, setActiveid] = useState("");
  const [update, setUpdate] = useState(0);

  const [studentInfoById, setStudentInfoById] = useState([]);

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
  ];

  // Functions

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

  const filterStudents = () => {
    setFilteredData([]);

    [...tempPassData]?.filter((item) => {
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
      })
      .catch((err) => console.log(err));
  };

  function makeidcard(id) {
    setActiveid(id);
    setUpdate(update + 1);
    setMode("indu");
  }

  useEffect(() => {
    getTempPassData();
    getstudentById();
  }, [update]);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Temporary Pass Generate</p>
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
                            return item.session === session;
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
                        onClick={filterStudents}
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
            <div className="col-lg-7 py-2 admitcardView">
              <div className="row">
                {mode == "all" && (
                  <>
                    {filteredData.map((item) => {
                      return (
                        <>
                          <div className="col-8 mb-2">
                            <div
                              className="admitcard rounded border"
                              key={item.id}
                            >
                              <div
                                className="d-flex justify-content-center pt-3"
                                style={{
                                  backgroundColor: "#f9f9f9",
                                  height: "60px",
                                }}
                              >
                                <img src={logo} style={{ height: "35px" }} />
                              </div>
                              <div className="row justify-content-center py-2">
                                <div className="col-lg-6">
                                  <div className="text-center py-1">
                                    <p
                                      className="mb-0 rounded-pill py-1 border font-13 text-dark"
                                      style={{
                                        backgroundColor: "#f9f9f9",
                                      }}
                                    >
                                      {/* {examName} */}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between p-5 pt-3 pb-3">
                                <div className="div" style={{ width: "75%" }}>
                                  <table className="table">
                                    <tr>
                                      <th
                                        className="py-0 font-12 py-2 "
                                        width="20%"
                                      >
                                        ID
                                      </th>
                                      <td
                                        className="py-0 font-12 border-bottom"
                                        width="80%"
                                      >
                                        : {item.student_id}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th
                                        className="py-0  font-12 py-2"
                                        width="20%"
                                      >
                                        Name
                                      </th>
                                      <td
                                        className="py-0 font-12 border-bottom"
                                        width="80%"
                                      >
                                        : {item.sname}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th
                                        className="py-0 font-12 py-2"
                                        width="20%"
                                      >
                                        Class
                                      </th>
                                      <td
                                        className="py-0 font-12 border-bottom"
                                        width="80%"
                                      >
                                        : {item.Class}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th
                                        className="py-0 font-12 py-2"
                                        width="20%"
                                      >
                                        Section
                                      </th>
                                      <td
                                        className="py-0 font-12 border-bottom"
                                        width="80%"
                                      >
                                        : {item.section}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <div className="div">
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG_SERVER}` +
                                      item.pic
                                    }
                                    className="admit_Card_img"
                                  />
                                </div>
                              </div>
                              <div className="row justify-content-between px-5">
                                <div className="col-lg-6">
                                  <p className=" font-11 pt-2">
                                    <span className="fw-bold font-11">
                                      *Note:
                                    </span>{" "}
                                    It is mandatory to carry of your admit card
                                    to the examination hall.
                                  </p>
                                </div>
                                <div className="col-lg-4 text-center">
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
                          className="d-flex justify-content-center pt-3"
                          style={{
                            backgroundColor: "#f9f9f9",
                            height: "60px",
                          }}
                        >
                          <img src={logo} style={{ height: "35px" }} />
                        </div>
                        <div className="row justify-content-center py-2">
                          <div className="col-lg-6">
                            <div className="text-center py-1">
                              <p
                                className="mb-0 rounded-pill py-1 border font-13 text-dark"
                                style={{
                                  backgroundColor: "#f9f9f9",
                                }}
                              >
                                {/* {examName} */}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between p-5 pt-3 pb-3">
                          <div className="div" style={{ width: "75%" }}>
                            <table className="table">
                              <tr>
                                <th className="py-0 font-12 py-2" width="20%">
                                  ID
                                </th>
                                <td
                                  className="py-0 font-12 border-bottom"
                                  width="80%"
                                >
                                  : {studentInfoById?.student_id}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-0  font-12 py-2" width="20%">
                                  Name
                                </th>
                                <td
                                  className="py-0 font-12 border-bottom"
                                  width="80%"
                                >
                                  :{studentInfoById?.sname}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-0 font-12 py-2" width="20%">
                                  Class
                                </th>
                                <td
                                  className="py-0 font-12 border-bottom"
                                  width="80%"
                                >
                                  : {studentInfoById?.Class}
                                </td>
                              </tr>
                              <tr>
                                <th className="py-0 font-12 py-2" width="20%">
                                  Section
                                </th>
                                <td
                                  className="py-0 font-12 border-bottom"
                                  width="80%"
                                >
                                  : {studentInfoById?.section}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div className="div">
                            <img
                              src={
                                `${import.meta.env.VITE_IMG_SERVER}` +
                                studentInfoById?.pic
                              }
                              className="admit_Card_img"
                            />
                          </div>
                        </div>
                        <div className="row justify-content-between px-5">
                          <div className="col-lg-6">
                            <p className=" font-11 pt-2">
                              <span className="fw-bold font-11">*Note:</span> It
                              is mandatory to carry of your admit card to the
                              examination hall.
                            </p>
                          </div>
                          <div className="col-lg-4 text-center">
                            <div>
                              <p className="border-bottom font-14">Sign</p>
                              <p className="font-10">Director, STAD</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
