import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const customStyle = {
  rows: {
    style: {
      fontSize: "12px",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: 600,
      backgroundColor: "#dddddd",
    },
  },
};

export const FinancialAidComp = () => {
  const [update, setUpdate] = useState(0);
  const [assignedDiscountData, setAssignedDiscountData] = useState([]);
  const [discountTypeData, setDiscountTypeData] = useState([]);
  const [indDiscountData, setIndDiscountData] = useState([]);
  const [activeID, setActiveID] = useState("");

  // States
  const [studentID, setStudentID] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [applicableFor, setApplicableFor] = useState("");
  const [applicableDiscountType, setApplicableDiscountType] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountStatus, setDiscountStatus] = useState(0);

  // Table Format

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
      name: "Discount Type",
      selector: (row) => row.discount_type,
    },
    {
      name: "Applicable For",
      selector: (row) => row.applicableFor,
    },
    {
      name: "Amount",
      selector: (row) => row.amount + " " + row.dType,
    },
    {
      name: "Status",
      cell: (row) => <>{+row.status === 1 ? <>Active</> : <>Inactive</>}</>,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            data-bs-toggle="modal"
            data-bs-target="#editDiscount"
            onClick={() => {
              getIndDiscountData(row.id);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Function

  const getAssignedDiscountData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getassignDiscountforUpdate`,
        {
          method: "POST",
        }
      );
      const res = await response.json();

      setAssignedDiscountData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getIndDiscountData = async (id) => {
    const data = new FormData();
    data.append("id", id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getassignDiscounttById`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setIndDiscountData(res.message[0]);
      setActiveID(res.message[0].id);
      setStudentID(res.message[0].student_id);
      setDiscountType(res.message[0].discount_type);
      setApplicableFor(res.message[0].applicableFor);
      setApplicableDiscountType(res.message[0].dType);
      setDiscountAmount(res.message[0].amount);
      setDiscountStatus(res.message[0].status);
    } catch (error) {
      console.error(error);
    }
  };

  const getDiscountType = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getDiscountType`,
        {
          method: "POST",
        }
      );
      const res = await response.json();

      setDiscountTypeData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDiscountAssignment = () => {
    const data = new FormData();
    data.append("id", activeID);

    data.append("student_id", studentID);
    data.append("discount_type", discountType);
    data.append("applicableFor", applicableFor);
    data.append("dType", applicableDiscountType);
    data.append("amount", discountAmount);
    data.append("status", discountStatus);

    fetch(`${import.meta.env.VITE_SERVER}/UpdateAssignDiscount`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate(update + 1);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAssignedDiscountData();
    getDiscountType();
  }, [update]);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Financial AID</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1 py-1">
            <div className="col-lg-12">
              <p className="font-14 fw-500 mb-2">Students List</p>
              <DataTable
                columns={columns}
                data={assignedDiscountData.filter((item) => {
                  return +item.pstatus === 1;
                })}
                customStyles={customStyle}
                dense
              />
            </div>
          </div>
        </div>
      </div>

      {/* Single Fees Modal Starts */}

      <div
        className="modal fade"
        id="editDiscount"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editDiscountLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editDiscountLabel">
                Collect Fees
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label htmlFor="studentID" className="form-label">
                  Student ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="studentID"
                  placeholder="Amount"
                  value={studentID}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label htmlFor="discountType" className="form-label">
                  Discount Type
                </label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setDiscountType(e.target.value);
                  }}
                  value={discountType}
                >
                  <option selected value={""}>
                    Select Discount Type
                  </option>
                  {discountTypeData?.map((item) => (
                    <option key={item.id} value={item.discountType}>
                      {item.discountType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="applicableFor" className="form-label">
                  Applicable For
                </label>

                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setApplicableFor(e.target.value);
                  }}
                  value={applicableFor}
                >
                  <option selected value={""}>
                    Select Applicable Type
                  </option>
                  <option value={"Admission Fee"}>Admission Fee</option>
                  <option value={"Annual Fee"}>Annual Fee</option>
                  <option value={"Tuition Fee"}>Tuition Fee</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Applicable Discount Type</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setApplicableDiscountType(e.target.value);
                  }}
                  value={applicableDiscountType}
                >
                  <option value={"%"}>%</option>
                  <option value={"BDT"}>Fixed Amount</option>
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="discountStatus" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="discountStatus"
                  placeholder="Amount"
                  value={discountAmount}
                  onChange={(e) => {
                    setDiscountAmount(e.target.value);
                  }}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="discountStatus" className="form-label">
                  Status
                </label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setDiscountStatus(e.target.value);
                  }}
                  value={+discountStatus}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  updateDiscountAssignment();
                }}
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Single Fees Modal Ends */}
    </div>
  );
};
