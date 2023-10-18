import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";

import { ClassContext } from "../../context/ClassContext";
import { SessionContext } from "../../context/SessionContext";
import { Toast } from "primereact/toast";

// Table Styling

const customStyle = {
  rows: {
    style: {
      fontSize: "11px",
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

export const AddStudentIncomeComp = () => {
  // States
  const toastTL = useRef(null);
  const [loader, setLoader] = useState(false);

  const { classInfo } = useContext(ClassContext);
  const { session } = useContext(SessionContext);

  const [admittedData, setAdmittedData] = useState([]);
  const [incomeHeadData, setIncomeHeadData] = useState([]);
  const [getStudentIncomeInfo, setGetStudentIncomeInfo] = useState([]);
  const [update, setUpdate] = useState([]);
  const [tab, setTab] = useState("add");
  const [activeid, setActiveid] = useState("");

  // Table Format

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Description",
      selector: (row) => row.note,
    },
    {
      name: "Student ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "Income Head",
      selector: (row) => row.ihead,
    },
    {
      name: "Campus",
      selector: (row) => row.campus,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              edit(row.payment_id);
              setTab("edit");
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];
  function edit(id) {
    setActiveid(id);
    setUpdate(update + 1);
    console.log(id);
  }
  // States

  const [fil, setFil] = useState("");
  const [incomehead, setIncomeHead] = useState("");
  const [section, setSection] = useState("");
  const [sname, setSname] = useState("");
  const [Sclass, setSclass] = useState("");
  const [studentID, setStudentID] = useState("");
  const [note, setNote] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [campusinfo, setCampusinfo] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);

  // Validation Condition

  const conditions = [
    session === "",
    studentID === "",
    incomehead === "",
    campusinfo === "",
    feeAmount === "",
    paymentMode === "",
    submissionDate === "",
  ];

  // Function

  const addpaymentInfo = (e) => {
    setLoader(true);

    e.preventDefault();

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();
    data.append("session", session);
    data.append("student_id", studentID);
    data.append("type", "income");
    data.append("ihead", incomehead);
    data.append("campus", campusinfo);
    data.append("note", note);
    data.append("amount", feeAmount);
    data.append("mode", paymentMode);
    data.append("date", submissionDate);
    fetch(`${import.meta.env.VITE_SERVER}/addStudentIncome`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message2 == true) {
          setLoader(false);
          setUpdate(update + 1);
          document.getElementById("form").reset();
        } else {
          alert(res.message.sqlMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const UpdatePaymentInfo = (e) => {
    setLoader(true);

    e.preventDefault();

    // for (let i = 0; i < conditions.length; i++) {
    //   if (conditions[i]) {
    //     setLoader(false);
    //     toastTL.current.show({
    //       severity: "error",
    //       summary: "Error",
    //       detail: "Fill up the required fields!",
    //       life: 2000,
    //     });
    //     return false;
    //   }
    // }

    const data = new FormData();
    data.append("session", session);
    data.append("payment_id", activeid);
    data.append("type", "income");
    data.append("ihead", incomehead);
    data.append("campus", campusinfo);
    data.append("note", note);
    data.append("amount", feeAmount);
    data.append("mode", paymentMode);
    data.append("date", submissionDate);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateStudentIncome`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setLoader(false);
          setUpdate(update + 1);
          setTab("add");
        } else {
          alert(res.message.sqlMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllStudentIncomeInfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIncome`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setGetStudentIncomeInfo(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getAllIncomeHead = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getincomeHeadStudent`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setIncomeHeadData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getAllStudentData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmittedData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getSinconedataInfoById = () => {
    const data = new FormData();
    data.append("payment_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getstudentIncomeaById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmissionDate(res.message[0].date);
        setNote(res.message[0].note);
        setFeeAmount(res.message[0].amount);
        setIncomeHead(res.message[0].ihead);
        setCampusinfo(res.message[0].campus);
        setPaymentMode(res.message[0].mode);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllStudentData();
    getAllIncomeHead();
    getAllStudentIncomeInfo();
    getSinconedataInfoById();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">
          {tab == "add" ? <>Add</> : <>Edit</>} Student Income
        </p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-3 pt-2">
              {tab == "add" && (
                <>
                  <form onSubmit={addpaymentInfo} id="form">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Date</label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setSubmissionDate(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Income Head</label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setIncomeHead(e.target.value);
                          }}
                        >
                          <option value={""} Selected>
                            Select
                          </option>
                          {incomeHeadData.map((item) => (
                            <option key={item.id} value={item.income_head}>
                              {item.income_head}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Student Name
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          id="hd"
                          placeholder={sname}
                          onChange={(e) => setFil(e.target.value)}
                          onClick={() => {
                            document.getElementById("iddd").style.display =
                              "block";
                          }}
                        />
                        <div
                          id="iddd"
                          style={{
                            display: "none",
                            position: "absolute",
                            backgroundColor: "#fff",
                            width: "18.8%",
                            padding: "10px",
                          }}
                          className="shadow"
                        >
                          {admittedData
                            .filter((item) => {
                              if (
                                item.student_id
                                  .toLowerCase()
                                  .includes(fil.toLowerCase())
                              ) {
                                return item;
                              }
                            })
                            .map((item) => (
                              <p
                                key={item.id}
                                className="m-0 py-1 border-bottom font-12"
                                onClick={() => {
                                  setSection(item.section);
                                  setSname(item.student_first_name);
                                  setSclass(item.Class);
                                  setStudentID(item.student_id);
                                  document.getElementById(
                                    "iddd"
                                  ).style.display = "none";
                                }}
                              >
                                {item.student_first_name},{item.student_id},
                                {item.Class},{item.section}
                              </p>
                            ))}
                        </div>
                      </div>

                      <div className="col-lg-4 mb-2 pe-0">
                        <label className="form-label label1">ID</label>
                        <input
                          className="form-control input1 p-1 font-11"
                          type="text"
                          placeholder=""
                          value={studentID}
                          aria-label="form-control example"
                          readOnly
                        />
                      </div>
                      <div className="col-lg-4 mb-2">
                        <label className="form-label label1">Class</label>
                        <input
                          className="form-control input1 p-1 font-11"
                          type="text"
                          placeholder=""
                          value={Sclass}
                          aria-label="form-control example"
                          readOnly
                        />
                      </div>
                      <div className="col-lg-4 mb-2 ps-0">
                        <label className="form-label label1">Section</label>
                        <input
                          className="form-control input1 p-1 font-11"
                          type="text"
                          placeholder=""
                          value={section}
                          aria-label="form-control example"
                          readOnly
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Payment Mode
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPaymentMode(e.target.value);
                          }}
                        >
                          <option value={""} Selected>
                            Select
                          </option>
                          <option>Cash</option>
                          <option>Bank</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Choose Campus
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setCampusinfo(e.target.value);
                          }}
                        >
                          <option value={""} Selected>
                            Select
                          </option>
                          <option>Boys</option>
                          <option>Girls</option>
                          <option>Junior</option>
                          <option>Boys & Girls</option>
                          <option>Girls & Junior</option>
                          <option>Boys & Junior</option>
                          <option>All</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Note</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setNote(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Amount</label>
                        <input
                          className="form-control input1"
                          type="number"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setFeeAmount(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-4 offset-8 text-end">
                        <button
                          className="btn submit-btn-sm w-100"
                          type="submit"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {tab == "edit" && (
                <>
                  {" "}
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Student ID</label>
                    <input
                      type="text"
                      value={activeid}
                      className="form-control input1"
                      readOnly
                    />
                  </div>
                  <form onSubmit={UpdatePaymentInfo} id="form">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Date</label>
                        <input
                          type="date"
                          value={submissionDate.slice(0, 10)}
                          className="form-control input1"
                          onChange={(e) => {
                            setSubmissionDate(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Income Head</label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setIncomeHead(e.target.value);
                          }}
                        >
                          <option Selected>{incomehead}</option>
                          {incomeHeadData.map((item) => (
                            <option key={item.id} value={item.income_head}>
                              {item.income_head}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Student Name
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          id="hd"
                          placeholder={sname}
                          onChange={(e) => setFil(e.target.value)}
                          onClick={() => {
                            document.getElementById("iddd").style.display =
                              "block";
                          }}
                        />
                        <div
                          id="iddd"
                          style={{
                            display: "none",
                            position: "absolute",
                            backgroundColor: "#fff",
                            width: "18.8%",
                            padding: "10px",
                          }}
                          className="shadow"
                        >
                          {admittedData
                            .filter((item) => {
                              if (
                                item.student_id
                                  .toLowerCase()
                                  .includes(fil.toLowerCase())
                              ) {
                                return item;
                              }
                            })
                            .map((item) => (
                              <p
                                key={item.id}
                                className="m-0 py-1 border-bottom font-12"
                                onClick={() => {
                                  setSection(item.section);
                                  setSname(item.student_first_name);
                                  setSclass(item.Class);
                                  setStudentID(item.student_id);
                                  document.getElementById(
                                    "iddd"
                                  ).style.display = "none";
                                }}
                              >
                                {item.student_first_name},{item.student_id},
                                {item.Class},{item.section}
                              </p>
                            ))}
                        </div>
                      </div>
                      </div>
                      <div className="col-lg-4 mb-2">
                        <label className="form-label label1">Class</label>
                        <input
                          className="form-control input1 p-1 font-11"
                          type="text"
                          placeholder=""
                          value={Sclass}
                          aria-label="form-control example"
                          readOnly
                        />
                      </div>
                      <div className="col-lg-4 mb-2 ps-0">
                        <label className="form-label label1">Section</label>
                        <input
                          className="form-control input1 p-1 font-11"
                          type="text"
                          placeholder=""
                          value={section}
                          aria-label="form-control example"
                          readOnly
                        />
                      </div> */}
                      {/* <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Student ID</label>
                        <input
                          className="form-control input1 p-1 font-11"
                          type="text"
                          placeholder=""
                          value={activeid}
                          aria-label="form-control example"
                          readOnly
                        /> */}
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Payment Mode
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setPaymentMode(e.target.value);
                          }}
                        >
                          <option Selected>{paymentMode}</option>
                          <option>Cash</option>
                          <option>Bank</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Choose Campus
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setCampusinfo(e.target.value);
                          }}
                        >
                          <option Selected>{campusinfo}</option>
                          <option>Boys</option>
                          <option>Girls</option>
                          <option>Junior</option>
                          <option>Boys & Girls</option>
                          <option>Girls & Junior</option>
                          <option>Boys & Junior</option>
                          <option>All</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Note</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={note}
                          aria-label="form-control example"
                          onChange={(e) => {
                            setNote(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Amount</label>
                        <input
                          className="form-control input1"
                          type="number"
                          placeholder=""
                          value={feeAmount}
                          aria-label="form-control example"
                          onChange={(e) => {
                            setFeeAmount(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-4 offset-8 text-end">
                        <button
                          className="btn submit-btn-sm w-100"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
            <div className="col-lg-9 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Student Income Particular's</p>

              <DataTable
                columns={columns}
                data={getStudentIncomeInfo}
                customStyles={customStyle}
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
                dense
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
