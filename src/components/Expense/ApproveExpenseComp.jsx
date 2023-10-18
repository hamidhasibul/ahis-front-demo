import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";

// Table Styling

const customStyle = {
  rows: {
    style: {
      fontSize: "11px",
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

export const ApproveExpenseComp = () => {
  const [getAllExpensedataInfoData, setgetAllExpensedataInfoData] = useState(
    []
  );
  const [approveId, setApproveId] = useState("");
  const [update, setUpdate] = useState(0);
  // Table Format

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      width: "8%",
    },
    {
      name: "Description",
      selector: (row) => row.note,
      width: "15%",
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
      sortable: true,
      width: "10%",
    },
    {
      name: "Expense Head",
      selector: (row) => row.phead,
      width: "10%",
    },
    {
      name: "Campus",
      selector: (row) => row.campus,
      width: 200,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      width: "10%",
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      sortable: true,
      width: "10%",
    },
    {
      name: "Status",
      cell: (row) => (
        <>
          {row.verified === "0" ? (
            <p className="mb-0">Pending</p>
          ) : (
            <p className="mb-0">Verified</p>
          )}
        </>
      ),
      width: "10%",
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              setApproveId(row.id);
            }}
            data-bs-toggle="modal"
            data-bs-target="#approveModal"
          ></i>
        </>
      ),
      width: "10%",
    },
  ];

  //   Functions

  const getAllExpensedataInfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getExpensedata`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setgetAllExpensedataInfoData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const approveExpense = () => {
    const data = new FormData();
    data.append("id", approveId);

    fetch(`${import.meta.env.VITE_SERVER}/approveExpensedata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setUpdate(update + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllExpensedataInfo();
  }, [update]);

  return (
    <div className="content-body">
      {/* Head Text */}
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Approve Expense</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-12 pt-2 ">
              <p className="font-14 fw-500 mb-2">Expenses Particular's</p>

              <DataTable
                columns={columns}
                data={getAllExpensedataInfoData.filter((item) => {
                  return item.verified === "0";
                })}
                customStyles={customStyle}
                dense
                pagination
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <div
        class="modal fade"
        id="approveModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Approve Expense
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure?</div>
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
                data-bs-dismiss="modal"
                onClick={(e) => {
                  approveExpense();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
