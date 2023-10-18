import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { UserRoleContext } from "../../../context/UserRoleContext";
import { useContext } from "react";
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
export const RequisitionListComp = () => {
  // States
  const { user } = useContext(UserRoleContext);
  const [loader, setLoader] = useState(false);
  const [requisitionList, setRequisitionList] = useState([]);
  const [update, setUpdate] = useState([]);

  const columns = [
    {
      name: "Requisition ID",
      selector: (row) => row.requisition_id,
      grow: 1,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Requester Name",
      selector: (row) => row.name,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Campus",
      selector: (row) => row.campus,
    },
    {
      name: "Status",
      selector: (row) => row.approve_status,
    },
    {
      name: "Create Date",
      selector: (row) => row.date.slice(0, 10),
    },
    {
      name: "Expected Date",
      selector: (row) => row.expected_date.slice(0, 10),
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/requisition/view/${row.requisition_id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
        </>
      ),
      grow: 1,
    },
  ];

  const getRequisitionListData = () => {
    const data = new FormData();
    data.append("user", user);
    fetch(`${import.meta.env.VITE_SERVER}/getrequisionData`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setRequisitionList(res.message);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  };
  console.log(user);
  useEffect(() => {
    getRequisitionListData();
  }, [update]);
  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Requisition List</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-12 pt-2 ">
              <DataTable
                columns={columns}
                data={requisitionList}
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
