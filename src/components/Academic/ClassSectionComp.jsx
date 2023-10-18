import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { SectionContext } from "../../context/SectionContext";
import { ClassContext } from "../../context/ClassContext";
import { SessionContext } from "../../context/SessionContext";
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
      fontSize: "12px",
      fontWeight: 600,
      backgroundColor: "#dddddd",
    },
  },
};

export const ClassSectionComp = () => {
  const toastTL = useRef(null);
  // States
  const [loader, setLoader] = useState(false);
  const [classname2, setClassname2] = useState("");
  const [classname, setClassname] = useState("");
  const [section, setSection] = useState("");

  const { sectionInfo, update, setUpdate } = useContext(SectionContext);
  const { classInfo, updateClass, setUpdateClass } = useContext(ClassContext);
  const { session } = useContext(SessionContext);

  // Table Format

  const columns = [
    {
      name: "Class Name",
      selector: (row) => row.class_name,
    },
    {
      name: "Section",
      selector: (row) => row.section_name,
    },
    {
      name: "Approval Status",
      cell: (row) => (
        <>
          {+row.pstatus === 1 ? (
            <>
              <p className="fs-12 text-success fw-bold">Approved</p>
            </>
          ) : (
            <>
              <p className="fs-12 fst-italic">Pending. . .</p>
            </>
          )}
        </>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: () => (
        <>
          <i className="fa-solid fa-edit fa-icon me-2"></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Conditions

  const conditions = [classname2 === "", session === ""];

  // Functions

  function addclass() {
    setLoader(true);

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Enter Class Name!",
          life: 2000,
        });
        return false;
      }
    }
    const data = new FormData();
    data.append("class_name", classname2);
    data.append("session", session);
    fetch(`${import.meta.env.VITE_SERVER}/addClass`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdateClass(updateClass + 1);

        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: "Class Added!",
          life: 3000,
        });
        resetStates();
        setLoader(false);
      })
      .catch((err) =>
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Task Failed! ${err}`,
          life: 3000,
        })
      );
  }
  function addSectionsubmit() {
    setLoader(true);

    if (classname === "" || section === "") {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Enter Section Name!",
        life: 2000,
      });
      return false;
    }

    const data = new FormData();
    data.append("classname", classname);
    data.append("session", session);
    data.append("section", section);
    fetch(`${import.meta.env.VITE_SERVER}/addSection`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
        setLoader(false);
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: "Section Added!",
          life: 3000,
        });
        resetStates();
      })
      .catch((err) =>
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Task Failed! ${err}`,
          life: 3000,
        })
      );
  }

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  const [yn2, setYn2] = useState(false);
  const handlerChange2 = (e) => {
    if (e.target.checked) {
      setYn2(true);
    } else {
      setYn2(false);
    }
  };

  const resetStates = () => {
    setClassname2("");
    setClassname("");
    setSection("");
  };

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        <Toast ref={toastTL} position="top-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Class & Section</p>
        </div>

        <div className="scroll-element">
          {/* <div className="d-flex bg1 px-3 mt-2 py-1">
            <p className="text1 mb-0">Student's Category</p>
          </div> */}
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-4">
                <div className="row">
                  <div className="d-flex  mt-2 py-1">
                    <p className="text1 mb-0">Add Class</p>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Class</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => setClassname2(e.target.value)}
                      value={classname2}
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
                      onClick={addclass}
                      disabled={yn !== true}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 bg1  pb-3 rounded">
                <div className="d-flex  mt-2 py-1">
                  <p className="text1 mb-0">Add Section</p>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Class</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => setClassname(e.target.value)}
                      value={classname}
                    >
                      <option selected>Select Class</option>
                      {classInfo
                        .filter((item) => {
                          return +item.pstatus === 1;
                        })
                        .map((item) => (
                          <option key={item.id} value={item.class_name}>
                            {item.class_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Section</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => setSection(e.target.value)}
                      value={section}
                    />
                  </div>

                  <div className="col-lg-8">
                    <div class="form-check mb-1">
                      <input
                        class="form-check-input "
                        type="checkbox"
                        value="1"
                        id="flexCheckDefault"
                        onChange={handlerChange2}
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
                      onClick={addSectionsubmit}
                      disabled={yn2 !== true}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 my-5">
                <p className="font-14 fw-500 mb-2">Class & Section</p>
                <DataTable
                  columns={columns}
                  data={sectionInfo}
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
