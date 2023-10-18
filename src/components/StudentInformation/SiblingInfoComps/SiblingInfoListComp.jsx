import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

import copy from "../../../assets/images/copy.png";
import { Toast } from "primereact/toast";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";
import { SessionContext } from "../../../context/SessionContext";
import { ClassContext } from "../../../context/ClassContext";
import { SectionContext } from "../../../context/SectionContext";
import { CSVLink } from "react-csv";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import HeaderTemplate from "../../../context/PDFTemplate/HeaderTemplate";
import FooterTemplate from "../../../context/PDFTemplate/FooterTemplate";

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

export const SiblingInfoListComp = () => {
  const toastTL = useRef(null);
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const [yn, setYn] = useState(false);

  // Table Format
  const columns = [
    {
      name: "Student ID",
      selector: (row) => row.student_id,
      width: "10%",
    },
    {
      name: "Student Name",
      selector: (row) => row.student_first_name + " " + row.student_last_name,
      width: "15%",
    },
    {
      name: "Class",
      selector: (row) => row.Class,
      width: "7%",
    },
    {
      name: "Section",
      selector: (row) => row.section,
      width: "10%",
    },
    {
      name: "DOB",
      selector: (row) => row.dob,
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
      width: "10%",
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Religion",
      selector: (row) => row.religion,
      width: "8%",
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
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/siblinginfoview/${row.id}`}>
            <i className="fa-solid fa-eye me-2"></i>
          </Link>
          &nbsp;&nbsp;
          <i className="fa-solid fa-edit"></i> &nbsp;&nbsp;
        </>
      ),
    },
  ];

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
          selectedSection.toLowerCase().replace(" ", "") &&
        item.principal_approve === "Approved"
      ) {
        setFilteredData((prev) => [...prev, item]);
      }
    });
  };

  useEffect(() => {
    getAdmittedStudentsData();
  }, []);

  // for Download datatable
  const extractCSVData = () => {
    return filteredData.map((item) => ({
      "Student ID": item.student_id,
      "Student Name": item.student_first_name + " " + item.student_last_name,
      Class: item.Class,
      Section: item.section,
      "Date of Birth": item.dob,
      Gender: item.gender,
      Nationality: item.nationality,
      Religion: item.religion,
      "Father Contact": item.father_contact,
    }));
  };

  // for copy DataTable
  const convertToCSV = () => {
    const csvData = [];
    const dataToCopy = filteredData.map((item) => {
      return {
        "Student ID": item.student_id,
        "Student Name": item.student_first_name + " " + item.student_last_name,
        Class: item.Class,
        Section: item.section,
        "Date of Birth": item.dob,
        Gender: item.gender,
        Nationality: item.nationality,
        Religion: item.religion,
        "Father Contact": item.father_contact,
      };
    });
    if (dataToCopy.length > 0) {
      const headers = Object.keys(dataToCopy[0]);
      csvData.push(headers);

      dataToCopy.forEach((item) => {
        const values = headers.map((header) => item[header]);
        csvData.push(values);
      });
    }
    return csvData;
  };
  const copyContent = convertToCSV()
    .map((row) => row.join(","))
    .join("\n");

  // generate pdf
  const handleSavePDF = () => {
    const tableContainer = document.getElementById("pdf-container");
    html2canvas(tableContainer)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const x = 10; // Left margin
        const y = 10; // Top margin
        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save("Student List.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  // print student list
  function printStudentList() {
    const container = document.getElementById("pdf-container");
    const printContents = container.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (
    <>
      <Toast ref={toastTL} position="top-right" />
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Students's Information</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-1">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6 mb-2">
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
                          return (
                            item.session === session && +item.pstatus === 1
                          );
                        })
                        .map((item) => (
                          <option key={item.id} value={item.class_name}>
                            {item.class_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-6 mb-2">
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
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Search Student</label>
                    <input
                      type="text"
                      className="input1 form-control"
                      placeholder="Search..."
                      onChange={(e) => {
                        setSearchFilter(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-2 offset-10 text-end">
                    <button
                      className="btn submit-btn-sm w-100"
                      onClick={filteredStudents}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="d-flex py-2 px-3 align-items-center justify-content-between">
                <p className="font-14 fw-500">Student List</p>
                <div className="d-flex align-items-center">
                  <CopyToClipboard
                    text={copyContent}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      onClick={() => {
                        toastTL.current.show({
                          severity: "success",
                          summary: "Success",
                          detail: "Student List Copy to your clipboard",
                          life: 1000,
                        });
                      }}
                      src={copy}
                      className="theadicon mx-1"
                      title="Copy"
                    />
                  </CopyToClipboard>

                  <CSVLink data={extractCSVData()} filename="Student List.csv">
                    <img src={xls} className="theadicon mx-1" title="XLS" />
                  </CSVLink>
                  <img
                    onClick={handleSavePDF}
                    src={pdf}
                    className="theadicon mx-1"
                    style={{ cursor: "pointer" }}
                    title="PDF"
                  />
                  <img
                    onClick={printStudentList}
                    src={printer}
                    className="theadicon mx-1"
                    style={{ cursor: "pointer" }}
                    title="Print"
                  />
                </div>
              </div>

              <DataTable
                columns={columns}
                data={filteredData}
                customStyles={customStyle}
                dense
                pagination
              />

              <div
                id="pdf-container"
                style={{
                  position: "absolute",
                  left: "-100000px",
                  top: 0,
                }}
              >
                <HeaderTemplate />
                <p className="font-14 fw-500 mb-2">Student List</p>
                <DataTable
                  columns={columns.filter((column) => column.name !== "Action")}
                  data={filteredData}
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
