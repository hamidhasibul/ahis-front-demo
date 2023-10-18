import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
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
export const CsListComp = () => {
  // States
  const [loader, setLoader] = useState(false);
  const [requisitionList, setRequisitionList] = useState([]);
  const [update, setUpdate] = useState([]);

  // Table Format

  const columns = [
    {
      name: "CS ID",
      selector: (row) => row.cs_id,
    },
    {
      name: "Requisition ID",
      selector: (row) => row.requisition_id,
    },
    {
      name: "Total Items",
      selector: (row) => row.item_count,
    },
    {
      name: "Create Date",
      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/cs/view/${row.cs_id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
        </>
      ),
    },
  ];

  // Functions

  const getRequisitionListData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getrequisionCSData`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setRequisitionList(res.message);
      })
      .catch((err) => console.log(err));
  };

  const filteredArray = requisitionList.filter(
    (obj, index, self) => index === self.findIndex((t) => t.cs_id === obj.cs_id)
  );

  const countByCsId = {};
  requisitionList.forEach((obj) => {
    if (countByCsId[obj.cs_id]) {
      countByCsId[obj.cs_id]++;
    } else {
      countByCsId[obj.cs_id] = 1;
    }
  });

  const outputArray = filteredArray.map((obj) => ({
    ...obj,
    item_count: countByCsId[obj.cs_id],
  }));

  useEffect(() => {
    getRequisitionListData();
  }, [update]);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">CS List</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-12 pt-2 ">
              <DataTable
                columns={columns}
                data={outputArray}
                customStyles={customStyle}
                dense
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
