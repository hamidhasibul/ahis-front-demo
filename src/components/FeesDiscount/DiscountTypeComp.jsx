import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import DataTable from "react-data-table-component";

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

export const DiscountTypeComp = () => {
  const [discountType, setDiscountType] = useState("");
  const [discountTypeData, setDiscountTypeData] = useState("");
  const [activeId, setActiveId] = useState("");
  const [update, setUpdate] = useState(0);

  const { session } = useContext(SessionContext);

  const [tab, setTab] = useState("add");

  // Table Format

  const columns2 = [
    {
      name: "Discount Type",
      selector: (row) => row.discountType,
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
              getDiscountTypeByID(row.id);
              setActiveId(row.id);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Functions

  function addDiscountType(e) {
    e.preventDefault();

    if (discountType === "") {
      return false;
    }

    const data = new FormData();
    data.append("discountType", discountType);
    data.append("session", session);
    fetch(`${import.meta.env.VITE_SERVER}/addDiscountType`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  const getDiscountType = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getDiscountType`,
        {
          method: "POST",
        }
      );
      const res = await response.json();

      setDiscountTypeData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getDiscountTypeByID = (id) => {
    const data = new FormData();
    data.append("id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getDiscountTypeById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setDiscountType(res.message[0].discountType);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  };

  const editDiscountType = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", activeId);
    data.append("discountType", discountType);
    data.append("session", session);

    fetch(`${import.meta.env.VITE_SERVER}/UpdateDiscountType`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
        setTab("add");
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
    getDiscountType();
  }, [update]);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Discount Type</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-2">
            <div className="col-lg-4">
              {tab == "add" && (
                <>
                  <form className="row" onSubmit={addDiscountType}>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">Discount Type</label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        onChange={(e) => {
                          setDiscountType(e.target.value);
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
                        disabled={yn !== true}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </>
              )}
              {tab === "edit" && (
                <>
                  <form className="row" onSubmit={editDiscountType}>
                    <div className="col-lg-12 mb-2">
                      <label className="form-label label1">
                        Edit Discount Type
                      </label>
                      <input
                        className="form-control input1"
                        type="text"
                        placeholder=""
                        aria-label="form-control example"
                        value={discountType}
                        onChange={(e) => {
                          setDiscountType(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-lg-4 offset-8 text-end">
                      <button className="btn submit-btn-sm w-100" type="submit">
                        Edit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Item List</p>
              <DataTable
                columns={columns2}
                data={discountTypeData}
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
