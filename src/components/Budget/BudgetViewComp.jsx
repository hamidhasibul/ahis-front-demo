import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import converter from "number-to-words";
import noData from "../../assets/images/no_data.png";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";
export const BudgetViewComp = () => {
  const [budgetinfo, setBudgetinfo] = useState([]);
  const [income, setIncome] = useState([]);
  const [expanse, setExpanse] = useState([]);
  const [update, setUpdate] = useState([]);
  const [incomePurpose, setIncomePurpose] = useState("");
  const [incomeUnitCost, setIncomeUnitCost] = useState(0);
  const [incomeItemDetails, setIncomeItemDetails] = useState("");
  const [incomeQuantity, setIncomeQuantity] = useState(0);
  const [incomeItemAmount, setIncomeItemAmount] = useState(0);
  const [incomeItemRemark, setIncomeItemRemark] = useState("");
  const [activeid, setActiveid] = useState("");
  const [mhead, setMhead] = useState("");
  const [programName, setProgramName] = useState("");
  const [campus, setCampus] = useState("");
  const [guest, setGuest] = useState(0);
  const [yn, setYn] = useState(false);
  var etotal = 0;
  var itotal = 0;
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };
  const [tab, setTab] = useState("");
  const params = useParams();
  const { id } = params;

  const budgetData = () => {
    const data = new FormData();
    data.append("bid", id);
    fetch(`${import.meta.env.VITE_SERVER}/getbudgetFullinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setBudgetinfo(res.message[0]);
        setProgramName(res.message[0].pname);
        setCampus(res.message[0].campus);
        setGuest(res.message[0].guest);
        setIncome(res.income);
        setExpanse(res.expense);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const itemData = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getbudgetitemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setIncomePurpose(res.message[0].purpose);
        setIncomeUnitCost(res.message[0].unitcost);
        setIncomeQuantity(res.message[0].qty);
        setIncomeItemAmount(res.message[0].amount);
        setIncomeItemRemark(res.message[0].note);
        setIncomeItemDetails(res.message[0].details);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const addIncomeItems = () => {
    const data = new FormData();
    data.append("bid", id);
    data.append("type", "income");
    data.append("purpose", incomePurpose);
    data.append("unitcost", incomeUnitCost);
    data.append("details", incomeItemDetails);
    data.append("qty", incomeQuantity);
    data.append("amount", incomeItemAmount);
    data.append("note", incomeItemRemark);
    fetch(`${import.meta.env.VITE_SERVER}/addbudgetItem`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };
  const addexpanseItems = () => {
    const data = new FormData();
    data.append("bid", id);
    data.append("type", "expense");
    data.append("purpose", incomePurpose);
    data.append("unitcost", incomeUnitCost);
    data.append("details", incomeItemDetails);
    data.append("qty", incomeQuantity);
    data.append("amount", incomeItemAmount);
    data.append("note", incomeItemRemark);
    fetch(`${import.meta.env.VITE_SERVER}/addbudgetItem`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };
  const updateitemdata = () => {
    const data = new FormData();
    data.append("id", activeid);
    data.append("purpose", incomePurpose);
    data.append("unitcost", incomeUnitCost);
    data.append("qty", incomeQuantity);
    data.append("amount", incomeItemAmount);
    data.append("details", incomeItemDetails);
    data.append("note", incomeItemRemark);
    fetch(`${import.meta.env.VITE_SERVER}/updatebudgetitemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };
  const updatebudgetdata = () => {
    const data = new FormData();
    data.append("bid", id);
    data.append("pname", programName);
    data.append("guest", guest);
    data.append("campus", campus);
    fetch(`${import.meta.env.VITE_SERVER}/updatebudgetinfoById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };

  const submitBudget = () => {
    const data = new FormData();
    data.append("bid", id);
    fetch(`${import.meta.env.VITE_SERVER}/updatebudgetDoneById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };
  const deleteitem = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/budgetitemdelete`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const calculatedTotalCost = incomeUnitCost * incomeQuantity;
    setIncomeItemAmount(calculatedTotalCost);
  }, [incomeUnitCost, incomeQuantity]);

  useEffect(() => {
    itemData();
    budgetData();
  }, [update]);
  return (
    <div className="content-body">
      <button
        type="button"
        class="btn btn-sm btn-success"
        id="updatemodal"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
      >
        btn
      </button>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                {mhead}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {tab == "budgetitem" && (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label fw-bold label1">
                        Purpose
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        value={incomePurpose}
                        onChange={(e) => {
                          setIncomePurpose(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label fw-bold label1">
                        Unit Cost
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        value={incomeUnitCost}
                        onChange={(e) => {
                          setIncomeUnitCost(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label fw-bold label1">Qty</label>
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        value={incomeQuantity}
                        onChange={(e) => {
                          setIncomeQuantity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label fw-bold label1">
                        Amount
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        disabled
                        value={incomeItemAmount}
                      />
                    </div>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label fw-bold label1">
                        Details
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        value={incomeItemDetails}
                        required
                        onChange={(e) => {
                          setIncomeItemDetails(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label fw-bold label1">
                        Remark
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        value={incomeItemRemark}
                        required
                        onChange={(e) => {
                          setIncomeItemRemark(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn submit-btn-sm align-items-end bottom-0 end-0 w-100"
                        onClick={updateitemdata}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </>
              )}
              {tab == "budgetinfo" && (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Program Name</label>
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        value={programName}
                        onChange={(e) => {
                          setProgramName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">
                        Number Of Guest
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        value={guest}
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setGuest(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Choose Campus</label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setCampus(e.target.value);
                        }}
                      >
                        <option selected>{campus}</option>
                        <option>Boys</option>
                        <option>Girls</option>
                        <option>Junior</option>
                        <option>Boys & Girls</option>
                        <option>Girls & Junior</option>
                        <option>Boys & Junior</option>
                        <option>All</option>
                      </select>
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn submit-btn-sm align-items-end bottom-0 end-0 w-100"
                        onClick={updatebudgetdata}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </>
              )}
              {tab == "budgetitemdelete" && (
                <>
                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={deleteitem}
                  >
                    Yes
                  </button>

                  <button
                    class="btn submit-btn mt-2 mx-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    No
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex py-2 px-3 border-b justify-content-between align-items-center ">
        <p className="header-font ">Budget View</p>
        {budgetinfo?.status == "" ? (
          <>
            <div className="row">
              <div className="col-lg-7">
                <div class="form-check mb-1">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="1"
                    id="flexCheckDefault"
                    onChange={handlerChange}
                  />
                  <label
                    class="form-check-label font-12"
                    for="flexCheckDefault"
                  >
                    Make As Done
                  </label>
                </div>
              </div>
              <div className="col-lg-5 text-center">
                <button
                  className="btn submit-btn"
                  onClick={submitBudget}
                  disabled={yn !== true}
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="font-12 primary-color fw-bold">Complete</p>
          </>
        )}
      </div>
      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1 py-2">
            <div className="col-lg-12 border-bottom pb-2">
              <div className="d-flex justify-content-between">
                {budgetinfo?.status == "" ? (
                  <>
                    <p
                      className="font-11 mb-0 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        document.getElementById("updatemodal").click();
                        setMhead("Budget Info Update");
                        setUpdate(update + 1);
                        setTab("budgetinfo");
                      }}
                    >
                      {" "}
                      <i className="fa-solid fa-edit"></i> &nbsp;&nbsp;Update
                      Budget Info
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-11 mb-0 text-primary">Budget Complete</p>
                  </>
                )}

                <div className="d-flex align-items-center">
                  <img src={copy} className="theadicon mx-1" title="Copy" />
                  <img src={xls} className="theadicon mx-1" title="XLS" />
                  <img src={pdf} className="theadicon mx-1" title="PDF" />
                  <img src={printer} className="theadicon mx-1" title="Print" />
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-2">
              <div className="mx-1">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th className="py-1 bg-light font-14" width="15%">
                        Project Name
                      </th>
                      <td className="py-1 font-14" width="30%">
                        {budgetinfo?.pname}
                      </td>
                      <th className="py-1 bg-light font-14" width="10%">
                        Guest
                      </th>
                      <td className="py-1 font-14">{budgetinfo?.guest}</td>
                      <th className="py-1 bg-light font-14" width="10%">
                        Campus
                      </th>
                      <td className="py-1 font-14">{budgetinfo?.campus}</td>
                      <th className="py-1 bg-light font-14" width="10%">
                        Create Date
                      </th>
                      <td className="py-1 font-14">{budgetinfo?.gdate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className="row mx-1 border"
                style={{ backgroundColor: "#EEEEEE" }}
              >
                <div className="col-12 bg-white border-bottom d-flex justify-content-between align-items-center">
                  <label className="form-label fw-bold label1">Income</label>
                  {budgetinfo?.status == "" && (
                    <>
                      <p
                        className="font-12 text-primary"
                        onClick={() => {
                          setTab("addincome");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i class="fas fa-plus-circle"></i> Add Income
                      </p>
                    </>
                  )}
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">SL</label>
                </div>
                <div className="col-3">
                  <label className="form-label fw-bold label1">Purpose</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Unit Cost</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Quantity</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Amount</label>
                </div>
                <div className="col-2">
                  <label className="form-label fw-bold label1">Details</label>
                </div>
                <div className="col-2">
                  <label className="form-label fw-bold label1">Remark</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Action</label>
                </div>
              </div>
            </div>
            {tab == "addincome" && (
              <>
                <div className="col-lg-12">
                  <div className="row py-1 mx-1 border border-top-0">
                    <div className="col-4">
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomePurpose(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-1">
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeUnitCost(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-1">
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeQuantity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-1">
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        disabled
                        value={incomeItemAmount}
                      />
                    </div>
                    <div className="col-2">
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeItemDetails(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeItemRemark(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-1 text-center">
                      <p
                        className="font-11 mb-0 bg-primary text-light btn btn-submit"
                        onClick={addIncomeItems}
                        style={{ cursor: "pointer" }}
                      >
                        Add
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-lg-12">
              {income?.map((item, index) => {
                itotal = itotal + +item.amount;
                return (
                  <>
                    <div className="row py-1 mx-1 border border-top-0">
                      <div className="col-1">
                        <p className="form-label label1">{index + 1}</p>
                      </div>
                      <div className="col-3">
                        <p className="form-label label1">{item.purpose}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.unitcost}</p>
                      </div>

                      <div className="col-1">
                        <p className="form-label label1">{item.qty}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.amount}</p>
                      </div>
                      <div className="col-2">
                        <p className="form-label label1">{item.details}</p>
                      </div>
                      <div className="col-2">
                        <p className="form-label label1">{item.note}</p>
                      </div>
                      <div className="col-1">
                        {budgetinfo?.status == "" && (
                          <>
                            <i
                              class="fa-solid fa-edit font-11 mb-0 text-primary fw-bold mx-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                document.getElementById("updatemodal").click();
                                setActiveid(item.id);
                                setMhead("Income Update");
                                setUpdate(update + 1);
                                setTab("budgetitem");
                              }}
                            ></i>
                            <i
                              class="fa-solid fa-circle-xmark font-11 mb-0 text-danger fw-bold"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                document.getElementById("updatemodal").click();
                                setActiveid(item.id);
                                setMhead("Are You Sure!");
                                setUpdate(update + 1);
                                setTab("budgetitemdelete");
                              }}
                            ></i>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="row mx-1 border border-top-0">
                <div className="col-lg-8 py-1 text-end border-end">
                  <p className="mb-0 font-12 fw-bold">Grand Total</p>
                </div>
                <div className="col-lg-4 py-1">
                  <p className="mb-0 font-14 fw-bold"> {itotal}BDT</p>
                </div>
              </div>
            </div>

            <div className="col-lg-12 mt-3">
              <div
                className="row mx-1 border"
                style={{ backgroundColor: "#EEEEEE" }}
              >
                <div className="col-12 bg-white border-bottom d-flex justify-content-between align-items-center">
                  <label className="form-label fw-bold label1">
                    Expense Budget
                  </label>
                  {budgetinfo?.status == "" && (
                    <>
                      <p
                        className="font-12 text-primary"
                        onClick={() => {
                          setTab("addexpanse");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i class="fas fa-plus-circle"></i> Add Expense
                      </p>
                    </>
                  )}
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">SL</label>
                </div>
                <div className="col-3">
                  <label className="form-label fw-bold label1">Purpose</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Unit Cost</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Quantity</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Amount</label>
                </div>
                <div className="col-2">
                  <label className="form-label fw-bold label1">Details</label>
                </div>
                <div className="col-2">
                  <label className="form-label fw-bold label1">Remark</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Action</label>
                </div>
              </div>
            </div>
            {tab == "addexpanse" && (
              <>
                <div className="col-lg-12">
                  <div className="row py-1 mx-1 border border-top-0">
                    <div className="col-4">
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomePurpose(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-1">
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeUnitCost(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-1">
                      <input
                        className="form-control input1"
                        type="text"
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeQuantity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-1">
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        disabled
                        value={incomeItemAmount}
                      />
                    </div>
                    <div className="col-2">
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeItemDetails(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-2">
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setIncomeItemRemark(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-1 text-center">
                      <p
                        className="font-11 mb-0 bg-primary text-light btn btn-submit"
                        onClick={addexpanseItems}
                        style={{ cursor: "pointer" }}
                      >
                        Add
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-lg-12">
              {expanse?.map((item, index) => {
                etotal = etotal + +item.amount;
                return (
                  <>
                    <div className="row py-1 mx-1 border border-top-0">
                      <div className="col-1">
                        <p className="form-label label1">{index + 1}</p>
                      </div>
                      <div className="col-3">
                        <p className="form-label label1">{item.purpose}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.unitcost}</p>
                      </div>

                      <div className="col-1">
                        <p className="form-label label1">{item.qty}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.amount}</p>
                      </div>
                      <div className="col-2">
                        <p className="form-label label1">{item.details}</p>
                      </div>
                      <div className="col-2">
                        <p className="form-label label1">{item.note}</p>
                      </div>
                      <div className="col-1">
                        {budgetinfo?.status == "" && (
                          <>
                            <i
                              className="fa-solid fa-edit font-11 mb-0 text-primary mx-2 fw-bold"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                setActiveid(item.id);
                                document.getElementById("updatemodal").click();
                                setUpdate(update + 1);
                                setMhead("Expanse Update");
                                setTab("budgetitem");
                              }}
                            ></i>
                            <i
                              class="fa-solid fa-circle-xmark font-11 mb-0 text-danger fw-bold"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                document.getElementById("updatemodal").click();
                                setActiveid(item.id);
                                setMhead("Are You Sure!");
                                setUpdate(update + 1);
                                setTab("budgetitemdelete");
                              }}
                            ></i>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="row mx-1 border border-top-0">
                <div className="col-lg-8 py-1 text-end border-end">
                  <p className="mb-0 font-12 fw-bold">Grand Total</p>
                </div>
                <div className="col-lg-4 py-1">
                  <p className="mb-0 font-14 fw-bold"> {etotal}BDT</p>
                </div>
              </div>
            </div>
            <div className="row my-4 px-1">
              <div className="col-lg-8">
                <div className="bg-light p-3 px-4">
                  <div className="row border border-bottom-0">
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">Total Income</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">{itotal} BDT</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">Per Head Income</p>
                    </div>
                    <div className="col-lg-3 py-1">
                      <p className="mb-0 font-14">
                        {Number(itotal / +budgetinfo?.guest).toFixed(2)} BDT
                      </p>
                    </div>
                  </div>
                  <div className="row border">
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">Total Expense</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">{etotal} BDT</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">Per Head Expense</p>
                    </div>
                    <div className="col-lg-3 py-1">
                      <p className="mb-0 font-14">
                        {Number(etotal / +budgetinfo?.guest).toFixed(2)} BDT
                      </p>
                    </div>
                  </div>
                  <div className="row border border-top-0">
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14 fw-bold">Net Profit</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14 fw-bold">
                        {itotal - etotal} BDT
                      </p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14 fw-bold">Per Head Profit</p>
                    </div>
                    <div className="col-lg-3 py-1">
                      <p className="mb-0 font-14 fw-bold">
                        {Number(
                          (itotal - etotal) / Number(budgetinfo.guest)
                        ).toFixed(2)}{" "}
                        BDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
