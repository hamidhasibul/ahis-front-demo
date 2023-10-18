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
import { UserRoleContext } from "../../context/UserRoleContext";
import { PaymentHistoryModal } from "../modal/PaymentHistoryModal";

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

export const ExamEligibilityComp = () => {
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [selectedStudents, setSelectedStudents] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [activeid, setActiveid] = useState("");
  const [note, setNote] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [modalID, setModalID] = useState("");
  // Function

  const addeligibleforadmit = (e) => {
    const data = new FormData();
    data.append("student_id", e);
    data.append("note", note);
    data.append("session", session);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/addEligibleStudentForExam`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  const addrejectadmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("student_id", activeid);
    data.append("note", note);
    data.append("session", session);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/addEligibleStudentForExam`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedStudents(selectedRows);
  };
  // Table Format
  const columns = [
    {
      name: "Student ID",
      selector: (row) => row.id,
      width: "10%",
    },
    {
      name: "Student Name",
      selector: (row) => row.sname,
      width: "15%",
    },
    {
      name: "Class",
      selector: (row) => row.class,
      width: "10%",
    },
    {
      name: "section",
      selector: (row) => row.section,
      width: "10%",
    },

    {
      name: "Gender",
      selector: (row) => row.gender,
      width: "10%",
    },
    {
      name: "Father contact",
      selector: (row) => row.fname,
      width: "12%",
    },
    {
      name: "Due Balance",
      selector: (row) => row.due,
      width: "10%",
    },
    // {
    //   name: "Mother contact",
    //   selector: (row) => row.mother_contact,
    // },

    {
      name: "Payment Info",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-eye fa-icon me-2"
            data-bs-toggle="modal"
            data-bs-target="#paymentHistory"
            onClick={() => {
              setModalID(row.id);
            }}
          ></i>
        </>
      ),
      width: "10%",
    },
    {
      name: "Eligible Status",
      button: true,
      cell: (row) => (
        <>
          {row.due == 0 ? (
            <>
              <i
                className="fa-solid fa-circle-check text-success fa-icon me-3 font-16"
                onClick={() => {
                  addeligibleforadmit(row.id);
                }}
              ></i>
            </>
          ) : (
            <>
              <i
                className="fa-solid fa-circle-check text-danger fa-icon me-3 font-16"
                onClick={() => {
                  document.getElementById("hmodal").click();
                  setActiveid(row.id);
                }}
              ></i>
            </>
          )}
        </>
      ),
      width: "10%",
    },
  ];

  // Functions

  const getAdmittedStudentsData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/feesCollectionDueBalance`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmittedStudentsData(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const filteredStudents = () => {
    setFilteredData([]);
    [...admittedStudentsData]?.filter((item) => {
      if (
        item.class.toLowerCase().replace(" ", "") ===
          selectedClass.toLowerCase().replace(" ", "") &&
        item.section.toLowerCase().replace(" ", "") ===
          selectedSection.toLowerCase().replace(" ", "")
        /* (item.student_id
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase()) &&
          item.student_first_name
            .toString()
            .toLowerCase()
            .includes(searchFilter.toString().toLowerCase())) */
      ) {
        setFilteredData((prev) => [...prev, item]);
      }
    });
  };

  const addeligibleforadmitBulk = (selectedStudents) => {
    selectedStudents.map((item) => {
      const data = new FormData();
      data.append("student_id", item.id);
      data.append("note", "");
      data.append("session", session);
      data.append("compile", username + "," + designation + "," + user);
      fetch(`${import.meta.env.VITE_SERVER}/addEligibleStudentForExam`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    getAdmittedStudentsData();
  }, []);

  return (
    <>
      {/* modal */}
      <button
        type="button"
        class="btn btn-primary"
        id="hmodal"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Reject Note
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={addrejectadmit}>
                <label className="form-label label1">Note</label>
                <textarea
                  name=""
                  id=""
                  rows="2"
                  className=" form-control font-12"
                  placeholder=""
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                ></textarea>

                <button
                  class="btn submit-btn mt-2"
                  type="submit"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}

      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Exam Eligibility</p>
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
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Search Student</label>
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
                onSelectedRowsChange={handleSelectedChange}
                selectableRows
                dense
                pagination
              />

              <div class="row justify-content-end px-3 mb-3">
                <div className="col-lg-3">
                  <button
                    type="button"
                    class="btn w-100 submit-btn"
                    onClick={() => {
                      addeligibleforadmitBulk(selectedStudents);
                    }}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentHistoryModal modalID={modalID} />
    </>
  );
};
