import React, { useEffect, useState, useRef, useMemo } from "react";
import { UserRoleContext } from "../../../context/UserRoleContext";
import { useContext } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 6);
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../../context/SessionContext";

export const GenerateOrderComp = () => {
  const toastTL = useRef(null);
  const { session } = useContext(SessionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  let navigate = useNavigate();
  const [poID, setPoID] = useState(nanoid(6));
  // Supplier States

  const [temp, setTemp] = useState("");
  const [poType, setPoType] = useState("");
  const [poDate, setPoDate] = useState("");
  const [esDate, setEsDate] = useState("");
  const [eeDate, setEeDate] = useState("");
  const [csID, setCsID] = useState("");
  const [requID, setRequID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierLocation, setSupplierLocation] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [supplierPOC, setSupplierPOC] = useState("");
  const [mstatus, setMstatus] = useState("");
  const [pstatus, setPstatus] = useState("");

  const [supplierData, setSupplierData] = useState([]);

  // Item States

  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemBrand, setItemBrand] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);
  const [itemVat, setItemVat] = useState(0);
  const [itemTax, setItemTax] = useState(0);
  // Terms States

  const [term, setTerm] = useState("");

  // Items array

  const [itemsArray, setItemsArray] = useState([]);
  const [termsConditionsArray, setTermsConditionsArray] = useState([]);
  const [csData, setCsData] = useState([]);
  const [resquisitionData, setRequisitionData] = useState([]);
  const [itemsData, setItemsData] = useState([]);

  const totalAmount = useMemo(() => {
    return itemsArray.reduce((total, item) => total + Number(item.amount), 0);
  }, [itemsArray]);

  const totalVATANDTAX = useMemo(() => {
    return itemsArray.reduce((total, item) => total + Number(item.tvandt), 0);
  }, [itemsArray]);

  const [ait, setAIT] = useState(0);

  // Validation Condition

  const conditions = [
    poID === "",
    requID === "",
    csID === "",
    itemName === "",
    itemDesc === "",
    itemQuantity === "",
    itemBrand === "",
    itemAmount === "",
    supplierName === "",
    supplierLocation === "",
    supplierContact === "",
  ];

  // Validation Condition

  const poConditions = [
    poID === "",
    requID === "",
    csID === "",
    poType === "",
    poDate === "",
    termsConditionsArray.length === 0,
    itemsArray.length === 0,
  ];

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
    let ta = itemAmount;
    let v = itemVat;
    let t = itemTax;
    let fv = (ta * v) / 100;
    let ft = (ta * t) / 100;

    const newObject = {
      po_ID: poID,

      requisition_id: requID,
      cs_id: csID,
      item: itemName,
      des: itemDesc,
      qty: itemQuantity,
      brand: itemBrand,
      amount: itemAmount,
      tvandt: fv + ft,
      vat: v,
      tax: t,

      supplierName: supplierName,
      supplierLocation: supplierLocation,
      supplierContact: supplierContact,
      supplierPOC: supplierPOC,
    };
    setItemsArray([...itemsArray, newObject]);

    setItemName("");
    setItemDesc("");
    setItemBrand("");
    setItemQuantity("");
    setItemAmount("");
    setItemVat("");
    setItemTax("");
  };

  const addTermsConditions = () => {
    if (term === "") {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Enter Terms & Condition!",
        life: 2000,
      });
      return false;
    }
    const newObject = {
      po_ID: poID,
      term: term,
    };
    setTermsConditionsArray([...termsConditionsArray, newObject]);
    setTerm("");
  };

  const removeItem = (index) => {
    const updatedData = [...itemsArray];
    updatedData.splice(index, 1);
    setItemsArray(updatedData);
  };

  const getCsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionCSData`,
        { method: "POST" }
      );
      const res = await response.json();

      setCsData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequisitionData = async (csID) => {
    try {
      const data = new FormData();
      data.append("cs_id", csID);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionBycsId`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setRequisitionData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemsData = async (csID, requID) => {
    try {
      const data = new FormData();
      data.append("cs_id", csID);
      data.append("requisition_id", requID);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getitemsByCsRequId`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setItemsData(res.message);
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
    (obj, index, self) => index === self.findIndex((t) => t.cs_id === obj.cs_id)
  );

  const filteredRequisitions = resquisitionData.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.requisition_id === obj.requisition_id)
  );

  const poItemsSubmit = (itemsArray) => {
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

      data.append("po_id", item.po_ID);
      data.append("cs_id", item.cs_id);
      data.append("price", item.amount);
      data.append("vat", item.vat);
      data.append("tax", item.tax);
      data.append("brand", item.brand);
      data.append("des", item.des);
      data.append("item", item.item);
      data.append("qty", item.qty);
      data.append("req_id", item.requisition_id);
      data.append("sname", item.supplierName);
      data.append("slocation", item.supplierLocation);
      data.append("scontact", item.supplierContact);
      data.append("", item.supplierPOC);

      fetch(`${import.meta.env.VITE_SERVER}/PoItemSubmit`, {
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

  const poSubmit = () => {
    for (let i = 0; i < poConditions.length; i++) {
      if (poConditions[i]) {
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

    data.append("poType", poType);
    data.append("cs_id", csID);
    data.append("req_id", requID);
    data.append("po_id", poID);
    data.append("tandc", JSON.stringify(termsConditionsArray));
    data.append("podate", poDate);
    data.append("tamount", totalAmount);
    data.append("tvat", totalVATANDTAX);
    data.append("ait", ait);
    data.append("gtotal", totalAmount + totalVATANDTAX - ait);
    data.append("exp_sdate", esDate);
    data.append("exp_edate", eeDate);

    data.append("sname", supplierName);
    data.append("slocation", supplierLocation);
    data.append("scontact", supplierContact);
    data.append("spoc", supplierPOC);
    data.append("mstatus", "");
    data.append("mnote", "");
    data.append("pstatus", pstatus);
    data.append("pnote", "");
    data.append("session", session);
    data.append("compile", username + "," + designation + "," + user);

    fetch(`${import.meta.env.VITE_SERVER}/PoSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        if (res.message) {
          navigate("/orderlist");
        }
      })
      .catch((err) => console.log(err));
  };

  const getPO = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/getpolist`, {
        method: "POST",
      });

      const res = await response.json();

      setTemp(res.message[0].tandc);
    } catch (error) {
      console.log(error);
    }
  };

  const getSupplierByID = async (id) => {
    const data = new FormData();
    data.append("id", id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getsupplierById`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setSupplierLocation(res.message[0].location);
      setSupplierContact(res.message[0].phone);
      setSupplierName(res.message[0].name);
      setSupplierPOC(res.message[0].poc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCsData();
    getPO();
    getSuppliersData();
  }, []);

  return (
    <>
      <div className="content-body">
        {/* {loader && <Loader />} */}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">PO Generate</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-2">
              <div className="row">
                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">PO Type</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setPoType(e.target.value);
                    }}
                  >
                    <option value={""}>Select</option>
                    <option value={"purchaseOrder"}>Purchase Order</option>
                    <option value={"workOrder"}>Work Order</option>
                  </select>
                </div>

                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">PO Date</label>
                  <input
                    className="form-control input1"
                    type="date"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setPoDate(e.target.value);
                    }}
                    value={poDate}
                  />
                </div>

                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">CS ID</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setCsID(e.target.value);
                      getRequisitionData(e.target.value);
                    }}
                  >
                    <option value={""}>Select</option>
                    {filteredCS?.map((item) => (
                      <>
                        <option key={item.id} value={item.cs_id}>
                          {item.cs_id}
                        </option>
                      </>
                    ))}
                  </select>
                </div>

                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">MR ID</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setRequID(e.target.value);
                      getItemsData(csID, e.target.value);
                    }}
                  >
                    <option value={""}>Select</option>
                    {filteredRequisitions?.map((item) => (
                      <>
                        <option key={item.id} value={item.requisition_id}>
                          {item.requisition_id}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">Supplier</label>

                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      getSupplierByID(e.target.value);
                    }}
                  >
                    <option value={""}>Select</option>
                    {supplierData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">Location</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setSupplierLocation(e.target.value);
                    }}
                    value={supplierLocation}
                  />
                </div>
                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">Contact</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setSupplierContact(e.target.value);
                    }}
                    value={supplierContact}
                  />
                </div>
                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">POC</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setSupplierPOC(e.target.value);
                    }}
                    value={supplierPOC}
                  />
                </div>
                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">
                    Expected Start Date
                  </label>
                  <input
                    className="form-control input1"
                    type="date"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setEsDate(e.target.value);
                    }}
                    value={esDate}
                  />
                </div>
                <div className="col-lg-3 mb-2">
                  <label className="form-label label1">Expected End Date</label>
                  <input
                    className="form-control input1"
                    type="date"
                    placeholder=""
                    aria-label="form-control example"
                    required
                    onChange={(e) => {
                      setEeDate(e.target.value);
                    }}
                    value={eeDate}
                  />
                </div>
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
                      <option key={item.id} value={item.item}>
                        {item.item}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="col-3">
                <label className="form-label label1">Item Description</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemDesc(e.target.value);
                  }}
                  value={itemDesc}
                />
              </div>
              <div className="col-1">
                <label className="form-label label1">Brand</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemBrand(e.target.value);
                  }}
                  value={itemBrand}
                />
              </div>
              <div className="col-1">
                <label className="form-label label1">Quantity</label>
                <input
                  className="form-control input1"
                  type="number"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemQuantity(e.target.value);
                  }}
                  value={itemQuantity}
                />
              </div>
              <div className="col-1">
                <label className="form-label label1">Amount</label>
                <input
                  className="form-control input1"
                  type="number"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemAmount(e.target.value);
                  }}
                  value={itemAmount}
                />
              </div>
              <div className="col-1">
                <label className="form-label label1">VAT</label>
                <input
                  className="form-control input1"
                  type="number"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemVat(e.target.value);
                  }}
                  value={itemVat}
                />
              </div>
              <div className="col-1">
                <label className="form-label label1">Tax</label>
                <input
                  className="form-control input1"
                  type="number"
                  placeholder=""
                  aria-label="form-control example"
                  required
                  onChange={(e) => {
                    setItemTax(e.target.value);
                  }}
                  value={itemTax}
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
                  <div className="col-2">
                    <label className="form-label fw-bold label1">Item</label>
                  </div>
                  <div className="col-3">
                    <label className="form-label fw-bold label1">
                      Item Description
                    </label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Brand</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">
                      Quantity
                    </label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Amount</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">VAT</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Tax</label>
                  </div>
                  <div className="col-1">
                    <label className="form-label fw-bold label1">Action</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                {itemsArray?.map((item, index) => (
                  <>
                    <div
                      className="row pt-1 mx-1 border-start border-end border-bottom"
                      key={item.id}
                    >
                      <div className="col-1">
                        <p className="form-label label1">{index + 1}</p>
                      </div>
                      <div className="col-2">
                        <p className="form-label label1">{item.item}</p>
                      </div>
                      <div className="col-3">
                        <p className="form-label label1">{item.des}</p>
                      </div>

                      <div className="col-1">
                        <p className="form-label label1">{item.brand}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.qty}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.amount}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.vat}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.tax}</p>
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
                ))}
                <div className="row mx-1 border border-top-0">
                  <div className="col-lg-8 py-1 text-end border-end">
                    <p className="mb-0 font-12 fw-bold">Total</p>
                  </div>
                  <div className="col-lg-4 py-1 border-end">
                    <p className="mb-0 font-14 fw-bold">{totalAmount} BDT</p>
                  </div>
                </div>
                <div className="row mx-1 border border-top-0">
                  <div className="col-lg-8 py-1 text-end border-end">
                    <p className="mb-0 font-12 fw-bold">VAT & TAX (+) BDT</p>
                  </div>
                  <div className="col-lg-4 py-1">
                    <p className="mb-0 font-14 fw-bold">
                      {totalAmount + totalVATANDTAX} BDT
                    </p>
                  </div>
                </div>
                <div className="row mx-1 border border-top-0">
                  <div className="col-lg-8 py-1 text-end border-end">
                    <p className="mb-0 font-12 fw-bold">AIT (-)</p>
                  </div>
                  <div className="col-lg-4 py-1">
                    <input
                      className="form-control input1"
                      type="number"
                      placeholder=""
                      aria-label="form-control example"
                      required
                      onChange={(e) => {
                        setAIT(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mx-1 border border-top-0">
                  <div className="col-lg-8 py-1 text-end border-end">
                    <p className="mb-0 font-12 fw-bold">Grand Total</p>
                  </div>
                  <div className="col-lg-4 py-1">
                    <p className="mb-0 font-14 fw-bold">
                      {totalAmount + totalVATANDTAX - ait} BDT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-1 row my-4">
              <div className="col-lg-10 row">
                <div class="col-lg-6 mb-2">
                  <div class="row">
                    <div class="col-lg-10 mb-2">
                      <label class="form-label text-muted font-13 fw-bold">
                        Terms & Conditions
                      </label>
                      <input
                        type="text"
                        value={term}
                        placeholder="Write here following your company policy . . ."
                        class="form-control border-muted shadow-none input1"
                        onChange={(e) => {
                          setTerm(e.target.value);
                        }}
                      />
                    </div>

                    <div class="col-lg-2">
                      <button
                        class="border-0 w-100 submit-btn-sm font-12 py-1"
                        style={{ marginTop: "30px", height: "1.7rem" }}
                        onClick={addTermsConditions}
                      >
                        + Add
                      </button>
                    </div>

                    <div class="col-lg-12 my-3">
                      <div class="bg-light rounded p-2">
                        <p class="fw-bold mb-1 font-14 fcp">
                          Terms & Condition
                        </p>
                        <ol className="row mb-1">
                          {termsConditionsArray?.map((item) => (
                            <li class="text-muted2 font-12" key={item.id}>
                              <p className="mb-0 ">{item.term}</p>
                            </li>
                          ))}
                        </ol>

                        {termsConditionsArray.length === 0 && (
                          <div className="row mb-1">
                            <small class="text-muted2 fs-11">
                              <code>Terms & Conditions will be shown here</code>
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6" style={{ marginTop: "80px" }}></div>
              </div>

              <div className="col-lg-2 position-relative">
                <button
                  className=" btn submit-btn-sm align-items-end position-absolute bottom-0 end-0"
                  onClick={() => {
                    poItemsSubmit(itemsArray);
                    poSubmit();
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
