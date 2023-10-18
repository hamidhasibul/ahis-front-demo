import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";

import { Toast } from "primereact/toast";
import { useRef } from "react";

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
export const ProductStudentComp = () => {
  const columns = [
    {
      name: "Item Name",
      selector: (row) => row.item,
    },
    {
      name: "Category",
      selector: (row) => row.cat,
      sortable: true,
    },
    {
      name: "Author",
      selector: (row) => row.author,
    },
    {
      name: "Publisher",
      selector: (row) => row.publisher,
    },
    {
      name: "Publisher Date",
      selector: (row) => row.publisher_date,
    },
    {
      name: "Quantity",
      selector: (row) => row.qty,
    },
    {
      name: "Price",
      selector: (row) => row.price,
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
  const [activeid, setActiveid] = useState("");
  const [tab, setTab] = useState("add");
  const [type, setType] = useState("");
  const [cat, setCat] = useState("");
  const [productType, setProductType] = useState("");
  const [update, setUpdate] = useState([]);
  const [producCat, setProducCat] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [pname, setPname] = useState("");
  const [brand, setBrand] = useState("");
  const [expDate, setExpDate] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pyear, setPyear] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [bookedition, setBookedition] = useState("");

  const [searchFilter, setSearchFilter] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const [confirmationState, setConfirmationState] = useState(false);
  const toastTL = useRef(null);

  function studentItemadd(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("type", "student");
    data.append("item", pname);
    data.append("cat", cat);
    data.append("brand", "");
    data.append("author", author);
    data.append("publisher", publisher);
    data.append("publisher_date", pyear);
    data.append("bookedition", bookedition);
    data.append("qty", qty);
    data.append("price", price);
    fetch(`${import.meta.env.VITE_SERVER}/addProduct`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: `Item Added!`,
          life: 2000,
        });
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function studentItemedit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("id", activeid);
    data.append("type", "student");
    data.append("item", pname);
    data.append("cat", cat);
    data.append("brand", "");
    data.append("author", author);
    data.append("publisher", publisher);
    data.append("publisher_date", pyear);
    data.append("bookedition", bookedition);
    data.append("qty", qty);
    data.append("price", price);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateProduct`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUpdate(update + 1);
        setTab("add");
        document.getElementById("form").reset();
      })
      .catch((err) => console.log(err));
  }
  const getproductcat = () => {
    const data = new FormData();
    data.append("p_type", "student");
    fetch(`${import.meta.env.VITE_SERVER}/getProductTypeById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setProducCat(res.message);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const getproduct = () => {
    const data = new FormData();
    data.append("type", "student");
    fetch(`${import.meta.env.VITE_SERVER}/getProductByType`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setProductlist(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getproductbyId = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getProductById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setCat(res.message[0].cat);
        setPname(res.message[0].item);
        setAuthor(res.message[0].author);
        setPublisher(res.message[0].publisher);
        setPyear(res.message[0].publisher_date);
        setBookedition(res.message[0].bookedition);
        setQty(res.message[0].qty);
        setPrice(res.message[0].price);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const filterData = () => {
    if (!productlist) return false;

    const data = productlist?.filter((item) => {
      return (
        item.item
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase()) ||
        item.cat
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase())
      );
    });
    setFilteredData(data);
  };

  useEffect(() => {
    getproductbyId();
    getproductcat();
    getproduct();
  }, [update]);

  useEffect(() => {
    filterData();
  }, [searchFilter, productlist]);

  return (
    <>
      <div className="content-body">
        <Toast ref={toastTL} position="top-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          {tab == "add" ? (
            <>
              <p className="header-font">Student Item Add</p>
            </>
          ) : (
            <>
              <p className="header-font">Edit Student Item</p>
            </>
          )}
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-4 pt-2">
                {tab == "add" && (
                  <>
                    <form onSubmit={studentItemadd} id="form">
                      <div className="row">
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Product Category
                          </label>
                          <select
                            className="form-select input1 py-0"
                            onChange={(e) => {
                              setCat(e.target.value);
                            }}
                          >
                            <option selected value={""}>
                              Select Section
                            </option>
                            {producCat.length !== 0 && (
                              <>
                                {producCat.map((item) => (
                                  <option key={item.id} value={item.category}>
                                    {item.category}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Product name
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPname(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Author / Brand Name
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            aria-label="form-control example"
                            onChange={(e) => {
                              setAuthor(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">Publisher</label>
                          <input
                            className="form-control input1"
                            type="text"
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPublisher(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Pulish Year
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder="1998
                            "
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPyear(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Book Edition
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            aria-label="form-control example"
                            onChange={(e) => {
                              setBookedition(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">Quantity</label>
                          <input
                            className="form-control input1"
                            type="number"
                            aria-label="form-control example"
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">Price</label>
                          <input
                            className="form-control input1"
                            type="number"
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="">
                            <input
                              className="form-check-input mt-1"
                              id="confirmState"
                              type="checkbox"
                              value={true}
                              name="confirmation"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setConfirmationState(e.target.value);
                                } else {
                                  setConfirmationState(false);
                                }
                              }}
                            />
                            <label
                              className="form-check-label font-13 fw-500 ms-1"
                              htmlFor="confirmState"
                            >
                              Are you sure to submit ?
                            </label>
                          </div>
                          <div className="">
                            <button
                              className="btn submit-btn-sm w-100"
                              type="submit"
                              disabled={!confirmationState}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
                {tab == "edit" && (
                  <>
                    <form onSubmit={studentItemedit} id="form">
                      <div className="row">
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Product Category
                          </label>
                          <select
                            className="form-select input1 py-0"
                            onChange={(e) => {
                              setCat(e.target.value);
                            }}
                          >
                            <option selected>{cat}</option>
                            {producCat.length !== 0 && (
                              <>
                                {producCat.map((item) => (
                                  <option key={item.id} value={item.category}>
                                    {item.category}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Product name
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            value={pname}
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPname(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Author Name
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            value={author}
                            aria-label="form-control example"
                            onChange={(e) => {
                              setAuthor(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">Publisher</label>
                          <input
                            className="form-control input1"
                            type="text"
                            value={publisher}
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPublisher(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Publish Year
                          </label>
                          <input
                            className="form-control input1"
                            type="date"
                            value={pyear}
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPyear(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Book Edition
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            value={bookedition}
                            aria-label="form-control example"
                            onChange={(e) => {
                              setBookedition(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">Quantity</label>
                          <input
                            className="form-control input1"
                            type="number"
                            value={qty}
                            aria-label="form-control example"
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">Price</label>
                          <input
                            className="form-control input1"
                            type="number"
                            value={price}
                            aria-label="form-control example"
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
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
              <div className="col-lg-8 pt-2">
                <div className="row mb-2">
                  <div className="d-flex justify-content-between">
                    <p className="font-14 fw-500 mb-2">Item List</p>{" "}
                    <input
                      type="text"
                      className="search-bar rounded-pill mx-3 px-3 border-bord bg1"
                      placeholder="Search..."
                      onChange={(e) => {
                        setSearchFilter(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={filteredData}
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
