import React, { useContext, useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { SessionContext } from "../../context/SessionContext";
import { SectionContext } from "../../context/SectionContext";
import { ClassContext } from "../../context/ClassContext";
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

export const EcaEnrollmentComp = () => {
  const toastTL = useRef(null);

  // States

  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const { sectionInfo, update, setUpdate } = useContext(SectionContext);
  const [loader, setLoader] = useState(false);
  const [club, setClub] = useState("");
  const [clubname, setClubname] = useState("");
  const [clubnames, setClubnames] = useState("");
  const [fil, setFil] = useState("");
  const [studentid, setStudentid] = useState("");
  const [studentname, setStudentname] = useState("");
  const [allClubData, setAllClubData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [getallstudentclubdata, setGetallstudentclubdata] = useState([]);

  const [feeInfoData, setFeeInfoData] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [selectedRows, setSelectedRows] = useState(false);

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
  const conditions = [clubname === ""];

  // Functions

  function addclub() {
    setLoader(true);

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Enter Club Name!",
          life: 2000,
        });
        return false;
      }
    }
    const data = new FormData();
    data.append("session", session);
    data.append("club_name", clubname);

    fetch(`${import.meta.env.VITE_SERVER}/addClub`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoader(false);
        setUpdate(update + 1);

        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: "Club Added!",
          life: 2000,
        });
      })
      .catch((err) => {
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Something went wrong! ${err}`,
          life: 2000,
        });
        console.log(err);
      });
  }

  function addstudentonclub(selectedRows) {
    if (!clubnames) {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Select Club!",
        life: 2000,
      });
      return false;
    }

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
    setLoader(true);
    selectedRows.map((item) => {
      const data = new FormData();
      data.append("session", session);
      data.append("club_name", clubnames);
      data.append("student_id", item.student_id);
      data.append(
        "student_name",
        `${item.student_first_name} ${item.student_last_name}`
      );
      data.append("class_std", item.Class);
      data.append("section", item.section);
      fetch(`${import.meta.env.VITE_SERVER}/addStudentClub`, {
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
  }

  const getFeeInfoData = () => {
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
            item.feeType === "ECA Fee" &&
            item.feeDesc.toLowerCase().includes(clubnames.toLowerCase())
          ) {
            setFeeInfoData(item);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const addPaymentECA = (selectedRows) => {
    if (!clubnames) {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Select Club!",
        life: 2000,
      });
      return false;
    }

    if (selectedRows.length === 0) {
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
      data.append("fees_info", "ECA Fee");
      data.append("feesType", feeInfoData.feeType);
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

  const getClubData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/getClub`, {
        method: "POST",
      });

      const data = await res.json();
      setAllClubData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStudent = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`,
        { method: "POST" }
      );
      const data = await res.json();
      setStudentData(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
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
        item.Class.toString().toLowerCase() ===
          selectedClass.toString().toLowerCase() &&
        item.section.toString().toLowerCase() ===
          selectedSection.toString().toLowerCase() &&
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

  const [yn2, setYn2] = useState(false);
  const handlerChange2 = (e) => {
    if (e.target.checked) {
      setYn2(true);
    } else {
      setYn2(false);
    }
  };

  useEffect(() => {
    getClubData();
    getAllStudent();
  }, [update]);

  useEffect(() => {
    getFeeInfoData();
  }, [selectedClass, clubnames]);

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">ECA Enrollment</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-4">
                <div className="row">
                  <div className="d-flex  mt-2 py-1">
                    <p className="text1 mb-0">Add Club</p>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Club Name</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      required
                      onChange={(e) => setClubname(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-8">
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
                  <div className="col-lg-4 text-end">
                    <button
                      className="btn submit-btn-sm w-100"
                      onClick={addclub}
                      disabled={yn !== true}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 bg1  pb-3 rounded">
                <div className="d-flex  mt-2 py-1">
                  <p className="text1 mb-0">Add Student</p>
                </div>
                <div className="row">
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Club</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => setClubnames(e.target.value)}
                    >
                      <option selected>Select Club</option>
                      {allClubData
                        .filter((item) => {
                          return +item.status === 1;
                        })
                        .map((item) => (
                          <option key={item.id} value={item.club_name}>
                            {item.club_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 mb-2">
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
                          return +item.pstatus === 1;
                        })
                        .map((item) => (
                          <option key={item.id} value={item.class_name}>
                            {item.class_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-4 mb-2">
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
                          return (
                            item.class_name === selectedClass &&
                            +item.pstatus === 1
                          );
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
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mt-4 mb-3">
                <p className="font-14 fw-500 mb-2">
                  Club Enrollment{" "}
                  <span className="mb-0 ms-3 rounded bg-primary text-white py-1 px-2 fs-12">
                    {clubnames ? clubnames : ""}
                  </span>
                </p>{" "}
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
                    onChange={handlerChange2}
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
                    addstudentonclub(selectedRows);
                    addPaymentECA(selectedRows);
                  }}
                  disabled={yn2 !== true}
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
