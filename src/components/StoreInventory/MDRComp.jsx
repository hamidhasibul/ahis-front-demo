import React, { useEffect, useState, useRef } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890ABCDEF", 6);
import { Toast } from "primereact/toast";
import converter from "number-to-words";
import { Dropdown } from "primereact/dropdown";
import { SessionContext } from "../../context/SessionContext";
import { UserRoleContext } from "../../context/UserRoleContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const MDRComp = () => {
  // ANCHOR Upper states
  let navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const toastTL = useRef(null);
  const [mdrID, setMDRID] = useState(nanoid(6));
  const [requID, setRequID] = useState("");
  const [campus, setCampus] = useState("");
  const [gDate, setGDate] = useState("");

  // ANCHOR Item States

  const [itemData, setItemData] = useState([]);
  const [itemProductData, setItemProductData] = useState([]);

  const [itemName, setItemName] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemRemark, setItemRemark] = useState("");
  const [requesterName, setRequesterName] = useState("");

  const [index, setindex] = useState(0);

  const [supplierData, setSupplierData] = useState([]);
  const [poData, setPoData] = useState([]);

  // Items array

  const [itemsArray, setItemsArray] = useState([]);
  const [termsConditionsArray, setTermsConditionsArray] = useState([]);
  const [csData, setCsData] = useState([]);
  const [resquisitionData, setRequisitionData] = useState([]);
  const [itemsData, setItemsData] = useState([]);

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
      mdrID: mdrID,
      r_ID: requID,
      item: itemName?.item,
      pid: itemName?.id,
      condition: itemCondition,
      qty: itemQuantity,
      remark: itemRemark,
    };
    setItemsArray([...itemsArray, newObject]);
    setindex(index + 1);
  };

  const removeItem = (index) => {
    const updatedData = [...itemsArray];
    updatedData.splice(index, 1);
    setItemsArray(updatedData);
    setindex(index - 1);
  };

  const getPOData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/getpolist`, {
        method: "POST",
      });
      const res = await response.json();

      setPoData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequisitionData = async (e) => {
    try {
      const data = new FormData();
      data.append("user", "");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionData`,
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

      setItemData(res.message2);
      setRequID(res.message2[0].requisition_id);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemsProductlistData = async () => {
    try {
      const data = new FormData();
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getProduct`,
        {
          method: "POST",
        }
      );

      const res = await response.json();

      setItemProductData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const mdrItemsSubmit = (itemsArray) => {
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

      data.append("mdr_id", item.mdrID);
      data.append("r_id", item.r_ID);
      data.append("item", item.item);
      data.append("pcondition", item.condition);
      data.append("fqty", item.qty);
      data.append("note", item.remark);
      data.append("pid", item.pid);

      fetch(`${import.meta.env.VITE_SERVER}/addMDRitem`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if ((res.message = true)) {
            navigate("/MDRList");
          }
          console.log(res.message);
        })
        .catch((err) => console.log(err));
    });
  };

  const mdrSubmit = () => {
    const data = new FormData();
    data.append("rname", username);
    data.append("mdr_id", mdrID);
    data.append("r_id", requID);
    data.append("campus", campus);
    data.append("gdate", gDate);
    data.append("session", session);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/addMDRinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRequisitionData();
    getItemsProductlistData();
  }, []);

  return (
    <>
      <div className="content-body">
        {/* {loader && <Loader />} */}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Make MDR</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-9">
                <div className="row px-1 py-2 mb-2">
                  <div className="col">
                    <label className="form-label label1">Requester Name</label>
                    <input
                      className="form-control input1"
                      type="text"
                      value={username}
                      disabled
                      aria-label="form-control example"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label label1">MDR ID</label>
                    <input
                      className="form-control input1"
                      type="text"
                      value={mdrID}
                      aria-label="form-control example"
                      disabled
                      required
                    />
                  </div>

                  <div className="col">
                    <label className="form-label label1">MR ID</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        getItemsData(e.target.value);
                      }}
                    >
                      <option value={""}>Select</option>
                      {resquisitionData?.map((item) => (
                        <>
                          <option key={item.id} value={item.requisition_id}>
                            {item.requisition_id}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div className="col">
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
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label label1">Select Item</label>
                    <br />
                    {/* <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                    >
                      <option value={""}>Select</option>
                      {itemData.map((item) => (
                        <option key={item.id} value={item.itemName}>
                          {item.itemName}
                        </option>
                      ))}
                    </select> */}
                    <Dropdown
                      value={itemName}
                      onChange={(e) => setItemName(e.value)}
                      options={itemProductData}
                      optionLabel="item"
                      filter
                      className="input1 w-100 fs-12 px-2"
                    />
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
                      type="number"
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
                    <label className="form-label label1 invisible">
                      Location
                    </label>
                    <button
                      className="btn submit-btn-sm w-100"
                      onClick={addItems}
                    >
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
                        <label className="form-label fw-bold label1">
                          Brand
                        </label>
                      </div>
                      <div className="col-1">
                        <label className="form-label fw-bold label1">Qty</label>
                      </div>
                      <div className="col-3">
                        <label className="form-label fw-bold label1">
                          Remark
                        </label>
                      </div>

                      <div className="col-1">
                        <label className="form-label fw-bold label1">
                          Action
                        </label>
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
                              <p className="form-label label1">
                                {item.condition}
                              </p>
                            </div>

                            <div className="col-2">
                              <p className="form-label label1">{item.qty}</p>
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
                  </div>
                </div>

                <div className="row p-3 px-1 align-items-center">
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
                        mdrItemsSubmit(itemsArray);
                        mdrSubmit();
                      }}
                      disabled={yn !== true}
                    >
                      Save & Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="py-3">
                  <p className="font-14">MR Item List</p>
                  <ul class="list-group list-group-flush">
                    <table className="table border">
                      <thead>
                        <tr className="bg-light">
                          <th className="font-12 py-1 border-end" width="70%">
                            Item
                          </th>
                          <th className="font-12 py-1 " width="30%">
                            Qty
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemData.map((item) => {
                          return (
                            <tr>
                              <td className="border-bottom font-12 border-end">
                                {item.itemName}
                              </td>
                              <td className="border-bottom font-12 ">
                                {item.qty}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
