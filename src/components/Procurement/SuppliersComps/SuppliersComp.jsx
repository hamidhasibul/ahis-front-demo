import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Toast } from "primereact/toast";

// Table

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

export const SuppliersComp = () => {
  const toastTL = useRef(null);
  const [update, setUpdate] = useState(0);
  // Supplier States

  const [cat, setCat] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierLocation, setSupplierLocation] = useState("");
  const [supplierPOC, setSupplierPOC] = useState("");
  const [supplierPOCPhone, setSupplierPOCPhone] = useState("");

  const [supplierData, setSupplierData] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [tab, setTab] = useState("add");

  // Table Format
  const columns = [
    {
      name: "S. Name",
      cell: (row) => (
        <div
          onClick={() => {
            setActiveid(row.id);
            setTab("edit");
            setUpdate(update + 1);
          }}
        >
          {row.name}
        </div>
      ),

      width: "30%",
    },
    {
      name: "Phone",
      cell: (row) => (
        <div
          onClick={() => {
            setActiveid(row.id);
            setTab("edit");
            setUpdate(update + 1);
          }}
        >
          {row.phone}
        </div>
      ),

      width: "20%",
    },
    {
      name: "Location",
      cell: (row) => (
        <div
          onClick={() => {
            setActiveid(row.id);
            setTab("edit");
            setUpdate(update + 1);
          }}
        >
          {row.location}
        </div>
      ),

      width: "35%",
    },

    {
      name: "POC",
      cell: (row) => (
        <div
          onClick={() => {
            setActiveid(row.id);
            setTab("edit");
            setUpdate(update + 1);
          }}
        >
          {row.poc}
        </div>
      ),

      width: "15%",
    },
  ];

  // Validation Condition

  const conditions = [
    supplierName === "",
    supplierPhone === "",
    supplierEmail === "",
    supplierLocation === "",
    supplierPOC === "",
  ];

  //   Functions

  const addSupplier = (e) => {
    e.preventDefault();

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();

    data.append("name", supplierName);
    data.append("phone", supplierPhone);
    data.append("email", supplierEmail);
    data.append("location", supplierLocation);
    data.append("poc", supplierPOC);
    data.append("poc_phone", supplierPOCPhone);
    data.append("cat", cat);

    fetch(`${import.meta.env.VITE_SERVER}/supplierSubmit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSupplierName("");
        setSupplierPhone("");
        setSupplierEmail("");
        setSupplierLocation("");
        setSupplierPOC("");
        setSupplierPOCPhone("");
        setCat("");
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  };
  const UpdateSupplier = (e) => {
    e.preventDefault();

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i]) {
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }

    const data = new FormData();

    data.append("id", activeid);
    data.append("name", supplierName);
    data.append("phone", supplierPhone);
    data.append("email", supplierEmail);
    data.append("location", supplierLocation);
    data.append("poc", supplierPOC);
    data.append("poc_phone", supplierPOCPhone);
    data.append("cat", cat);

    fetch(`${import.meta.env.VITE_SERVER}/UpdateSupplierByID`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setTab("add");
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  };

  const getSupplierData = async () => {
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
  const getSupplierDatabyid = () => {
    const data = new FormData();
    data.append("id", activeid);
    fetch(`${import.meta.env.VITE_SERVER}/getsupplierByID`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSupplierName(res.message[0].name);
        setSupplierPhone(res.message[0].phone);
        setSupplierEmail(res.message[0].email);
        setSupplierLocation(res.message[0].location);
        setSupplierPOC(res.message[0].poc);
        setSupplierPOCPhone(res.message[0].poc_phone);
        setCat(res.message[0].cat);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSupplierDatabyid();
    getSupplierData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">
            {tab == "add" ? <>Suppliers</> : <>Edit Suppliers</>}
          </p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              {/* Add View */}
              <div className="col-lg-4 pt-2">
                {tab == "add" && (
                  <>
                    <form className="row" onSubmit={addSupplier}>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Category
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setCat(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Name
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setSupplierName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Phone
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setSupplierPhone(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Email
                        </label>
                        <input
                          className="form-control input1"
                          type="email"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setSupplierEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Location
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          onChange={(e) => {
                            setSupplierLocation(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier's POC
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            setSupplierPOC(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier's POC Phone
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            setSupplierPOCPhone(e.target.value);
                          }}
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
                    </form>
                  </>
                )}
                {tab == "edit" && (
                  <>
                    <form className="row" onSubmit={UpdateSupplier}>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Category
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={cat}
                          aria-label="form-control example"
                          onChange={(e) => {
                            setCat(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Name
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={supplierName}
                          aria-label="form-control example"
                          onChange={(e) => {
                            setSupplierName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Phone
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          value={supplierPhone}
                          onChange={(e) => {
                            setSupplierPhone(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Email
                        </label>
                        <input
                          className="form-control input1"
                          type="email"
                          placeholder=""
                          aria-label="form-control example"
                          value={supplierEmail}
                          onChange={(e) => {
                            setSupplierEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier Location
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          aria-label="form-control example"
                          value={supplierLocation}
                          onChange={(e) => {
                            setSupplierLocation(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier's POC
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={supplierPOC}
                          onChange={(e) => {
                            setSupplierPOC(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-12 mb-2">
                        <label className="form-label label1">
                          Supplier's POC Phone
                        </label>
                        <input
                          className="form-control input1"
                          type="text"
                          placeholder=""
                          value={supplierPOCPhone}
                          onChange={(e) => {
                            setSupplierPOCPhone(e.target.value);
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
                    </form>
                  </>
                )}
              </div>

              {/* List View */}
              <div className="col-lg-8 pt-2 border-start">
                <p className="font-14 fw-500 mb-2">Supplier List</p>
                <DataTable
                  columns={columns}
                  data={supplierData}
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
