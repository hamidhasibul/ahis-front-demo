import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import copy from "../../../assets/images/copy.png";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";
// import { Tooltip } from "bootstrap";
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
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
};

export const ApplicantlistComp = () => {
  const [applicantData, setApplicantData] = useState([]);

  const [searchFilter, setSearchFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      name: "Form ID",
      selector: (row) => row.form_number,
      width: "7%",
    },
    {
      name: "Student Name",
      selector: (row) => row.student_first_name + " " + row.student_last_name,
      width: "15%",
    },
    {
      name: "Class",
      selector: (row) => row.applyforclass,
      width: "7%",
    },
    {
      name: "Age",
      selector: (row) => row.age,
      width: "15%",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      width: "8%",
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
      width: "10%",
    },
    {
      name: "Emergency",
      selector: (row) => row.sms_contact1,
      width: "10%",
    },
    {
      name: "Submission",
      selector: (row) => row.submission_date,
    },
    {
      name: "Eligibility Status",
      cell: (row) => (
        <>
          {row.eligible_status == "1" && (
            <>
              <p className="bg-success text-light px-2 rounded-pill">
                Eligible
              </p>
            </>
          )}
          {row.eligible_status == "" && (
            <>
              <p className="bg-warning text-light px-2 rounded-pill">Pending</p>
            </>
          )}
          {row.eligible_status == "0" && (
            <>
              <p className="bg-danger text-light px-2 rounded-pill">
                Not Eligible
              </p>
            </>
          )}
        </>
      ),
    },

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/applicantlist/view/${row.id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>

          <i className="fa-solid fa-edit fa-icon me-2"></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];


  const getAllApplicantData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchApplicantsAlldata`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setApplicantData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const filterData = () => {
    if (!applicantData) return false;

    const data = applicantData?.filter((item) => {
      return (
        item.form_number
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase()) ||
        item.applyforclass
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase()) ||
        item.student_first_name
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase())
      );
    });
    setFilteredData(data);
  };

  useEffect(() => {
    getAllApplicantData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchFilter, applicantData]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center justify-content-between">
          <p className="header-font">Applicant List</p>

          <div className="d-flex align-items-center">
            <input
              type="text"
              className="search-bar rounded-pill mx-3 px-3 border-bord bg1"
              placeholder="Search..."
              onChange={(e) => {
                setSearchFilter(e.target.value);
              }}
            />
            <img src={copy} className="theadicon mx-1" title="Copy" />
            <img src={xls} className="theadicon mx-1" title="XLS" />
            <img src={pdf} className="theadicon mx-1" title="PDF" />
            <img src={printer} className="theadicon mx-1" title="Print" />
          </div>
        </div>

        <div className="scroll-element">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyle}
            dense
            paginationPerPage={[20]}
            paginationRowsPerPageOptions={[20]}
            pagination
          />
        </div>
      </div>
    </>
  );
};
