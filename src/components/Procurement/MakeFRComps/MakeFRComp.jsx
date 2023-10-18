import React, { useEffect, useState, useRef, useContext } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890AHIS", 6);
import { Toast } from "primereact/toast";
import converter from "number-to-words";
import { SessionContext } from "../../../context/SessionContext";
import { UserRoleContext } from "../../../context/UserRoleContext";

export const MakeFRComp = () => {
  let amount = 0;
  const toastTL = useRef(null);
  const [poID, setPoID] = useState(nanoid(6));
  const { session } = useContext(SessionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [temp, setTemp] = useState("");
  const [total, setTotal] = useState("");
  const [index, setindex] = useState(0);

  const [campus, setCampus] = useState("");
  const [gDate, setGDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [csID, setCsID] = useState("");
  const [requID, setRequID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierLocation, setSupplierLocation] = useState("");
  const [supplierContact, setSupplierContact] = useState("");

  const [supplierData, setSupplierData] = useState([]);

  // Item States

  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemBrand, setItemBrand] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);
  const [itemRemark, setItemRemark] = useState("");
  const [vabdor, setVabdor] = useState("");
  const [mop, setMop] = useState("");

  // Terms States

  const [term, setTerm] = useState("");

  // Items array

  const [itemsArray, setItemsArray] = useState([]);
  const [termsConditionsArray, setTermsConditionsArray] = useState([]);
  const [csData, setCsData] = useState([]);
  const [resquisitionData, setRequisitionData] = useState([]);
  const [itemsData, setItemsData] = useState([]);

  // Validation Condition

  const conditions = [
    poID === "",
    requID === "",
    campus === "",
    gDate === "",
    expDate === "",
    itemName === "",
    vabdor === "",
    mop === "",
    itemAmount === "",
    itemRemark === "",
  ];

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

  const addItems = () => {
    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }
    const newObject = {
      spID: poID,
      requID: requID,
      campus: campus,
      item: itemName,
      des: vabdor,
      mop: mop,
      amount: itemAmount,
      remark: itemRemark,
    };
    setItemsArray([...itemsArray, newObject]);
    setindex(index + 1);
    setItemName("");
    setRequID("");
    setCampus("");
    setItemDesc("");
    setItemBrand("");
    setItemQuantity("");
    setItemAmount("");
    setSupplierName("");
    setSupplierLocation("");
    setSupplierContact("");
  };

  const removeItem = (index) => {
    const updatedData = [...itemsArray];
    updatedData.splice(index, 1);
    setItemsArray(updatedData);
    setindex(index - 1);
  };

  const getCsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionData`,
        { method: "POST" }
      );
      const res = await response.json();

      setCsData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequisitionData = async (e) => {
    try {
      const data = new FormData();
      data.append("requisition_id", e);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionItemById`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setItemsData(res.message2);
      console.log(res.message2);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemsData = async (requID) => {
    try {
      const data = new FormData();
      data.append("requisition_id", requID);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionItemById`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setItemsData(res.message2);
    } catch (error) {
      console.log(error);
    }
  };

  const getSuppliersData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getsupplier`,
        {
          method: "POST",
        }
      );

      const res = await response.json();

      setSupplierData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCS = csData.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.requisition_id === obj.requisition_id)
  );

  const filteredRequisitions = resquisitionData.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.requisition_id === obj.requisition_id)
  );

  const spItemsSubmit = (itemsArray) => {
    if (itemsArray.length === 0) {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Fill up the required fields!",
        life: 2000,
      });
      return false;
    }

    itemsArray?.map((item) => {
      const data = new FormData();
      data.append("sp_id", item.spID);
      data.append("r_id", item.requID);
      data.append("campus", item.campus);
      data.append("item", item.item);
      data.append("vendor", item.des);
      data.append("mop", item.mop);
      data.append("amount", item.amount);
      fetch(`${import.meta.env.VITE_SERVER}/addSupplyPaymentItem`, {
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

  const spSubmit = () => {
    const data = new FormData();
    data.append("fr_id", poID);
    data.append("gdate", gDate);
    data.append("exp_date", expDate);
    data.append("amount", amount);
    data.append("session", session);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/addFundRequest`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          console.log(res.message);
          spItemsSubmit(itemsArray);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(itemsArray);

  useEffect(() => {
    getCsData();
    getSuppliersData();
    getItemsData();
  }, []);
  return (
    <>
      <div className="content-body">
        {/* {loader && <Loader />} */}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Make Fund Request</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-2 mb-2">
              <div className="col">
                <label className="form-label label1">SP ID</label>
                <input
                  className="form-control input1"
                  type="text"
                  value={poID}
                  aria-label="form-control example"
                  disabled
                  required
                />
              </div>
              <div className="col">
                <label className="form-label label1">Requisition ID</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    getRequisitionData(e.target.value);
                    setRequID(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>
                  {filteredCS?.map((item) => (
                    <>
                      <option key={item.id} value={item.requisition_id}>
                        {item.requisition_id}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="col">
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
              <div className="col">
                <label className="form-label label1">Expected Date</label>
                <input
                  className="form-control input1"
                  type="date"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setExpDate(e.target.value);
                  }}
                  value={expDate}
                />
              </div>
            </div>

            <div
              className="row mx-1 rounded pb-3 "
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <div className="col-12 py-2 px-3 border-bottom">
                <p className="font-14 fw-bold ">Add Item</p>
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
              <div className="col-2">
                <label className="form-label label1">Item</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                  value={itemName}
                >
                  <option value={""}>Select</option>
                  {itemsData?.map((item) => (
                    <>
                      <option key={item.id} value={item.itemName}>
                        {item.itemName}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              <div className="col-2">
                <label className="form-label label1">Campus</label>
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
              <div className="col-2">
                <label className="form-label label1">Vendor</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setVabdor(e.target.value);
                  }}
                  // value={itemName}
                >
                  <option value={""}>Select</option>
                  {supplierData.map((item) => (
                    <>
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              <div className="col-1">
                <label className="form-label label1">MOP</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setMop(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>
                  <option value={"cheque"}>CHEQUE</option>
                  <option value={"cash"}>CASH</option>
                </select>
              </div>

              <div className="col-1">
                <label className="form-label label1">Amount</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemAmount(e.target.value);
                  }}
                  value={itemAmount}
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
                    setItemRemark(e.target.value);
                  }}
                  value={itemRemark}
                />
              </div>

              <div className="col-1">
                <label className="form-label label1 invisible">Location</label>
                <button className="btn submit-btn-sm w-100" onClick={addItems}>
                  Add
                </button>
              </div>
            </div>

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
                    <label className="form-label fw-bold label1">Item</label>
                  </div>
                  <div className="col-2">
                    <label className="form-label fw-bold label1">Vendor</label>
                  </div>
                  <div className="col-2">
                    <label className="form-label fw-bold label1">MOP</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Amount</label>
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
                {itemsArray?.map((item, index) => {
                  amount = amount + +item.amount;
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
                          <p className="form-label label1">{item.item}</p>
                        </div>
                        <div className="col-2">
                          <p className="form-label label1">{item.des}</p>
                        </div>

                        <div className="col-2">
                          <p className="form-label label1">{item.mop}</p>
                        </div>
                        <div className="col-1">
                          <p className="form-label label1">{item.amount}</p>
                        </div>
                        <div className="col-2">
                          <p className="form-label label1">{item.remark}</p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fa-solid fa-xmark fa-icon"
                            onClick={() => {
                              removeItem(index);
                            }}
                          ></i>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="row mx-1 border border-top-0">
                  <div className="col-lg-8 py-1 text-end border-end">
                    <p className="mb-0 font-12 fw-bold">Total</p>
                  </div>
                  <div className="col-lg-4 py-1">
                    <input
                      type="hidden"
                      value={amount}
                      onChange={(e) => {
                        setTotal(e.target.value);
                      }}
                    />
                    <p className="mb-0 font-14 fw-bold">
                      {amount !== 0 && <>{amount} BDT</>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-1 py-3">
              <div className="col-lg-1">
                <p className="mb-0 font-14 fw-bold">In Words</p>
              </div>
              <div className="col-lg-8">
                <p className="mb-0 text-capitalize font-14 fw-bold">
                  :{" "}
                  {amount !== 0 && (
                    <>{converter.toWords(amount).replace(",", " ")}</>
                  )}
                </p>
              </div>
            </div>

            <div className="row p-3 px-1 justify-content-end">
              <div className="col-lg-2">
                <button
                  className="btn submit-btn-sm align-items-end bottom-0 end-0 w-100"
                  onClick={() => {
                    spSubmit();
                  }}
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
