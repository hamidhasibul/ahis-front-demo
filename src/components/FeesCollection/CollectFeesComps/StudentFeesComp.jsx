import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";

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
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
    },
  },
  cells: {
    style: {
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
    },
  },
};

export const StudentFeesComp = () => {
  const [studentData, setStudentData] = useState([]);
  const params = useParams();
  const { id } = params;
  const [feesData, setFeesData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [update, setUpdate] = useState(0);

  const [filteredData, setFilteredData] = useState([]);
  const [selectedFees, setSelectedFees] = useState(false);

  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentStatusSingle, setPaymentStatusSingle] = useState("");

  const [discountAmount, setDiscountAmount] = useState(0);

  const [selectedSingleFee, setSelectedSingleFee] = useState("");
  const [selectedSingleAmount, setSelectedSingleAmount] = useState("");
  const [selectedSingleTP, setSelectedSingleTP] = useState("");
  const [selectedSinglePaid, setSelectedSinglePaid] = useState(0);
  const [advancePaid, setAdvancePaid] = useState(0);

  const [paymentAmountSingle, setPaymentAmountSingle] = useState("");

  const totalBalance = useMemo(() => {
    return filteredData.reduce(
      (total, item) => total + Number(item.balance),
      0
    );
  }, [filteredData]);

  const totalPaid = useMemo(() => {
    return filteredData.reduce((total, item) => total + Number(item.paid), 0);
  }, [filteredData]);

  const totalPayable = useMemo(() => {
    return filteredData.reduce(
      (total, item) => total + Number(item.totalPayable),
      0
    );
  }, [filteredData]);

  const columns = [
    {
      name: "Fee Type",
      selector: (row) => row.feesType,
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date.slice(0, 10),
      width: "8%",
    },
    {
      name: "Total",
      selector: (row) => row.amount,
      width: "7%",
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      width: "8%",
    },
    {
      name: "Total Payable",
      selector: (row) => +row.totalPayable,
      width: "8%",
    },
    {
      name: "Payment Status",
      selector: (row) =>
        !row.status2 ? (
          row.paymentStatus === "halfPaid" ? (
            <p className="rounded-pill partial-status">Partial Paid</p>
          ) : row.paymentStatus === "fullPaid" ? (
            <>
              <p className="rounded-pill full-status my-1">Full Paid</p>
              {row.advancePayment == "1" && (
                <>
                  <p className="rounded-pill advance-status">Advanced</p>
                </>
              )}
            </>
          ) : (
            <p className="rounded-pill unpaid-status">Unpaid</p>
          )
        ) : (
          <p className="rounded-pill pending-status">Pending . . .</p>
        ),
      width: "10%",
    },
    {
      name: "Paid Amount",
      selector: (row) => row.paid,
      width: "8%",
    },
    {
      name: "Mode",
      selector: (row) => row.payment_mode,
      width: "8%",
    },
    {
      name: "Payment Date",
      selector: (row) => row.payment_date.slice(0, 10),
      width: "10%",
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      width: "8%",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            data-bs-toggle="modal"
            data-bs-target="#collectSingleFee"
            onClick={() => {
              setSelectedSingleFee(row.id);
              setSelectedSingleTP(row.totalPayable);
              setSelectedSingleAmount(row.amount);
              setDiscountAmount(row.discount);
              setSelectedSinglePaid(row.paid);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
      width: "6%",
    },
  ];

  const getStudent = async () => {
    try {
      const data = new FormData();
      data.append("id", id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getStudentViewByid`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      setStudentData(res.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeesCollection = async () => {
    try {
      const data = new FormData();
      data.append("student_id", studentData.student_id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/feesCollectionById`,
        { method: "POST", body: data }
      );
      const res = await response.json();
      setFeesData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const assignedDiscounts = async () => {
    const data = new FormData();
    data.append("student_id", studentData.student_id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getassignDiscounttByStudentId`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setDiscountData(res.message[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = () => {
    const data = feesData?.map((row) => {
      if (
        row.feesType === "Tuition Fee" &&
        discountData?.applicableFor == "Tuition Fee" &&
        row?.paymentStatus == "" &&
        +discountData.pstatus === 1
      ) {
        if (discountData.dType == "%") {
          return {
            ...row,
            totalPayable:
              +row.amount - (row.amount * discountData.amount) / 100,
            discount: (row.amount * +discountData?.amount) / 100,
            balance: row.amount - (row.amount * +discountData?.amount) / 100,
          };
        } else {
          return {
            ...row,
            totalPayable: +row.amount - +discountData.amount,
            discount: +discountData.amount,
            balance: row.amount - +discountData.amount,
          };
        }
      } else {
        return { ...row, totalPayable: +row.amount - +row.discount };
      }
    });
    setFilteredData(data);
  };

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedFees(selectedRows);
  };

  const collectFeesHandler = (selectedFees) => {
    selectedFees?.map((item) => {
      const data = new FormData();
      data.append("id", item.id);

      data.append("payment_mode", paymentMode);
      data.append("payment_date", paymentDate);

      data.append("paymentStatus", "fullPaid");

      data.append("advancePayment", advancePaid);

      data.append("paid", item.totalPayable);
      data.append("discount", item.discount);
      data.append("balance", 0);

      fetch(`${import.meta.env.VITE_SERVER}/updateFeesCollectionNew`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const collectSingleFeeHandler = (id, totalPayable, selectedSingleAmount) => {
    const data = new FormData();
    data.append("id", id);

    data.append("payment_mode", paymentMode);
    data.append("payment_date", paymentDate);

    data.append("paymentStatus", paymentStatusSingle);
    data.append("advancePayment", advancePaid);
    data.append("discount", discountAmount);

    data.append("paid", +paymentAmountSingle + +selectedSinglePaid);
    data.append(
      "balance",
      +selectedSingleAmount -
        +discountAmount -
        +selectedSinglePaid -
        +paymentAmountSingle
    );

    fetch(`${import.meta.env.VITE_SERVER}/updateFeesCollectionSingle`, {
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
    getStudent();
  }, []);
  useEffect(() => {
    getFeesCollection();
    assignedDiscounts();
  }, [studentData.student_id, update]);

  useEffect(() => {
    filterData();
  }, [feesData, discountData]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Student Fees</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row py-2 border-bottom">
              <div className="col-lg-2">
                <img
                  src={`${
                    import.meta.env.VITE_IMG_SERVER +
                    studentData.student_picture
                  }`}
                  className="profile_img"
                />
              </div>

              <div className="col-lg-10">
                <div className=" mb-3">
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Student Name</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.student_first_name}{" "}
                        {studentData.student_last_name}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Student ID</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.student_id}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Class</p>
                      <p className="col-lg-8 font-12">: {studentData.Class}</p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Section</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.section}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Gender</p>
                      <p className="col-lg-8 font-12">: {studentData.gender}</p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Date of Birth</p>
                      <p className="col-lg-8 font-12">: {studentData.dob}</p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Category</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.category}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">House</p>
                      <p className="col-lg-8 font-12">: {studentData.house}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="d-flex py-2 px-3 align-items-center justify-content-between">
                <p className="font-14 fw-500">Fees List</p>
                <div className="d-flex align-items-center">
                  <button
                    className="btn submit-btn-sm w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#collectFees"
                  >
                    Collect Fees
                  </button>
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={filteredData}
              className="mb-2"
              customStyles={customStyle}
              onSelectedRowsChange={handleSelectedChange}
              selectableRows
              dense
            />
            <div className="d-flex justify-content-end border-top py-3">
              <p className="me-3">
                <span className="fw-bold">Total Payable:</span> {totalPayable}
              </p>
              <p className="me-3">
                <span className="fw-bold">Total Paid:</span> {totalPaid}
              </p>
              <p>
                <span className="fw-bold">Total Balance:</span> {totalBalance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {/* Bulk Fees Modal Starts */}

      <div
        class="modal fade"
        id="collectFees"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="collectFeesLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header py-2">
              <p class="modal-title mb-0 font-16 fw-bold" id="collectFeeLabel">
                Collect Fees
              </p>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="col-lg-6 mb-2">
                <label for="paymentDate" class="form-label font-13 fw-bold fcp">
                  Payment Date
                </label>
                <input
                  type="date"
                  class="form-control input1"
                  id="paymentDate"
                  placeholder="Date"
                  onChange={(e) => {
                    setPaymentDate(e.target.value);
                  }}
                />
              </div>
              <div class="mb-2">
                <label for="paymentDate" class="form-label font-13 fw-bold fcp">
                  Payment Mode
                </label>
                <div className="d-flex">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="cash"
                      id="cashMode"
                      name="paymentMode"
                      onChange={(e) => {
                        setPaymentMode(e.target.value);
                      }}
                    />
                    <label class="form-check-label font-14 px-1" for="cashMode">
                      Cash
                    </label>
                  </div>
                  <div class="form-check me-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="cheque"
                      id="checkMode"
                      name="paymentMode"
                      onChange={(e) => {
                        setPaymentMode(e.target.value);
                      }}
                    />
                    <label
                      class="form-check-label font-14 px-1"
                      for="checkMode"
                    >
                      Cheque
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="bkash"
                      id="bkashMode"
                      name="paymentMode"
                      onChange={(e) => {
                        setPaymentMode(e.target.value);
                      }}
                    />
                    <label
                      class="form-check-label font-14 px-1"
                      for="bKashMode"
                    >
                      bKash
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <table className="table border">
                  <thead className="bg-light">
                    <tr>
                      <th className="font-13 fcp py-1" width="70%">
                        Fees Type
                      </th>
                      <th className="font-13 fcp py-1">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFees &&
                      selectedFees?.map((item) => (
                        <tr>
                          <td className="font-13">{item.feesType}</td>
                          <td className="font-13">{item.balance}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="row justify-content-end px-3 mb-3">
              <div className="col-lg-3">
                <button
                  type="button"
                  class="btn w-100 submit-btn"
                  onClick={() => {
                    collectFeesHandler(selectedFees);
                  }}
                  data-bs-dismiss="modal"
                >
                  Collect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Fees Modal Ends */}

      {/* ANCHOR Single Fees Modal Starts */}

      <div
        class="modal fade"
        id="collectSingleFee"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="collectSingleFeeLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header py-2">
              <p
                class="modal-title mb-0 font-16 fw-bold"
                id="collectSingleFeeLabel"
              >
                Collect Fees
              </p>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="col-lg-6 mb-2">
                <label for="paymentDate" class="form-label font-13 fw-bold fcp">
                  Payment Date
                </label>
                <input
                  type="date"
                  class="form-control input1"
                  id="paymentDate"
                  placeholder="Date"
                  onChange={(e) => {
                    setPaymentDate(e.target.value);
                  }}
                />
              </div>
              <div class="mb-2">
                <label for="paymentDate" class="form-label font-13 fw-bold fcp">
                  Payment Mode
                </label>
                <div className="d-flex">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="cash"
                      id="cashMode"
                      name="paymentMode"
                      onChange={(e) => {
                        setPaymentMode(e.target.value);
                      }}
                    />
                    <label class="form-check-label font-14 px-1" for="cashMode">
                      Cash
                    </label>
                  </div>
                  <div class="form-check me-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="cheque"
                      id="checkMode"
                      name="paymentMode"
                      onChange={(e) => {
                        setPaymentMode(e.target.value);
                      }}
                    />
                    <label
                      class="form-check-label font-14 px-1"
                      for="checkMode"
                    >
                      Cheque
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="bkash"
                      id="bkashMode"
                      name="paymentMode"
                      onChange={(e) => {
                        setPaymentMode(e.target.value);
                      }}
                    />
                    <label
                      class="form-check-label font-14 px-1"
                      for="bKashMode"
                    >
                      bKash
                    </label>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <label
                  for="paymentStatus"
                  class="form-label font-13 fw-bold fcp"
                >
                  Payment Status
                </label>
                <div className="d-flex">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="fullPaid"
                      id="fullPaid"
                      name="paymentStatus"
                      onChange={(e) => {
                        setPaymentStatusSingle(e.target.value);
                      }}
                    />
                    <label class="form-check-label font-14 px-1" for="fullPaid">
                      Full Paid
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="halfPaid"
                      id="halfPaid"
                      name="paymentStatus"
                      onChange={(e) => {
                        setPaymentStatusSingle(e.target.value);
                      }}
                    />
                    <label
                      class="form-check-label font-14 px-1"
                      for="checkMode"
                    >
                      Partial Paid
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="discountAmount"
                  class="form-label font-13 fw-bold fcp"
                >
                  Total Payable
                </label>
                <input
                  type="number"
                  class="form-control input1"
                  id="discountAmount"
                  disabled
                  value={+selectedSingleAmount - +selectedSinglePaid}
                />
              </div>

              <div className="row">
                <div class="col-lg-6 mb-2">
                  <label
                    for="discountAmount"
                    class="form-label font-13 fw-bold fcp"
                  >
                    Discount Amount
                  </label>
                  <input
                    type="number"
                    class="form-control input1"
                    id="discountAmount"
                    onChange={(e) => {
                      setDiscountAmount(e.target.value);
                    }}
                    value={discountAmount}
                  />
                </div>
                <div class="col-lg-6 mb-2">
                  <label
                    for="discountAmount"
                    class="form-label font-13 fw-bold fcp"
                  >
                    Discounted Amount
                  </label>
                  <input
                    type="number"
                    class="form-control input1"
                    id="discountAmount"
                    value={
                      +selectedSingleAmount -
                      +selectedSinglePaid -
                      +discountAmount
                    }
                    disabled
                  />
                </div>
              </div>

              <div class="col-lg-6 mb-2">
                <label
                  for="paymentAmountSingle"
                  class="form-label font-13 fw-bold fcp"
                >
                  Amount Paid
                </label>
                <input
                  type="number"
                  class="form-control input1"
                  id="paymentAmountSingle"
                  onChange={(e) => {
                    setPaymentAmountSingle(e.target.value);
                  }}
                />
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value={1}
                      id="advancePayment"
                      name="advancedPayment"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAdvancePaid(e.target.value);
                        } else {
                          setAdvancePaid(0);
                        }
                      }}
                    />
                    <label
                      class="form-check-label font-14 px-1"
                      for="advancePayment"
                    >
                      Advance Payment
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-end px-3 mb-3">
              <div className="col-lg-3">
                <button
                  type="button"
                  class="btn w-100 submit-btn"
                  onClick={() => {
                    collectSingleFeeHandler(
                      selectedSingleFee,
                      selectedSingleTP,
                      selectedSingleAmount
                    );
                  }}
                  data-bs-dismiss="modal"
                >
                  Collect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Single Fees Modal Ends */}
    </>
  );
};
