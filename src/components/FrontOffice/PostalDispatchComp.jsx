import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";

import { ClassContext } from "../../context/ClassContext";
import { SessionContext } from "../../context/SessionContext";
import { UserRoleContext } from "../../context/UserRoleContext";
import { Toast } from "primereact/toast";

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
export const PostalDispatchComp = () => {
  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);

  const toastTL = useRef(null);
  // Postal Dispatch States

  const [postalDisList, setPostalDisList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [tab, setTab] = useState("add");
  const [postalDispatchDate, setPostalDispatchDate] = useState("");
  const [postTo, setPostTo] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [address, setAddress] = useState("");
  const [postalNote, setPostalNote] = useState("");
  const [postFrom, setPostFrom] = useState("");
  const [activeid, setActiveid] = useState("");
  const [postAttachment, setPostAttachment] = useState("");

  // Table Format
  function editdata(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
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

  const UpdatePostalDispatch = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("id", activeid);
      data.append("session", session);
      data.append("date", postalDispatchDate);
      data.append("post_to", postTo);
      data.append("ref_no", referenceNo);
      data.append("address", address);
      data.append("note", postalNote);
      data.append("post_from", postFrom);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/UpdatePostalDispatch`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();
      setUpdate(update + 1);
      setTab("add");

      if (res.message) {
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: `Postal Dispatch Updated!`,
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
  const addPostalDispatch = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("session", session);
      data.append("date", postalDispatchDate);
      data.append("post_to", postTo);
      data.append("ref_no", referenceNo);
      data.append("address", address);
      data.append("note", postalNote);
      data.append("post_from", postFrom);
      data.append("img", postAttachment);
      data.append("compile", username + "," + designation + "," + user);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/addPostalDispatch`,
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
          detail: `Postal Dispatch added!`,
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
  const editPostalDispatchData = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getPostalDispatchDataById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setAddress(res.message[0].address);
        setPostTo(res.message[0].post_to);
        setReferenceNo(res.message[0].ref_no);
        setPostalNote(res.message[0].note);
        setPostFrom(res.message[0].post_from);
      })
      .catch((err) => console.log(err));
  };
  const getPostalDispatchData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getPostalDispatchData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setPostalDisList(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPostalDispatchData();
    editPostalDispatchData();
  }, [update]);
  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />
      <div className="d-flex py-2 px-3 border-b align-items-center">
        {tab == "add" && (
          <>
            <p className="header-font">Postal Dispatch</p>
          </>
        )}
        {tab == "edit" && (
          <>
            <p className="header-font">Edit Postal Dispatch</p>
          </>
        )}
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-3 pt-2">
              {tab == "add" && (
                <>
                  <form id="form" onSubmit={addPostalDispatch}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Date</label>
                        <input
                          type="date"
                          className="form-control input1"
                          onChange={(e) => {
                            setPostalDispatchDate(e.target.value);
                          }}
                          value={postalDispatchDate}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Post To</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setPostTo(e.target.value);
                          }}
                          value={postTo}
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
                          value={referenceNo}
                        />
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Address</label>
                        <textarea
                          className="form-control relative"
                          rows="2"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          value={address}
                        ></textarea>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Note</label>
                        <textarea
                          className="form-control relative"
                          rows="2"
                          onChange={(e) => {
                            setPostalNote(e.target.value);
                          }}
                          value={postalNote}
                        ></textarea>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Post From</label>
                        <input
                          className="form-control input1 relative"
                          type="text"
                          onChange={(e) => {
                            setPostFrom(e.target.value);
                          }}
                          value={postFrom}
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
                            setPostAttachment(e.target.files[0]);
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
                  <form id="form" onSubmit={UpdatePostalDispatch}>
                    <div className="row">
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
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        ></textarea>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Note</label>
                        <textarea
                          className="form-control relative"
                          rows="2"
                          value={postalNote}
                          onChange={(e) => {
                            setPostalNote(e.target.value);
                          }}
                        ></textarea>
                      </div>

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
              <p className="font-14 fw-500 mb-2">Postal Dispatch List</p>

              <DataTable
                columns={columns}
                data={postalDisList}
                customStyles={customStyle}
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
