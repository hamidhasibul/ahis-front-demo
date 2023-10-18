import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";

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

export const PaymentHistoryModal = (props) => {
  const { modalID } = props;

  const [feesData, setFeesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
  ];

  const getFeesCollection = async () => {
    try {
      const data = new FormData();
      data.append("student_id", modalID);

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

  const filterData = () => {
    const data = feesData?.map((row) => {
      if (row.feesType === "Tuition Fee") {
        return { ...row, totalPayable: +row.amount };
      } else {
        return { ...row, totalPayable: +row.amount - +row.discount };
      }
    });
    setFilteredData(data);
  };

  useEffect(() => {
    getFeesCollection();
  }, [modalID]);

  useEffect(() => {
    filterData();
  }, [feesData]);

  return (
    <div
      class="modal fade"
      id="paymentHistory"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="paymentHistoryLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paymentHistoryLabel">
              Payment History
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {/* <button
              class="btn submit-btn mt-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Yes
            </button>
            <button
              class="btn submit-btn mt-2 mx-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              No
            </button> */}
            <DataTable
              columns={columns}
              data={filteredData}
              className="mb-2"
              customStyles={customStyle}
              pagination
              dense
            />
          </div>
        </div>
      </div>
    </div>
  );
};
