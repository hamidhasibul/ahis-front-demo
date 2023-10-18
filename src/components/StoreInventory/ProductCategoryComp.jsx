import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
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
export const ProductCategoryComp = () => {
  const [tab, setTab] = useState("add");
  const [activeid, setActiveid] = useState("");
  const columns = [
    {
      name: "Product Type",
      selector: (row) => row.p_type,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
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
              setActiveid(row.id);
              setUpdate(update + 1);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];
  // Functions
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [producttypeData, setProducttypeData] = useState([]);
  const [update, setUpdate] = useState([]);

  function submitcategory(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("p_type", productType);
    data.append("category", category);
    fetch(`${import.meta.env.VITE_SERVER}/addProductType`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          alert(res.message);
          setUpdate(update + 1);
          document.getElementById("form").reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function Updatecategory(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("id", activeid);
    data.append("p_type", productType);
    data.append("category", category);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateProductType`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          alert(res.message);
          setUpdate(update + 1);
          setTab("add");
          document.getElementById("form").reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getproductcat = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getProductType`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setProducttypeData(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const getproductcatfotupdate = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getProductTypeinduById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setProductType(res.message[0].p_type);
        setCategory(res.message[0].category);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getproductcat();
    getproductcatfotupdate();
  }, [update]);
  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">
          {tab == "add" ? <>Product Category</> : <>Edit Product Category</>}
        </p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-4 pt-2">
              {tab == "add" && (
                <>
                  <form id="form" onSubmit={submitcategory}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Product Type
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setProductType(e.target.value);
                          }}
                          required
                        >
                          <option selected value={""}>
                            Select
                          </option>
                          <option>student</option>
                          <option>general</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Category</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          aria-label="form-control example"
                          required
                        />
                      </div>

                      <div className="col-lg-4 offset-8 text-end">
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
                  <form id="form" onSubmit={Updatecategory}>
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Product Type
                        </label>
                        <select
                          className="form-select input1 py-0"
                          onChange={(e) => {
                            setProductType(e.target.value);
                          }}
                          required
                        >
                          <option selected>{productType}</option>
                          <option>student</option>
                          <option>general</option>
                        </select>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">Category</label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          aria-label="form-control example"
                          required
                        />
                      </div>

                      <div className="col-lg-4 offset-8 text-end">
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
            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Category List</p>
              <DataTable
                columns={columns}
                data={producttypeData}
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
