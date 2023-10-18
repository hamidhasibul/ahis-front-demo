import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import noData from "../../../assets/images/no_data.png";

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

export const OrderListComp = () => {
  const [poList, setPoList] = useState([]);
  const [poItemList, setPoItemList] = useState([]);
  const [poInfo, setPoInfo] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [update, setUpdate] = useState("");

  // Table Format

  const columns = [
    {
      name: "PO ID",
      selector: (row) => row.po_id,
      cell: (row) => (
        <>
          <p
            onClick={() => {
              setActiveid(row.po_id);
              setUpdate(update + 1);
            }}
          >
            {row.po_id}
          </p>
        </>
      ),
      grow: 1,
      width: "80px",
    },
    {
      name: "Order Type",
      cell: (row) => (
        <>
          {row.poType === "purchaseOrder" ? (
            <>Purchase Order</>
          ) : (
            <>Work Order</>
          )}
        </>
      ),
      grow: 1,
    },
    {
      name: "Supplier",
      selector: (row) => row.sname,
      grow: 2,
    },

    {
      name: "Start Date",
      selector: (row) => row.exp_sdate.slice(0, 10),
      grow: 1,
    },
    {
      name: "End Date",
      selector: (row) => row.exp_edate.slice(0, 10),
      grow: 1,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/po/view/${row.po_id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
        </>
      ),
      width: "50px",
    },
  ];

  // Functions

  const getPO = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/getpolist`, {
        method: "POST",
      });

      const res = await response.json();

      setPoList(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const PoData = () => {
    const data = new FormData();
    data.append("po_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getpoItemallinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setPoInfo(res.message[0]);
          setPoItemList(res.message2);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPO();
    PoData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">PO List</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <DataTable
                  columns={columns}
                  data={poList}
                  customStyles={customStyle}
                  dense
                  paginationPerPage={[20]}
                  paginationRowsPerPageOptions={[20]}
                  pagination
                />
              </div>
              <div className="col-lg-6 border-start">
                {poItemList.length !== 0 ? (
                  <>
                    <div className="row mx-1 mt-2 mb-2">
                      <div className="col-2 border bg-light font-12 p-1">
                        PO ID
                      </div>
                      <div className="col-2 border font-12 p-1">{activeid}</div>
                      <div className="col-2 border bg-light font-12 p-1">
                        Supplier Name
                      </div>
                      <div className="col-6 border font-12 p-1">
                        {poInfo?.sname}
                      </div>
                    </div>
                    <div
                      className="row mx-1 border"
                      style={{ backgroundColor: "#EEEEEE" }}
                    >
                      <div className="col-2">
                        <label className="form-label fw-bold label1">
                          CS ID
                        </label>
                      </div>
                      <div className="col-2">
                        <label className="form-label fw-bold label1">
                          MR ID
                        </label>
                      </div>
                      <div className="col-4">
                        <label className="form-label fw-bold label1">
                          Item
                        </label>
                      </div>

                      <div className="col-2">
                        <label className="form-label fw-bold label1">
                          Quantity
                        </label>
                      </div>
                      <div className="col-2">
                        <label className="form-label fw-bold label1">
                          Amount
                        </label>
                      </div>
                    </div>
                    {poItemList?.map((item, index) => {
                      return (
                        <>
                          <div className="row pt-1 mx-1 border-start border-end border-bottom">
                            <div className="col-2">
                              <p className="form-label label1">{item.cs_id}</p>
                            </div>
                            <div className="col-2">
                              <p className="form-label label1">{item.req_id}</p>
                            </div>
                            <div className="col-4">
                              <p className="form-label label1">{item.item}</p>
                            </div>

                            <div className="col-2">
                              <p className="form-label label1">{item.qty}</p>
                            </div>
                            <div className="col-2">
                              <p className="form-label label1">{item.price}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-lg-7 text-center my-5">
                          <p className="font-22 fw-400 text-muted">
                            {" "}
                            No Data Selected
                          </p>
                          <p className="font-12">
                            Select data from list to view the Fund Request
                            details.{" "}
                          </p>

                          <img src={noData} className="nodata" />
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
    </>
  );
};
