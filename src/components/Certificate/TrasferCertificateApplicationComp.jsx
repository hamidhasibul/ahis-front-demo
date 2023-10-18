import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import student from "../../assets/images/graduate-avatar.png";
import income from "../../assets/images/money.png";
import expense from "../../assets/images/expenses.png";
import copy from "../../assets/images/copy.png";
import printer from "../../assets/images/printer.png";
import pdf from "../../assets/images/pdf.png";
import xls from "../../assets/images/xls.png";
import logo from "../../assets/images/ahis-logo.png";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";
import { Dropdown } from "primereact/dropdown";
import { UserRoleContext } from "../../context/UserRoleContext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
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

export const TrasferCertificateApplicationComp = () => {
  const [admittedStudentsData, setAdmittedStudentsData] = useState([]);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [sname, setSname] = useState("");
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const toastTL = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  const [studentInfoById, setStudentInfoById] = useState([]);
  const [tCDataByid, setTCDataByid] = useState([]);
  const [tCData, setTCData] = useState([]);
  const [siblingdata, setSiblingdata] = useState([]);
  const [siblingdata2, setSiblingdata2] = useState([]);
  const [siblingdata3, setSiblingdata3] = useState([]);
  const [update, setUpdate] = useState([]);
  const [activeid, setActiveid] = useState("");
  const [mode, setMode] = useState("all");
  const [tab, setTab] = useState("");
  const [viewid, setViewid] = useState("");
  const [sid, setSid] = useState("");
  const [tCSibling, setTCSibling] = useState("");
  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  const [yn2, setYn2] = useState(false);
  const handlerChange2 = (e) => {
    if (e.target.checked) {
      setYn2(true);
    } else {
      setYn2(false);
    }
  };

  // Table Format
  const columns = [
    {
      name: "Student ID",
      cell: (row) => (
        <div
        // onClick={() => {
        //   makeidcard(row.student_id);
        // }}
        >
          {row.student_id}
        </div>
      ),
    },
    {
      name: "Student Name",
      selector: (row) => row.sname,
    },
    {
      name: "Class",
      selector: (row) => row.Class,
    },
    {
      name: "Section",
      selector: (row) => row.section,
    },
    {
      name: "Status",
      cell: (row) => <>{row.pstatus == "" ? <>Pending</> : <>Approved</>}</>,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-eye fa-icon me-2"
            onClick={() => {
              setViewid(row.id);
              setSid(row.student_id);
              setTab("view");
              setUpdate(update + 1);
            }}
          ></i>
        </>
      ),
      width: "10%",
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

  const getstudentById = () => {
    const data = new FormData();
    data.append("student_id", activeid?.student_id);
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIDCardViewByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSname(res.message[0].student_first_name);
        setCls(res.message[0].Class);
        setSection(res.message[0].section);
        setStudentInfoById(res.message[0]);
      })
      .catch((err) => console.log(err));
  };
  const getAllTc = () => {
    const data = new FormData();
    data.append("student_id", activeid?.student_id);
    fetch(`${import.meta.env.VITE_SERVER}/getTC`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setTCData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getAllTcByID = () => {
    const data = new FormData();
    data.append("id", viewid);
    fetch(`${import.meta.env.VITE_SERVER}/getTCById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setTCDataByid(res.message[0]);
        setTCSibling(res.message[0].sibling_info);
      })
      .catch((err) => console.log(err));
  };
  const approvePrincipal = () => {
    const data = new FormData();
    data.append("id", sid);
    fetch(`${import.meta.env.VITE_SERVER}/TCprincipalApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setUpdate(update + 1);
        }
      })
      .catch((err) => console.log(err));
  };
  var tcid = tCSibling.split(",");
  const getsiblinginfo = () => {
    const data = new FormData();
    data.append("student_id", tcid[0]);
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIDCardViewByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSiblingdata(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const getsiblinginfo2 = () => {
    const data = new FormData();
    data.append("student_id", tcid[1]);
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIDCardViewByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSiblingdata2(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const getsiblinginfo3 = () => {
    const data = new FormData();
    data.append("student_id", tcid[2]);
    fetch(`${import.meta.env.VITE_SERVER}/getStudentIDCardViewByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setSiblingdata3(res.message);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // Validation Condition

  const conditions = [
    cls === "",
    section === "",
    reason === "",
    feedback === "",
    activeid === "",
  ];

  const TCSubmit = (e) => {
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
    data.append("sname", sname + " " + activeid?.student_last_name);
    data.append("Class", cls);
    data.append("student_id", activeid?.student_id);
    data.append("section", section);
    data.append(
      "sibling_info",
      activeid?.sibling1
        ? `${activeid?.sibling1}`
        : "" + activeid?.sibling2
        ? `,${activeid?.sibling2}`
        : "" + activeid?.sibling3
        ? `,${activeid?.sibling3}`
        : ""
    );
    data.append("reason", reason);
    data.append("feedback", feedback);
    data.append("status", "");
    data.append("pstatus", "");
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/AddTC`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setActiveid("");
          setSname("");
          setCls("");
          setSection("");
          document.getElementById("form").reset();
          setUpdate(update + 1);
          toastTL.current.show({
            severity: "success",
            summary: "TC info",
            detail: "TC Added Successfully",
            life: 2000,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(tcid[0]);
  useEffect(() => {
    getAdmittedStudentsData();
    getstudentById();
    getsiblinginfo();
    getsiblinginfo2();
    getsiblinginfo3();
    getAllTc();
    getAllTcByID();
  }, [update, activeid, tCSibling]);

  return (
    <>
      <div className="content-body">
        <Toast ref={toastTL} position="top-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Students's Information</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-5 py-1 border-end">
                <form onSubmit={TCSubmit} id="form">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Student ID
                          </label>
                          <Dropdown
                            value={activeid}
                            onChange={(e) => {
                              setActiveid(e.value);
                            }}
                            options={admittedStudentsData}
                            optionLabel="student_id"
                            placeholder="Select a Student"
                            filter
                            className="form-select input1 py-0 font-12"
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">
                            Student Name
                          </label>
                          <input
                            type="text"
                            value={sname}
                            className="input1 form-control"
                            placeholder="Student Name"
                            readOnly
                            onChange={(e) => {
                              setSname(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">Class</label>
                          <input
                            type="text"
                            value={cls}
                            className="input1 form-control"
                            readOnly
                            onChange={(e) => {
                              setCls(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label className="form-label label1">Section</label>
                          <input
                            type="text"
                            value={section}
                            className="input1 form-control"
                            readOnly
                            onChange={(e) => {
                              setSection(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Reason For TC
                          </label>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="3"
                            className=" form-control"
                            onChange={(e) => {
                              setReason(e.target.value);
                            }}
                          ></textarea>
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Sibling's Particulars (if any)
                          </label>
                          <br />

                          <span class="badge bg-secondary font-10">
                            {studentInfoById?.sibling1}
                          </span>
                          <span class="badge bg-secondary font-10 mx-2">
                            {studentInfoById?.sibling2}
                          </span>
                          <span class="badge bg-secondary font-10">
                            {studentInfoById?.sibling3}
                          </span>
                        </div>
                        <div className="col-lg-12 mb-2">
                          <label className="form-label label1">
                            Experience Feedback With AHIS
                          </label>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="3"
                            className=" form-control"
                            onChange={(e) => {
                              setFeedback(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-8">
                          <div class="form-check mb-1">
                            <input
                              class="form-check-input "
                              type="checkbox"
                              value="1"
                              id="flexCheckDefault"
                              onChange={handlerChange2}
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
                            disabled={yn2 !== true}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-7 py-2">
                {tab == "" && (
                  <>
                    <div className="row">
                      <p>TC List</p>
                      <DataTable
                        columns={columns}
                        data={tCData}
                        customStyles={customStyle}
                        dense
                        paginationPerPage={[20]}
                        paginationRowsPerPageOptions={[20]}
                        pagination
                      />
                    </div>
                  </>
                )}
                {tab == "view" && (
                  <>
                    <nav aria-label="breadcrumb ">
                      <ol class="breadcrumb font-11">
                        <li class="breadcrumb-item">
                          <a
                            href="#"
                            onClick={() => {
                              setTab("");
                            }}
                          >
                            TC List
                          </a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          TC View
                        </li>
                      </ol>
                    </nav>
                    <div className="container">
                      <div className="row border">
                        <div className="col-lg-12 mb-2 bg-light border-bottom">
                          <p className="font-14 fw-bold  py-1">
                            Applicant’s Particulars:
                          </p>
                        </div>
                        <div className="col-lg-3  text-start">
                          <p className="font-13">Student Name</p>
                        </div>
                        <div className="col-lg-3">
                          {" "}
                          <p className="font-13">: {tCDataByid?.sname}</p>
                        </div>
                        <div className="col-lg-2 text-start">
                          <p className="font-13">Class</p>
                        </div>
                        <div className="col-lg-4">
                          {" "}
                          <p className="font-13">: {tCDataByid?.Class}</p>
                        </div>
                        <div className="col-lg-3  text-start mt-2">
                          <p className="font-13">Student ID</p>
                        </div>
                        <div className="col-lg-3 mt-2">
                          {" "}
                          <p className="font-13">: {tCDataByid?.student_id}</p>
                        </div>
                        <div className="col-lg-2 text-start mt-2">
                          <p className="font-13">Section</p>
                        </div>
                        <div className="col-lg-4 mt-2">
                          {" "}
                          <p className="font-13">: {tCDataByid?.section}</p>
                        </div>
                        <div className="col-lg-12 my-3">
                          <p className="font-14 fw-bold">Reason for TC</p>
                          <p className="font-12">{tCDataByid?.reason}</p>
                        </div>
                        {siblingdata.length == 0 ? (
                          <>
                            <div className="col-lg-12">
                              <p className="font-14 fw-bold">
                                No Siblings Available
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-lg-12">
                              <p className="font-14 fw-bold">
                                Siblings' Particulars (if any)
                              </p>
                              <table class="table my-2">
                                <thead className="table-primary">
                                  <tr>
                                    <th scope="col" className="py-1 font-13">
                                      ID
                                    </th>
                                    <th scope="col" className="py-1 font-13">
                                      Name
                                    </th>
                                    <th scope="col" className="py-1 font-13">
                                      Class
                                    </th>
                                    <th scope="col" className="py-1 font-13">
                                      Section
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {siblingdata?.map((item) => {
                                    return (
                                      <>
                                        <tr class="">
                                          <td
                                            scope="row"
                                            className="py-1 font-13"
                                          >
                                            {item.student_id}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.student_first_name +
                                              " " +
                                              item.student_last_name}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.Class}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.section}
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                  {siblingdata2?.map((item) => {
                                    return (
                                      <>
                                        <tr class="">
                                          <td
                                            scope="row"
                                            className="py-1 font-13"
                                          >
                                            {item.student_id}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.student_first_name +
                                              " " +
                                              item.student_last_name}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.Class}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.section}
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                  {siblingdata3?.map((item) => {
                                    return (
                                      <>
                                        <tr class="">
                                          <td
                                            scope="row"
                                            className="py-1 font-13"
                                          >
                                            {item.student_id}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.student_first_name +
                                              " " +
                                              item.student_last_name}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.Class}
                                          </td>
                                          <td className="py-1 font-13">
                                            {item.section}
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}

                        <div className="col-lg-12 my-3">
                          <p className="font-14 fw-bold">
                            Experience Feedback with AHIS
                          </p>
                          <p className="font-12">{tCDataByid?.feedback}</p>
                        </div>

                        <div className="col-lg-12 my-3">
                          <div className="d-flex border">
                            <p className="m-0 border-end font-13 w-25 p-1 fw-bold">
                              Principal Approval
                            </p>
                            {tCDataByid?.pstatus == "" ? (
                              <>
                                {user == "Principal" ||
                                user == "Super Admin" ? (
                                  <>
                                    <div className="row">
                                      <div className="col-lg-7">
                                        <div class="form-check mb-1">
                                          <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value="1"
                                            id="flexCheckDefault"
                                            onChange={handlerChange}
                                          />
                                          <label
                                            class="form-check-label font-12"
                                            for="flexCheckDefault"
                                          >
                                            Make As Approve
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-lg-5 text-center">
                                        <button
                                          className="btn submit-btn"
                                          onClick={approvePrincipal}
                                          disabled={yn !== true}
                                        >
                                          Approve
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>waiting for Approval</>
                                )}
                              </>
                            ) : (
                              <>Approved</>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
