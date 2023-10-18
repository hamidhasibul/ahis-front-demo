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
export const BudgetListComp = () => {
  // States
  const [loader, setLoader] = useState(false);
  const [budgetList, setBudgetList] = useState([]);
  const [update, setUpdate] = useState([]);

  // Table Format

  const columns = [
    {
      name: "Budget ID",
      selector: (row) => row.bid,
    },
    {
      name: "Project Name",
      selector: (row) => row.pname,
      grow: 2,
    },
    {
      name: "Campus",
      selector: (row) => row.campus,
    },
    {
      name: "Generate Date",
      selector: (row) => row.gdate.slice(0, 10),
    },
    {
      name: "Status",
      cell: (row) => <>{row.status == "" ? <>Running</> : <>Complete</>}</>,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/budget/view/${row.bid}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
        </>
      ),
    },
  ];

  // Functions

  const BudgetData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getbudgetAllinfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setBudgetList(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    BudgetData();
  }, [update]);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Budget List</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-12 pt-2 ">
              <DataTable
                columns={columns}
                data={budgetList}
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
