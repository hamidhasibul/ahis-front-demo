import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";

import { ClassContext } from "../../context/ClassContext";
import { SessionContext } from "../../context/SessionContext";
import { Toast } from "primereact/toast";
import { useRef } from "react";

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

export const PostalReceiveComp = () => {
  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);

  const toastTL = useRef(null);

  // Postal Receive States

  const [postalReceiveDate, setPostalReceiveDate] = useState("");
  const [postFrom, setPostFrom] = useState("");
  const [postalReceiveList, setPostalReceiveList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [tab, setTab] = useState("add");
  const [activeid, setActiveid] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [postalReceiveAddress, setPostalReceiveAddress] = useState("");
  const [postalReceiveNote, setPostalReceiveNote] = useState("");
  const [postTo, setPostTo] = useState("");
  const [postalReceiveAttachment, setPostalReceiveAttachment] = useState("");

  function editdata(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
  // Table Format
  const columns = [
    {
      name: "Date",
      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "Post To",
      selector: (row) => row.post_to,
    },
    {
      name: "Reference No",
      selector: (row) => row.ref_no,
    },
    {
      name: "Post From",
      selector: (row) => row.post_from,
    },
    {
      name: "Address",
      selector: (row) => row.address,
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
            <i className="fa-solid fa-eye fa-icon "></i>
          </button>
          <i
            class="fa-solid fa-edit fa-icon me-2 font-12"
            onClick={() => {
              editdata(row.id);
              setTab("edit");
              setActiveid(row.id);
            }}
          ></i>
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
                    Postal Dispatch
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
                              <p> Post From</p>
                            </th>
                            <td>{row.post_from}</td>
                          </tr>
                          <tr>
                            <th>
                              <p> Post To</p>
                            </th>
                            <td>{row.post_to}</td>
                          </tr>
                          <tr>
                            <th>
                              <p>Reference No</p>
                            </th>
                            <td>{row.ref_no}</td>
                          </tr>
                          <tr>
                            <th>
                              <p>Address</p>
                            </th>
                            <td>{row.address}</td>
                          </tr>
                          <tr>
                            <th>
                              <p>Description</p>
                            </th>
                            <td>{row.note}</td>
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

  const UpdatePostalReceive = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("session", session);
      data.append("id", activeid);
      data.append("post_from", postFrom);
      data.append("ref_no", referenceNo);
      data.append("address", postalReceiveAddress);
      data.append("note", postalReceiveNote);
      data.append("post_to", postTo);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/UpdatePostalReceive`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();
      setUpdate(update + 1);
      document.getElementById("form").reset();

      if (res.message) {
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: `Postal Received data Updated!`,
          life: 2000,
        });
      }
    } catch (error) {
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: `Something went Wrong! ${error}`,
        life: 2000,
      });
      console.log(error);
    }
  };
  const addPostalReceive = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("session", session);
      data.append("date", postalReceiveDate);
      data.append("post_from", postFrom);
      data.append("ref_no", referenceNo);
      data.append("address", postalReceiveAddress);
      data.append("note", postalReceiveNote);
      data.append("post_to", postTo);
      data.append("img", postalReceiveAttachment);
      data.append("status", "");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/addPostalReceive`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();
      setUpdate(update + 1);
      document.getElementById("form").reset();

      if (res.message) {
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: `Postal Received data added!`,
          life: 2000,
        });
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
  const editPostalreceiveData = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getPostalReceiveDataById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setPostalReceiveAddress(res.message[0].address);
        setPostTo(res.message[0].post_to);
        setReferenceNo(res.message[0].ref_no);
        setPostalReceiveNote(res.message[0].note);
        setPostFrom(res.message[0].post_from);
      })
      .catch((err) => console.log(err));
  };
  const getPostalreceiveData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getPostalReceiveData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setPostalReceiveList(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    editPostalreceiveData();
    getPostalreceiveData();
  }, [update]);
  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />
      <div className="d-flex py-2 px-3 border-b align-items-center">
        {tab == "add" && (
          <>
            <p className="header-font">Postal Receive</p>
          </>
        )}
        {tab == "edit" && (
          <>
            <p className="header-font">Edit Postal Receive</p>
          </>
        )}
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-3 pt-2">
              {tab == "add" && (
                <>
                  <form id="form" onSubmit={addPostalReceive}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Date</label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPostalReceiveDate(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Post From</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setPostFrom(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Reference No
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setReferenceNo(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Address</label>
                        <textarea
                          className="form-control relative"
                          rows="2"
                          onChange={(e) => {
                            setPostalReceiveAddress(e.target.value);
                          }}
                        ></textarea>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Note</label>
                        <textarea
                          className="form-control relative"
                          rows="2"
                          onChange={(e) => {
                            setPostalReceiveNote(e.target.value);
                          }}
                        ></textarea>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Post To</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setPostTo(e.target.value);
                          }}
                        />
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
                            setPostalReceiveAttachment(e.target.files[0]);
                          }}
                        />
                      </div>

                      <div className="col-lg-4 offset-8 text-end mb-2">
                        <button
                          className="btn submit-btn-sm w-100"
                          type="submit"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
              {tab == "edit" && (
                <>
                  <form id="form" onSubmit={UpdatePostalReceive}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Post From</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          value={postFrom}
                          onChange={(e) => {
                            setPostFrom(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Reference No
                        </label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          value={referenceNo}
                          onChange={(e) => {
                            setReferenceNo(e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Address</label>
                        <textarea
                          className="form-control relative"
                          rows="2"
                          value={postalReceiveAddress}
                          onChange={(e) => {
                            setPostalReceiveAddress(e.target.value);
                          }}
                        ></textarea>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Note</label>
                        <textarea
                          className="form-control relative"
                          rows="2"
                          value={postalReceiveNote}
                          onChange={(e) => {
                            setPostalReceiveNote(e.target.value);
                          }}
                        ></textarea>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Post To</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          value={postTo}
                          onChange={(e) => {
                            setPostTo(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-4 offset-8 text-end mb-2">
                        <button
                          className="btn submit-btn-sm w-100"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
            <div className="col-lg-9 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Postal Receive List</p>

              <DataTable
                columns={columns}
                customStyles={customStyle}
                data={postalReceiveList}
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
