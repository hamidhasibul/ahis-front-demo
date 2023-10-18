import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";

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

export const StudentPromotionComp = () => {
  // States
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([
    // Your data array
  ]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);

  const toastTL = useRef(null);
  const [loader, setLoader] = useState(false);
  const [role, setRole] = useState("");
  const [roleData, setRoleData] = useState([]);
  const [update, setUpdate] = useState([]);

  // Tabole Format
  const columns = [
    {
      name: "ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Student Name",
      cell: (row) => (
        <>
          {row.student_first_name} {row.student_last_name}
        </>
      ),
    },
    {
      name: "Result",
      cell: (row, index) => (
        <>
          <input type="text" onChange={(e) => handleInputChange(e, index)} />
        </>
      ),
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/userprevilege/${row.id}`}>
            <i className="fa-solid fa-eye fa-icon me-2"></i>
          </Link>

          <i className="fa-solid fa-edit fa-icon me-2"></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Functions

  const addRoles = (e) => {
    e.preventDefault();
    if (role === "") {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Enter Department!",
        life: 2000,
      });
      return false;
    }
    const data = new FormData();
    data.append("roleName", role);
    fetch(`${import.meta.env.VITE_SERVER}/addRole`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res.message);
        setUpdate(update + 1);
        document.getElementById("form").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllRole = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getRole`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setRoleData(res.message);
      })
      .catch((err) => console.log(err));
  };

  // Functions

  const getAdmittedStudentsData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmittedStudentsData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const filteredStudents = () => {
    setFilteredData([]);
    [...admittedStudentsData]?.filter((item) => {
      if (
        item.Class.toLowerCase().replace(" ", "") ===
          selectedClass.toLowerCase().replace(" ", "") &&
        item.section.toLowerCase().replace(" ", "") ===
          selectedSection.toLowerCase().replace(" ", "")
      ) {
        setFilteredData((prev) => [...prev, item]);
      }
    });
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedData = [...data];
    if (updatedData[index]) {
      updatedData[index] = { ...updatedData[index], result: value };
      setData(updatedData);
    }
  };

  useEffect(() => {
    getAdmittedStudentsData();
  }, []);

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />

      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Promotion</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-4 pt-2">
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Class</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                    }}
                  >
                    <option selected>Select Class</option>
                    {classInfo
                      .filter((item) => {
                        return item.session === session;
                      })
                      .map((item) => (
                        <option key={item.id} value={item.class_name}>
                          {item.class_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Section</label>
                  <select
                    className="form-select input1 py-0"
                    onClick={(e) => {
                      setSelectedSection(e.target.value);
                    }}
                  >
                    <option selected>Select Section</option>
                    {sectionInfo
                      .filter((item) => {
                        return item.class_name === selectedClass;
                      })
                      .map((item) => (
                        <option key={item.id} value={item.section_name}>
                          {item.section_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-lg-2 offset-10 text-end">
                  <button
                    className="btn submit-btn-sm w-100"
                    onClick={filteredStudents}
                  >
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-8 pt-2 border-start">
              <p className="font-14 fw-500 mb-2">Student List</p>

              <DataTable
                columns={columns}
                data={filteredData}
                customStyles={customStyle}
                dense
                pagination
                paginationPerPage={[20]}
                paginationRowsPerPageOptions={[20]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
