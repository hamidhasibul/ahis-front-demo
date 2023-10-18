import React, { useEffect, useState, useRef } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890AHIS", 6);
import { Toast } from "primereact/toast";
import converter from "number-to-words";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { UserRoleContext } from "../../context/UserRoleContext";
import { useContext } from "react";

export const GRNComp = () => {
  let amount = 0;
  let navigate = useNavigate();
  const toastTL = useRef(null);
  const [grnID, setGRNID] = useState(nanoid(6));
  const { session } = useContext(SessionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  // ANCHOR Upper States

  const [poID, setPOID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [mrID, setMRID] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [billNo, setBillNo] = useState("");
  const [gDate, setGDate] = useState("");

  // ANCHOR Item States

  const [update, setUpdate] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [requisionItems, setRequisitionItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemRemark, setItemRemark] = useState("");

  const [total, setTotal] = useState("");
  const [index, setindex] = useState(0);

  const [campus, setCampus] = useState("");

  const [expDate, setExpDate] = useState("");

  const [requID, setRequID] = useState("");

  const [supplierLocation, setSupplierLocation] = useState("");
  const [supplierContact, setSupplierContact] = useState("");

  const [supplierData, setSupplierData] = useState([]);
  const [requisitionData, setRequisionData] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);

  const [vabdor, setVabdor] = useState("");
  const [mop, setMop] = useState("");

  // Terms States

  const [term, setTerm] = useState("");

  // Items array

  const [itemsArray, setItemsArray] = useState([]);
  const [termsConditionsArray, setTermsConditionsArray] = useState([]);
  const [poData, setPOData] = useState([]);
  const [resquisitionData, setRequisitionData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [noPo, setNoPo] = useState(false);

  // Validation Condition
  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };
  /*   const conditions = [
    poID === "",
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

  const addItems = () => {
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
      grnID: grnID,
      poID: poID,
      requID: mrID,
      item: itemName,
      condition: itemCondition,
      qty: itemQuantity,
      remark: itemRemark,
    };
    setItemsArray([...itemsArray, newObject]);
  };

  const removeItem = (index) => {
    const updatedData = [...itemsArray];
    updatedData.splice(index, 1);
    setItemsArray(updatedData);
    setindex(index - 1);
  };

  const getPoData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/getpolist`, {
        method: "POST",
      });
      const res = await response.json();

      setPOData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getPODatabyID = async (id) => {
    setNoPo(true);
    const data = new FormData();
    data.append("po_id", id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getpoItemallinfo`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setPOID(res.message[0].po_id);
      setSupplierName(res.message[0].sname);

      setItemData(res.message2);

      console.log(res.message2);
    } catch (error) {
      console.error(error);
    }
  };

  const grnItemsSubmit = (itemsArray) => {
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
      data.append("item", item.item);
      data.append("grn_id", item.grnID);
      data.append("po_id", item.poID);
      data.append("r_id", item.requID);
      data.append("condition", item.condition);
      data.append("qty", item.qty);
      data.append("note", item.remark);
      fetch(`${import.meta.env.VITE_SERVER}/addGRNitem`, {
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

  const grnSubmit = () => {
    const data = new FormData();
    data.append("grn_id", grnID);
    data.append("po_id", poID);
    data.append("sname", supplierName);
    data.append("cnum", challanNo);
    data.append("billnum", billNo);
    data.append("gdate", gDate);
    data.append("session", session);
    data.append("compile", username + "," + designation + "," + user);

    fetch(`${import.meta.env.VITE_SERVER}/addGRNinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        if (res.message == true) {
          navigate("/GRNList");
        }
      })
      .catch((err) => console.log(err));
  };
  const getRequisitions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionData`,
        { method: "POST" }
      );
      const res = await response.json();
      setRequisionData(res.message);
    } catch (error) {
      console.log(error);
    }
  };
  const getRequisitionsItem = () => {
    const data = new FormData();
    data.append("requisition_id", mrID);

    fetch(`${import.meta.env.VITE_SERVER}/getrequisionItemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setRequisitionItems(res.message2);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPoData();
    getRequisitions();
    getRequisitionsItem();
  }, [update]);

  return (
    <>
      <div className="content-body">
        {/* {loader && <Loader />} */}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Make GRN</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-2">
              <div className="col-lg-3">
                <label className="form-label label1">GRN ID</label>
                <input
                  className="form-control input1"
                  type="text"
                  value={grnID}
                  aria-label="form-control example"
                  disabled
                />
              </div>

              <div className="col-lg-3">
                <label className="form-label label1">PO ID</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    getPODatabyID(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>

                  {poData.map((item) => (
                    <>
                      <option key={item.id} value={item.po_id}>
                        {item.po_id}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="col-lg-6">
                <label className="form-label label1">Supplier Name</label>
                {supplierName !== "" ? (
                  <>
                    <input
                      className="form-control input1"
                      type="text"
                      aria-label="form-control example"
                      value={supplierName}
                      onChange={(e) => {
                        setSupplierName(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      className="form-control input1"
                      type="text"
                      aria-label="form-control example"
                      onChange={(e) => {
                        setSupplierName(e.target.value);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="row px-1 py-2 mb-2">
              <div className="col-lg-3">
                <label className="form-label label1">Challan Number</label>
                <input
                  className="form-control input1"
                  type="text"
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setChallanNo(e.target.value);
                  }}
                />
              </div>
              <div className="col-lg-3">
                <label className="form-label label1">Bill Number</label>
                <input
                  className="form-control input1"
                  type="text"
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setBillNo(e.target.value);
                  }}
                />
              </div>
              <div className="col-lg-3">
                <label className="form-label label1">MR ID</label>
                {mrID == "" ? (
                  <>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setMRID(e.target.value);
                      }}
                    >
                      <option value={""}>Select</option>
                      {requisitionData?.map((item) => (
                        <>
                          <option key={item.id} value={item.requisition_id}>
                            {item.requisition_id}
                          </option>
                        </>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setMRID(e.target.value);
                        setUpdate(update + 1);
                      }}
                    >
                      <option selected className="fw-bold">
                        {mrID}
                      </option>
                      {requisitionData?.map((item) => (
                        <>
                          <option key={item.id} value={item.requisition_id}>
                            {item.requisition_id}
                          </option>
                        </>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <div className="col-lg-3">
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
              <div className="col-4">
                <label className="form-label label1">Select Item</label>

                {noPo == true ? (
                  <>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                    >
                      <option value={""}>Select</option>
                      {noPo == true ? <></> : <></>}
                      {itemData.map((item) => (
                        <option key={item.id} value={item.item}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                    >
                      <option value={""}>Select</option>
                      {requisionItems.map((item) => (
                        <option key={item.id} value={item.itemName}>
                          {item.itemName}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {/* {noPo == false ? (
                  <>
                    <input
                      className="form-control input1"
                      type="text"
                      aria-label="form-control example"
                      required
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                    >
                      <option value={""}>Select</option>
                      {noPo == true ? <></> : <></>}
                      {itemData.map((item) => (
                        <option key={item.id} value={item.item}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                  </>
                )} */}
              </div>

              <div className="col-2">
                <label className="form-label label1">Brand</label>
                <input
                  className="form-control input1"
                  type="text"
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemCondition(e.target.value);
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
                    setItemQuantity(e.target.value);
                  }}
                />
              </div>

              <div className="col-3">
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
                  <div className="col-4">
                    <label className="form-label fw-bold label1">
                      Particular
                    </label>
                  </div>
                  <div className="col-2">
                    <label className="form-label fw-bold label1">Brand</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Qty</label>
                  </div>
                  <div className="col-3">
                    <label className="form-label fw-bold label1">Remark</label>
                  </div>

                  <div className="col-1 text-center">
                    <label className="form-label fw-bold label1">Action</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                {itemsArray?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="row pt-1 mx-1 border-start border-end border-bottom"
                        key={item.id}
                      >
                        <div className="col-1">
                          <p className="form-label label1">{index + 1}</p>
                        </div>
                        <div className="col-4">
                          <p className="form-label label1">{item.item}</p>
                        </div>
                        <div className="col-2">
                          <p className="form-label label1">{item.condition}</p>
                        </div>

                        <div className="col-1">
                          <p className="form-label label1">{item.qty}</p>
                        </div>
                        <div className="col-3">
                          <p className="form-label label1">{item.remark}</p>
                        </div>
                        <div className="col-1 text-center">
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
              </div>
            </div>

            <div className="row p-3 px-1 justify-content-end">
              <div className="col-lg-10">
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

              <div className="col-lg-2">
                <button
                  className="btn submit-btn-sm align-items-end bottom-0 end-0 w-100"
                  onClick={() => {
                    grnItemsSubmit(itemsArray);
                    grnSubmit();
                  }}
                  disabled={yn !== true}
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
