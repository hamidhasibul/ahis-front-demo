import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import student from "../../assets/images/graduate-avatar.png";
import income from "../../assets/images/money.png";
import expense from "../../assets/images/expenses.png";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Toast } from "primereact/toast";

// Table Styles

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

export const CategoryComp = () => {
  const toastTL = useRef(null);
  // States

  const [loader, setLoader] = useState(false);
  const [catId, setCatId] = useState("");
  const [catname, setCatname] = useState("");
  const [tab, setTab] = useState("add");

  const { categoryInfo, update, setUpdate } = useContext(CategoryContext);

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  // Table Format

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.category_name,
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
              setCatId(row.id);
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

  const conditions = [catname === ""];

  // Functions

  function editdata(id) {
    setCatId(id);
    setUpdate(update + 1);
  }

  function addcat() {
    setLoader(true);

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Enter Category Name!",
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();
    data.append("catname", catname);
    fetch(`${import.meta.env.VITE_SERVER}/addCategory`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toastTL.current.show({
            severity: "success",
            summary: "Success",
            detail: `Category Added!`,
            life: 2000,
          });
        }
        setUpdate(update + 1);
        setLoader(false);
      })
      .catch((err) =>
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Something went wrong! ${err}`,
          life: 2000,
        })
      );
  }

  function editcat() {
    const data = new FormData();
    data.append("id", catId);
    data.append("catname", catname);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateCategoryById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toastTL.current.show({
            severity: "success",
            summary: "Success",
            detail: `Category Updated!`,
            life: 2000,
          });
          setTab("add");
          setUpdate(update + 1);
        }
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }

  const EditCatnameData = () => {
    const data = new FormData();
    data.append("id", catId);
    fetch(`${import.meta.env.VITE_SERVER}/getCategoryById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setCatname(res.message[0].category_name);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    EditCatnameData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Student Category</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-4 pt-2">
                {tab == "edit" && (
                  <>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Edit Category
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={catname}
                          aria-label="form-control example"
                          onChange={(e) => setCatname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-4 offset-8 text-end">
                        <button
                          className="btn submit-btn-sm w-100"
                          onClick={editcat}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {tab == "add" && (
                  <>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Category</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => setCatname(e.target.value)}
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
                          onClick={addcat}
                          disabled={yn !== true}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="col-lg-8 pt-2 border-start">
                <p className="font-14 fw-500 mb-2">Category List</p>
                <DataTable
                  columns={columns}
                  data={categoryInfo}
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
