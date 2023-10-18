import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import converter from "number-to-words";
import noData from "../../assets/images/no_data.png";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";

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
export const GRNListComp = () => {
  // States
  const [loader, setLoader] = useState(false);
  const [GRNinfo, setGRNinfo] = useState([]);
  const [GRNItemList, setGRNItemList] = useState([]);
  const [GRNList, setGRNList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  function test(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
  const columns = [
    {
      name: "GRN ID",
      width: "33.3%",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.grn_id);
          }}
        >
          {row.grn_id}
        </div>
      ),
    },
    {
      name: "Supplier name",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.grn_id);
          }}
        >
          {row.sname == "" ? <>N/A</> : <>{row.sname}</>}
        </div>
      ),
      width: "33.3%",
    },
    {
      name: "Bill Number",
      cell: (row) => (
        <div
          onClick={() => {
            test(row.grn_id);
          }}
        >
          {row.billnum}
        </div>
      ),
      width: "33.5%",
    },
  ];

  const GRNListData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getGRNinfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setGRNList(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };
  const GRNListItemData = () => {
    const data = new FormData();
    data.append("grn_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getAllinfoByGRN`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setGRNItemList(res.items);
        setGRNinfo(res.info[0]);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // const receive = () => {
  //   const data = new FormData();
  //   data.append("grn_id", activeid);
  //   fetch(`${import.meta.env.VITE_SERVER}/updateGRNstatus`, {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setUpdate(update + 1);
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    GRNListData();
    GRNListItemData();
  }, [update]);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">GRN List</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 px-0">
              <DataTable
                columns={columns}
                data={GRNList}
                customStyles={customStyle}
                dense
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
                pagination
              />
            </div>
            <div className="col-lg-7 border-start" style={{ height: "80.5vh" }}>
              {!GRNinfo ? (
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
                          &nbsp;&nbsp;Update GRN
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
                              <th className="py-1 bg-light font-13" width="20%">
                                GRN ID
                              </th>
                              <td className="py-1 font-13" width="30%">
                                {GRNinfo?.grn_id}
                              </td>
                              <th className="py-1 bg-light font-13" width="20%">
                                Supplier Name
                              </th>
                              <td className="py-1 font-13" width="30%">
                                {GRNinfo?.sname}
                              </td>
                            </tr>
                            <tr>
                              <th className="py-1 bg-light font-13">
                                Challan Number
                              </th>
                              <td className="py-1 font-13">{GRNinfo?.cnum}</td>
                              <th className="py-1 bg-light font-13">
                                Bill Number
                              </th>
                              <td className="py-1 font-13">
                                {GRNinfo?.billnum}
                              </td>
                            </tr>
                            <tr>
                              <th className="py-1 bg-light font-13">
                                Generate Date
                              </th>
                              <td className="py-1 font-13">{GRNinfo?.gdate}</td>
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
                      {GRNItemList?.map((item, index) => {
                        return (
                          <>
                            <div
                              className="row mx-1 align-items-center border border-top-0"
                              key={item.id}
                            >
                              <div className="col-1">
                                <p className="form-label label1">
                                  {item.r_id == "" ? (
                                    <>N/A</>
                                  ) : (
                                    <>{item.r_id}</>
                                  )}
                                </p>
                              </div>
                              <div className="col-5">
                                <p className="form-label label1">{item.item}</p>
                              </div>
                              <div className="col-2">
                                <label className="form-label label1">
                                  {item.condition}
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
                      {/* <div className="row">
                        <div className="col-lg-6"></div>
                        {GRNinfo?.status == "" ? (
                          <>
                            <div className="col-lg-6 mt-2">
                              <button
                                className="btn submit-btn-sm w-100"
                                onClick={receive}
                              >
                                Check
                              </button>
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
                      </div> */}
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
