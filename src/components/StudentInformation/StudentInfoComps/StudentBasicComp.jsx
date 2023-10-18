import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";

export const StudentBasicComp = () => {
  const params = useParams();
  const { id } = params;
  // States
  const [studentData, setStudentData] = useState([]);
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

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row py-2">
          <div className="col-lg-12">
            {/* ANCHOR Parent's Info Section */}

            <div className="border mb-3">
              <div className="d-flex bg1 px-3 py-1">
                <p className="text1 mb-0">Parent's & Gaurdian's Particulars</p>
              </div>
              <div className="row my-2 px-3">
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Father's Name</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.father_name}
                  </p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">
                    Father's Occupation
                  </p>
                  <p className="col-lg-8 font-12">
                    : {studentData.father_occupation}
                  </p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Father's Education</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.father_education}
                  </p>
                </div>

                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">NID</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.father_nidPass}
                  </p>
                </div>
                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">TIN</p>
                  <p className="col-lg-8 font-12">: {studentData.father_tin}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Mother's Name</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.mother_name}
                  </p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">
                    Mother's Occupation
                  </p>
                  <p className="col-lg-8 font-12">
                    : {studentData.mother_occupation}
                  </p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Mother's Education</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.mother_education}
                  </p>
                </div>

                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">NID</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.mother_nidPass}
                  </p>
                </div>
                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">TIN</p>
                  <p className="col-lg-8 font-12">: {studentData.mother_tin}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Gaurdian's Name 1</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.guardianName1}
                  </p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Relation 1</p>
                  <p className="col-lg-8 font-12">: {studentData.grelation1}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Gaurdian's Name 2</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.guardianName2}
                  </p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Relation 2</p>
                  <p className="col-lg-8 font-12">: {studentData.grelation2}</p>
                </div>
                <div className="col-lg-3 mb-2">
                  <p className="col-lg-6 font-12 fw-bold">Father's Image</p>{" "}
                  <img
                    src={
                      `${import.meta.env.VITE_IMG_SERVER}` +
                      studentData.father_img
                    }
                    className="profile_img_form"
                  />
                </div>

                <div className="col-lg-3 mb-2">
                  <p className="col-lg-6 font-12 fw-bold">Mother's Image</p>

                  <img
                    src={
                      `${import.meta.env.VITE_IMG_SERVER}` +
                      studentData.mother_img
                    }
                    className="profile_img_form"
                  />
                </div>

                <div className="col-lg-3 mb-2">
                  <p className="col-lg-6 font-12 fw-bold">Gaurdian's Image 1</p>
                  <img
                    src={
                      `${import.meta.env.VITE_IMG_SERVER}` +
                      studentData.gurdian1_img
                    }
                    className="profile_img_form"
                  />
                </div>

                <div className="col-lg-3 mb-2">
                  <p className="col-lg-6 font-12 fw-bold">Gaurdian's Image 2</p>

                  <img
                    src={
                      `${import.meta.env.VITE_IMG_SERVER}` +
                      studentData.gurdian2_img
                    }
                    className="profile_img_form"
                  />
                </div>
              </div>
            </div>

            {/* ANCHOR Address Info Section  */}

            <div className="border mb-3">
              <div className="d-flex bg1 px-3 py-1">
                <p className="text1 mb-0">Address</p>
              </div>
              <div className="row my-2 px-3">
                <div className="col-lg-12 mb-2 d-flex">
                  <p className="col-lg-2 font-12 fw-bold">Present Address</p>
                  <p className="col-lg-10 font-12">
                    : {studentData.present_address}
                  </p>
                </div>

                <div className="col-lg-12 mb-2 d-flex">
                  <p className="col-lg-2 font-12 fw-bold">Permanent Address</p>
                  <p className="col-lg-10 font-12">
                    : {studentData.permanent_address}
                  </p>
                </div>
              </div>
            </div>

            {/* ANCHOR Contacts Info Section */}

            <div className="border mb-3">
              <div className="d-flex bg1 px-3 py-1">
                <p className="text1 mb-0">Contacts</p>
              </div>
              <div className="row my-2 px-3">
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Father's Contact</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.father_contact}
                  </p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Father's Email</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.father_email}
                  </p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Mother's Contact</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.mother_contact}
                  </p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Mother's Email</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.mother_email}
                  </p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">
                    Emergency Contact 1
                  </p>
                  <p className="col-lg-8 font-12">
                    : {studentData.emergency_contact1}
                  </p>
                </div>
                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Relation</p>
                  <p className="col-lg-8 font-12">:{studentData.relation1}</p>
                </div>

                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Contact</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.sms_contact1}
                  </p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">
                    Emergency Contact 1
                  </p>
                  <p className="col-lg-8 font-12">
                    : {studentData.emergency_contact2}
                  </p>
                </div>
                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Relation</p>
                  <p className="col-lg-8 font-12">: {studentData.relation2}</p>
                </div>

                <div className="col-lg-3 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Contact</p>
                  <p className="col-lg-8 font-12">
                    : {studentData.sms_contact2}
                  </p>
                </div>
              </div>
            </div>

            {/* ANCHOR Academic Background Section */}

            <div className="border mb-3">
              <div className="d-flex bg1 px-3 py-1">
                <p className="text1 mb-0">Academic Background</p>
              </div>
              <div className="row my-2 px-3 ">
                <div className="col-lg-12 mb-2 d-flex">
                  <p className="col-lg-2 font-12 fw-bold">Current School</p>
                  <p className="col-lg-10 font-12">
                    : {studentData.currentschool}
                  </p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Start Date</p>
                  <p className="col-lg-8 font-12">: {studentData.sdate}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Grade</p>
                  <p className="col-lg-8 font-12">: {studentData.sgrade}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">End Date</p>
                  <p className="col-lg-8 font-12">: {studentData.fdate}</p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Grade</p>
                  <p className="col-lg-8 font-12">: {studentData.fgrade}</p>
                </div>

                <div className="col-lg-12 mb-2 d-flex">
                  <p className="col-lg-2 font-12 fw-bold">Previous School</p>
                  <p className="col-lg-10 font-12">
                    : {studentData.previousSchool}
                  </p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Start Date</p>
                  <p className="col-lg-8 font-12">: {studentData.psdate}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Grade</p>
                  <p className="col-lg-8 font-12">: {studentData.psgrade}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">End Date</p>
                  <p className="col-lg-8 font-12">: {studentData.pfdate}</p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Grade</p>
                  <p className="col-lg-8 font-12">: {studentData.pfgrade}</p>
                </div>
              </div>
            </div>

            {/* ANCHOR Siblings Details Section */}

            <div className="border mb-3">
              <div className="d-flex bg1 px-3 py-1">
                <p className="text1 mb-0">Add Siblings</p>
              </div>
              <div className="row my-2 px-3">
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Siblings 1</p>
                  <p className="col-lg-8 font-12">: {studentData.sibling1}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Siblings 2</p>
                  <p className="col-lg-8 font-12">: {studentData.sibling2}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Siblings 3</p>
                  <p className="col-lg-8 font-12">: {studentData.sibling3}</p>
                </div>

                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Siblings 4</p>
                  <p className="col-lg-8 font-12">: {studentData.sibling4}</p>
                </div>
                <div className="col-lg-6 mb-2 d-flex">
                  <p className="col-lg-4 font-12 fw-bold">Siblings 5</p>
                  <p className="col-lg-8 font-12">: {studentData.sibling5}</p>
                </div>
              </div>
            </div>

            <div className="border mb-3">
              <div className="d-flex bg1 px-3 py-1">
                <p className="text1 mb-0">Documents</p>
              </div>
              <div className="row my-2 px-3">
                <div className="col-lg-3">
                  <p className="text1 mb-0">TC</p>
                  <a
                    href={
                      `${import.meta.env.VITE_IMG_SERVER}` + studentData.tcimg
                    }
                    target="_blank"
                  >
                    Show Attachment
                  </a>
                </div>
                <div className="col-lg-3">
                  <p className="text1 mb-0">Birth certificate</p>
                  <a
                    href={
                      `${import.meta.env.VITE_IMG_SERVER}` + studentData.bcimg
                    }
                    target="_blank"
                  >
                    Show Attachment
                  </a>
                </div>
                <div className="col-lg-3">
                  <p className="text1 mb-0">Report</p>
                  <a
                    href={
                      `${import.meta.env.VITE_IMG_SERVER}` +
                      studentData.report_img
                    }
                    target="_blank"
                  >
                    Show Attachment
                  </a>
                </div>
                <div className="col-lg-3">
                  <p className="text1 mb-0">Others</p>
                  <a
                    href={
                      `${import.meta.env.VITE_IMG_SERVER}` +
                      studentData.other_img
                    }
                    target="_blank"
                  >
                    Show Attachment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
