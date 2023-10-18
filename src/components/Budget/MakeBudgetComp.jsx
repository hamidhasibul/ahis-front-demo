import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890ABCDEFG", 6);
import { Toast } from "primereact/toast";
import converter from "number-to-words";
import { SessionContext } from "../../context/SessionContext";
import { UserRoleContext } from "../../context/UserRoleContext";
import { useNavigate } from "react-router-dom";

export const MakeBudgetComp = () => {
  const { session } = useContext(SessionContext);

  let navigate = useNavigate();
  const toastTL = useRef(null);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  // ANCHOR Budget HEAD States

  const [budgetID, setBudgetID] = useState(nanoid(6));
  const [programName, setProgramName] = useState("");
  const [campus, setCampus] = useState("");
  const [gDate, setGDate] = useState("");
  const [guest, setGuest] = useState(0);

  // ANCHOR  Expense Budget States

  const [expensePurpose, setExpensePurpose] = useState("");
  const [expenseUnitCost, setExpenseUnitCost] = useState(0);
  const [expenseQuantity, setExpenseQuantity] = useState(0);
  const [expenseItemAmount, setExpenseItemAmount] = useState(0);
  const [expenseItemRemark, setExpenseItemRemark] = useState("");
  const [expenseItemDetails, setExpenseItemDetails] = useState("");
  const [expenseItemsArray, setExpenseItemsArray] = useState([]);

  // ANCHOR  Income Budget States

  const [incomePurpose, setIncomePurpose] = useState("");
  const [incomeUnitCost, setIncomeUnitCost] = useState(0);
  const [incomeQuantity, setIncomeQuantity] = useState(0);
  const [incomeItemAmount, setIncomeItemAmount] = useState(0);
  const [incomeItemRemark, setIncomeItemRemark] = useState("");
  const [incomeItemDetails, setIncomeItemDetails] = useState("");
  const [incomeItemsArray, setIncomeItemsArray] = useState([]);

  const totalExpense = useMemo(() => {
    return expenseItemsArray.reduce(
      (total, item) => total + Number(item.amount),
      0
    );
  }, [expenseItemsArray]);

  const totalIncome = useMemo(() => {
    return incomeItemsArray.reduce(
      (total, item) => total + Number(item.amount),
      0
    );
  }, [incomeItemsArray]);

  // Validation Condition

  /*  const conditions = [
    budgetID === "",
    campus === "",
    gDate === "",
    expDate === "",
    itemName === "",
    vabdor === "",
    mop === "",
    itemAmount === "",
    itemRemark === "",
  ]; */

  // Validation Condition

  // const poConditions = [
  //   poID === "",
  //   requID === "",
  //   poType === "",
  //   poDate === "",
  //   termsConditionsArray.length === 0,
  //   itemsArray.length === 0,
  // ];

  // Functions

  const addExpenseItems = (e) => {
    e.preventDefault();
    /* for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    } */
    const newObject = {
      budgetID: budgetID,
      purpose: expensePurpose,
      unitCost: expenseUnitCost,
      quantity: expenseQuantity,
      details: expenseItemDetails,
      amount: expenseItemAmount,
      remark: expenseItemRemark,
    };
    setExpenseItemsArray([...expenseItemsArray, newObject]);
    setIndex(index + 1);
    setExpensePurpose("");
    setExpenseUnitCost(0);
    setExpenseQuantity(0);
    setExpenseItemAmount(0);
    setExpenseItemRemark("");
    setExpenseItemDetails("");
    document.getElementById("form").reset();
  };

  const addIncomeItems = (e) => {
    e.preventDefault();
    document.getElementById("form").reset();
    /* for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    } */
    const newObject = {
      budgetID: budgetID,
      purpose: incomePurpose,
      unitCost: incomeUnitCost,
      quantity: incomeQuantity,
      amount: incomeItemAmount,
      details: incomeItemDetails,
      remark: incomeItemRemark,
    };
    setIncomeItemsArray([...incomeItemsArray, newObject]);
    setIndex(index2 + 1);
    setIncomePurpose("");
    setIncomeUnitCost(0);
    setIncomeQuantity(0);
    setIncomeItemAmount(0);
    setIncomeItemRemark("");
    setExpenseItemDetails("");
  };

  const removeExpenseItem = (index) => {
    const updatedData = [...expenseItemsArray];
    updatedData.splice(index, 1);
    setExpenseItemsArray(updatedData);
    setIndex(index - 1);
  };

  const removeIncomeItem = (index) => {
    const updatedData = [...incomeItemsArray];
    updatedData.splice(index, 1);
    setIncomeItemsArray(updatedData);
    setIndex2(index2 - 1);
  };

  const incomeItemsSubmit = (incomeItemsArray) => {
    if (incomeItemsArray.length === 0) {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Fill up the required fields!",
        life: 2000,
      });
      return false;
    }

    incomeItemsArray?.map((item) => {
      const data = new FormData();
      data.append("bid", item.budgetID);
      data.append("type", "income");
      data.append("purpose", item.purpose);
      data.append("unitcost", item.unitCost);
      data.append("qty", item.quantity);
      data.append("details", item.details);
      data.append("amount", item.amount);
      data.append("note", item.remark);
      fetch(`${import.meta.env.VITE_SERVER}/addbudgetItem`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((err) => console.log(err));
    });
  };

  const expenseItemsSubmit = (expenseItemsArray) => {
    if (expenseItemsArray.length === 0) {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Fill up the required fields!",
        life: 2000,
      });
      return false;
    }

    expenseItemsArray?.map((item) => {
      const data = new FormData();
      data.append("bid", item.budgetID);
      data.append("type", "expense");
      data.append("purpose", item.purpose);
      data.append("unitcost", item.unitCost);
      data.append("qty", item.quantity);
      data.append("details", item.details);
      data.append("amount", item.amount);
      data.append("note", item.remark);
      fetch(`${import.meta.env.VITE_SERVER}/addbudgetItem`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((err) => console.log(err));
    });
  };

  const budgetSubmit = () => {
    const data = new FormData();
    data.append("bid", budgetID);
    data.append("pname", programName);
    data.append("guest", guest);
    data.append("perheadincome", totalIncome / Number(guest));
    data.append("perheadexpanse", totalExpense / Number(guest));
    data.append("campus", campus);
    data.append("gdate", gDate);
    data.append("tincome", totalIncome);
    data.append("texpence", totalExpense);
    data.append("profit", totalIncome - totalExpense);
    data.append("session", session);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/addbudgetinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          navigate("/budgetlist");
        }
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = () => {
    budgetSubmit();
    incomeItemsSubmit(incomeItemsArray);
    expenseItemsSubmit(expenseItemsArray);
  };

  useEffect(() => {
    const calculatedTotalCost = expenseUnitCost * expenseQuantity;
    setExpenseItemAmount(calculatedTotalCost);
  }, [expenseUnitCost, expenseQuantity]);

  useEffect(() => {
    const calculatedTotalCost = incomeUnitCost * incomeQuantity;
    setIncomeItemAmount(calculatedTotalCost);
  }, [incomeUnitCost, incomeQuantity]);

  return (
    <>
      <div className="content-body">
        {/* {loader && <Loader />} */}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Make Budget</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-2 mb-2">
              <div className="col-lg-2">
                <label className="form-label label1">Budget ID</label>
                <input
                  className="form-control input1"
                  type="text"
                  value={budgetID}
                  aria-label="form-control example"
                  disabled
                  required
                />
              </div>
              <div className="col-lg-4">
                <label className="form-label label1">Program Name</label>
                <input
                  className="form-control input1"
                  type="text"
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setProgramName(e.target.value);
                  }}
                />
              </div>
              <div className="col-lg-2">
                <label className="form-label label1">Number Of Guest</label>
                <input
                  className="form-control input1"
                  type="text"
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setGuest(e.target.value);
                  }}
                />
              </div>
              <div className="col-lg-2">
                <label className="form-label label1">Choose Campus</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setCampus(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>
                  <option>Boys</option>
                  <option>Girls</option>
                  <option>Junior</option>
                  <option>Boys & Girls</option>
                  <option>Girls & Junior</option>
                  <option>Boys & Junior</option>
                  <option>All</option>
                </select>
              </div>
              <div className="col-lg-2">
                <label className="form-label label1">Generate Date</label>
                <input
                  className="form-control input1"
                  type="date"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setGDate(e.target.value);
                  }}
                  value={gDate}
                />
              </div>
            </div>

            {/* ANCHOR add expense form */}
            <form onSubmit={addExpenseItems} id="form">
              <div
                className="row mx-1 rounded pb-3 "
                style={{ backgroundColor: "#EEEEEE" }}
              >
                <div className="col-12 py-2 px-3 border-bottom">
                  <p className="font-14 fw-bold ">Expense Budget</p>
                </div>
                <div className="col-1">
                  <label className="form-label label1">Sl</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    value={index + 1}
                    aria-label="form-control example"
                    disabled
                    required
                  />
                </div>
                <div className="col-3">
                  <label className="form-label label1">Purpose</label>
                  <input
                    className="form-control input1"
                    type="text"
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setExpensePurpose(e.target.value);
                    }}
                  />
                </div>

                <div className="col-1">
                  <label className="form-label label1">Unit Cost</label>
                  <input
                    className="form-control input1"
                    type="number"
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setExpenseUnitCost(e.target.value);
                    }}
                  />
                </div>

                <div className="col-1">
                  <label className="form-label label1">Qty</label>
                  <input
                    className="form-control input1"
                    type="number"
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setExpenseQuantity(e.target.value);
                    }}
                  />
                </div>

                <div className="col-1">
                  <label className="form-label label1">Amount</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    value={expenseItemAmount}
                    disabled
                  />
                </div>
                <div className="col-2">
                  <label className="form-label label1">Details</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setExpenseItemDetails(e.target.value);
                    }}
                  />
                </div>
                <div className="col-2">
                  <label className="form-label label1">Remark</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setExpenseItemRemark(e.target.value);
                    }}
                  />
                </div>

                <div className="col-1">
                  <label className="form-label label1 invisible">
                    Location
                  </label>
                  <button className="btn submit-btn-sm w-100" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="row mx-1 mt-2"
                  style={{ backgroundColor: "#EEEEEE" }}
                >
                  <div className="col-1">
                    <label className="form-label fw-bold label1">SL</label>
                  </div>
                  <div className="col-3">
                    <label className="form-label fw-bold label1">Purpose</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">
                      Unit Cost
                    </label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Qty</label>
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
              <div className="col-lg-12">
                {expenseItemsArray?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="row pt-1 mx-1 border-start border-end border-bottom"
                        key={item.id}
                      >
                        <div className="col-1">
                          <p className="form-label label1">{index + 1}</p>
                        </div>
                        <div className="col-3">
                          <p className="form-label label1">{item.purpose}</p>
                        </div>
                        <div className="col-1">
                          <p className="form-label label1">{item.unitCost}</p>
                        </div>

                        <div className="col-1">
                          <p className="form-label label1">{item.quantity}</p>
                        </div>

                        <div className="col-1">
                          <p className="form-label label1">{item.amount}</p>
                        </div>
                        <div className="col-2">
                          <p className="form-label label1">{item.details}</p>
                        </div>
                        <div className="col-2">
                          <p className="form-label label1">{item.remark}</p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fa-solid fa-xmark fa-icon"
                            onClick={() => {
                              removeExpenseItem(index);
                            }}
                          ></i>
                        </div>
                      </div>
                    </>
                  );
                })}

                <div className="row mx-1 border border-top-0">
                  <div className="col-lg-8 py-1 text-end border-end">
                    <p className="mb-0 font-12 fw-bold">Total Expense</p>
                  </div>
                  <div className="col-lg-4 py-1">
                    <p className="mb-0 font-14 fw-bold">{totalExpense}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            {/* ANCHOR Income budget form */}
            <form onSubmit={addIncomeItems} id="form">
              <div
                className="row mx-1 rounded pb-3 "
                style={{ backgroundColor: "#EEEEEE" }}
              >
                <div className="col-12 py-2 px-3 border-bottom">
                  <p className="font-14 fw-bold ">Income Budget</p>
                </div>
                <div className="col-1">
                  <label className="form-label label1">Sl</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    value={index2 + 1}
                    aria-label="form-control example"
                    disabled
                    required
                  />
                </div>
                <div className="col-3">
                  <label className="form-label label1">Purpose</label>
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
                  <label className="form-label label1">Unit Cost</label>
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
                  <label className="form-label label1">Qty</label>
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
                  <label className="form-label label1">Amount</label>
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
                  <label className="form-label label1">Details</label>
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
                  <label className="form-label label1">Remark</label>
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

                <div className="col-1">
                  <label className="form-label label1 invisible">
                    Location
                  </label>
                  <button className="btn submit-btn-sm w-100" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="row mx-1 mt-2"
                  style={{ backgroundColor: "#EEEEEE" }}
                >
                  <div className="col-1">
                    <label className="form-label fw-bold label1">SL</label>
                  </div>
                  <div className="col-3">
                    <label className="form-label fw-bold label1">Purpose</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">
                      Unit Cost
                    </label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Qty</label>
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
              <div className="col-lg-12">
                {incomeItemsArray?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="row pt-1 mx-1 border-start border-end border-bottom"
                        key={item.id}
                      >
                        <div className="col-1">
                          <p className="form-label label1">{index + 1}</p>
                        </div>
                        <div className="col-3">
                          <p className="form-label label1">{item.purpose}</p>
                        </div>
                        <div className="col-1">
                          <p className="form-label label1">{item.unitCost}</p>
                        </div>
                        <div className="col-1">
                          <p className="form-label label1">{item.quantity}</p>
                        </div>

                        <div className="col-1">
                          <p className="form-label label1">{item.amount}</p>
                        </div>
                        <div className="col-2">
                          <p className="form-label label1">{item.details}</p>
                        </div>
                        <div className="col-2">
                          <p className="form-label label1">{item.remark}</p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fa-solid fa-xmark fa-icon"
                            onClick={() => {
                              removeIncomeItem(index2);
                            }}
                          ></i>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="row mx-1 border border-top-0">
                  <div className="col-lg-8 py-1 text-end border-end">
                    <p className="mb-0 font-12 fw-bold">Total Income</p>
                  </div>
                  <div className="col-lg-4 py-1">
                    <p className="mb-0 font-14 fw-bold">{totalIncome}</p>
                  </div>
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
                      <p className="mb-0 font-14">{totalIncome} BDT</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">Per Head Income</p>
                    </div>
                    <div className="col-lg-3 py-1">
                      <p className="mb-0 font-14">
                        {Number(totalIncome / guest).toFixed(2)} BDT
                      </p>
                    </div>
                  </div>
                  <div className="row border">
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">Total Expense</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">{totalExpense} BDT</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14">Per Head Expense</p>
                    </div>
                    <div className="col-lg-3 py-1">
                      <p className="mb-0 font-14">
                        {Number(totalExpense / guest).toFixed(2)} BDT
                      </p>
                    </div>
                  </div>
                  <div className="row border border-top-0">
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14 fw-bold">Net Profit</p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14 fw-bold">
                        {totalIncome - totalExpense} BDT
                      </p>
                    </div>
                    <div className="col-lg-3 border-end py-1">
                      <p className="mb-0 font-14 fw-bold">Per Head Profit</p>
                    </div>
                    <div className="col-lg-3 py-1">
                      <p className="mb-0 font-14 fw-bold">
                        {Number((totalIncome - totalExpense) / guest).toFixed(
                          2
                        )}{" "}
                        BDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-3 px-1 justify-content-end">
              <div className="col-lg-2">
                <button
                  className="btn submit-btn-sm align-items-end bottom-0 end-0 w-100"
                  onClick={submitHandler}
                >
                  Save & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
