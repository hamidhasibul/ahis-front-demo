import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Toast } from "primereact/toast";
import converter from "number-to-words";
import noData from "../../assets/images/no_data.png";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";
import { UserRoleContext } from "../../context/UserRoleContext";

// Table Styling

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

export const PettyCashAssignComp = () => {
  // States

  const toastTL = useRef(null);
  const [loader, setLoader] = useState(false);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [allpattycash, setAllpattycash] = useState([]);
  const [allpattycashItem, setAllpattycashItem] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [tab, setTab] = useState("");
  const [pamount, setPamount] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState([]);
  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };
  var total = 0;
  // Tabole Format
  const columns = [
    {
      name: "Payment ID",
      selector: (row) => row.payment_id,
    },
    {
      name: "Description",
      selector: (row) => row.note,
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
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
      sortable: true,
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
    },
    {
      name: "Adjustment",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              setActiveid(row.payment_id);
              setUpdate(update + 1);
              setPamount(row.amount);
              setTab("adjustment");
            }}
          ></i>
        </>
      ),
    },
  ];

  // Functions

  const additem = (e) => {
    e.preventDefault();
    if (item === "" || amount === "") {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Fill up the required fields!",
        life: 2000,
      });
      return false;
    }
    const data = new FormData();
    data.append("payment_id", activeid);
    data.append("item", item);
    data.append("amount", amount);
    fetch(`${import.meta.env.VITE_SERVER}/addPattyCashItem`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function fullSave() {
    const data = new FormData();
    data.append("payment_id", activeid);
    data.append("adj_amount", total);
    data.append("amount", pamount);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/addPattyCash`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getAllPattyCash = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getPattyCashFromPayment`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAllpattycash(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getAllPattyCashItem = () => {
    const data = new FormData();
    data.append("payment_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getPattyCashItem`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setAllpattycashItem(res.message);
      })
      .catch((err) => console.log(err));
  };
  const checkdata = () => {
    const data = new FormData();
    data.append("payment_id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getPattyCash`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSide(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  console.log(side);
  useEffect(() => {
    getAllPattyCash();
    getAllPattyCashItem();
    checkdata();
  }, [update, activeid]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">PattyCashComp</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-8 pt-2">
              <DataTable
                columns={columns}
                data={allpattycash}
                customStyles={customStyle}
                dense
                pagination
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
              />
            </div>
            <div className="col-lg-4 pt-2 border-start">
              {tab == "" ? (
                <>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 text-center my-5">
                        <p className="font-22 fw-400 text-muted">
                          {" "}
                          No Data Selected
                        </p>
                        <p className="font-12">
                          Select data from list to view the Petty Cash details.{" "}
                        </p>

                        <img src={noData} className="w-100" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-lg-4">
                      <p className="font-11">Petty Cash: {activeid}</p>
                    </div>
                    {}
                    {side.length == 0 ? (
                      <>
                        <div className="col-lg-4">
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
                              Make As Approve
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 text-center">
                          <button
                            className="btn submit-btn"
                            onClick={fullSave}
                            disabled={yn !== true}
                          >
                            Save
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-lg-8">
                          <p className="font-11 text-end ">Complete</p>
                        </div>
                      </>
                    )}
                  </div>
                  {side.length == 0 && (
                    <>
                      <form onSubmit={additem} id="form">
                        <div className="row">
                          <div className="col-8">
                            <label className="form-label label1">
                              Expense Type
                            </label>
                            <input
                              type="text"
                              className="input1 form-control"
                              onChange={(e) => {
                                setItem(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-4">
                            <label className="form-label label1">Amount</label>
                            <input
                              type="Number"
                              className="input1 form-control"
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                            />
                          </div>

                          <div className="col-lg-4 offset-8 text-end mt-2">
                            <button
                              className="btn submit-btn-sm w-100"
                              type="submit"
                            >
                              Add Item
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  <table class="table my-2">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="py-1 font-13">
                          Sl
                        </th>
                        <th scope="col" className="py-1 font-13">
                          Expense
                        </th>
                        <th scope="col" className="py-1 font-13">
                          Amount
                        </th>
                      </tr>
                      {allpattycashItem?.map((item, index) => {
                        total = total + +item.amount;
                        return (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.item}</td>
                              <td>{item.amount}</td>
                            </tr>
                          </>
                        );
                      })}

                      <tr>
                        <td colSpan="2" className="text-end">
                          Total
                        </td>
                        <td>{total}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-end">
                          Return
                        </td>
                        <td>{pamount - total}</td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
