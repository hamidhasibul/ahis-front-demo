import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import converter from "number-to-words";
import noData from "../../assets/images/no_data.png";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";
import { useContext } from "react";
import { UserRoleContext } from "../../context/UserRoleContext";
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
export const MDRListComp = () => {
  // States
  const [loader, setLoader] = useState(false);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [mDRinfo, setMDRinfo] = useState([]);
  const [MDRItemList, setMDRItemList] = useState([]);
  const [MDRList, setMDRList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };
  function test(id) {
    setActiveid(id);
    setUpdate(update + 1);
    console.log(id);
  }
  const columns = [
    {
      name: "MDR ID",
      width: "20%",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.mdr_id);
          }}
        >
          {row.status == "Received" ? (
            <>
              <p className="text-success fw-bold"> {row.mdr_id}</p>
            </>
          ) : (
            <>
              <p className="text-danger fw-bold"> {row.mdr_id}</p>
            </>
          )}
        </div>
      ),
    },

    {
      name: "MR",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.mdr_id);
          }}
        >
          {row.r_id}
        </div>
      ),
      width: "20%",
    },
    {
      name: "Campus",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.mdr_id);
          }}
        >
          {row.campus}
        </div>
      ),
      width: "20%",
    },
    {
      name: "Requester",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.mdr_id);
          }}
        >
          {row.rname}
        </div>
      ),
      width: "20%",
    },
    {
      name: "Create date",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.mdr_id);
          }}
        >
          {row.gdate}
        </div>
      ),
      width: "20%",
    },
  ];

  const MDRListData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getMDRinfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setMDRList(res.message);
      })
      .catch((err) => console.log(err));
  };
  const MDRListItemData = () => {
    const data = new FormData();
    data.append("mdr_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getAllMDRinfoByID`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setMDRItemList(res.items);
        setMDRinfo(res.info[0]);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const receive = () => {
    const data = new FormData();
    data.append("mdr_id", activeid);
    data.append("user", username);
    fetch(`${import.meta.env.VITE_SERVER}/updateMDRstatus`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    MDRListData();
    MDRListItemData();
  }, [update]);

  console.log(MDRItemList);
  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">MDR List</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 px-0">
              <DataTable
                columns={columns}
                data={MDRList}
                customStyles={customStyle}
                dense
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
                pagination
              />
            </div>
            <div className="col-lg-7 border-start" style={{ height: "80.5vh" }}>
              {!mDRinfo ? (
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
                          &nbsp;&nbsp;Update MDR
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
                              <th className="py-1 bg-light font-13" width="25%">
                                MDR ID
                              </th>
                              <td className="py-1 font-13" width="25%">
                                {mDRinfo?.mdr_id}
                              </td>
                              <th className="py-1 bg-light font-13" width="25%">
                                Campus
                              </th>
                              <td className="py-1 font-13" width="25%">
                                {mDRinfo?.campus}
                              </td>
                            </tr>
                            <tr>
                              <th
                                className="py-1 bg-light font-13 "
                                width="25%"
                              >
                                Create Date
                              </th>
                              <td className="py-1 font-14" width="25%">
                                {mDRinfo?.gdate}
                              </td>
                              <th
                                className="py-1 bg-light font-13 "
                                width="25%"
                              >
                                Requester name
                              </th>
                              <td className="py-1 font-14" width="25%">
                                {mDRinfo?.rname}
                              </td>
                            </tr>

                            {/* <tr>
                            
                              <th className="py-1 bg-light font-13">
                                Create Date
                              </th>
                              <td className="py-1 font-13">{mDRinfo?.gdate}</td>
                            </tr> */}
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
                        <div className="col-5">
                          <label className="form-label fw-bold label1">
                            Item
                          </label>
                        </div>
                        <div className="col-2">
                          <label className="form-label fw-bold label1">
                            Condition
                          </label>
                        </div>
                        <div className="col-2">
                          <label className="form-label fw-bold label1">
                            Quantaty
                          </label>
                        </div>
                        <div className="col-2">
                          <label className="form-label fw-bold label1">
                            Remark
                          </label>
                        </div>
                      </div>
                      {MDRItemList?.map((item, index) => {
                        return (
                          <>
                            <div
                              className="row mx-1 align-items-center border border-top-0"
                              key={item.id}
                            >
                              <div className="col-1">
                                <p className="form-label label1">{item.r_id}</p>
                              </div>
                              <div className="col-5">
                                <p className="form-label label1">{item.item}</p>
                              </div>
                              <div className="col-2">
                                <label className="form-label label1">
                                  {item.pcondition}
                                </label>
                              </div>
                              <div className="col-2">
                                <label className="form-label label1">
                                  {item.qty}
                                </label>
                              </div>
                              <div className="col-2">
                                <label className="form-label label1">
                                  {item.note}
                                </label>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="col-lg-6"></div>
                    {mDRinfo?.status == "" ? (
                      <>
                        {" "}
                        <div className="container">
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
                                className="btn submit-btn-sm w-100"
                                onClick={receive}
                                disabled={yn !== true}
                              >
                                Check
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="col-lg-6 mt-2 text-end">
                          <p>Received</p>
                        </div>
                      </>
                    )}
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
