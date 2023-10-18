import React, { useContext, useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";
import { Toast } from "primereact/toast";
import { UserRoleContext } from "../../context/UserRoleContext";

const customStyle = {
  rows: {
    style: {
      fontSize: "12px",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: 600,
      backgroundColor: "#dddddd",
    },
  },
};

export const HifzEnrollmentComp = () => {
  const toastTL = useRef(null);

  // States

  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo, update, setUpdate } = useContext(SectionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [studentData, setStudentData] = useState([]);
  const [feeInfoData, setFeeInfoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedRows, setSelectedRows] = useState(false);

  // Table Format

  const columns = [
    {
      name: "Student Name",
      selector: (row) => row.student_first_name + " " + row.student_last_name,
    },
    {
      name: "Student ID",
      selector: (row) => row.student_id,
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
      name: "House",
      selector: (row) => row.house,
    },
  ];

  // Conditions
  // const conditions = [clubname === ""];

  // Functions

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const getAllStudent = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      setStudentData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeeInfoData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/fetchFeeInfo`, {
        method: "POST",
      });
      const data = await res.json();
      setFeeInfoData([]);
      data.message.forEach((item) => {
        if (
          item.feeClass === selectedClass &&
          item.session === session &&
          item.feeType === "Hifz Fee"
        ) {
          setFeeInfoData(item);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* const getFeeInfoData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeInfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeInfoData([]);
        res.message.map((item) => {
          if (
            item.feeClass === selectedClass &&
            item.session === session &&
            item.feeType === "Hifz Fee"
          ) {
            setFeeInfoData(item);
          }
        });
      })
      .catch((err) => console.log(err));
  }; */
  const addStudentHifz2 = (selectedRows) => {
    selectedRows.map((item) => {
      const data = new FormData();
      data.append("student_id", item.student_id);
      data.append(
        "student_name",
        item.student_first_name + " " + item.student_last_name
      );
      data.append("Class", item.Class);
      data.append("session", session);
      data.append("section", item.section);
      fetch(`${import.meta.env.VITE_SERVER}/addHifzStudent`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setLoader(false);
          setUpdate(update + 1);
        })
        .catch((err) => console.log(err));
    });
  };
  const addStudentHifz = (selectedRows) => {
    if (selectedRows.length === 0) {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Select Students!",
        life: 2000,
      });
      return false;
    }

    selectedRows.map((item) => {
      const data = new FormData();
      data.append("student_id", item.student_id);
      data.append("fees_info", "");
      data.append("feesType", "Hifz");
      data.append(
        "due_date",
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
      data.append("amount", feeInfoData.amount);
      data.append("payment_mode", "");
      data.append("payment_id", "");
      data.append(
        "payment_date",
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
      data.append("discount", "");
      data.append("paymentStatus", "");
      data.append("advancePayment", 0);
      data.append("fine", "");
      data.append("paid", "");
      data.append("balance", feeInfoData.amount);
      data.append("session", session);
      data.append("compile", username + "," + designation + "," + user);

      fetch(`${import.meta.env.VITE_SERVER}/addFeesCollection`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setLoader(false);
          setUpdate(update + 1);
        })
        .catch((err) => console.log(err));
    });
  };

  const filteredStudents = () => {
    if (selectedClass === "" || selectedSection === "") {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Select Class or Section!",
        life: 2000,
      });
      return false;
    }
    setFilteredData([]);
    [...studentData].filter((item) => {
      if (
        item.Class.toLowerCase().replace(" ", "") ===
          selectedClass.toLowerCase().replace(" ", "") &&
        item.section.toLowerCase().replace(" ", "") ===
          selectedSection.toLowerCase().replace(" ", "") &&
        !item.status3 &&
        item.principal_approve === "Approved"
      ) {
        setFilteredData((prev) => [...prev, item]);
      }
    });
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
    getAllStudent();
  }, [update]);

  useEffect(() => {
    getFeeInfoData();
  }, [selectedClass]);

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        <Toast ref={toastTL} position="top-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Hifz Enrollment</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-1">
              {/* Filters */}

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
                        ?.filter((item) => {
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
                      <option selected value={""}>
                        Select Section
                      </option>
                      {sectionInfo
                        ?.filter((item) => {
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
                    />
                  </div>
                  <div className="col-lg-2 offset-10 text-end">
                    <button className="btn submit-btn-sm w-100">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* DataTable */}

              <div className="col-lg-12 mt-4 mb-3">
                <p className="font-14 fw-500 mb-2">Hifz Enrollment</p>
                <DataTable
                  columns={columns}
                  data={filteredData}
                  customStyles={customStyle}
                  onSelectedRowsChange={handleSelectedChange}
                  selectableRows
                  dense
                  pagination
                />
              </div>

              <div className="col-lg-12">
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
              <div className="col-lg-2 text-end">
                <button
                  className="btn submit-btn-sm w-100"
                  onClick={() => {
                    addStudentHifz(selectedRows);
                    addStudentHifz2(selectedRows);
                  }}
                  disabled={yn !== true}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
