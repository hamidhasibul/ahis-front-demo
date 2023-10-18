import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    },
  },
};
export const AddBillComp = () => {
  // States
  const [loader, setLoader] = useState(false);
  const [gRNList, setGRNList] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [mhead, setMhead] = useState("");
  const [tab, setTab] = useState("");
  const [img, setImg] = useState("");

  const columns = [
    {
      name: "grn_id",
      selector: (row) => row.grn_id,
      sortable: true,
      width: "8%",
    },
    {
      name: "po_id",
      selector: (row) => row.po_id,
      width: "15%",
    },
    {
      name: "sname",
      selector: (row) => row.sname,
      sortable: true,
      width: "10%",
    },
    {
      name: "cnum",
      selector: (row) => row.cnum,
      width: "10%",
    },
    {
      name: "billnum",
      selector: (row) => row.billnum,
      width: 200,
      sortable: true,
    },
    {
      name: "gdate",
      selector: (row) => row.gdate,
      width: "10%",
    },
    {
      name: "Bill Image",
      cell: (row) => (
        <>
          {row.img === "" ? (
            <p
              className="mb-0 btn font-10 upload-btn-sm"
              onClick={() => {
                document.getElementById("updatemodal").click();
                setActiveid(row.grn_id);
                setMhead("Upload Bill");
                setTab("bill");
              }}
            >
              Upload
            </p>
          ) : (
            <>
              {row.billcheck == "" ? (
                <>
                  <p
                    className="mb-0 btn font-10 upload-btn-sm"
                    onClick={() => {
                      document.getElementById("updatemodal").click();
                      setActiveid(row.grn_id);
                      setMhead("Upload Bill");
                      setTab("bill");
                    }}
                  >
                    Re-upload
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-0">Checked</p>
                </>
              )}
            </>
          )}
        </>
      ),
      width: "10%",
    },
    {
      name: "Bill View",
      width: "10%",
      cell: (row) => (
        <>
          {row.img == "" ? (
            <>Not Available</>
          ) : (
            <>
              <a
                href={`${import.meta.env.VITE_IMG_SERVER}` + row.img}
                target="_black"
              >
                View
              </a>
            </>
          )}
        </>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          {row.billcheck == "" ? (
            <>
              <div class="form-check mb-1">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="1"
                  id="flexCheckDefault"
                  onChange={() => {
                    document.getElementById("updatemodal").click();
                    setActiveid(row.grn_id);
                    setMhead("Are You Sure!");
                    setTab("check");
                  }}
                />
                <label class="form-check-label font-12" for="flexCheckDefault">
                  Make As Done
                </label>
              </div>
            </>
          ) : (
            <>
              {" "}
              <p className="mb-0">Checked</p>
            </>
          )}
        </>
      ),
      width: "10%",
    },
  ];
  // ;
  //  grn_id, img, chk;
  const addbill = () => {
    const data = new FormData();
    data.append("grn_id", activeid);
    data.append("img", img);
    data.append("chk", "");
    fetch(`${import.meta.env.VITE_SERVER}/updateGRNBillstatus`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };
  const chkbill = () => {
    const data = new FormData();
    data.append("grn_id", activeid);
    data.append("img", "");
    data.append("chk", "check");
    fetch(`${import.meta.env.VITE_SERVER}/updateGRNBillstatus`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        setTab("");
      })
      .catch((err) => console.log(err));
  };
  const GRNListData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getGRNinfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setGRNList(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GRNListData();
  }, [update]);

  return (
    <div className="content-body">
      <button
        type="button"
        class="btn btn-sm btn-success"
        id="updatemodal"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
      >
        btn
      </button>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                {mhead}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {tab == "bill" && (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label fw-bold label1">
                        Bill Image
                      </label>
                      <input
                        className="form-control input1"
                        type="file"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn submit-btn-sm align-items-end bottom-0 end-0 w-100"
                        onClick={addbill}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </>
              )}
              {tab == "check" && (
                <>
                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={chkbill}
                  >
                    Yes
                  </button>

                  <button
                    class="btn submit-btn mt-2 mx-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    No
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Add Bill</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-12 pt-2 ">
              <DataTable
                columns={columns}
                data={gRNList}
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
    </div>
  );
};
