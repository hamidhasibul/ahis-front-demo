import React, { useState, useEffect } from "react";

import copy from "../../../assets/images/copy.png";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";
import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";

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

export const FeesApprovalComp = () => {
  const [feesData, setFeesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedSingleFee, setSelectedSingleFee] = useState("");
  const [selectedSingleTP, setSelectedSingleTP] = useState(0);
  const [update, setUpdate] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Functions

  const getFeesCollection = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/feesCollectionApproval`,
        { method: "POST" }
      );
      const res = await response.json();
      setFeesData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    const data = feesData
      ?.filter((item) => {
        return item.status2 === 1;
      })
      ?.map((row) => {
        return { ...row, totalPayable: row.amount - row.discount };
      });
    setFilteredData(data);
  };

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedFees(selectedRows);
  };

  const columns = [
    {
      name: "Student ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Student Name",
      selector: (row) => row.student_first_name + " " + row.student_last_name,
    },
    {
      name: "Total Payable",
      selector: (row) => row.totalPayable,
    },
    {
      name: "Paid",
      selector: (row) => row.paid,
    },
    {
      name: "Mode",
      selector: (row) => row.payment_mode,
    },
    {
      name: "Payment Date",
      selector: (row) => row.payment_date.slice(0, 10),
    },
    {
      name: "Collected By",
      selector: (row) => row.balance,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit"
            style={{ cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target="#approveSingleFee"
            onClick={() => {
              setSelectedSingleFee(row.id);
              setSelectedSingleTP(row.totalPayable);
              setPaymentAmount(row.paid);
            }}
          ></i>
          &nbsp;&nbsp;
          <i className="fa-solid fa-xmark"></i>
        </>
      ),
    },
  ];

  const approveFeesHandler = (selectedFees) => {
    selectedFees?.map((item) => {
      const data = new FormData();
      data.append("id", item.id);

      fetch(`${import.meta.env.VITE_SERVER}/approveFeesCollection`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setUpdate(update + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const approveSingleFeeHandler = (id, totalPayable, paid) => {
    const data = new FormData();
    data.append("id", id);

    data.append("paid", paid);
    data.append("balance", totalPayable - paid);

    fetch(`${import.meta.env.VITE_SERVER}/approveSingleFeesCollection`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFeesCollection();
  }, [update]);

  useEffect(() => {
    filterData();
  }, [feesData]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Fees Approval</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row ">
              <div className="d-flex py-2 align-items-center justify-content-between">
                <p className="font-12">
                  {" "}
                  You can select one or multiple at a time. Pleasce check twice
                  before approve.
                </p>
                <div className="d-flex align-items-center">
                  <button
                    className="btn submit-btn-sm w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#approveFees"
                  >
                    Approve Fees
                  </button>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={filteredData}
                customStyles={customStyle}
                onSelectedRowsChange={handleSelectedChange}
                selectableRows
                dense
                pagination
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {/* Bulk Fees Modal Starts */}

      <div
        class="modal fade"
        id="approveFees"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="approveFeesLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="approveFeesLabel">
                Collect Fees
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are You Sure ?</div>
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
                onClick={() => {
                  approveFeesHandler(selectedFees);
                }}
              >
                Collect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Fees Modal Ends */}

      {/* Single Fees Modal Starts */}

      <div
        class="modal fade"
        id="approveSingleFee"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="approveSingleFeeLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="approveSingleFeeLabel">
                Collect Fees
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label for="paymentAmount" class="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="paymentAmount"
                  placeholder="Amount"
                  value={paymentAmount}
                  onChange={(e) => {
                    setPaymentAmount(e.target.value);
                  }}
                />
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
                onClick={() => {
                  approveSingleFeeHandler(
                    selectedSingleFee,
                    selectedSingleTP,
                    paymentAmount
                  );
                }}
                data-bs-dismiss="modal"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Single Fees Modal Ends */}
    </>
  );
};
