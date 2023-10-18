import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserRoleContext } from "../../../context/UserRoleContext";
import { useMemo } from "react";

export const CsViewComp = () => {
  const params = useParams();
  const { id } = params;
  const { user } = useContext(UserRoleContext);
  const [update, setUpdate] = useState([]);
  const [csData, setCsData] = useState([]);
  const [csinfo, setCsinfo] = useState([]);
  const [requisitionData, setRequisitionData] = useState([]);
  const [supplier1, setSupplier1] = useState("");
  const [supplier2, setSupplier2] = useState("");
  const [supplier3, setSupplier3] = useState("");

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [agreedAmount, setAgreedAmount] = useState("");

  const [csItemData, setCsItemData] = useState([]);
  const [yn, setYn] = useState(false);
  const [yn2, setYn2] = useState(false);

  const [editRemark, setEditRemark] = useState("");

  const getCSViewData = async () => {
    try {
      const data = new FormData();

      data.append("id", id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getCSDataById`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      setCsData(res.message);
      setCsinfo(res.message[0]);

      setSupplier1(res.message[0].supply_name);
      setSupplier2(res.message[0].supply_name1);
      setSupplier3(res.message[0].supply_name2);

      getRequisionData(res.message[0].requisition_id);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequisionData = async (id) => {
    try {
      const data = new FormData();

      data.append("requisition_id", id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionItemById`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();
      setRequisitionData(res.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCsItemData = async (id) => {
    const data = new FormData();
    data.append("id", id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisioncsByID`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      setCsItemData(res.message[0]);
      setSelectedSupplier(res.message[0].chosen_supplier);
      setAgreedAmount(res.message[0].amount);
      setEditRemark(res.message[0].remark);
    } catch (error) {
      console.error(error);
    }
  };

  function approvelsubmit(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "Approved");
    data.append("user", user);
    fetch(`${import.meta.env.VITE_SERVER}/UpdaterequisitionCSApproveUpdate`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  const handlerChange2 = (e) => {
    if (e.target.checked) {
      setYn2(true);
    } else {
      setYn2(false);
    }
  };

  const submitRemark = async () => {
    const data = new FormData();

    data.append("id", csItemData.id);
    data.append("remark", editRemark);
    data.append("chosen_supplier", selectedSupplier);
    data.append("amount", agreedAmount);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/submitrequisionCSRemark`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      console.log(res.message);
      setUpdate(update + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const totalAmount = useMemo(() => {
    return csData.reduce((total, item) => total + +item.amount, 0);
  }, [csData]);

  useEffect(() => {
    getCSViewData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">CS View</p>
        </div>
        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-2">
              <div className="col-lg-6 mb-2">
                <div className="row">
                  <div className="col-lg-4">
                    <p className="font-12 fw-500">Requisition ID</p>
                  </div>
                  <div className="col-lg-8">
                    <p className="font-12 fw-500">
                      : {requisitionData.requisition_id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="row">
                  <div className="col-lg-4">
                    <p className="font-12 fw-500">Requester Name</p>
                  </div>
                  <div className="col-lg-8">
                    <p className="font-12 fw-500">: {requisitionData.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="row">
                  <div className="col-lg-4">
                    <p className="font-12 fw-500">Campus</p>
                  </div>
                  <div className="col-lg-8">
                    <p className="font-12 fw-500">: {requisitionData.campus}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="row">
                  <div className="col-lg-4">
                    <p className="font-12 fw-500">Location</p>
                  </div>
                  <div className="col-lg-8">
                    <p className="font-12 fw-500">
                      : {requisitionData.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12" style={{ overflow: "auto" }}>
                <table class="table table-bordered" style={{ width: "2000px" }}>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-1 font-12"
                        rowSpan="2"
                        width="20"
                      >
                        SL
                      </th>
                      <th
                        scope="col"
                        className="py-1 font-12"
                        rowSpan="2"
                        width="120"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="py-1 font-12"
                        rowSpan="2"
                        width="160"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="py-1 font-12"
                        rowSpan="2"
                        width="50"
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="py-1 font-12"
                        rowSpan="2"
                        width="50"
                      >
                        Unit
                      </th>
                      <th scope="col" className="py-1 font-12" colspan="3">
                        {supplier1}
                      </th>
                      <th scope="col" className="py-1 font-12" colspan="3">
                        {supplier2}
                      </th>
                      <th scope="col" className="py-1 font-12" colspan="3">
                        {supplier3}
                      </th>
                      <th
                        scope="col"
                        className="py-1 font-12"
                        rowSpan="2"
                        width="100"
                      >
                        Remark
                      </th>
                      <th
                        scope="col"
                        className="py-1 font-12"
                        rowSpan="2"
                        width="100"
                      >
                        Amount
                      </th>
                    </tr>
                    <tr>
                      <th className="py-1 font-12" rowspan="3" width="100">
                        Brand/Origin
                      </th>
                      <th className="py-1 font-12" rowspan="3" width="100">
                        Quoted Price
                      </th>
                      <th className="py-1 font-12" rowspan="3" width="100">
                        Delivery Time
                      </th>

                      <th className="py-1 font-12" rowspan="3" width="100">
                        Brand/Origin
                      </th>
                      <th className="py-1 font-12" rowspan="3" width="100">
                        Quoted Price
                      </th>
                      <th className="py-1 font-12" rowspan="3" width="100">
                        Delivery Time
                      </th>

                      <th className="py-1 font-12" rowspan="3" width="100">
                        Brand/Origin
                      </th>
                      <th className="py-1 font-12" rowspan="3" width="100">
                        Quoted Price
                      </th>
                      <th className="py-1 font-12" rowspan="3" width="100">
                        Delivery Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {csData.map((item, index) => (
                      <>
                        <tr key={item.id}>
                          <td className="py-1 font-12">{index + 1}</td>
                          <td className="py-1 font-12">{item.item}</td>
                          <td className="py-1 font-12">{item.des}</td>
                          <td className="py-1 font-12">{item.qty}</td>
                          <td className="py-1 font-12">{item.unit}</td>
                          <td className="py-1 font-12">{item.brand}</td>
                          <td className="py-1 font-12">{item.quoted_price}</td>
                          <td className="py-1 font-12">{item.delivery_time}</td>
                          <td className="py-1 font-12">{item.brand1}</td>
                          <td className="py-1 font-12">{item.quoted_price1}</td>
                          <td className="py-1 font-12">
                            {item.delivery_time1}
                          </td>
                          <td className="py-1 font-12">{item.brand2}</td>
                          <td className="py-1 font-12">{item.quoted_price2}</td>
                          <td className="py-1 font-12">
                            {item.delivery_time2}
                          </td>
                          <td className="py-1 font-12 ">
                            <i
                              class="fa-solid fa-pen-to-square"
                              onClick={() => {
                                getCsItemData(item.id);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#remarkModal"
                              style={{ cursor: "pointer" }}
                            ></i>{" "}
                            {item.chosen_supplier} ({item.remark})
                          </td>
                          <td className="py-1 font-12">{item.amount}</td>
                        </tr>
                      </>
                    ))}
                    <tr>
                      <td colSpan={14}></td>
                      <td className="py-1 font-12 fw-bold ">Total</td>
                      <td className="py-1 font-12 fw-bold ">{totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-12 my-3">
                <div className="row">
                  <div class="col-lg-12">
                    <table className="w-100 table border">
                      <thead>
                        <tr>
                          <th className="border-end font-13" width="30%">
                            Compiled By
                          </th>
                          <th className="border-end font-13" width="40%">
                            Checked By
                          </th>
                          <th className="border-end font-13" width="40%">
                            Approved By
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <td className="border-end font-13">
                          <p>{csinfo?.compile}</p>
                        </td>
                        <td className="border-end font-13">
                          {user == "" && (
                            <>
                              {csinfo.mstatus == "" ? (
                                <>
                                  <p>Waiting for manager Check</p>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <p>Manager: Checked</p>
                                </>
                              )}
                            </>
                          )}
                          {user == "manager" && (
                            <>
                              {csinfo.mstatus == "" ? (
                                <>
                                  <div className="d-flex py-3">
                                    <div class="form-check  py-1 mx-2">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="1"
                                        id="flexCheckDefault"
                                        onChange={handlerChange}
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexCheckDefault"
                                      >
                                        Are You Sure
                                      </label>
                                    </div>
                                    <button
                                      className="btn submit-btn-sm "
                                      onClick={() => {
                                        approvelsubmit(csinfo.id);
                                      }}
                                      disabled={yn !== true}
                                    >
                                      Approve
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p>Manager: Checked</p>
                                </>
                              )}
                            </>
                          )}
                          {user == "Principal" && (
                            <>
                              {csinfo.mstatus == "" ? (
                                <>
                                  <p>waiting for Manager Feedback</p>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <p>Manager: Checked</p>
                                </>
                              )}
                            </>
                          )}
                        </td>
                        <td className="border-end font-13">
                          {user == "" && (
                            <>
                              {csinfo.pstatus == "" ? (
                                <>
                                  <p>waiting for Principal Approvel</p>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <p>Principal: Approve</p>
                                </>
                              )}
                            </>
                          )}

                          {user == "manager" && (
                            <>
                              {csinfo.pstatus == "" ? (
                                <>
                                  <p>waiting for Principal Approvel</p>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <p>Principal: Approve</p>
                                </>
                              )}
                            </>
                          )}
                          {user == "Principal" && (
                            <>
                              {csinfo.pstatus == "" ? (
                                <>
                                  <div className="d-flex py-3">
                                    <div class="form-check  py-1 mx-2">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="1"
                                        id="flexCheckDefault"
                                        onChange={handlerChange2}
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexCheckDefault"
                                      >
                                        Are You Sure
                                      </label>
                                    </div>
                                    <button
                                      className="btn submit-btn-sm "
                                      onClick={() => {
                                        approvelsubmit(csinfo.id);
                                      }}
                                      disabled={yn2 !== true}
                                    >
                                      Approve
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p>Principal: Approved</p>
                                </>
                              )}
                            </>
                          )}
                        </td>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANCHOR Remark Modal */}

      <div
        class="modal fade"
        id="remarkModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="remarkModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="remarkModalLabel">
                Edit
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">CS ID</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    value={csItemData.cs_id}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">CS Date</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    value={csItemData.date}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Quoted Item</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    value={csItemData.item}
                    disabled
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Choose Supplier</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setSelectedSupplier(e.target.value);
                    }}
                    value={selectedSupplier}
                  >
                    <option value={""}>Select Supplier</option>

                    {supplier1 && (
                      <>
                        <option value={supplier1}>{supplier1}</option>
                      </>
                    )}
                    {supplier2 && (
                      <>
                        <option value={supplier2}>{supplier2}</option>
                      </>
                    )}
                    {supplier3 && (
                      <>
                        <option value={supplier3}>{supplier3}</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Remark</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    value={editRemark}
                    onChange={(e) => {
                      setEditRemark(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Amount</label>
                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    value={agreedAmount}
                    onChange={(e) => {
                      setAgreedAmount(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={submitRemark}
                data-bs-dismiss="modal"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
