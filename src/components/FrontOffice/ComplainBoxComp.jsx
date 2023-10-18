import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";

import { ClassContext } from "../../context/ClassContext";
import { SessionContext } from "../../context/SessionContext";
import { UserRoleContext } from "../../context/UserRoleContext";
import { Toast } from "primereact/toast";
import { useRef } from "react";

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

export const ComplainBoxComp = () => {
  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);

  const toastTL = useRef(null);

  // Complain States
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [update, setUpdate] = useState([]);
  const [complainboxList, setComplainboxList] = useState([]);
  const [complainDate, setComplainDate] = useState("");
  const [complainType, setComplainType] = useState("");
  const [complainer, setComplainer] = useState("");
  const [complainerMobileNo, setComplainerMobileNo] = useState("");
  const [complainDetails, setComplainDetails] = useState("");
  const [complainAttachment, setComplainAttachment] = useState("");

  // Table Format

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "Complain Type",
      selector: (row) => row.complain_type,
    },
    {
      name: "Complain By",
      selector: (row) => row.complainBy,
    },
    {
      name: "Mobile No",
      selector: (row) => row.phone,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <button
            type="button"
            class="btn"
            data-bs-toggle="modal"
            data-bs-target={`#staticBackdrop${row.id}`}
          >
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </button>
          <div
            class="modal fade"
            id={`staticBackdrop${row.id}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header py-2 px-3">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Complain Information
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <table class="table bordered font-12">
                        <tbody>
                          <tr>
                            <th width="15%">
                              <p>Date</p>{" "}
                            </th>
                            <td width="85%">{row.date.slice(0, 10)}</td>
                          </tr>
                          <tr>
                            <th>
                              <p> Complain By</p>
                            </th>
                            <td>{row.complainBy}</td>
                          </tr>
                          <tr>
                            <th>
                              <p> Complain Type</p>
                            </th>
                            <td>{row.complain_type}</td>
                          </tr>
                          <tr>
                            <th>
                              <p> Mobile Number</p>
                            </th>
                            <td>{row.phone}</td>
                          </tr>
                          <tr>
                            <th>
                              <p>Description</p>
                            </th>
                            <td>{row.complain_des}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-lg-4">
                      <img
                        src={`${import.meta.env.VITE_IMG_SERVER}` + row.img}
                        className="img img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  // Functions

  const addComplain = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("session", session);
      data.append("date", complainDate);
      data.append("complain_type", complainType);
      data.append("complainBy", complainer);
      data.append("phone", complainerMobileNo);
      data.append("complain_des", complainDetails);
      data.append("img", complainAttachment);
      data.append("compile", username + "," + designation + "," + user);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/addComplainBox`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setUpdate(update + 1);
      if (res.message) {
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: `Employee Contact added!`,
          life: 2000,
        });

        resetStates();
      }
    } catch (error) {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: `Something went Wrong! ${error}`,
        life: 2000,
      });
      console.error(error);
    }
  };
  const getComplainboxData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getComplainBoxData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setComplainboxList(res.message);
      })
      .catch((err) => console.log(err));
  };

  const resetStates = () => {
    setComplainDate("");
    setComplainType("");
    setComplainer("");
    setComplainerMobileNo("");
    setComplainDetails("");
    setComplainAttachment("");
  };

  useEffect(() => {
    getComplainboxData();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Complain Box</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-3 pt-2">
              <form id="form" onSubmit={addComplain}>
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Date</label>
                    <input
                      type="date"
                      className="form-control input1"
                      onChange={(e) => {
                        setComplainDate(e.target.value);
                      }}
                      value={complainDate}
                    />
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Complaint Type</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setComplainType(e.target.value);
                      }}
                      value={complainType}
                    >
                      <option value={""} Selected>
                        Select
                      </option>
                      <option>A</option>
                      <option>B</option>
                    </select>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Complain By</label>
                    <input
                      className="form-control input1 relative"
                      type="text"
                      onChange={(e) => {
                        setComplainer(e.target.value);
                      }}
                      value={complainer}
                    />
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Mobile Number</label>
                    <input
                      className="form-control input1 relative"
                      type="text"
                      onChange={(e) => {
                        setComplainerMobileNo(e.target.value);
                      }}
                      value={complainerMobileNo}
                    />
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">
                      Complain Details
                    </label>
                    <textarea
                      className="form-control relative font-12"
                      rows="2"
                      onChange={(e) => {
                        setComplainDetails(e.target.value);
                      }}
                      value={complainDetails}
                    ></textarea>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">
                      Choose Attachment
                    </label>
                    <input
                      className="form-control input1 pt-1"
                      type="file"
                      placeholder=""
                      aria-label="form-control example"
                      accept="image/png,image/jpg,image/png,image/JPEG"
                      onChange={(e) => {
                        setComplainAttachment(e.target.files[0]);
                      }}
                    />
                  </div>

                  <div className="col-lg-4 offset-8 text-end mb-2">
                    <button className="btn submit-btn-sm w-100" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-9 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Complain List</p>

              <DataTable
                columns={columns}
                customStyles={customStyle}
                data={complainboxList}
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
                dense
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
