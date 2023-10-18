import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import converter from "number-to-words";
import noData from "../../../assets/images/no_data.png";
import copy from "../../../assets/images/copy.png";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";
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
export const SPlistComp = () => {
  // States
  const { user } = useContext(UserRoleContext);
  const [loader, setLoader] = useState(false);
  const [SPList, setSPList] = useState([]);
  const [sPItemList, setSPItemList] = useState([]);
  const [sPInfo, setSPInfo] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [yn, setYn] = useState(false);
  const [yn2, setYn2] = useState(false);

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
  var total = 0;
  function test(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
  const columns = [
    {
      name: "SP ID",
      width: "20%",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.sp_id);
          }}
        >
          {row.sp_id}
        </div>
      ),
    },
    {
      name: "Generate Date",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.sp_id);
          }}
        >
          {row.gdate.slice(0, 10)}
        </div>
      ),
      width: "20%",
    },
    {
      name: "Expected Date",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.sp_id);
          }}
        >
          {row.exp_date.slice(0, 10)}
        </div>
      ),
      width: "20%",
    },
    {
      name: "Items",
      selector: (row) => row.count,
      cell: (row) => (
        <div
          onClick={() => {
            test(row.sp_id);
          }}
        >
          {row.count}
        </div>
      ),
      width: "20%",
    },
    {
      name: "Amount",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.sp_id);
          }}
        >
          {row.amount}
        </div>
      ),
      width: "20%",
    },
  ];

  const getSPListData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getSupplyPaymentCountSP`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setSPList(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getSPListItemData = () => {
    const data = new FormData();
    data.append("sp_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getSupplyPaymentItemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message2) {
          setSPItemList(res.message);
          setSPInfo(res.message2[0]);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  const approvel = () => {
    alert(activeid);
    const data = new FormData();
    data.append("id", activeid);
    data.append("status", "Approved");
    data.append("user", user);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateSPApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSPListItemData();
    getSPListData();
  }, [update]);
  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Supply Payment List</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 px-0">
              <DataTable
                columns={columns}
                data={SPList}
                customStyles={customStyle}
                dense
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
                pagination
              />
            </div>
            <div className="col-lg-7 border-start" style={{ height: "80.5vh" }}>
              {!sPInfo ? (
                <>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 text-center my-5">
                        <p className="font-22 fw-400 text-muted">
                          {" "}
                          No Data Selected
                        </p>
                        <p className="font-12">
                          Select data from list to view the supplier payment
                          details.{" "}
                        </p>

                        <img src={noData} className="nodata" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row px-1 py-2">
                    <div className="col-lg-12 border-bottom pb-2">
                      <div className="d-flex justify-content-between">
                        <p className="font-11 mb-0 text-primary">
                          {" "}
                          <i className="fa-solid fa-edit"></i>{" "}
                          &nbsp;&nbsp;Update FR
                        </p>
                        <div className="d-flex align-items-center">
                          <img
                            src={copy}
                            className="theadicon mx-1"
                            title="Copy"
                          />
                          <img
                            src={xls}
                            className="theadicon mx-1"
                            title="XLS"
                          />
                          <img
                            src={pdf}
                            className="theadicon mx-1"
                            title="PDF"
                          />
                          <img
                            src={printer}
                            className="theadicon mx-1"
                            title="Print"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 my-2">
                      <div className="mx-1">
                        <table class="table table-bordered">
                          <tbody>
                            <tr>
                              <th className="py-1 bg-light font-14" width="10%">
                                SP ID
                              </th>
                              <td className="py-1 font-14" width="10%">
                                {sPInfo?.sp_id}
                              </td>
                              <th className="py-1 bg-light font-14" width="20%">
                                Generated Date
                              </th>
                              <td className="py-1 font-14" width="15%">
                                {sPInfo?.gdate}
                              </td>
                              <th className="py-1 bg-light font-14" width="20%">
                                Expected Date
                              </th>
                              <td className="py-1 font-14" width="15%">
                                {sPInfo?.exp_date}
                              </td>
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
                          <label className="form-label fw-bold label1">
                            MR
                          </label>
                        </div>
                        <div className="col-4">
                          <label className="form-label fw-bold label1">
                            Item
                          </label>
                        </div>
                        <div className="col-2">
                          <label className="form-label fw-bold label1">
                            campus
                          </label>
                        </div>
                        <div className="col-3">
                          <label className="form-label fw-bold label1">
                            Supplier
                          </label>
                        </div>
                        <div className="col-2">
                          <label className="form-label fw-bold label1">
                            Amount (BDT)
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      {sPItemList?.map((item, index) => {
                        total = total + +item.amount;
                        return (
                          <>
                            <div
                              className="row pt-1 mx-1 border-start border-end border-bottom"
                              key={item.id}
                            >
                              <div className="col-1">
                                <p className="form-label label1">{item.r_id}</p>
                              </div>
                              <div className="col-4">
                                <p className="form-label label1">{item.item}</p>
                              </div>
                              <div className="col-2">
                                <p className="form-label label1">
                                  {item.campus}
                                </p>
                              </div>

                              <div className="col-3">
                                <p className="form-label label1">
                                  {item.vendor}
                                </p>
                              </div>
                              <div className="col-2">
                                <p className="form-label label1">
                                  {item.amount}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}

                      <div className="row mx-1 border border-top-0">
                        <div className="col-lg-10 py-1 text-end border-end">
                          <p className="mb-0 font-12 fw-bold">Total</p>
                        </div>

                        <div className="col-lg-2 py-1">
                          <p className="mb-0 font-14 fw-bold">{total} BDT</p>
                        </div>
                      </div>
                      <div className="row px-1 py-3">
                        <div className="col-lg-2">
                          <p className="mb-0 font-14 fw-bold">In Words</p>
                        </div>
                        <div className="col-lg-10">
                          <p className="mb-0 text-capitalize font-14 fw-bold">
                            :{" "}
                            {total !== 0 && (
                              <>{converter.toWords(total).replace(",", " ")}</>
                            )}
                          </p>
                        </div>
                      </div>
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
                                <p>{sPInfo?.compile}</p>
                              </td>
                              <td className="border-end font-13">
                                {user == "" && (
                                  <>
                                    {sPInfo.mstatus == "" ? (
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
                                    {sPInfo.mstatus == "" ? (
                                      <>
                                        <div className="d-flex">
                                          <div class="form-check">
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
                                            onClick={approvel}
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
                                    {sPInfo.mstatus == "" ? (
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
                                    {sPInfo.pstatus == "" ? (
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
                                    {sPInfo.pstatus == "" ? (
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
                                    {sPInfo.pstatus == "" ? (
                                      <>
                                        <div className="d-flex">
                                          <div class="form-check">
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
                                            onClick={approvel}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
