import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import student from "../../assets/images/graduate-avatar.png";
import income from "../../assets/images/money.png";
import expense from "../../assets/images/expenses.png";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";
import { SessionContext } from "../../context/SessionContext";

// Table Styling

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

export const HouseComp = () => {
  const toastBR = useRef(null);
  const toastTL = useRef(null);

  // States

  const [loader, setLoader] = useState(false);
  const [activeId, setActiveId] = useState("");

  const [gethousedata, setGethousedata] = useState([]);
  const [housename, setHousename] = useState("");
  const [tab, setTab] = useState("add");
  const { session } = useContext(SessionContext);
  const { houseInfo, update, setUpdate } = useContext(HouseContext);

  // Table Format

  const columns2 = [
    {
      name: "House Name",
      selector: (row) => row.housename,
    },
    {
      name: "Approval Status",
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
              setActiveId(row.id);
              setTab("edit");
              editdata(row.id);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Validation Condition

  const conditions = [housename === "", session === ""];

  // Functions

  function editdata(id) {
    setActiveId(id);
    setUpdate(update + 1);
  }

  function addhouse() {
    setLoader(true);

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Enter House Name!",
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();
    data.append("house", housename);
    data.append("session", session);
    fetch(`${import.meta.env.VITE_SERVER}/addHouse`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toastTL.current.show({
            severity: "success",
            summary: "Success",
            detail: `House Added!`,
            life: 2000,
          });
        }
        setUpdate(update + 1);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }

  function edithouse() {
    const data = new FormData();
    data.append("id", activeId);
    data.append("housename", housename);
    data.append("session", session);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateHouseById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toastBR.current.show({
            severity: "success",
            summary: "Success",
            detail: "Message Content",
            life: 3000,
          });
        }
        setUpdate(update + 1);
        setLoader(false);
        setTab("add");
      })
      .catch((err) => console.log(err));
  }

  const EdithouseData = () => {
    const data = new FormData();
    data.append("id", activeId);
    fetch(`${import.meta.env.VITE_SERVER}/getHouseById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setHousename(res.message[0].housename);
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
    EdithouseData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}
        <Toast ref={toastTL} position="top-right" />
        <Toast ref={toastBR} position="bottom-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Student House</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-4 pt-2">
                {tab == "add" && (
                  <>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">House</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => setHousename(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row align-items-center">
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
                          onClick={addhouse}
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
                        <label className="form-label label1">Edit House</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={housename}
                          aria-label="form-control example"
                          onChange={(e) => setHousename(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-4 offset-8 text-end">
                        <button
                          className="btn submit-btn-sm w-100"
                          onClick={edithouse}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="col-lg-8 pt-2 border-start">
                <p className="font-14 fw-500 mb-2">House List</p>
                <DataTable
                  columns={columns2}
                  data={houseInfo}
                  customStyles={customStyle}
                  dense
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
