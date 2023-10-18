import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
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

export const AddGeneralIncomeComp = () => {
  const toastTL = useRef(null);

  // States
  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const [generalIncome, getGeneralIncome] = useState([]);

  const [incomeHeadData, setIncomeHeadData] = useState([]);
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
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "Expense Head",
      selector: (row) => row.phead,
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
              edit(row.id);
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
  }

  // States
  const [generalHead, setGeneralHead] = useState("");
  const [note, setNote] = useState("");
  const [enote, setENote] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [campusinfo, setCampusinfo] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);
  var Arr = enote.split(",");
  // const n = expenseTo + "," + note;
  // Validation Condition

  const conditions = [
    session === "",
    generalHead === "",
    campusinfo === "",
    feeAmount === "",
    paymentMode === "",
    submissionDate === "",
  ];

  // Function

  const addgeneralincome = (e) => {
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
    data.append("type", "income");
    data.append("phead", generalHead);
    data.append("campus", campusinfo);
    data.append("note", note);
    data.append("amount", feeAmount);
    data.append("mode", paymentMode);
    data.append("date", submissionDate);
    fetch(`${import.meta.env.VITE_SERVER}/addGenaralIncome`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          alert(res.message.sqlMessage);
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
  const updategeneralincome = (e) => {
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
    data.append("id", activeid);
    data.append("session", session);
    data.append("type", "income");
    data.append("phead", generalHead);
    data.append("ptype", "genaral");
    data.append("campus", campusinfo);
    data.append("note", note);
    data.append("amount", feeAmount);
    data.append("mode", paymentMode);
    data.append("date", submissionDate);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateExpensedata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
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

  const getGeneralIncomedatainfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getGeneralIncomedata`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        getGeneralIncome(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getAllIncomeHead = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getincomeHeadGeneral`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setIncomeHeadData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getGinconedataInfoById = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getExpensedataById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmissionDate(res.message[0].date);
        setENote(res.message[0].note);
        setNote(res.message[0].note);
        setFeeAmount(res.message[0].amount);
        setGeneralHead(res.message[0].phead);
        setCampusinfo(res.message[0].campus);
        setPaymentMode(res.message[0].mode);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGinconedataInfoById();
    getGeneralIncomedatainfo();
    getAllIncomeHead();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">
          {tab == "add" ? <>Add</> : <>Edit</>} Genaral Income
        </p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-3 pt-2">
              {tab == "add" && (
                <>
                  <form onSubmit={addgeneralincome} id="form">
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
                            setGeneralHead(e.target.value);
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
                  <form onSubmit={updategeneralincome} id="form">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Date</label>
                        <input
                          type="date"
                          value={submissionDate}
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
                            setGeneralHead(e.target.value);
                          }}
                        >
                          <option Selected>{generalHead}</option>
                          {incomeHeadData.map((item) => (
                            <option key={item.id} value={item.income_head}>
                              {item.income_head}
                            </option>
                          ))}
                        </select>
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
              <p className="font-14 fw-500 mb-2">Genaral Income Particular's</p>

              <DataTable
                columns={columns}
                data={generalIncome}
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
