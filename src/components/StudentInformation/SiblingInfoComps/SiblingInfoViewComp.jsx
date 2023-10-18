import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SessionContext } from "../../../context/SessionContext";

export const SiblingInfoViewComp = () => {
  const [studentData, setStudentData] = useState([]);

  const { session } = useContext(SessionContext);

  const [siblingData1, setSiblingData1] = useState([]);
  const [siblingData2, setSiblingData2] = useState([]);
  const [siblingData3, setSiblingData3] = useState([]);

  const params = useParams();
  const { id } = params;

  // Functions
  const getStudentData = async () => {
    try {
      const data = new FormData();
      data.append("id", id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getStudentViewByid`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      if (res.message[0].sibling1 && session) {
        getSiblingData1(res.message[0].sibling1);
      }
      if (res.message[0].sibling2 && session) {
        getSiblingData2(res.message[0].sibling2);
      }

      if (res.message[0].sibling3 && session) {
        getSiblingData3(res.message[0].sibling3);
      }

      setStudentData(res.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSiblingData1 = async (id) => {
    const data = new FormData();

    data.append("student_id", id);
    data.append("session", session);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getSiblingData`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      setSiblingData1(res.message[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getSiblingData2 = async (id) => {
    const data = new FormData();

    data.append("student_id", id);
    data.append("session ", session);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getSiblingData`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      setSiblingData2(res.message[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getSiblingData3 = async (id) => {
    const data = new FormData();

    data.append("student_id", id);
    data.append("session", session);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getStudentIDCardViewByid`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      setSiblingData3(res.message[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudentData();
  }, [id, session]);

  // console.log(siblingData3);
  // console.log(siblingData2);
  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Sibling Details</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row py-2 border-bottom">
              <div className="col-lg-2">
                <img
                  src={
                    `${import.meta.env.VITE_IMG_SERVER}` +
                    studentData.student_picture
                  }
                  className="profile_img"
                />
              </div>
              <div className="col-lg-10">
                <div className="mb-3">
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Student Name</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.student_first_name}{" "}
                        {studentData.student_last_name}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Student Id</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.student_id}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Class</p>
                      <p className="col-lg-8 font-12">: {studentData.Class}</p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Section</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.section}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Gender</p>
                      <p className="col-lg-8 font-12">: {studentData.gender}</p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Date of Birth</p>
                      <p className="col-lg-8 font-12">: {studentData.dob}</p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Category</p>
                      <p className="col-lg-8 font-12">
                        : {studentData.category}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-3 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">House</p>
                      <p className="col-lg-8 font-12">: {studentData.house}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-2">
              <div className="d-flex bg1 px-3 py-1">
                <p className="text1 mb-0">Siblings Data</p>
              </div>

              <table className="table table-striped">
                <thead className="text-center">
                  <tr>
                    <th className="py-1 fs-12">Student ID</th>
                    <th className="py-1 fs-12">Name</th>
                    <th className="py-1 fs-12">Class</th>

                    <th className="py-1 fs-12">Section</th>
                    <th className="py-1 fs-12">Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {siblingData1 && (
                    <tr>
                      <td className="py-1 fs-12">{siblingData1.student_id}</td>
                      <td className="py-1 fs-12">
                        {siblingData1.student_first_name}{" "}
                        {siblingData1.student_last_name}
                      </td>
                      <td className="py-1 fs-12">{siblingData1.Class}</td>
                      <td className="py-1 fs-12">{siblingData1.section}</td>
                      <td className="py-1 fs-12 text-center">
                        {siblingData1.principal_approve == "Archive" && (
                          <>
                            <p className="fs-11 rounded bg-danger py-1 text-white">
                              Archived
                            </p>
                          </>
                        )}
                        {siblingData1.principal_approve == "Approved" && (
                          <>
                            <p className="fs-11 rounded bg-success py-1 text-white">
                              Active
                            </p>
                          </>
                        )}
                      </td>
                    </tr>
                  )}

                  {siblingData2 && (
                    <tr>
                      <td className="py-1 fs-12">{siblingData2.student_id}</td>
                      <td className="py-1 fs-12">
                        {siblingData2.student_first_name}{" "}
                        {siblingData2.student_last_name}
                      </td>
                      <td className="py-1 fs-12">{siblingData2.Class}</td>
                      <td className="py-1 fs-12">{siblingData2.section}</td>
                      <td className="py-1 fs-12">
                        {siblingData2.principal_approve == "Archive" && (
                          <>
                            <p className="fs-11 rounded bg-danger py-1 text-white">
                              Archived
                            </p>
                          </>
                        )}
                        {siblingData2.principal_approve == "Approved" && (
                          <>
                            <p className="fs-11 rounded bg-success py-1 text-white">
                              Active
                            </p>
                          </>
                        )}
                      </td>
                    </tr>
                  )}

                  {siblingData3 && (
                    <tr>
                      <td className="py-1 fs-12">{siblingData3.student_id}</td>
                      <td className="py-1 fs-12">
                        {siblingData3.student_first_name}{" "}
                        {siblingData3.student_last_name}
                      </td>
                      <td className="py-1 fs-12">{siblingData3.Class}</td>
                      <td className="py-1 fs-12">{siblingData3.section}</td>
                      <td className="py-1 fs-12">
                        {siblingData3.principal_approve == "Archive" && (
                          <>
                            <p className="fs-11 rounded bg-danger py-1 text-white">
                              Archived
                            </p>
                          </>
                        )}
                        {siblingData3.principal_approve == "Approved" && (
                          <>
                            <p className="fs-11 rounded bg-success py-1 text-white">
                              Active
                            </p>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
