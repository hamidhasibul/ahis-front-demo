import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import copy from "../../../assets/images/copy.png";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";
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

export const EligibleStudentViewComps = () => {
  const [applicantData, setApplicantData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const { user } = useContext(UserRoleContext);

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
      name: "Applying Class",
      selector: (row) => row.applyforclass,
      width: "10%",
    },
    {
      name: "Age",
      selector: (row) => row.age,
      width: "15%",
    },
    // {
    //   name: "Date of Birth",
    //   selector: (row) => row.dob,
    // },
    // {
    //   name: "Place of birth",
    //   selector: (row) => row.pob,
    // },
    {
      name: "Gender",
      selector: (row) => row.gender,
      width: "8%",
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Religion",
      selector: (row) => row.religion,
    },
    {
      name: "Father contact",
      selector: (row) => row.father_contact,
    },
    // {
    //   name: "Mother contact",
    //   selector: (row) => row.mother_contact,
    // },
    {
      name: "Submission",
      selector: (row) => row.submission_date,
    },

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/applicantlist/view/${row.id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>
          {user == "principal" && (
            <>
              {/* <i className="fa-solid fa-edit fa-icon me-2"></i> */}
              <i
                class="fa-solid fa-circle-check"
                onClick={() => approve(row.id)}
              ></i>
            </>
          )}
        </>
      ),
    },
  ];

  // Functions
  // function approve(id) {
  //   const data = new FormData();
  //   data.append("id", id);
  //   fetch(`${import.meta.env.VITE_SERVER}/getApplientViewByid`, {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setGetstudentdata(res.message[0]);
  //     })
  //     .catch((err) => console.log(err));
  // }
  const getAllApplicantData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getEligiblestudent`, {
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
          <p className="header-font">Eligible Student List</p>
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
            pagination
          />
        </div>
      </div>
    </>
  );
};
