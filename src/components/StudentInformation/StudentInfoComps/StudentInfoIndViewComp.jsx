import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { StudentBasicComp } from "./StudentBasicComp";
import { StudentFeesComp } from "./StudentFeesComp";
import { StudentPurchaseComp } from "./StudentPurchaseComp";

export const StudentInfoIndViewComp = () => {
  const [studentData, setStudentData] = useState([]);
  const [getStudentIncomeInfo, setGetStudentIncomeInfo] = useState([]);
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

      setStudentData(res.message[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllStudentIncomeInfo = async () => {
    try {
      const data = new FormData();
      data.append("student_id", studentData.student_id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getStudentIncomeById`,

        { method: "POST", body: data }
      );
      const res = await response.json();
      setGetStudentIncomeInfo(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudentIncomeInfo();
  }, [studentData.student_id]);
  useEffect(() => {
    getStudentData();
  }, []);
  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Student Details</p>
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

            <div className="row border-bottom">
              <ul class="nav nav-pills" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                    id="pills-basic-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-basic"
                    type="button"
                    role="tab"
                    aria-controls="pills-basic"
                    aria-selected="true"
                  >
                    Basic Info
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    id="pills-fees-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-fees"
                    type="button"
                    role="tab"
                    aria-controls="pills-fees"
                    aria-selected="false"
                  >
                    Fees Info
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    id="pills-purchase-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-purchase"
                    type="button"
                    role="tab"
                    aria-controls="pills-purchase"
                    aria-selected="false"
                  >
                    Purchase Info
                  </a>
                </li>
              </ul>
            </div>

            <div className="row px-3 border-bottom py-1">
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-basic"
                  role="tabpanel"
                  aria-labelledby="pills-basic-tab"
                >
                  <StudentBasicComp />
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-fees"
                  role="tabpanel"
                  aria-labelledby="pills-fees-tab"
                >
                  {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    className="mb-2"
                    customStyles={customStyle}
                    dense
                  /> */}
                  <StudentFeesComp />
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-purchase"
                  role="tabpanel"
                  aria-labelledby="pills-purchase-tab"
                >
                  <StudentPurchaseComp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
