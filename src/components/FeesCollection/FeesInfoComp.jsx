import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { Toast } from "primereact/toast";

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

export const FeesInfoComp = () => {
  const toastTL = useRef(null);

  // States

  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const [feeTypeData, setFeeTypeData] = useState([]);
  const [feeInfoData, setFeeInfoData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");

  // Table Format
  function editdata(id) {
    setActiveid(id);
    setUpdate(update + 1);
  }
  const columns = [
    {
      name: "Fee ID",
      selector: (row) => row.id,
    },
    {
      name: "Fee Type",
      selector: (row) => row.feeType,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Status",
      cell: (row) => <>{+row.pstatus === 1 ? <>Approved</> : <>Pending</>}</>,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            onClick={() => {
              setTab("edit");
              editdata(row.id);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // States

  const [tab, setTab] = useState("add");
  const [feeType, setFeeType] = useState("");
  const [feeClass, setFeeClass] = useState("");
  const [feeDesc, setFeeDesc] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);

  // Conditions

  const conditions = [
    session === "",
    feeType === "",
    feeClass === "",
    feeDesc === "",
    feeAmount === "",
  ];

  // Function

  const addFeeInfo = () => {
    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill out all the fields!",
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();
    data.append("feeType", feeType);
    data.append("session", session);
    data.append("feeClass", feeClass);
    data.append("feeDesc", feeDesc);
    data.append("amount", feeAmount);

    fetch(`${import.meta.env.VITE_SERVER}/addFeeInfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        if (res.message) {
          toastTL.current.show({
            severity: "success",
            summary: "success",
            detail: "New Fee Info Added",
            life: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editFeeInfo = () => {
    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill out all the fields!",
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();
    data.append("id", activeid);
    data.append("feeType", feeType);
    data.append("session", session);
    data.append("feeClass", feeClass);
    data.append("feeDesc", feeDesc);
    data.append("amount", feeAmount);

    fetch(`${import.meta.env.VITE_SERVER}/UpdateFeeInfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setTab("add");

        if (res.message) {
          toastTL.current.show({
            severity: "success",
            summary: "success",
            detail: "Updated",
            life: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllFeeTypes = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeTypes`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeTypeData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getAllFeeInfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeInfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeInfoData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getFeeinfobyid = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeInfoById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeType(res.message[0].feeType);
        setFeeClass(res.message[0].feeClass);
        setFeeDesc(res.message[0].feeDesc);
        setFeeAmount(res.message[0].amount);
      })
      .catch((err) => console.log(err));
  };

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  useEffect(() => {
    getFeeinfobyid();
    getAllFeeTypes();
    getAllFeeInfo();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Fees Info</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-4 pt-2">
              {tab == "add" && (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Fees Type</label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setFeeType(e.target.value);
                        }}
                      >
                        <option value={""} hidden>
                          Select
                        </option>
                        {feeTypeData
                          .filter((item) => {
                            return +item.pstatus === 1;
                          })
                          .map((item) => (
                            <option key={item.id} value={item.feeType}>
                              {item.feeType}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Select Class</label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setFeeClass(e.target.value);
                        }}
                      >
                        <option selected>Select</option>
                        {classInfo
                          .filter((item) => {
                            return (
                              item.session === session && +item.pstatus === 1
                            );
                          })
                          .map((item) => (
                            <option key={item.id} value={item.class_name}>
                              {item.class_name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">
                        Fees Description
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setFeeDesc(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Amount</label>
                      <input
                        className="form-control input1"
                        type="number"
                        placeholder=""
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setFeeAmount(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-lg-8">
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
                          Are You Sure to Submit?
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 text-end">
                      <button
                        className="btn submit-btn-sm w-100"
                        onClick={addFeeInfo}
                        disabled={yn !== true}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </>
              )}
              {tab == "edit" && (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">
                        Edit Fees Type
                      </label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setFeeType(e.target.value);
                        }}
                      >
                        <option selected>{feeType}</option>
                        {feeTypeData.map((item) => (
                          <option key={item.id} value={item.feeType}>
                            {item.feeType}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Select Class</label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setFeeClass(e.target.value);
                        }}
                      >
                        <option selected>{feeClass}</option>
                        {classInfo
                          .filter((item) => {
                            return (
                              item.session === session && +item.pstatus === 1
                            );
                          })
                          .map((item) => (
                            <option key={item.id} value={item.class_name}>
                              {item.class_name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">
                        Fees Description
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        value={feeDesc}
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setFeeDesc(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Amount</label>
                      <input
                        className="form-control input1"
                        type="number"
                        placeholder=""
                        value={feeAmount}
                        aria-label="form-control example"
                        required
                        onChange={(e) => {
                          setFeeAmount(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-4 offset-8 text-end">
                      <button
                        className="btn submit-btn-sm w-100"
                        onClick={editFeeInfo}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Fees Particular's</p>

              <DataTable
                columns={columns}
                data={feeInfoData}
                customStyles={customStyle}
                dense
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
