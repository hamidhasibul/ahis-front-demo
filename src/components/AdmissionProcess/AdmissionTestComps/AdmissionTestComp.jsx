import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import copy from "../../../assets/images/copy.png";
import printer from "../../../assets/images/printer.png";
import pdf from "../../../assets/images/pdf.png";
import xls from "../../../assets/images/xls.png";
import { Loader } from "../../Common/Loader";
import { UserRoleContext } from "../../../context/UserRoleContext";
import { useContext } from "react";
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

export const AdmissionTestComp = () => {
  const { user } = useContext(UserRoleContext);
  const [loader, setLoader] = useState(false);
  const [applicantData, setApplicantData] = useState([]);
  const [applicantResult, setApplicantResult] = useState([]);
  const [subcount, setSubcount] = useState(2);
  const [fil, setFil] = useState("");
  const [addDate, setAddDate] = useState("");
  const [formnumber, setFormnumber] = useState("");
  const [session, setSession] = useState("");
  const [sfname, setSFname] = useState("");
  const [slname, setSLname] = useState("");
  const [applyclass, setApplyclass] = useState("");
  const [age, setAge] = useState("");
  const [subject1, setSubject1] = useState("");
  const [marks1, setMarks1] = useState(0);
  const [obtain1, setObtain1] = useState(0);
  const [subject2, setSubject2] = useState("");
  const [marks2, setMarks2] = useState(0);
  const [obtain2, setObtain2] = useState(0);
  const [subject3, setSubject3] = useState("");
  const [marks3, setMarks3] = useState(0);
  const [obtain3, setObtain3] = useState(0);
  const [subject4, setSubject4] = useState("");
  const [marks4, setMarks4] = useState(0);
  const [obtain4, setObtain4] = useState(0);
  const [subject5, setSubject5] = useState("");
  const [marks5, setMarks5] = useState(0);
  const [obtain5, setObtain5] = useState(0);
  const [testsheetImage, setTestsheetImage] = useState("");
  const [testsheetPDF, setTestsheetPDF] = useState("");
  const [teachercmt, setTeachercmt] = useState("");
  const [stadfeed, setStadfeed] = useState();
  const [update, setUpdate] = useState([]);
  const [yn, setYn] = useState(false);

  const [confirmationState, setConfirmationState] = useState(false);

  const toastTL = useRef(null);

  const columns = [
    {
      name: "Form ID",
      selector: (row) => row.form_number,
      width: "10%",
    },
    {
      name: "Student Name",
      selector: (row) => row.student_first_name + " " + row.student_last_name,
      width: "25%",
    },
    {
      name: "Class",
      selector: (row) => row.apply_class,
      width: "10%",
    },
    // {
    //   name: "Gender",
    //   selector: (row) => row.age,
    // },
    {
      name: "Marks",
      selector: (row) =>
        [
          row.obtain1,
          row.obtain2,
          row.obtain3,
          row.obtain4,
          row.obtain5,
        ].reduce((a, b) => a + b, 0),
      width: "10%",
    },
    {
      name: "Comments",
      selector: (row) => row.teacher_comment,
    },
    {
      name: "Form Status",
      cell: (row) => (
        <>
          {+row.status1 === 0 ? (
            <>
              <p className="m-0 fs-11 fw-bold text-success">Checked</p>
            </>
          ) : (
            <>
              {" "}
              <p className="m-0 fs-11 fw-bold fst-italic">Pending. . .</p>
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
          <Link to={`/admissiontest/view/${row.id}`}>
            <i className="fa-solid fa-eye fa-icon text-primary me-2"></i>
          </Link>

          {user == "principal" && (
            <>
              {/* <i className="fa-solid fa-edit fa-icon me-2"></i> */}
              <i
                class="fa-solid fa-circle-check"
                onClick={() => approve(row.form_number)}
              ></i>
            </>
          )}
          <i className="fa-solid fa-pen fa-icon ms-2"></i>
        </>
      ),
    },
  ];

  function approve(id) {
    const data = new FormData();
    data.append("id", id);
    fetch(`${import.meta.env.VITE_SERVER}/Updateprincipaleligible`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const getAllappliceantData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getAdmissionTestResult`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setApplicantResult(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getAllAdmissionTestData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchApplicantsAdmissionTest`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setApplicantData(res.message);
      })
      .catch((err) => console.log(err));
  };

  function admissionsubmit() {
    setLoader(true);
    const data = new FormData();
    data.append("session", session);
    data.append("test_date", addDate);
    data.append("form_number", formnumber);
    data.append("student_first_name", sfname);
    data.append("student_last_name", slname);
    data.append("apply_class", applyclass);
    data.append("age", age);
    data.append("subject1", subject1);
    data.append("marks1", marks1);
    data.append("obtain1", obtain1);
    data.append("subject2", subject2);
    data.append("marks2", marks2);
    data.append("obtain2", obtain2);
    data.append("subject3", subject3);
    data.append("marks3", marks3);
    data.append("obtain3", obtain3);
    data.append("subject4", subject4);
    data.append("marks4", marks4);
    data.append("obtain4", obtain4);
    data.append("subject5", subject5);
    data.append("marks5", marks5);
    data.append("obtain5", obtain5);
    data.append("testsheet", testsheetImage);
    data.append("testsheetPDF", testsheetPDF);
    data.append("teacher_comment", teachercmt);
    data.append("stad_feedback", stadfeed);

    fetch(`${import.meta.env.VITE_SERVER}/admissiontestresult`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        toastTL.current.show({
          severity: "success",
          summary: "Success",
          detail: `Result Submitted`,
          life: 2000,
        });
        setLoader(false);
        resetState();
        setUpdate(update + 1);
      })
      .catch((err) => {
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: `Something went wrong! ${err}`,
          life: 2000,
        });
        console.error(err);
      });
  }

  const resetState = () => {
    setAddDate("");
    setFormnumber("");
    setSFname("");
    setSLname("");
    setApplyclass("");
    setAge("");

    setSubject1("");
    setMarks1(0);
    setObtain1(0);

    setSubject2("");
    setMarks2(0);
    setObtain2(0);

    setSubject3("");
    setMarks3(0);
    setObtain3(0);

    setSubject4("");
    setMarks4(0);
    setObtain4(0);

    setSubject5("");
    setMarks5(0);
    setObtain5(0);

    setTestsheetImage("");
    setTestsheetPDF("");
    setTeachercmt("");
    setStadfeed("");
  };

  const clearForm = () => {
    setFormnumber("");
    setSFname("");
    setSLname("");
    setApplyclass("");
    setAge("");
  };

  useEffect(() => {
    getAllAdmissionTestData();
    getAllappliceantData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        <Toast ref={toastTL} position="top-right" />

        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Admission Test</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div
              className="row"
              onClick={() => {
                document.getElementById("iddd").style.display = "none";
              }}
            >
              <div className="col-lg-4 mt-2">
                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Test Date</label>
                    <input
                      className="form-control input1"
                      type="date"
                      aria-label="form-control example"
                      onChange={(e) => setAddDate(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Form Number</label>
                    <div className="position-relative">
                      {formnumber && (
                        <>
                          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill  p-0">
                            <i
                              class="fa-solid fa-circle-xmark text-dark"
                              style={{ cursor: "pointer" }}
                              onClick={clearForm}
                            ></i>
                          </span>
                        </>
                      )}
                      <input
                        className="form-control input1 relative"
                        type="text"
                        id="hd"
                        disabled={formnumber}
                        placeholder={formnumber}
                        onChange={(e) => {
                          e.stopPropagation();
                          setFil(e.target.value);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById("iddd").style.display =
                            "block";
                        }}
                      />
                    </div>

                    <div
                      id="iddd"
                      style={{
                        display: "none",
                        position: "absolute",
                        backgroundColor: "#fff",
                        width: "150px",
                        padding: "10px",
                      }}
                      className="shadow"
                    >
                      {applicantData
                        .filter((item) => {
                          if (
                            item.form_number
                              .toLowerCase()
                              .includes(fil.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item) => (
                          <p
                            key={item.id}
                            className="m-0 py-1 border-bottom"
                            onClick={() => {
                              setFormnumber(item.form_number);
                              setSession(item.session);
                              setSFname(item.student_first_name);
                              setSLname(item.student_last_name);
                              setApplyclass(item.applyforclass);
                              setAge(item.age);
                              document.getElementById("iddd").style.display =
                                "none";
                              (e) => {
                                e.stopPropagation();
                              };
                            }}
                          >
                            {item.form_number}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">
                      Student First Name
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      value={sfname}
                      onChange={(e) => setSFname(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">
                      Student Last Name
                    </label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      value={slname}
                      onChange={(e) => setSLname(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Applying Class</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      value={applyclass}
                      onChange={(e) => setApplyclass(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label className="form-label label1">Age</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Test Marks</label>
                    <div className="container">
                      <div className="row bg1 rounded">
                        {subcount > 1 ? (
                          <>
                            <div className="col-lg-6 mb-2">
                              <label className="form-label label1">
                                Subject 1
                              </label>
                              <input
                                className="form-control input1"
                                type="text"
                                placeholder=""
                                onChange={(e) => setSubject1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Obtain 1
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={obtain1}
                                onChange={(e) => setObtain1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Marks 1
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={marks1}
                                onChange={(e) => setMarks1(e.target.value)}
                              />
                            </div>
                          </>
                        ) : null}
                        {subcount > 2 ? (
                          <>
                            <div className="col-lg-6 mb-2">
                              <label className="form-label label1">
                                Subject 2
                              </label>
                              <input
                                className="form-control input1"
                                type="text"
                                placeholder=""
                                onChange={(e) => setSubject2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Obtain 2
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={obtain2}
                                onChange={(e) => setObtain2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Marks 2
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={marks2}
                                onChange={(e) => setMarks2(e.target.value)}
                              />
                            </div>
                          </>
                        ) : null}

                        {subcount > 3 ? (
                          <>
                            <div className="col-lg-6 mb-2">
                              <label className="form-label label1">
                                Subject 3
                              </label>
                              <input
                                className="form-control input1"
                                type="text"
                                placeholder=""
                                onChange={(e) => setSubject3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Obtain 3
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={obtain3}
                                onChange={(e) => setObtain3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Marks 3
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={marks3}
                                onChange={(e) => setMarks3(e.target.value)}
                              />
                            </div>
                          </>
                        ) : null}
                        {subcount > 4 ? (
                          <>
                            <div className="col-lg-6 mb-2">
                              <label className="form-label label1">
                                Subject 4
                              </label>
                              <input
                                className="form-control input1"
                                type="text"
                                placeholder=""
                                onChange={(e) => setSubject4(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Obtain 4
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={obtain4}
                                onChange={(e) => setObtain4(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Marks 4
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={marks4}
                                onChange={(e) => setMarks4(e.target.value)}
                              />
                            </div>
                          </>
                        ) : null}
                        {subcount > 5 ? (
                          <>
                            <div className="col-lg-6 mb-2">
                              <label className="form-label label1">
                                Subject 5
                              </label>
                              <input
                                className="form-control input1"
                                type="text"
                                placeholder=""
                                onChange={(e) => setSubject5(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Obtain 5
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={obtain5}
                                onChange={(e) => setObtain5(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-3 mb-2">
                              <label className="form-label label1">
                                Marks 5
                              </label>
                              <input
                                className="form-control input1"
                                type="number"
                                placeholder=""
                                value={marks5}
                                onChange={(e) => setMarks5(e.target.value)}
                              />
                            </div>
                          </>
                        ) : null}
                        <div className="col-lg-12 mb-2">
                          {subcount > 5 ? null : (
                            <button
                              className="btn submit-btn-sm"
                              style={{ color: "black" }}
                              onClick={() => setSubcount(subcount + 1)}
                            >
                              Add
                            </button>
                          )}
                        </div>
                        <div className="col-lg-6 mb-2 text-end">
                          <p className="mb-0 mt-1 font-12 fw-500">
                            Total Marks
                          </p>
                        </div>
                        <div className="col-lg-3 mb-2">
                          <input
                            className="form-control input1"
                            type="number"
                            placeholder=""
                            disabled
                            value={[
                              Number(obtain1),
                              Number(obtain2),
                              Number(obtain3),
                              Number(obtain4),
                              Number(obtain5),
                            ].reduce((a, b) => a + b, 0)}
                          />
                        </div>
                        <div className="col-lg-3 mb-2">
                          <input
                            className="form-control input1"
                            type="number"
                            placeholder=""
                            disabled
                            value={[
                              Number(marks1),
                              Number(marks2),
                              Number(marks3),
                              Number(marks4),
                              Number(marks5),
                            ].reduce((a, b) => a + b, 0)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">
                      Test Sheet{" "}
                      <span>
                        <small className="mb-0 font-10 text-muted">
                          (Image: JPG, PNG)
                        </small>
                      </span>
                    </label>
                    <input
                      className="form-control input1 pt-1"
                      type="file"
                      placeholder=""
                      accept="jpg,jpeg,png"
                      aria-label="form-control example"
                      onChange={(e) => setTestsheetImage(e.target.files[0])}
                    />
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">
                      Test Sheet{" "}
                      <span>
                        <small className="mb-0 font-10 text-muted">(PDF)</small>
                      </span>
                    </label>
                    <input
                      className="form-control input1 pt-1"
                      type="file"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => setTestsheetPDF(e.target.files[0])}
                    />
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">
                      Teacher's Comment
                    </label>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder=""
                      row="2"
                      onChange={(e) => setTeachercmt(e.target.value)}
                      aria-label="form-control example"
                    ></textarea>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">STAD Feedback</label>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder=""
                      row="2"
                      onChange={(e) => setStadfeed(e.target.value)}
                      aria-label="form-control example"
                    ></textarea>
                  </div>
                </div>
                <div className="row mt-2 mb-4">
                  <div className="col-lg-12 mb-2">
                    <input
                      className="form-check-input mt-1"
                      id="confirmState"
                      type="checkbox"
                      value={true}
                      name="confirmation"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setConfirmationState(e.target.value);
                        } else {
                          setConfirmationState(false);
                        }
                      }}
                    />
                    <label
                      className="form-check-label font-13 fw-500 ms-1"
                      htmlFor="confirmState"
                    >
                      Are you sure to submit ?
                    </label>
                  </div>
                  <div className="col-lg-6 text-center">
                    <button
                      className="btn submit-btn w-100"
                      // disabled={yn !== true}
                      onClick={admissionsubmit}
                      disabled={!confirmationState}
                    >
                      Save & Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 px-0 border-start">
                <div className="d-flex py-2 px-3 border-b align-items-center justify-content-between">
                  <p className="font-14 fw-bold">Applicant List</p>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="search-bar rounded-pill mx-3 px-3 border-bord bg1"
                      placeholder="Search..."
                    />
                    <img src={copy} className="theadicon mx-1" title="Copy" />
                    <img src={xls} className="theadicon mx-1" title="XLS" />
                    <img src={pdf} className="theadicon mx-1" title="PDF" />
                    <img
                      src={printer}
                      className="theadicon mx-1"
                      title="Print"
                    />
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={applicantResult}
                  customStyles={customStyle}
                  pagination
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
