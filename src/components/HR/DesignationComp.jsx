import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
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

export const DesignationComp = () => {
  // States

  const toastTL = useRef(null);
  const [loader, setLoader] = useState(false);
  const [designation, setDesignation] = useState("");
  const [designationData, setDesignationData] = useState([]);
  const [update, setUpdate] = useState([]);

  // Tabole Format
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Action",
      button: true,
      cell: () => (
        <>
          {/* <Link to={`/applicantlist/view/${row.id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
 */}
          <i className="fa-solid fa-edit fa-icon me-2"></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Functions

  const addDesignation = (e) => {
    e.preventDefault();
    if (designation === "") {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Enter Designation !",
        life: 2000,
      });
      return false;
    }
    const data = new FormData();
    data.append("designation", designation);
    fetch(`${import.meta.env.VITE_SERVER}/addDesignation`, {
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

  const getAllDesignation = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getAllDesignation`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setDesignationData(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllDesignation();
  }, [update]);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Designation</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-4 pt-2">
              <form onSubmit={addDesignation} id="form">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Designation</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setDesignation(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-4 offset-8 text-end">
                    <button className="btn submit-btn-sm w-100" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Designation List</p>

              <DataTable
                columns={columns}
                data={designationData}
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
