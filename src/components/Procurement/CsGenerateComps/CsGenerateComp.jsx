import React, { useContext, useEffect, useState, useRef } from "react";
import { Loader } from "../../Common/Loader";
import DataTable from "react-data-table-component";
import { customAlphabet } from "nanoid";
import { Toast } from "primereact/toast";
const nanoid = customAlphabet("1234567890abcdef", 10);

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

export const CsGenerateComp = () => {
  const toastTL = useRef(null);

  const [loader, setLoader] = useState(false);

  const [requisitionData, setRequisionData] = useState([]);
  const [requisionItems, setRequisitionItems] = useState([]);

  const [requID, setRequID] = useState("");
  const [csId, setCsID] = useState(nanoid(10));
  const [csDate, setCsDate] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);

  const [requesterName, setRequesterName] = useState("");
  const [requesterDesignation, setRequesterDesignation] = useState("");

  // Supplier states

  const [supplierName, setSupplierName] = useState("");
  const [supplierBrand, setSupplierBrand] = useState("");
  const [supplierQuotedPrice, setSupplierQuotedPrice] = useState("");
  const [supplierDeliveryTime, setSupplierDeliveryTime] = useState("");

  const [supplierName1, setSupplierName1] = useState("");
  const [supplierBrand1, setSupplierBrand1] = useState("");
  const [supplierQuotedPrice1, setSupplierQuotedPrice1] = useState("");
  const [supplierDeliveryTime1, setSupplierDeliveryTime1] = useState("");

  const [supplierName2, setSupplierName2] = useState("");
  const [supplierBrand2, setSupplierBrand2] = useState("");
  const [supplierQuotedPrice2, setSupplierQuotedPrice2] = useState("");
  const [supplierDeliveryTime2, setSupplierDeliveryTime2] = useState("");

  const [selectedSupplier, setSelectedSupplier] = useState("supplier1");

  const [supplierData, setSupplierData] = useState([]);

  // Items array

  const [itemsArray, setItemsArray] = useState([]);

  // Supplier Array

  const [suppliersArray, setSuppliersArray] = useState([]);

  // Merged Array

  const [mergedArray, setMergedArray] = useState([]);

  // Validation Condition

  const conditions = [
    requID === "",
    csId === "",
    csDate === "",
    itemID === "",
    itemName === "",
    itemDesc === "",
    itemQuantity === "",
    itemUnit === "",

    supplierName === "",
    supplierBrand === "",
    supplierQuotedPrice === "",
    supplierDeliveryTime === "",
  ];

  // Handle Items Input

  const addItems = (e) => {
    e.preventDefault();

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }

    const newObject = {
      requisition_id: requID,
      cs_id: csId,
      date: csDate,
      item_id: itemID,
      item: itemName,
      des: itemDesc,
      qty: itemQuantity,
      unit: itemUnit,

      supply_name: supplierName,
      brand: supplierBrand,
      quoted_price: supplierQuotedPrice,
      delivery_time: supplierDeliveryTime,

      supply_name1: supplierName1,
      brand1: supplierBrand1,
      quoted_price1: supplierQuotedPrice1,
      delivery_time1: supplierDeliveryTime1,

      supply_name2: supplierName2,
      brand2: supplierBrand2,
      quoted_price2: supplierQuotedPrice2,
      delivery_time2: supplierDeliveryTime2,
    };
    setItemsArray([...itemsArray, newObject]);

    document.getElementById("item-form").reset();
  };

  // Table Format

  const columns = [
    {
      name: "MR ID",
      selector: (row) => row.requisition_id,
    },
    // {
    //   name: "Requisition Date",
    //   selector: (row) => row.date,
    // },
    // {
    //   name: "Item ID",
    //   selector: (row) => row.item_id,
    // },
    {
      name: "Item",
      selector: (row) => row.item,
    },
    {
      name: "Item Description",
      selector: (row) => row.des,
    },
    {
      name: "Item Quantity",
      selector: (row) => row.qty,
    },
    {
      name: "Supplier 1",
      cell: (row) => (
        <>
          <div className="container-fluid">
            <div className="row">
              <p className="mb-1">Name: {row.supply_name}</p>
            </div>
            <div className="row">
              <p className="mb-1">Brand: {row.brand}</p>
            </div>
            <div className="row">
              <p className="mb-1">Price: {row.quoted_price}</p>
            </div>
            <div className="row">
              <p className="mb-1">Time: {row.delivery_time}</p>
            </div>
          </div>
        </>
      ),
    },
    {
      name: "Supplier 2",
      cell: (row) => (
        <>
          <div className="container-fluid">
            <div className="row">
              <p className="mb-1">Name: {row.supply_name1}</p>
            </div>
            <div className="row">
              <p className="mb-1">Brand: {row.brand1}</p>
            </div>
            <div className="row">
              <p className="mb-1">Price: {row.quoted_price1}</p>
            </div>
            <div className="row">
              <p className="mb-1">Time: {row.delivery_time1}</p>
            </div>
          </div>
        </>
      ),
    },
    {
      name: "Supplier 3",
      cell: (row) => (
        <>
          <div className="container-fluid">
            <div className="row">
              <p className="mb-1">Name: {row.supply_name2}</p>
            </div>
            <div className="row">
              <p className="mb-1">Brand: {row.brand2}</p>
            </div>
            <div className="row">
              <p className="mb-1">Price: {row.quoted_price2}</p>
            </div>
            <div className="row">
              <p className="mb-1">Time: {row.delivery_time2}</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  // Functions

  const handleChangeSelectedItem = (itemID) => {
    const data = new FormData();
    data.append("id", itemID);
    fetch(`${import.meta.env.VITE_SERVER}/getrequisitionItemId`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setItemName(res.message[0].itemName);
        setItemDesc(res.message[0].note);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (requID) => {
    const data = new FormData();
    data.append("requisition_id", requID);

    fetch(`${import.meta.env.VITE_SERVER}/getrequisionItemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setRequesterName(res.message[0].name);
        setRequesterDesignation(res.message[0].designation);
        setRequisitionItems(res.message2);
      })
      .catch((err) => console.log(err));
  };

  const getRequisitions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getrequisionData`,
        { method: "POST" }
      );
      const res = await response.json();
      setRequisionData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const csItemSubmit = (itemsArray) => {
    if (itemsArray.length === 0) {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Fill up the required fields!",
        life: 2000,
      });
      return false;
    }
    itemsArray?.map((item) => {
      const data = new FormData();
      data.append("requisition_id", item.requisition_id);
      data.append("cs_id", item.cs_id);
      data.append("date", item.date);
      data.append("item_id", item.item_id);
      data.append("item", item.item);
      data.append("des", item.des);
      data.append("qty", item.qty);
      data.append("unit", item.unit);

      data.append("supply_name", item.supply_name);
      data.append("brand", item.brand);
      data.append("quoted_price", item.quoted_price);
      data.append("delivery_time", item.delivery_time);

      data.append("supply_name1", item.supply_name1);
      data.append("brand1", item.brand1);
      data.append("quoted_price1", item.quoted_price1);
      data.append("delivery_time1", item.delivery_time1);

      data.append("supply_name2", item.supply_name2);
      data.append("brand2", item.brand2);
      data.append("quoted_price2", item.quoted_price2);
      data.append("delivery_time2", item.delivery_time2);
      data.append("compile", "user");

      fetch(`${import.meta.env.VITE_SERVER}/requisitionCSitemsubmit`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((err) => console.log(err));
    });
  };

  const getSuppliersData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getsupplier`,
        {
          method: "POST",
        }
      );

      const res = await response.json();

      setSupplierData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  /* const csSupplierSubmit = (suppliersArray) => {
    suppliersArray?.map((item) => {
      const data = new FormData();
      data.append("requisition_id", item.requisition_id);
      data.append("cs_id", item.cs_id);
      data.append("delivery_time", item.delivery_time);
      data.append("brand", item.brand);
      data.append("item_id", item.item_id);
      data.append("quoted_price", item.quoted_price);
      data.append("supply_name", item.supply_name);

      fetch(`${import.meta.env.VITE_SERVER}/requisitionCSsupplySubmit`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
        })
        .catch((err) => console.log(err));
    });
  }; */

  /* const mergeISArrays = () => {
    const newMerged = itemsArray.map((req, index) => {
      const suppliers = suppliersArray.find(
        (s, i) => s.item_id === req.item_id && i === index
      );
      return {
        ...req,
        ...suppliers,
      };
    });
    setMergedArray(newMerged);
  }; */

  useEffect(() => {
    getRequisitions();
    getSuppliersData();
  }, []);

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Generate CS</p>
        </div>
        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-3 mb-2">
                <label className="form-label label1">MR ID</label>
                <select
                  className="form-select input1 py-0"
                  onChange={(e) => {
                    setRequID(e.target.value);
                    handleChange(e.target.value);
                  }}
                >
                  <option value={""}>Select</option>
                  {requisitionData?.map((item) => (
                    <>
                      <option key={item.id} value={item.requisition_id}>
                        {item.requisition_id}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">Generate Date</label>
                <input
                  type="date"
                  className="form-control input1"
                  onChange={(e) => {
                    setCsDate(e.target.value);
                  }}
                />
              </div>

              <div className="col-lg-3 mb-2">
                <label className="form-label label1">CS ID</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  value={csId}
                  disabled
                />
              </div>

              {/* <div className="col-lg-3 mb-2">
                <label className="form-label label1">Requester Name</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  disabled
                  value={requesterName}
                />
              </div> */}

              {/* <div className="col-lg-3 mb-2">
                <label className="form-label label1">Designation</label>
                <input
                  className="form-control input1"
                  type="text"
                  placeholder=""
                  aria-label="form-control example"
                  value={requesterDesignation}
                  disabled
                />
              </div> */}
            </div>
            <div className="container">
              <div
                className="bg-light row"
                style={{ borderLeft: "4px solid #ffce00" }}
              >
                {/* Item & Suppliers Add Section */}
                <form
                  className="col-lg-4 border-end"
                  id="item-form"
                  onSubmit={addItems}
                >
                  <div className="row px-1 py-2 border-bottom">
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Choose Item</label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setItemID(e.target.value);
                          handleChangeSelectedItem(e.target.value);
                        }}
                      >
                        <option value={""}>Select</option>
                        {requisionItems.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.itemName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Description</label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        value={itemDesc}
                        aria-label="form-control example"
                        onChange={(e) => {
                          setItemDesc(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-lg-6 mb-2">
                      <label className="form-label label1">Quantity</label>
                      <input
                        className="form-control input1"
                        type="number"
                        placeholder=""
                        aria-label="form-control example"
                        onChange={(e) => {
                          setItemQuantity(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-lg-6 mb-2">
                      <label className="form-label label1">Unit</label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setItemUnit(e.target.value);
                        }}
                      >
                        <option value={""}>Select</option>
                        <option>Piece</option>
                        <option>Killogram</option>
                      </select>
                    </div>
                  </div>

                  <div className="row px-1 py-2">
                    <div className="col-lg-12 mb-2">
                      {/* <label className="form-label label1">
                        Choose Supplier
                      </label>
                      <select
                        className="form-select input1 py-0"
                        onChange={(e) => {
                          setSelectedSupplier(e.target.value);
                        }}
                        value={selectedSupplier}
                      >
                        <option value={"supplier1"}>Supplier 1</option>
                        <option value={"supplier2"}>Supplier 2</option>
                        <option value={"supplier3"}>Supplier 3</option>
                      </select> */}

                      <ul
                        className="nav nav-pills mb-3 justify-content-between"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="supplierPill1-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#supplierPill1"
                            type="button"
                            role="tab"
                            aria-controls="supplierPill1"
                            aria-selected="true"
                          >
                            Supplier 1
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="supplierPill2-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#supplierPill2"
                            type="button"
                            role="tab"
                            aria-controls="supplierPill2"
                            aria-selected="false"
                          >
                            Supplier 2
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="supplierPill3-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#supplierPill3"
                            type="button"
                            role="tab"
                            aria-controls="supplierPill3"
                            aria-selected="false"
                          >
                            Supplier 3
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="supplierPill1"
                      role="tabpanel"
                      aria-labelledby="supplierPill1-tab"
                    >
                      {/* Supplier 1 */}
                      <div className="row px-1 py-2 border-bottom">
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Supplier's Name 1
                          </label>

                          <select
                            className="form-select input1 py-0"
                            onChange={(e) => {
                              setSupplierName(e.target.value);
                            }}
                            value={supplierName}
                          >
                            <option value={""}>Select</option>
                            {supplierData.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Brand / Origin 1
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierBrand}
                            onChange={(e) => {
                              setSupplierBrand(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Quoted Price 1
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierQuotedPrice}
                            onChange={(e) => {
                              setSupplierQuotedPrice(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Delivery Time 1
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierDeliveryTime}
                            onChange={(e) => {
                              setSupplierDeliveryTime(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="supplierPill2"
                      role="tabpanel"
                      aria-labelledby="supplierPill2-tab"
                    >
                      {/* Supplier 2 */}
                      <div className="row px-1 py-2 border-bottom">
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Supplier's Name 2
                          </label>

                          <select
                            className="form-select input1 py-0"
                            onChange={(e) => {
                              setSupplierName1(e.target.value);
                            }}
                            value={supplierName1}
                          >
                            <option value={""}>Select</option>
                            {supplierData.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Brand / Origin 2
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierBrand1}
                            onChange={(e) => {
                              setSupplierBrand1(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Quoted Price 2
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierQuotedPrice1}
                            onChange={(e) => {
                              setSupplierQuotedPrice1(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Delivery Time 2
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierDeliveryTime1}
                            onChange={(e) => {
                              setSupplierDeliveryTime1(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="supplierPill3"
                      role="tabpanel"
                      aria-labelledby="supplierPill3-tab"
                    >
                      {/* Supplier 3 */}
                      <div className="row px-1 py-2 border-bottom">
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Supplier's Name 3
                          </label>

                          <select
                            className="form-select input1 py-0"
                            onChange={(e) => {
                              setSupplierName2(e.target.value);
                            }}
                            value={supplierName2}
                          >
                            <option value={""}>Select</option>
                            {supplierData.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Brand / Origin 3
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierBrand2}
                            onChange={(e) => {
                              setSupplierBrand2(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Quoted Price 3
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierQuotedPrice2}
                            onChange={(e) => {
                              setSupplierQuotedPrice2(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Delivery Time 3
                          </label>
                          <input
                            className="form-control input1"
                            type="text"
                            placeholder=""
                            aria-label="form-control example"
                            value={supplierDeliveryTime2}
                            onChange={(e) => {
                              setSupplierDeliveryTime2(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Supplier 1 */}

                  {/*  {selectedSupplier === "supplier1" && (
                    
                  )} */}

                  {/* Supplier 2 */}

                  {/* {selectedSupplier === "supplier2" && (
                    
                  )} */}

                  {/* Supplier 3 */}

                  {/*  {selectedSupplier === "supplier3" && (
                    
                  )} */}

                  {/* Submit Section */}
                  <div className="row px-1 my-3">
                    <div className="col-lg-12 text-center">
                      <button
                        className="btn submit-btn w-100 my-2"
                        type="submit"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                </form>

                {/* Item & Supplier Table */}
                <div className="col-lg-8">
                  <div className="row px-1 py-2">
                    <div className="col-lg-12 mb-2">
                      <DataTable
                        columns={columns}
                        data={itemsArray}
                        customStyles={customStyle}
                        dense
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2 ms-auto">
                      <button
                        className="btn submit-btn w-100"
                        onClick={() => {
                          csItemSubmit(itemsArray);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
