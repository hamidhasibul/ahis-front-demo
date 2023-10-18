import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserRoleContext } from "../../../context/UserRoleContext";
import { useContext } from "react";
import DataTable from "react-data-table-component";
import converter from "number-to-words";
import noData from "../../../assets/images/no_data.png";
import copy from "../../../assets/images/copy.png";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";

import { ConfirmModalComp } from "../../modal/ConfirmModalComp";
export const OrderViewComp = () => {
  const { user } = useContext(UserRoleContext);
  const [poItemList, setPoItemList] = useState([]);
  const [poInfo, setPoInfo] = useState([]);
  const [update, setUpdate] = useState([]);
  const [note, setNote] = useState("");
  const [approvedType, setApprovedType] = useState("");
  const [alltandc, setAllTandc] = useState("");
  const [yn, setYn] = useState("");
  const params = useParams();
  const { id } = params;
  var total = 0;
  var qtotal = 0;
  var tvat = 0;
  function confirmsubmit() {
    document.getElementById("yesnomodal").click();
  }
  function approvepo(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("po_id", id);
    data.append("des", user);
    data.append("status", approvedType);
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateApprovelPO`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message) {
          setUpdate(update + 1);
        }
      })
      .catch((err) => console.log(err));
  }

  const PoData = () => {
    const data = new FormData();
    data.append("po_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getpoItemallinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setPoItemList(res.message2);
          setPoInfo(res.message[0]);
          setAllTandc(JSON.parse(res.message[0].tandc));
          console.log(res);
        }
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
  console.log(user);
  useEffect(() => {
    PoData();
  }, [update]);
  return (
    <div className="content-body">
      <ConfirmModalComp
        id={id}
        info={"po"}
        setUpdate={setUpdate}
        update={update}
      />
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">PO View</p>
      </div>
      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1 py-2">
            <div className="col-lg-12 border-bottom pb-2">
              <div className="d-flex justify-content-between">
                <p className="font-11 mb-0 text-primary">
                  {" "}
                  <i className="fa-solid fa-edit"></i> &nbsp;&nbsp;Update FR
                </p>
                <div className="d-flex align-items-center">
                  <img src={copy} className="theadicon mx-1" title="Copy" />
                  <img src={xls} className="theadicon mx-1" title="XLS" />
                  <img src={pdf} className="theadicon mx-1" title="PDF" />
                  <img src={printer} className="theadicon mx-1" title="Print" />
                </div>
              </div>
            </div>
            <div className="col-lg-12 my-2">
              <div className="rounded py-2 text-center bg-light">
                {poInfo?.poType == "purchaseOrder" ? (
                  <>
                    <p className="font-20">Purchase Order</p>
                  </>
                ) : (
                  <>
                    <p className="font-20">Work Order</p>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-12 my-2">
              <div className="mx-1">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th className="py-1 bg-light font-14" width="20%">
                        Supplier Name
                      </th>
                      <td className="py-1 font-14" width="30%">
                        {poInfo?.sname}
                      </td>
                      <th className="py-1 bg-light font-14">Order Number</th>
                      <td className="py-1 font-14">{poInfo?.po_id}</td>
                    </tr>
                    <tr>
                      <th className="py-1 bg-light font-14">Supplier POC</th>
                      <td className="py-1 font-14"> {poInfo?.spoc}</td>
                      <th className="py-1 bg-light font-14">Order Date</th>
                      <td className="py-1 font-14">{poInfo?.date}</td>
                    </tr>
                    <tr>
                      <th className="py-1 bg-light font-14">Supplier Phone</th>
                      <td className="py-1 font-14">{poInfo?.scontact}</td>
                      <th className="py-1 bg-light font-14">
                        Expected Start Date
                      </th>
                      <td className="py-1 font-14">{poInfo?.exp_sdate}</td>
                    </tr>
                    <tr>
                      <th className="py-1 bg-light font-14">
                        Supplier Location
                      </th>
                      <td className="py-1 font-14">{poInfo?.slocation}</td>
                      <th className="py-1 bg-light font-14">
                        Expected End Date
                      </th>
                      <td className="py-1 font-14">{poInfo?.exp_edate}</td>
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
                <div className="col-1">
                  <label className="form-label fw-bold label1">SL</label>
                </div>
                <div className="col-3">
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
                  <label className="form-label fw-bold label1">Quantity</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">Amount</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">VAT</label>
                </div>
                <div className="col-1">
                  <label className="form-label fw-bold label1">TAX</label>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              {poItemList?.map((item, index) => {
                total = total + +item.price;
                qtotal = qtotal + +item.qty;

                return (
                  <>
                    <div className="row pt-1 mx-1 border-start border-end border-bottom">
                      <div className="col-1">
                        <p className="form-label label1">{index + 1}</p>
                      </div>
                      <div className="col-3">
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
                        <p className="form-label label1">{item.price}</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.vat}%</p>
                      </div>
                      <div className="col-1">
                        <p className="form-label label1">{item.tax}%</p>
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="row mx-1 border border-top-0">
                <div className="col-lg-10 py-1 text-end border-end">
                  <p className="mb-0 font-12 fw-bold">Total</p>
                </div>
                {/* <div className="col-lg-1 py-1 border-end">
                  <p className="mb-0 font-14 fw-bold">{qtotal}</p>
                </div> */}
                <div className="col-lg-1 py-1">
                  <p className="mb-0 font-14 fw-bold">{total}</p>
                </div>
              </div>
              <div className="row mx-1 border border-top-0">
                <div className="col-lg-10 py-1 text-end border-end">
                  <p className="mb-0 font-12 fw-bold">VAT & TAX (+)</p>
                </div>
                <div className="col-lg-2 py-1">
                  <p className="mb-0 font-14 fw-bold">{poInfo?.tvat} BDT</p>
                </div>
              </div>
              <div className="row mx-1 border border-top-0">
                <div className="col-lg-10 py-1 text-end border-end">
                  <p className="mb-0 font-12 fw-bold">AIT (-)</p>
                </div>
                <div className="col-lg-2 py-1">
                  <p className="mb-0 font-14 fw-bold">{poInfo?.ait} BDT</p>
                </div>
              </div>
              <div className="row mx-1 border border-top-0">
                <div className="col-lg-10 py-1 text-end border-end">
                  <p className="mb-0 font-12 fw-bold">Grand Total</p>
                </div>
                <div className="col-lg-2 py-1">
                  <p className="mb-0 font-14 fw-bold">{poInfo?.gtotal} BDT</p>
                </div>
              </div>
            </div>

            <div className="col-lg-12 my-3">
              <div className="d-flex mx-1">
                <div className="w-50 border border-end-0">
                  <div className="d-flex border-bottom">
                    <div className="bg-light p-3 w-25 border-end">
                      <p className="mb-0 font-14">Compiled By</p>
                    </div>
                    <div className="p-2">
                      <p>Demo Account</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="bg-light p-3 w-25 border-end">
                      <p className="mb-0 font-14">Approved By</p>
                    </div>

                    <div
                      class="modal fade"
                      id="staticBackdrop1"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">
                              {user == "manager" && <>Manager Approvel</>}
                              {user == "Principal" && <>Principal Approvel</>}
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form onSubmit={approvepo} id="form">
                              <label className="form-label label1">
                                Approvel Type
                              </label>
                              <select
                                className="form-select input1 py-0 mb-2"
                                onChange={(e) => {
                                  setApprovedType(e.target.value);
                                }}
                                required
                              >
                                <option value={""} Selected>
                                  Select
                                </option>
                                <option>Disapprove</option>
                                <option>Approved</option>
                              </select>
                              {approvedType == "Disapprove" && (
                                <>
                                  <label className="form-label label1">
                                    Note
                                  </label>
                                  <textarea
                                    name=""
                                    id=""
                                    rows="2"
                                    className="form-control font-12"
                                    placeholder=""
                                    onChange={(e) => {
                                      setNote(e.target.value);
                                    }}
                                  ></textarea>
                                </>
                              )}

                              <button
                                class="btn submit-btn mt-2"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      {user === "" && (
                        <>
                          {poInfo?.pstatus == "1" && (
                            <>
                              <p className="font-12 text-danger fw-bold">
                                Pending for Principal Approval
                              </p>
                            </>
                          )}
                          {poInfo?.pstatus == "Approved" && (
                            <>
                              {" "}
                              <p className="font-12 text-success fw-bold">
                                Approved By Principal
                              </p>
                            </>
                          )}
                          {poInfo?.pstatus == "Disapprove" && (
                            <>
                              {" "}
                              <p className="font-12 text-danger fw-bold">
                                Not Approved By Principal
                                <span className="text-dark mx-2">
                                  Note:&nbsp;
                                  {poInfo?.pnote}
                                </span>
                              </p>
                            </>
                          )}
                          {poInfo?.mstatus == "1" && (
                            <>
                              <p className="font-12 text-danger fw-bold">
                                Pending for Manager Approval
                              </p>
                            </>
                          )}
                          {poInfo?.mstatus == "Approved" && (
                            <>
                              {" "}
                              <p className="font-12 text-success fw-bold">
                                Approved By Manager
                              </p>
                            </>
                          )}
                          {poInfo?.mstatus == "Disapprove" && (
                            <>
                              {" "}
                              <p className="font-12 text-danger fw-bold">
                                Not Approved By Manager
                                <span className="text-dark mx-2">
                                  Note:&nbsp;
                                  {poInfo?.mnote}
                                </span>
                              </p>
                            </>
                          )}
                        </>
                      )}
                      {user == "manager" && (
                        <>
                          {poInfo?.mstatus == "" ? (
                            <>
                              <button
                                type="button"
                                class="btn btn-sm btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop1"
                              >
                                Approve
                              </button>
                            </>
                          ) : (
                            <>
                              {poInfo?.pstatus == "" && (
                                <>
                                  <div className="div bg-light rounded p-3">
                                    <p className="font-14 fw-bold mb-0">
                                      Approval Require
                                    </p>
                                    <div className="pt-2">
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          style={{ marginTop: "7px" }}
                                          type="checkbox"
                                          value="1"
                                          id="flexCheckChecked"
                                          onClick={confirmsubmit}
                                        />
                                        <label
                                          class="form-check-label font-13"
                                          for="flexCheckChecked"
                                        >
                                          Principal Approvel
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                              {poInfo?.mstatus == "Approved" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-success fw-bold">
                                    Approved By Manager
                                  </p>
                                </>
                              )}
                              {poInfo?.mstatus == "Disapprove" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-danger fw-bold">
                                    Not Approved By Manager
                                    <span className="text-dark mx-2">
                                      Note:&nbsp;
                                      {poInfo?.mnote}
                                    </span>
                                  </p>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop1"
                                  >
                                    Approve
                                  </button>
                                </>
                              )}
                              {poInfo?.pstatus == "1" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-danger fw-bold">
                                    Pending for Principal Approval
                                  </p>
                                </>
                              )}
                              {poInfo?.pstatus == "Approved" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-success fw-bold">
                                    Approved By Principal
                                  </p>
                                </>
                              )}
                              {poInfo?.pstatus == "Disapprove" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-danger fw-bold">
                                    Not Approved By Principal
                                    <span className="text-dark mx-2">
                                      Note:&nbsp;
                                      {poInfo?.pnote}
                                    </span>
                                  </p>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop1"
                                  >
                                    Approve
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {user == "Principal" && (
                        <>
                          {poInfo?.pstatus == "1" ? (
                            <>
                              <button
                                type="button"
                                class="btn btn-sm btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop1"
                              >
                                Approve
                              </button>
                              {poInfo?.mstatus == "1" && (
                                <>
                                  <p className="font-12 text-danger fw-bold">
                                    Pending for Manager Approval
                                  </p>
                                </>
                              )}
                              {poInfo?.mstatus == "Approved" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-success fw-bold">
                                    Approved By Manager
                                  </p>
                                </>
                              )}
                              {poInfo?.mstatus == "Disapprove" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-danger fw-bold">
                                    Not Approved By Manager
                                    <span className="text-dark mx-2">
                                      Note:&nbsp;
                                      {poInfo?.mnote}
                                    </span>
                                  </p>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop1"
                                  >
                                    Approve
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {poInfo?.pstatus == "Approved" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-success fw-bold">
                                    Approved By Principal
                                  </p>
                                </>
                              )}
                              {poInfo?.pstatus == "Disapprove" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-danger fw-bold">
                                    Not Approved By Principal
                                    <span className="text-dark mx-2">
                                      Note:&nbsp;
                                      {poInfo?.pnote}
                                    </span>
                                  </p>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop1"
                                  >
                                    Approve
                                  </button>
                                </>
                              )}
                              {poInfo?.mstatus == "1" && (
                                <>
                                  <p className="font-12 text-danger fw-bold">
                                    Pending for Manager Approval
                                  </p>
                                </>
                              )}
                              {poInfo?.mstatus == "Approved" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-success fw-bold">
                                    Approved By Manager
                                  </p>
                                </>
                              )}
                              {poInfo?.mstatus == "Disapprove" && (
                                <>
                                  {" "}
                                  <p className="font-12 text-danger fw-bold">
                                    Not Approved By Manager
                                    <span className="text-dark mx-2">
                                      Note:&nbsp;
                                      {poInfo?.mnote}
                                    </span>
                                  </p>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop1"
                                  >
                                    Approve
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-50 d-flex border">
                  <div className="bg-light p-3 border-end">
                    <p>Terms & Condition</p>
                  </div>
                  <div className="p-2">
                    <ol class="list-group list-group-numbered">
                      {alltandc !== "" && (
                        <>
                          {alltandc.map((item) => (
                            <li
                              class="list-group-item font-12 p-0"
                              key={item.po_ID}
                            >
                              {item.term}
                            </li>
                          ))}
                        </>
                      )}
                    </ol>
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
