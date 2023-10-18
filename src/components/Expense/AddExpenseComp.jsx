import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { Toast } from "primereact/toast";
import { UserRoleContext } from "../../context/UserRoleContext";

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

export const AddExpenseComp = () => {
  // States

  const toastTL = useRef(null);

  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [getAllExpensedataInfoData, setgetAllExpensedataInfoData] = useState(
    []
  );

  const [expenseHeadData, setExpenseHeadData] = useState([]);

  const [update, setUpdate] = useState([]);

  const [activeid, setActiveid] = useState("");
  const [campusinfo, setCampusinfo] = useState("");
  const [tab, setTab] = useState("add");

  function editdata(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
  // Table Format

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      width: "8%",
    },
    {
      name: "Description",
      selector: (row) => row.note,
      width: "15%",
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
      sortable: true,
      width: "10%",
    },
    {
      name: "Expense Head",
      selector: (row) => row.phead,
      width: "10%",
    },
    {
      name: "Campus",
      selector: (row) => row.campus,
      width: 200,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      width: "10%",
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      sortable: true,
      width: "10%",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.verified === "0" ? (
            <p className="mb-0">Pending</p>
          ) : (
            <p className="mb-0">Verified</p>
          )}
        </>
      ),
      width: "10%",
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              setTab("edit");
              editdata(row.id);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
      width: "10%",
    },
  ];

  // States

  const [expenseType, setExpenseType] = useState("");
  const [vals, setVals] = useState("");

  const [expenseHead, setExpenseHead] = useState("");
  const [note, setNote] = useState("");
  const [enote, setENote] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [expenseTo, setExpenseTo] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);

  var Arr = enote.split(",");
  const n = expenseTo + "," + note;
  // Conditions

  const conditions = [
    session === "",
    expenseType === "",
    campusinfo === "",
    expenseHead === "",
    feeAmount === "",
    paymentMode === "",
    submissionDate === "",
  ];
  // Function

  const addpaymentInfo = (e) => {
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
    data.append("type", "expense");
    data.append("ptype", expenseType);
    data.append("campus", campusinfo);
    data.append("phead", expenseHead);
    data.append("note", n);
    data.append("amount", feeAmount);
    data.append("mode", paymentMode);
    data.append("date", submissionDate);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/addpayment`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editpaymentInfo = (e) => {
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
    data.append("type", "expense");
    data.append("ptype", expenseType);
    data.append("campus", campusinfo);
    data.append("phead", expenseHead);
    data.append("note", n);
    data.append("amount", feeAmount);
    data.append("mode", paymentMode);
    data.append("date", submissionDate);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateExpensedata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setUpdate(update + 1);
          setTab("add");
          document.getElementById("form").reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllExpensedataInfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getExpensedata`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setgetAllExpensedataInfoData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getAllExpensedataInfoById = () => {
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
        setExpenseType(res.message[0].ptype);
        setExpenseHead(res.message[0].phead);
        setCampusinfo(res.message[0].campus);
        setPaymentMode(res.message[0].mode);
      })
      .catch((err) => console.log(err));
  };

  const getAllExpenseHead = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getExpense_head`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setExpenseHeadData(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllExpensedataInfoById();
    getAllExpensedataInfo();
    getAllExpenseHead();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        {tab == "add" && (
          <>
            <p className="header-font">Add Expense</p>
          </>
        )}
        {tab == "edit" && (
          <>
            <p className="header-font">Edit Expense</p>
          </>
        )}
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
                        <label className="form-label label1">
                          Expense Head
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setExpenseHead(e.target.value);
                          }}
                        >
                          <option value={""} Selected>
                            Select
                          </option>
                          {expenseHeadData.map((item) => (
                            <option key={item.id} value={item.expense_head}>
                              {item.expense_head}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Expense Type
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setExpenseType(e.target.value);
                          }}
                        >
                          <option value={""} Selected>
                            Select
                          </option>
                          <option>OPEX</option>
                          <option>CAPEX</option>
                        </select>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Expense To</label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setExpenseTo(e.target.value);
                          }}
                        >
                          <option value={""} Selected>
                            Select
                          </option>
                          <option>A</option>
                          <option>B</option>
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
                  <form onSubmit={editpaymentInfo} id="form">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Date</label>
                        <input
                          type="date"
                          className="form-control input1"
                          value={submissionDate}
                          onChange={(e) => {
                            setSubmissionDate(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Expense Head
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setExpenseHead(e.target.value);
                          }}
                        >
                          <option Selected>{expenseHead}</option>
                          {expenseHeadData.map((item) => (
                            <option key={item.id} value={item.expense_head}>
                              {item.expense_head}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Expense Type
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setExpenseType(e.target.value);
                          }}
                        >
                          <option Selected>{expenseType}</option>
                          <option>OPEX</option>
                          <option>CAPEX</option>
                        </select>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Expense To</label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setExpenseTo(e.target.value);
                          }}
                        >
                          <option Selected>{Arr[0]}</option>
                          <option>A</option>
                          <option>B</option>
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
                        <label className="form-label label1">Note</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder={Arr[1]}
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
              <p className="font-14 fw-500 mb-2">Fees Particular's</p>

              <DataTable
                columns={columns}
                data={getAllExpensedataInfoData}
                customStyles={customStyle}
                dense
                pagination
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
