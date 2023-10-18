import React, { useState, useEffect, useRef } from "react";
import { Loader } from "../../Common/Loader";
import { useContext } from "react";
import { SessionContext } from "../../../context/SessionContext";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { RequisitionModalComp } from "../../modal/RequisitionModalComp";
import { UserRoleContext } from "../../../context/UserRoleContext";
export const MakeRequisitionComp = () => {
  const toastTL = useRef(null);
  let navigate = useNavigate();
  // States
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [loader, setLoader] = useState(false);
  const [subcount, setSubcount] = useState(2);
  const { session } = useContext(SessionContext);
  const [requisitionName, setRequisitionName] = useState("");
  const [requisitionId, setRequisitionId] = useState(
    Math.floor(100000 + Math.random() * 900000)
  );

  const [expected_date, setExpected_date] = useState("");
  // const [designation, setDesignation] = useState("");
  const [sl, setSl] = useState(1);
  const [campus, setCampus] = useState("");
  const [location, setLocation] = useState("");
  const [itemName, setItemName] = useState("");
  const [note, setNote] = useState("");
  const [qty, setQty] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("Regular");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [yn, setYn] = useState(false);
  const [update, setUpdate] = useState([]);
  const [getitem, setGetItem] = useState([]);
  const [dltinfo, setDltinfo] = useState("");
  const [delitem, setDelitem] = useState("");

  // Validation Condition

  const itemConditions = [
    requisitionId === "",
    itemName === "",
    qty === "",
    priority === "",
  ];

  const requisitionsConditions = [
    session === "",
    requisitionId === "",
    username === "",
    designation === "",
    campus === "",
    location === "",
    expected_date === "",
  ];

  // Functions

  // function delitem(id) {
  //   const data = new FormData();
  //   data.append("id", id);
  //   fetch(`${import.meta.env.VITE_SERVER}/DeleteRequisionItemById`, {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       alert(res.message.sqlMessage);

  //       setUpdate(update + 1);
  //       setSl(sl - 1);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function additem(e) {
    e.preventDefault();
    for (let i = 0; i < itemConditions.length; i++) {
      if (itemConditions[i]) {
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
    data.append("requisition_id", requisitionId);
    data.append("itemName", itemName);
    data.append("note", note);
    data.append("qty", qty);
    data.append("priority", priority);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionItemSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toastTL.current.show({
            severity: "success",
            summary: "Item Added",
            detail: "Success",
            life: 2000,
          });
          setUpdate(update + 1);
          document.getElementById("form").reset();
        }
        setSl(sl + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const submitrequisition = () => {
    setLoader(true);
    for (let i = 0; i < requisitionsConditions.length; i++) {
      if (requisitionsConditions[i]) {
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
    data.append("type", type);
    data.append("requisition_id", requisitionId);
    data.append("name", username);
    data.append("designation", designation);
    data.append("campus", campus);
    data.append("location", location);
    data.append("expected_date", expected_date);
    data.append("img1", img1);
    data.append("img2", img2);
    data.append("img3", img3);
    data.append("img4", img4);
    data.append("img5", img5);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setLoader(false);
          toastTL.current.show({
            severity: "Success",
            summary: "Success",
            detail: "Success",
            life: 2000,
          });
          navigate("/requisitionlist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch Functions

  const getAllrequisitionItem = () => {
    const data = new FormData();
    data.append("requisition_id", requisitionId);
    fetch(`${import.meta.env.VITE_SERVER}/getrequisionItemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setGetItem(res.message2);
      })
      .catch((err) => console.log(err));
  };

  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  useEffect(() => {
    getAllrequisitionItem();
  }, [update]);
  return (
    <div className="content-body">
      <RequisitionModalComp
        delitem={delitem}
        dltinfo={dltinfo}
        setUpdate={setUpdate}
        update={update}
        sl={sl}
      />
      {loader && <Loader />}
      <Toast ref={toastTL} position="top-right" />
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Make Requisition</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1 py-2">
            <div className="col mb-2">
              <label className="form-label label1">Requisition Type</label>
              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                required
              >
                <option value={""} Selected>
                  Select
                </option>
                <option>Store / Purchase</option>
                <option>Maintenance</option>
                <option>IT</option>
              </select>
            </div>
            <div className="col mb-2">
              <label className="form-label label1">Requester Name</label>
              <input
                className="form-control input1"
                type="text"
                value={username}
                placeholder=""
                onChange={(e) => {
                  setRequisitionName(e.target.value);
                }}
                aria-label="form-control example"
                disabled
              />
            </div>
            <div className="col mb-2">
              <label className="form-label label1">Designation</label>
              <input
                className="form-control input1"
                type="text"
                placeholder=""
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
                aria-label="form-control example"
                disabled
              />
            </div>
            <div className="col mb-2">
              <label className="form-label label1">Choose Campus</label>
              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setCampus(e.target.value);
                }}
                required
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
            <div className="col mb-2">
              <label className="form-label label1">Specific Location</label>
              <input
                className="form-control input1"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                aria-label="form-control example"
                required
              />
            </div>
          </div>
          <form onSubmit={additem} id="form">
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
                  value={sl}
                  aria-label="form-control example"
                  required
                />
              </div>
              <div className="col-2">
                <label className="form-label label1">Item</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                  aria-label="form-control example"
                  required
                />
              </div>
              <div className="col-6">
                <label className="form-label label1">Item Description</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  aria-label="form-control example"
                  required
                />
              </div>
              <div className="col-1">
                <label className="form-label label1">Quantity</label>
                <input
                  className="form-control input1"
                  type="number"
                  placeholder=""
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                  aria-label="form-control example"
                  required
                />
              </div>
              <div className="col-1">
                <label className="form-label label1">Priority</label>
                <select
                  className="form-select input1 py-0 font-11"
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  required
                  value={priority}
                >
                  <option selected value={""}>
                    Select
                  </option>
                  <option value={"Urgent"}>Urgent</option>
                  <option value={"Regular"}>Regular</option>
                </select>
              </div>
              <div className="col-1">
                <label className="form-label label1 invisible">Location</label>
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
                <div className="col-2">
                  <label className="form-label fw-bold label1">Item</label>
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold label1">
                    Item Description
                  </label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Quantity</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Priority</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Action</label>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              {getitem.map((item, index) => (
                <>
                  <div
                    className="row pt-1 mx-1 border-start border-end border-bottom"
                    key={item.id}
                  >
                    <div className="col-1">
                      <p className="form-label label1">{index + 1}</p>
                    </div>
                    <div className="col-2">
                      <p className="form-label label1">{item.itemName}</p>
                    </div>
                    <div className="col-6">
                      <p className="form-label label1">{item.note}</p>
                    </div>
                    <div className="col-1">
                      <p className="form-label label1">{item.qty}</p>
                    </div>
                    <div className="col-1">
                      <p className="form-label label1">{item.priority}</p>
                    </div>
                    <div className="col-1">
                      <i
                        className="fa-solid fa-xmark fa-icon"
                        onClick={() => {
                          setDelitem(item.id);
                          setDltinfo("item");
                          document.getElementById("yesnomodal").click();
                        }}
                      ></i>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="mx-1 row mt-5">
            <div className="col-lg-9">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1 pt-1">Expected Date</label>
                <input
                  className="form-control input1 "
                  type="date"
                  placeholder=""
                  onChange={(e) => {
                    setExpected_date(e.target.value);
                  }}
                  aria-label="form-control example"
                  required
                />
              </div>

              <div className="row">
                <label className="form-label label1 pt-1">Add Documents</label>
                <div class="col-auto">
                  {subcount > 1 ? (
                    <>
                      {" "}
                      <input
                        className="form-control input1 mb-2"
                        type="file"
                        placeholder=""
                        onChange={(e) => {
                          setImg1(e.target.files[0]);
                        }}
                        aria-label="form-control example"
                        required
                      />
                    </>
                  ) : null}
                </div>
                <div className="col-auto">
                  {subcount > 2 && (
                    <>
                      <input
                        className="form-control input1 mb-2"
                        type="file"
                        placeholder=""
                        onChange={(e) => {
                          setImg2(e.target.files[0]);
                        }}
                        aria-label="form-control example"
                        required
                      />
                    </>
                  )}
                </div>
                <div className="col-auto">
                  {subcount > 3 && (
                    <>
                      <input
                        className="form-control input1 mb-2"
                        type="file"
                        placeholder=""
                        onChange={(e) => {
                          setImg3(e.target.files[0]);
                        }}
                        aria-label="form-control example"
                        required
                      />
                    </>
                  )}
                </div>
                <div className="col-auto">
                  {subcount > 4 && (
                    <>
                      <input
                        className="form-control input1"
                        type="file"
                        placeholder=""
                        onChange={(e) => {
                          setImg4(e.target.files[0]);
                        }}
                        aria-label="form-control example"
                        required
                      />
                    </>
                  )}
                </div>
                <div className="col-auto">
                  {subcount > 5 && (
                    <>
                      <input
                        className="form-control input1 "
                        type="file"
                        placeholder=""
                        onChange={(e) => {
                          setImg5(e.target.files[0]);
                        }}
                        aria-label="form-control example"
                        required
                      />
                    </>
                  )}
                </div>
                <div className="col-auto">
                  {subcount > 5 ? null : (
                    <button
                      className="btn submit-btn-sm "
                      style={{ color: "black" }}
                      onClick={() => setSubcount(subcount + 1)}
                    >
                      Add More
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="container-fluid my-3">
              <div className="row justify-content-between">
                <div className="col-lg-6">
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
                      Are you sure you want to submit? Please check once again
                      befor submit.
                    </label>
                  </div>
                </div>
                <div className="col-lg-4 text-center">
                  <button
                    className="btn submit-btn w-100"
                    onClick={submitrequisition}
                    disabled={yn !== true}
                  >
                    Save & Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
