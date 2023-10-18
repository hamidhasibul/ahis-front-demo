import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RequisitionTimelineComp } from "./RequisitionTimelineComp";
import { UserRoleContext } from "../../../context/UserRoleContext";
import { useContext } from "react";

const customStyle = {
  rows: {
    style: {
      fontSize: "12px",
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

export const RequisitionViewComp = () => {
  // States
  const { user } = useContext(UserRoleContext);
  const { users } = useContext(UserRoleContext);
  const [loader, setLoader] = useState(false);
  const [cNote, setCNote] = useState("");
  const [mNote, setMNote] = useState("");
  const [rejectNote, setRejectNote] = useState("");
  const [maintanence, setMaintanence] = useState("");
  const [approvedNote, setApprovedNote] = useState("");
  const [holdNote, setHoldNote] = useState("");
  const [storeNote, setStoreNote] = useState("");
  const [maintenanceNote, setMaintenanceNote] = useState("");
  const [getApp, setGetApp] = useState("");
  const [approvedType, setApprovedType] = useState("");
  const [fullApproved, setFullApproved] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [tab, setTab] = useState("");
  const [store, setStore] = useState("");
  const [procurement, setProcurement] = useState("");
  const [managerNote, setManagerNote] = useState("");
  const [itemapprove, setItemapprove] = useState("");

  const [acknowledgeType, setAcknowledgeType] = useState("");
  const [coNote, setCoNote] = useState("");
  const [requisition, setRequisition] = useState([]);
  const [requisitionItem, setRequisitionItem] = useState([]);
  const [requisitionCS, setRequisitionCS] = useState([]);
  const [fullapprovechk, setFullapprovechk] = useState("");
  const [update, setUpdate] = useState([]);
  const [fullapp, setFullapp] = useState("Approved");
  const params = useParams();

  const { id } = params;
  console.log(user);
  //manager

  function removeP(s) {
    const data = new FormData();
    data.append("requisition_id", s);
    data.append("status", "p");
    fetch(`${import.meta.env.VITE_SERVER}/removePermission`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function removeC(s) {
    const data = new FormData();
    data.append("requisition_id", s);
    data.append("status", "c");
    fetch(`${import.meta.env.VITE_SERVER}/removePermission`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function removevp(vp) {
    const data = new FormData();
    data.append("requisition_id", vp);
    data.append("status", "vp");
    fetch(`${import.meta.env.VITE_SERVER}/removePermission`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function removeas(as) {
    const data = new FormData();
    data.append("requisition_id", as);
    data.append("status", "as");
    fetch(`${import.meta.env.VITE_SERVER}/removePermission`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function COsubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("user", user);
    data.append("approve_status", acknowledgeType);
    data.append("note", coNote);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApprovalSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => console.log(err));
  }

  function Storesubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("user", user);
    data.append("approve_status", "Store note");
    data.append("note", storeNote);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApprovalSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => console.log(err));
  }
  function MaintanenceSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("user", user);
    data.append("approve_status", "Maintenance Note");
    data.append("note", maintenanceNote);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApprovalSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => console.log(err));
  }

  function procurementsubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("user", user);
    data.append("approve_status", "Procurement Note");
    data.append("note", storeNote);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApprovalSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => console.log(err));
  }

  function Managersubmit() {
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("store", store);
    data.append("procurement", procurement);
    data.append("managerNote", managerNote);
    fetch(`${import.meta.env.VITE_SERVER}/managersubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function storestatus(e) {
    const data = new FormData();
    data.append("id", e);
    data.append("status", stockStatus);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateStoreRequisitionItemUpdate`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function submit() {
    const data = new FormData();
    data.append("requisition_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/csubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function notapproved(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("status", "reject");
    data.append("note", rejectNote);
    data.append("maintenance", maintanence);
    data.append("procurement", procurement);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionStatus`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        document.getElementById("form").reset();
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  if (fullApproved == "1") {
    setFullapp("Full Approved");
  }
  console.log(fullapp);
  function approved(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("status", "Approved");
    data.append("note", approvedNote);
    data.append("maintenance", maintanence);
    data.append("procurement", procurement);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionStatus`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        document.getElementById("form").reset();
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function holdstate(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("status", "hold");
    data.append("note", holdNote);
    data.append("maintenance", maintanence);
    data.append("procurement", procurement);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionStatus`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        document.getElementById("form").reset();
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function notapprovedCHP(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("status", "reject");
    data.append("note", rejectNote);
    data.append("user", user);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApproveCHP`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        document.getElementById("form").reset();
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function approvedCHP(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("status", "approved");
    data.append("note", approvedNote);
    data.append("user", user);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApproveCHP`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        document.getElementById("form").reset();
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function holdstateCHP(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("status", "hold");
    data.append("note", holdNote);
    data.append("user", user);
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApproveCHP`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        document.getElementById("form").reset();
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function addApprovelRequired(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("approve", getApp);
    fetch(`${import.meta.env.VITE_SERVER}/UpdaterequisitionApprovelUpdate`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => console.log(err));
  }

  function approve(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "approved");
    fetch(`${import.meta.env.VITE_SERVER}/UpdaterequisitionItemUpdate`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function hold(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "hold");
    fetch(`${import.meta.env.VITE_SERVER}/UpdaterequisitionItemUpdate`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function reject(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "reject");
    fetch(`${import.meta.env.VITE_SERVER}/UpdaterequisitionItemUpdate`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function removestatus(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "");
    fetch(`${import.meta.env.VITE_SERVER}/UpdaterequisitionItemUpdate`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  const getRequisitionListData = () => {
    const data = new FormData();
    data.append("requisition_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getrequisionItemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setRequisition(res.message[0]);
        setRequisitionItem(res.message2);

        if (res.message4.length !== 0) {
          setRequisitionCS(res.message4[0]);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const getRequisitionitemapprovelchk = () => {
    const data = new FormData();
    data.append("requisition_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getrequisionItemApprovelChk`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setItemapprove(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getRequisitionFullapprovelchk = () => {
    const data = new FormData();
    data.append("requisition_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getrequisionFullApprovedChk`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setFullapprovechk(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  function fullApprovedMR() {
    const data = new FormData();
    data.append("requisition_id", id);
    data.append("user", user);
    data.append("approve_status", "Full Approved");
    data.append("note", "");
    fetch(`${import.meta.env.VITE_SERVER}/requisitionApprovalSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => console.log(err));
  }

  console.log(fullapprovechk);

  if (itemapprove > 0) {
    var appstatus = true;
  } else {
    var appstatus = false;
  }
  console.log(appstatus);
  useEffect(() => {
    getRequisitionFullapprovelchk();
    getRequisitionitemapprovelchk();
    getRequisitionListData();
  }, [update]);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">
          Requisition View: {requisition.requisition_id}{" "}
        </p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-9 px-4 pt-2 ">
              <div class="row px-2 py-2 bg-light">
                <div className="col-lg-2 ">
                  <span className="font-13 fw-bold">Name </span>
                </div>
                <div className="col-lg-4 mb-2">
                  <p class="font-13">: {requisition.name}</p>
                </div>
                <div className="col-lg-2 ">
                  <span className="font-13 fw-bold">Designation </span>
                </div>
                <div className="col-lg-4 mb-2">
                  <p class="font-13">: {requisition.designation}</p>
                </div>
                <div className="col-lg-2 ">
                  <span className="font-13 fw-bold">Campus </span>
                </div>
                <div className="col-lg-4">
                  <p class="font-13">: {requisition.campus}</p>
                </div>
                <div className="col-lg-2 ">
                  <span className="font-13 fw-bold">Location </span>
                </div>
                <div className="col-lg-4">
                  {" "}
                  <p class="font-13">: {requisition.location}</p>
                </div>
              </div>

              <div className="row mt-2 mb-3">
                <div
                  className="col-lg-12 bg-light"
                  style={{ height: "300px", overflow: "auto" }}
                >
                  <div className="row bg4 border-bottom py-1">
                    <div className="col-lg-1">
                      <p className="font-12 fw-bold">SL</p>
                    </div>
                    <div className="col-lg-5">
                      <p className="font-12 fw-bold">Item</p>
                    </div>
                    <div className="col-lg-1 text-center">
                      <p className="font-12 fw-bold">Quantity</p>
                    </div>
                    <div className="col-lg-1 text-center">
                      <p className="font-12 fw-bold">Priority</p>
                    </div>
                    <div className="col-lg-2">
                      <p className="font-12 fw-bold">Status</p>
                    </div>
                    <div className="col-lg-2 text-center">
                      <p className="font-12 fw-bold">Action</p>
                    </div>
                  </div>

                  {requisitionItem.map((item, index) => (
                    <div className="row border-bottom bg-light py-1 align-items-center">
                      <div className="col-lg-1">
                        <p className="font-12 fw-bold">{index + 1}</p>
                      </div>
                      <div className="col-lg-5">
                        <p className="font-12 fw-bold">{item.itemName}</p>
                        <p className="font-12">{item.note}</p>
                      </div>
                      <div className="col-lg-1 text-center">
                        <p className="fw-bold font-12">{item.qty}</p>
                      </div>
                      <div className="col-lg-1 text-center">
                        <p className="rounded-pill bg-warning font-12">
                          {item.priority}
                        </p>
                      </div>
                      <div className="col-lg-2">
                        {user == "store" ? (
                          <>
                            <select
                              className="form-select input1 py-0 font-11 "
                              onClick={() => {
                                setTimeout(() => {
                                  storestatus(item.id);
                                  setUpdate(update + 1);
                                }, 500);
                              }}
                              onChange={(e) => {
                                setStockStatus(e.target.value);
                              }}
                            >
                              {item.stocknote == "" ? (
                                <>
                                  <option selected disabled value={""}>
                                    Select
                                  </option>
                                </>
                              ) : (
                                <>
                                  <option selected>{item.stocknote}</option>
                                </>
                              )}

                              <option>In Stock</option>
                              <option>Out Of Stock</option>
                              <option>Temporarily Unavailable</option>
                            </select>
                          </>
                        ) : (
                          <>
                            {item.stocknote == "" ? (
                              <>
                                {" "}
                                <p className="m-0 font-12">Pending...</p>
                              </>
                            ) : (
                              <>
                                <p className="m-0 font-12">{item.stocknote}</p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div className="col-lg-2 text-center">
                        {user == "co-ordinator" || user == "manager" ? (
                          <>
                            {item.status == "approved" ? (
                              <>
                                <i
                                  class="fa-solid fa-circle-check text-success fa-icon"
                                  onClick={() => {
                                    removestatus(item.id);
                                  }}
                                ></i>
                              </>
                            ) : (
                              <>
                                <i
                                  class="fa-solid fa-circle-check fa-icon"
                                  onClick={() => {
                                    approve(item.id);
                                  }}
                                ></i>
                              </>
                            )}

                            {item.status == "hold" ? (
                              <>
                                <i
                                  class="fa-solid fa-triangle-exclamation text-warning mx-2 fa-icon"
                                  onClick={() => {
                                    removestatus(item.id);
                                  }}
                                ></i>
                              </>
                            ) : (
                              <>
                                <i
                                  class="fa-solid fa-triangle-exclamation mx-2 fa-icon"
                                  onClick={() => {
                                    hold(item.id);
                                  }}
                                ></i>
                              </>
                            )}
                            {item.status == "reject" ? (
                              <>
                                <i
                                  className="fa-solid fa-circle-xmark text-danger fa-icon"
                                  onClick={() => {
                                    removestatus(item.id);
                                  }}
                                ></i>
                              </>
                            ) : (
                              <>
                                <i
                                  className="fa-solid fa-circle-xmark fa-icon"
                                  onClick={() => {
                                    reject(item.id);
                                  }}
                                ></i>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {item.status == "approved" ? (
                              <>
                                <i class="fa-solid fa-circle-check text-success fa-icon"></i>
                              </>
                            ) : (
                              <>
                                <i class="fa-solid fa-circle-check fa-icon"></i>
                              </>
                            )}

                            {item.status == "hold" ? (
                              <>
                                <i class="fa-solid fa-triangle-exclamation text-warning mx-2 fa-icon"></i>
                              </>
                            ) : (
                              <>
                                <i class="fa-solid fa-triangle-exclamation mx-2 fa-icon"></i>
                              </>
                            )}
                            {item.status == "reject" ? (
                              <>
                                <i className="fa-solid fa-circle-xmark text-danger fa-icon"></i>
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-circle-xmark fa-icon"></i>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="col-lg-9 p-0">
                    <button
                      type="button"
                      class="btn btn-sm btnattch font-12 m-0 p-0"
                      data-bs-toggle="modal"
                      data-bs-target="#modalId"
                    >
                      Show Requisition Attachment
                    </button>

                    <div
                      class="modal fade"
                      id="modalId"
                      tabindex="-1"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      role="dialog"
                      aria-labelledby="modalTitleId"
                      aria-hidden="true"
                    >
                      <div
                        class="modal-dialog modal-dialog-scrollable modal-lg"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-header py-1 px-3">
                            <p class="modal-title" id="modalTitleId">
                              Requisition Attachment
                            </p>
                            <button
                              type="button"
                              class="btn-close "
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            {requisition.img1 !== "" && (
                              <>
                                <a
                                  href={
                                    `${import.meta.env.VITE_IMG_SERVER}` +
                                    requisition.img1
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG_SERVER}` +
                                      requisition.img1
                                    }
                                    className="mb-2 w-100"
                                    alt=""
                                  />
                                </a>
                              </>
                            )}
                            {requisition.img2 !== "" && (
                              <>
                                {" "}
                                <a
                                  href={
                                    `${import.meta.env.VITE_IMG_SERVER}` +
                                    requisition.img1
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG_SERVER}` +
                                      requisition.img2
                                    }
                                    className="mb-2 w-100"
                                    alt=""
                                  />
                                </a>
                              </>
                            )}
                            {requisition.img3 !== "" && (
                              <>
                                {" "}
                                <a
                                  href={
                                    `${import.meta.env.VITE_IMG_SERVER}` +
                                    requisition.img1
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG_SERVER}` +
                                      requisition.img3
                                    }
                                    className="mb-2 w-100"
                                    alt=""
                                  />
                                </a>
                              </>
                            )}
                            {requisition.img4 !== "" && (
                              <>
                                <a
                                  href={
                                    `${import.meta.env.VITE_IMG_SERVER}` +
                                    requisition.img1
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG_SERVER}` +
                                      requisition.img4
                                    }
                                    className="mb-2 w-100"
                                    alt=""
                                  />
                                </a>
                              </>
                            )}
                            {requisition.img5 !== "" && (
                              <>
                                <a
                                  href={
                                    `${import.meta.env.VITE_IMG_SERVER}` +
                                    requisition.img1
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG_SERVER}` +
                                      requisition.img5
                                    }
                                    className="mb-2 w-100"
                                    alt=""
                                  />
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 text-end">
                    {requisitionCS.length !== 0 && (
                      <>
                        <Link
                          to={`/cs/view/${requisitionCS.cs_id}`}
                          className="btn btn-sm btnattch font-12 m-0 p-0"
                        >
                          CS View
                        </Link>
                      </>
                    )}
                  </div>
                  {requisition.p_status == "0" ||
                  requisition.ch_status == "0" ||
                  requisition.vp_status == "0" ||
                  requisition.as_status == "0" ? (
                    <>
                      <div className="col-lg-12">
                        <div
                          class="alert alert-warning p-2 d-flex"
                          role="alert"
                        >
                          <p className="font-14 me-3">*Approvel Required </p>
                          <div className="d">
                            {requisition.p_status == "0" ? (
                              <>
                                <p class="badge border text-dark justify-content-between align-items-center">
                                  Principal
                                </p>
                              </>
                            ) : null}
                            {requisition.ch_status == "0" ? (
                              <>
                                <p class="badge border text-dark justify-content-between align-items-center ms-2">
                                  Chairman
                                </p>
                              </>
                            ) : null}
                            {requisition.vp_status == "0" ? (
                              <>
                                <p class="badge border text-dark justify-content-between align-items-center ms-2">
                                  Vice Principal
                                </p>
                              </>
                            ) : null}
                            {requisition.as_status == "0" ? (
                              <>
                                <p class="badge border text-dark justify-content-between align-items-center ms-2">
                                  Academic Supervisor
                                </p>
                                <br />
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
                {appstatus == false && (
                  <>
                    {fullapprovechk == 0 && (
                      <>
                        {user == "store" && (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-6 p-0 pe-2">
                                  <form onSubmit={Storesubmit} id="form">
                                    <div className="bg5 p-2 px-3">
                                      <label className="form-label label1 mt-2">
                                        Feedback Note
                                      </label>
                                      <br />
                                      <textarea
                                        name=""
                                        id=""
                                        rows="2"
                                        className="form-control font-12"
                                        placeholder=""
                                        onChange={(e) => {
                                          setStoreNote(e.target.value);
                                        }}
                                      ></textarea>

                                      <button
                                        class="btn submit-btn mt-2"
                                        type="submit"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <div className="col-lg-6 p-0 ps-2"></div>
                              </div>
                            </div>
                          </>
                        )}
                        {requisition.as_status !== "" && (
                          <>
                            {user == "Academic Supervisor" && (
                              <>
                                <div className="container">
                                  <div className="row">
                                    <div className="col-lg-6 p-0 pe-2">
                                      <form onSubmit={COsubmit} id="form">
                                        <div className="bg5 p-2 px-3">
                                          <label className="form-label label1">
                                            Acknowledge Type
                                          </label>
                                          <select
                                            className="form-select input1 py-0 mb-2"
                                            onChange={(e) => {
                                              setAcknowledgeType(
                                                e.target.value
                                              );
                                            }}
                                            required
                                          >
                                            <option value={""} Selected>
                                              Select
                                            </option>
                                            <option>Acknowledge</option>
                                            <option>Disacknowledge</option>
                                          </select>

                                          <label className="form-label label1">
                                            Acknowledge Note
                                          </label>
                                          <textarea
                                            name=""
                                            id=""
                                            rows="2"
                                            className=" form-control font-12"
                                            placeholder=""
                                            onChange={(e) => {
                                              setCoNote(e.target.value);
                                            }}
                                          ></textarea>

                                          <button
                                            class="btn submit-btn mt-2"
                                            type="submit"
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                    <div className="col-lg-6 p-0 ps-2"></div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                        {user == "co-ordinator" && (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-6 p-0 pe-2">
                                  <form onSubmit={COsubmit} id="form">
                                    <div className="bg5 p-2 px-3">
                                      <label className="form-label label1">
                                        Acknowledge Type
                                      </label>
                                      <select
                                        className="form-select input1 py-0 mb-2"
                                        onChange={(e) => {
                                          setAcknowledgeType(e.target.value);
                                        }}
                                        required
                                      >
                                        <option value={""} Selected>
                                          Select
                                        </option>
                                        <option>Acknowledge</option>
                                        <option>Disacknowledge</option>
                                      </select>

                                      <label className="form-label label1">
                                        Acknowledge Note
                                      </label>
                                      <textarea
                                        name=""
                                        id=""
                                        rows="2"
                                        className=" form-control font-12"
                                        placeholder=""
                                        onChange={(e) => {
                                          setCoNote(e.target.value);
                                        }}
                                      ></textarea>

                                      <button
                                        class="btn submit-btn mt-2"
                                        type="submit"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <div className="col-lg-6 p-0 ps-2"></div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {requisition.maintenance !== "" && (
                      <>
                        {user == "maintenance" && (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-6 p-0 pe-2">
                                  <form onSubmit={MaintanenceSubmit} id="form">
                                    <div className="bg5 p-2 px-3">
                                      <label className="form-label label1 mt-2">
                                        Feedback Note
                                      </label>
                                      <br />
                                      <textarea
                                        name=""
                                        id=""
                                        rows="2"
                                        className="form-control font-12"
                                        placeholder=""
                                        onChange={(e) => {
                                          setMaintenanceNote(e.target.value);
                                        }}
                                      ></textarea>

                                      <button
                                        class="btn submit-btn mt-2"
                                        type="submit"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <div className="col-lg-6 p-0 ps-2"></div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {requisition.pro_status !== "" && (
                      <>
                        {user == "procurement" && (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-6 p-0 pe-2">
                                  <form onSubmit={procurementsubmit} id="form">
                                    <div className="bg5 p-2 px-3">
                                      <label className="form-label label1 mt-2">
                                        Procurement Note
                                      </label>
                                      <br />
                                      <textarea
                                        name=""
                                        id=""
                                        rows="2"
                                        className="form-control font-12"
                                        placeholder=""
                                        onChange={(e) => {
                                          setStoreNote(e.target.value);
                                        }}
                                      ></textarea>

                                      <button
                                        class="btn submit-btn mt-2"
                                        type="submit"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <div className="col-lg-6 p-0 ps-2"></div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {user == "manager" && (
                      <>
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-6 p-0 pe-2">
                              <div className="bg5 p-2 px-3">
                                <div className="bg5 p-2 px-3">
                                  <label className="form-label label1">
                                    Approvel Type
                                  </label>
                                  <select
                                    className="form-select input1 py-0"
                                    onChange={(e) => {
                                      setTab("");
                                      setApprovedType(e.target.value);
                                    }}
                                    required
                                  >
                                    <option value={""} Selected>
                                      Select
                                    </option>
                                    <option>Not Approve</option>
                                    <option>Approved</option>
                                    <option>Hold</option>
                                  </select>

                                  {approvedType == "Not Approve" && (
                                    <>
                                      <label className="form-label label1 mt-2">
                                        Reason
                                      </label>
                                      <br />
                                      <form onSubmit={notapproved} id="form">
                                        <textarea
                                          name=""
                                          id=""
                                          rows="2"
                                          className="form-control font-12"
                                          placeholder=""
                                          onChange={(e) => {
                                            setRejectNote(e.target.value);
                                          }}
                                        ></textarea>

                                        <button class="btn submit-btn mt-2">
                                          Submit
                                        </button>
                                      </form>
                                    </>
                                  )}
                                  {approvedType == "Approved" && (
                                    <>
                                      <div class="form-check">
                                        <input
                                          class="form-check-input font-14 my-2"
                                          type="checkbox"
                                          value="1"
                                          id="flexCheckDefault"
                                          onChange={(e) => {
                                            setMaintanence(e.target.value);
                                          }}
                                        />
                                        <label
                                          class="form-check-label font-12"
                                          for="flexCheckDefault"
                                        >
                                          Maintanence
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input
                                          class="form-check-input font-14 my-2"
                                          type="checkbox"
                                          value="1"
                                          id="flexCheckDefault"
                                          onChange={(e) => {
                                            setProcurement(e.target.value);
                                          }}
                                        />
                                        <label
                                          class="form-check-label font-12"
                                          for="flexCheckDefault"
                                        >
                                          Send Procurement
                                        </label>
                                      </div>
                                      <label className="form-label label1 mt-2">
                                        Approvel Note
                                      </label>
                                      <br />
                                      <form onSubmit={approved} id="form">
                                        <textarea
                                          name=""
                                          id=""
                                          rows="2"
                                          className="form-control font-12"
                                          placeholder=""
                                          onChange={(e) => {
                                            setApprovedNote(e.target.value);
                                          }}
                                        ></textarea>

                                        <button
                                          class="btn submit-btn mt-2"
                                          type="submit"
                                        >
                                          Apporve & Submit
                                        </button>
                                      </form>
                                    </>
                                  )}

                                  {approvedType == "Hold" && (
                                    <>
                                      <label className="form-label label1 mt-2">
                                        Hold Note
                                      </label>
                                      <br />
                                      <form onSubmit={holdstate} id="form">
                                        <textarea
                                          name=""
                                          id=""
                                          rows="2"
                                          className="form-control font-12"
                                          placeholder=""
                                          onChange={(e) => {
                                            setHoldNote(e.target.value);
                                          }}
                                        ></textarea>

                                        <button
                                          class="btn submit-btn mt-2"
                                          type="submit"
                                        >
                                          Submit
                                        </button>
                                      </form>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 p-0 ps-2">
                              {user == "manager" && (
                                <>
                                  <div className="bg5 p-2 px-3">
                                    <button
                                      class="btn submit-btn mt-2 btn-sm"
                                      onClick={fullApprovedMR}
                                    >
                                      Full Approved
                                    </button>
                                    <form
                                      onSubmit={addApprovelRequired}
                                      id="form"
                                    >
                                      <label
                                        for="exampleDataList"
                                        class="form-label label1"
                                      >
                                        Approvel Required
                                      </label>
                                      <div class="input-group mb-3">
                                        <input
                                          class="form-control input1"
                                          list="datalistOptions"
                                          id="exampleDataList"
                                          aria-describedby="basic-addon2"
                                          placeholder="Type to search..."
                                          onChange={(e) => {
                                            setGetApp(e.target.value);
                                          }}
                                          required
                                        />
                                        <datalist id="datalistOptions">
                                          <option value="Principal" />
                                          <option value="Chairman" />
                                          <option value="Vice Principal" />
                                          <option value="Academic Supervisor" />
                                        </datalist>
                                        <button
                                          class="input-group-text submit-btn-sm ms-1"
                                          id="basic-addon2"
                                          type="submit"
                                        >
                                          Add
                                        </button>
                                      </div>
                                    </form>
                                    {requisition.p_status == "0" ? (
                                      <>
                                        <p class="badge border text-dark justify-content-between align-items-center">
                                          Principal
                                          <i
                                            class="fa-solid fa-xmark ms-3"
                                            onClick={() => {
                                              removeP(
                                                requisition.requisition_id
                                              );
                                            }}
                                          ></i>
                                        </p>
                                      </>
                                    ) : null}
                                    {requisition.ch_status == "0" ? (
                                      <>
                                        <p class="badge border text-dark justify-content-between align-items-center ms-2">
                                          Chairman
                                          <i
                                            class="fa-solid fa-xmark ms-3"
                                            onClick={() => {
                                              removeC(
                                                requisition.requisition_id
                                              );
                                            }}
                                          ></i>
                                        </p>
                                      </>
                                    ) : null}
                                    {requisition.vp_status == "0" ? (
                                      <>
                                        <p class="badge border text-dark justify-content-between align-items-center ms-2">
                                          Vice Principal
                                          <i
                                            class="fa-solid fa-xmark ms-3"
                                            onClick={() => {
                                              removevp(
                                                requisition.requisition_id
                                              );
                                            }}
                                          ></i>
                                        </p>
                                      </>
                                    ) : null}
                                    {requisition.as_status == "0" ? (
                                      <>
                                        <p class="badge border text-dark justify-content-between align-items-center mt-1">
                                          Academic Supervisor
                                          <i
                                            class="fa-solid fa-xmark ms-3"
                                            onClick={() => {
                                              removeas(
                                                requisition.requisition_id
                                              );
                                            }}
                                          ></i>
                                        </p>
                                        <br />
                                      </>
                                    ) : null}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {requisition.vp_status !== "" && (
                      <>
                        {user == "Vice Principal" && (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-6 p-0 pe-2">
                                  <div className="bg5 p-2 px-3">
                                    <div className="bg5 p-2 px-3">
                                      <label className="form-label label1">
                                        Approvel Type
                                      </label>
                                      <select
                                        className="form-select input1 py-0"
                                        onChange={(e) => {
                                          setTab("");
                                          setApprovedType(e.target.value);
                                        }}
                                        required
                                      >
                                        <option value={""} Selected>
                                          Select
                                        </option>
                                        <option>Not Approve</option>
                                        <option>Approved</option>
                                        <option>Hold</option>
                                      </select>

                                      {approvedType == "Not Approve" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Reason
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={notapprovedCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setRejectNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        </>
                                      )}
                                      {approvedType == "Approved" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Approvel Note
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={approvedCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setApprovedNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Apporve & Submit
                                            </button>
                                          </form>
                                        </>
                                      )}

                                      {approvedType == "Hold" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Hold Note
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={holdstateCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setHoldNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 p-0 ps-2">
                                  <div className="bg5 p-2 px-3">
                                    <button
                                      class="btn submit-btn mt-2"
                                      onClick={fullApprovedMR}
                                    >
                                      Full Approved
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {requisition.p_status !== "" && (
                      <>
                        {user == "principal" && (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-6 p-0 pe-2">
                                  <div className="bg5 p-2 px-3">
                                    <div className="bg5 p-2 px-3">
                                      <label className="form-label label1">
                                        Approvel Type
                                      </label>
                                      <select
                                        className="form-select input1 py-0"
                                        onChange={(e) => {
                                          setTab("");
                                          setApprovedType(e.target.value);
                                        }}
                                        required
                                      >
                                        <option value={""} Selected>
                                          Select
                                        </option>
                                        <option>Not Approve</option>
                                        <option>Approved</option>
                                        <option>Hold</option>
                                      </select>

                                      {approvedType == "Not Approve" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Reason
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={notapprovedCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setRejectNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        </>
                                      )}
                                      {approvedType == "Approved" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Approvel Note
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={approvedCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setApprovedNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Apporve & Submit
                                            </button>
                                          </form>
                                        </>
                                      )}

                                      {approvedType == "Hold" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Hold Note
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={holdstateCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setHoldNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 p-0 ps-2">
                                  <div className="bg5 p-2 px-3">
                                    <button
                                      class="btn submit-btn mt-2"
                                      onClick={fullApprovedMR}
                                    >
                                      Full Approved
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {requisition.ch_status !== "" && (
                      <>
                        {user == "chairman" && (
                          <>
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-6 p-0 pe-2">
                                  <div className="bg5 p-2 px-3">
                                    <div className="bg5 p-2 px-3">
                                      <label className="form-label label1">
                                        Approvel Type
                                      </label>
                                      <select
                                        className="form-select input1 py-0"
                                        onChange={(e) => {
                                          setTab("");
                                          setApprovedType(e.target.value);
                                        }}
                                        required
                                      >
                                        <option value={""} Selected>
                                          Select
                                        </option>
                                        <option>Not Approve</option>
                                        <option>Approved</option>
                                        <option>Hold</option>
                                      </select>

                                      {approvedType == "Not Approve" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Reason
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={notapprovedCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setRejectNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        </>
                                      )}
                                      {approvedType == "Approved" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Approvel Note
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={approvedCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setApprovedNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Apporve & Submit
                                            </button>
                                          </form>
                                        </>
                                      )}

                                      {approvedType == "Hold" && (
                                        <>
                                          <label className="form-label label1 mt-2">
                                            Hold Note
                                          </label>
                                          <br />
                                          <form
                                            onSubmit={holdstateCHP}
                                            id="form"
                                          >
                                            <textarea
                                              name=""
                                              id=""
                                              rows="2"
                                              className="form-control font-12"
                                              placeholder=""
                                              onChange={(e) => {
                                                setHoldNote(e.target.value);
                                              }}
                                            ></textarea>

                                            <button
                                              class="btn submit-btn mt-2"
                                              type="submit"
                                            >
                                              Submit
                                            </button>
                                          </form>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 p-0 ps-2">
                                  <div className="bg5 p-2 px-3">
                                    <button
                                      class="btn submit-btn mt-2"
                                      onClick={fullApprovedMR}
                                    >
                                      Full Approved
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-3 pt-2 ">
              <RequisitionTimelineComp setUpdate={update} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
