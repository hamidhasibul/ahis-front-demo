import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { UserRoleContext } from "../../../context/UserRoleContext";
import { useContext } from "react";
export const AdmissionTestIndViewComp = () => {
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [getadmissiontestinfo, setGetadmissiontestinfo] = useState([]);
  const [admissionData, setAdmissionData] = useState([]);
  const [princApproval, setPrincApproval] = useState("");
  const [formNo, setFormNo] = useState("");
  const [admissionID, setAdmissionID] = useState("");
  const [disapprovalNote, setDisapprovalNote] = useState("");
  const [yn, setYn] = useState(false);
  const toastTL = useRef(null);
  const params = useParams();
  console.log(user);
  const { id } = params;
  const getstudent = () => {
    const data = new FormData();
    data.append("id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getAdmissionTestResultByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setGetadmissiontestinfo(res.message[0]);
        setFormNo(res.message[0].form_number);

        getAdmissionData(res.message[0].form_number);
      })
      .catch((err) => console.log(err));
  };

  const getAdmissionData = (formNo) => {
    const data = new FormData();
    data.append("form_number", formNo);
    fetch(`${import.meta.env.VITE_SERVER}/fetchApplicantsbyFormNo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmissionID(res.message[0].id);
        setAdmissionData(res.message[0]);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const submitStudentApproval = () => {
    const data = new FormData();
    data.append("id", admissionID);
    data.append("principal_approvel", princApproval);
    data.append("pdnote", disapprovalNote);
    data.append("form_number", formNo);

    fetch(`${import.meta.env.VITE_SERVER}/updateAdmissionPrincipalApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          toastTL.current.show({
            severity: "success",
            summary: "Success",
            detail: `Approved`,
            life: 2000,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  useEffect(() => {
    getstudent();
  }, []);
  return (
    <>
      <div className="content-body">
        <Toast ref={toastTL} position="top-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Admission Test Info</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 mt-2">
                <div className="row px-2">
                  <div className="col-lg-12 mb-2 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">Test Date</p>
                    <p className="col-lg-8 font-12">
                      : {getadmissiontestinfo.test_date}
                    </p>
                  </div>

                  <div className="col-lg-12 mb-2 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">Form Number</p>
                    <p className="col-lg-8 font-12">
                      : {getadmissiontestinfo.form_number}
                    </p>
                  </div>
                  <div className="col-lg-12 mb-2 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">Student Name</p>
                    <p className="col-lg-8 font-12">
                      : {getadmissiontestinfo.student_first_name}{" "}
                      {getadmissiontestinfo.student_first_name}
                    </p>
                  </div>

                  <div className="col-lg-12 mb-2 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">Applying Class</p>
                    <p className="col-lg-8 font-12">
                      : {getadmissiontestinfo.apply_class}
                    </p>
                  </div>
                  <div className="col-lg-12 mb-2 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">Age</p>
                    <p className="col-lg-8 font-12">
                      : {getadmissiontestinfo.age}
                    </p>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1 fw-bold">
                      Test Marks
                    </label>
                    <div className="w-75">
                      <table class="table border font-12">
                        <thead>
                          <tr>
                            <th scope="col" className="py-1">
                              Subject
                            </th>
                            <th scope="col" className="py-1">
                              Obtain
                            </th>
                            <th scope="col" className="py-1">
                              Marks
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getadmissiontestinfo.obtain1 != 0 && (
                            <>
                              <tr>
                                <td className="py-1">
                                  {getadmissiontestinfo.subject1}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.obtain1}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.marks1}
                                </td>
                              </tr>
                            </>
                          )}
                          {getadmissiontestinfo.obtain2 != 0 && (
                            <>
                              <tr>
                                <td className="py-1">
                                  {getadmissiontestinfo.subject2}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.obtain2}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.marks2}
                                </td>
                              </tr>
                            </>
                          )}
                          {getadmissiontestinfo.obtain3 != 0 && (
                            <>
                              <tr>
                                <td className="py-1">
                                  {getadmissiontestinfo.subject3}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.obtain3}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.marks3}
                                </td>
                              </tr>
                            </>
                          )}
                          {getadmissiontestinfo.obtain4 != 0 && (
                            <>
                              <tr>
                                <td className="py-1">
                                  {getadmissiontestinfo.subject4}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.obtain4}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.marks4}
                                </td>
                              </tr>
                            </>
                          )}
                          {getadmissiontestinfo.obtain5 != 0 && (
                            <>
                              <tr>
                                <td className="py-1">
                                  {getadmissiontestinfo.subject5}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.obtain5}
                                </td>
                                <td className="py-1">
                                  {getadmissiontestinfo.marks5}
                                </td>
                              </tr>
                            </>
                          )}

                          <tr>
                            <td className="fw-bold border-0 py-1">Total</td>
                            <td className="fw-bold border-0 py-1">
                              {[
                                getadmissiontestinfo.obtain1,
                                getadmissiontestinfo.obtain2,
                                getadmissiontestinfo.obtain3,
                                getadmissiontestinfo.obtain4,
                                getadmissiontestinfo.obtain5,
                              ].reduce((a, b) => a + b, 0)}
                            </td>
                            <td className="fw-bold border-0 py-1">
                              {[
                                getadmissiontestinfo.marks1,
                                getadmissiontestinfo.marks2,
                                getadmissiontestinfo.marks3,
                                getadmissiontestinfo.marks4,
                                getadmissiontestinfo.marks5,
                              ].reduce((a, b) => a + b, 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-2 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">
                      Teacher's Comment
                    </p>
                    <p className="col-lg-8 font-12">
                      : {getadmissiontestinfo.teacher_comment}
                    </p>
                  </div>

                  <div className="col-lg-12 mb-2 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">STAD Feedback</p>
                    <p className="col-lg-8 font-12">
                      : {getadmissiontestinfo.stad_feedback}
                    </p>
                  </div>
                </div>
                <div className="row px-2 my-3">
                  <div className="col-lg-12">
                    {admissionData?.principal_approvel == "" ? (
                      <>
                        {user == "Super Admin" || user == "Principal" ? (
                          <>
                            <div className="bg-light rounded p-3">
                              <p className="font-14 fw-bold">
                                Principle's Approval
                              </p>
                              <div className="row">
                                <div className="col-lg-6 my-2">
                                  <select
                                    className="form-select input1 py-0"
                                    onChange={(e) => {
                                      setPrincApproval(e.target.value);
                                    }}
                                  >
                                    <option selected value={""}>
                                      Select
                                    </option>
                                    <option value={"approved"}>Approved</option>
                                    <option value={"disapproved"}>
                                      Disapproved
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {princApproval === "disapproved" && (
                                <div className="row">
                                  <div className="col-lg-6 my-2">
                                    <textarea
                                      className="form-control"
                                      type="text"
                                      placeholder="Write here. . ."
                                      rows="2"
                                      onChange={(e) => {
                                        setDisapprovalNote(e.target.value);
                                      }}
                                    ></textarea>
                                  </div>
                                </div>
                              )}

                              <div className="row">
                                <div className="col-lg-12">
                                  <div class="form-check mb-2">
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
                                      Are you sure you want to submit?
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <button
                                    className="btn submit-btn"
                                    disabled={yn !== true}
                                    onClick={submitStudentApproval}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="bg-light rounded p-3">
                            <p className="font-14 fw-bold">
                              Waiting for Approval
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="bg-light rounded p-3">
                          <p className="font-14 fw-bold">Approved</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 px-0 border-start">
                <div className="d-flex py-2 px-3 border-b align-items-center justify-content-between">
                  <p className="font-14 fw-bold">Test Sheet</p>
                  <p className="m-0 text-primary fs-12">
                    <a
                      href={
                        `${import.meta.env.VITE_IMG_SERVER}` +
                        getadmissiontestinfo.testsheetPDF
                      }
                      target="_blank"
                    >
                      <i class="fa-regular fa-file-pdf me-1 "></i>View Exam
                      Sheet
                    </a>
                  </p>
                </div>
                <div className="text-center">
                  <img
                    src={
                      `${import.meta.env.VITE_IMG_SERVER}` +
                      getadmissiontestinfo.testsheet
                    }
                    className="img p-5"
                    style={{
                      height: "600px",
                      width: "500px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
