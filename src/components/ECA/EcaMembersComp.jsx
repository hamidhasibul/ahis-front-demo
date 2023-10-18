import React, { useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { SessionContext } from "../../context/SessionContext";
import { SectionContext } from "../../context/SectionContext";
import { ClassContext } from "../../context/ClassContext";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";
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
export const EcaMembersComp = () => {
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo, update, setUpdate } = useContext(SectionContext);
  const [loader, setLoader] = useState(false);
  const [allClubData, setAllClubData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const columns = [
    {
      name: "Student Name",
      selector: (row) => row.student_name,
    },
    {
      name: "Student ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Class",
      selector: (row) => row.class_std,
    },
    {
      name: "Section",
      selector: (row) => row.section,
    },
    {
      name: "Session",
      selector: (row) => row.session,
    },
    {
      name: "Club",
      selector: (row) => row.club_name,
    },
    {
      name: "Status",
      selector: (row) => row.club_name,
    },
    {
      name: "Action",
      button: true,
      cell: () => (
        <>
          <i className="fa-solid fa-edit fa-icon me-2"></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];
  const getAllStudent = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/getStudentClub`, {
        method: "POST",
      });
      const data = await res.json();
      setStudentData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    if (!studentData) return false;

    const data = studentData?.filter((item) => {
      return (
        item.student_name
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase()) ||
        item.club_name
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase()) ||
        item.class_std
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase()) ||
        item.class_std
          .toString()
          .toLowerCase()
          .includes(searchFilter.toString().toLowerCase())
      );
    });
    setFilteredData(data);
  };
  useEffect(() => {
    getAllStudent();
  }, [update]);

  useEffect(() => {
    filterData();
  }, [searchFilter, studentData]);

  console.log(studentData);
  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center justify-content-between">
          <p className="header-font">ECA & Club Members</p>
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
