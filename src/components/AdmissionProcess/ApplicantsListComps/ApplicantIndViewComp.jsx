import React, { useState, useEffect } from "react";
import profileImg from "../../../assets/images/profile.png";
import { useParams } from "react-router-dom";

export const ApplicantIndViewComp = () => {
  const [getstudentdata, setGetstudentdata] = useState([]);
  const params = useParams();
  const { id } = params;

  const getstudent = () => {
    const data = new FormData();
    data.append("id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getApplientViewByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setGetstudentdata(res.message[0]);
        console.log(res.message[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getstudent();
  }, []);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Applicant Info</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row py-2">
              <div className="col-lg-2">
                <img
                  src={
                    `${import.meta.env.VITE_IMG_SERVER}` +
                    getstudentdata.student_picture
                  }
                  className="profile_img"
                />
                <div className="my-2">
                  <p className="font-16 fw-bold">
                    {getstudentdata.student_first_name}{" "}
                    {getstudentdata.student_last_name}
                  </p>
                  <p className="font-12 idbatch px-2 my-1">
                    <span className="font-10">#Form</span>:{" "}
                    {getstudentdata.form_number}
                  </p>
                  <p className="font-12 px-2 ">
                    <span className="font-10">#Submission</span>:{" "}
                    {getstudentdata.submission_date}
                  </p>
                  <hr className="my-2" />
                  <p className="font-11 p-2 text-primary">
                    {" "}
                    <i className="fa-solid fa-edit"></i> &nbsp;&nbsp;Update Info
                  </p>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="border mb-3">
                  <div className="d-flex bg1 px-3 py-1">
                    <p className="text1 mb-0">Student's Particular</p>
                  </div>
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Student Name</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.student_first_name}{" "}
                        {getstudentdata.student_last_name}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Applying For Class
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.applyforclass}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Gender</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.gender}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Date of Birth</p>
                      <p className="col-lg-8 font-12">: {getstudentdata.dob}</p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Age</p>
                      <p className="col-lg-8 font-12">: {getstudentdata.age}</p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Place of Birth</p>
                      <p className="col-lg-8 font-12">: {getstudentdata.pob}</p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Nationality</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.nationality}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Religion</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.religion}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Birth Certificate
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.birthCertificate}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Passport Number
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.passport_number}
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
                        : {getstudentdata.currentschool}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Start Date</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sdate}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Grade</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sgrade}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">End Date</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.fdate}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Grade</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.fgrade}
                      </p>
                    </div>

                    <div className="col-lg-12 mb-2 d-flex">
                      <p className="col-lg-2 font-12 fw-bold">
                        Previous School
                      </p>
                      <p className="col-lg-10 font-12">
                        : {getstudentdata.previousSchool}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Start Date</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.psdate}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Grade</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.psgrade}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">End Date</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.pfdate}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Grade</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.pfgrade}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ANCHOR Medical Conditions Section */}

                <div className="border mb-3">
                  <div className="d-flex bg1 px-3 py-1">
                    <p className="text1 mb-0">Medical Condition</p>
                  </div>
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Physical Disability
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.physical_disability}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Partially Sighted
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.partially_signted}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Hearing Impairment
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.hearing_imparment}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Mobility Difficulties
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mobility_difficulties}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Mental Disability
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mental_health}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Blood Group</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.blood_group}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Others</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.others}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Remark</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mremarks}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ANCHOR Parent's Info Section */}

                <div className="border mb-3">
                  <div className="d-flex bg1 px-3 py-1">
                    <p className="text1 mb-0">
                      Parent's & Gaurdian's Particulars
                    </p>
                  </div>
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Father's Name</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.father_name}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Father's Occupation
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.father_occupation}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Father's Education
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.father_education}
                      </p>
                    </div>

                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">NID</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.father_nidPass}
                      </p>
                    </div>
                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">TIN</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.father_tin}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Mother's Name</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mother_name}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Mother's Occupation
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mother_occupation}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Mother's Education
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mother_education}
                      </p>
                    </div>

                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">NID</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mother_nidPass}
                      </p>
                    </div>
                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">TIN</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mother_tin}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Gaurdian's Name 1
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.guardianName1}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Relation 1</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.grelation1}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Gaurdian's Name 2
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.guardianName2}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Relation 2</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.grelation2}
                      </p>
                    </div>
                    <div className="col-lg-3 mb-2">
                      <p className="col-lg-6 font-12 fw-bold">Father's Image</p>{" "}
                      <img
                        src={
                          `${import.meta.env.VITE_IMG_SERVER}` +
                          getstudentdata.father_img
                        }
                        className="profile_img_form"
                      />
                    </div>

                    <div className="col-lg-3 mb-2">
                      <p className="col-lg-6 font-12 fw-bold">Mother's Image</p>

                      <img
                        src={
                          `${import.meta.env.VITE_IMG_SERVER}` +
                          getstudentdata.mother_img
                        }
                        className="profile_img_form"
                      />
                    </div>

                    <div className="col-lg-3 mb-2">
                      <p className="col-lg-6 font-12 fw-bold">
                        Gaurdian's Image 1
                      </p>
                      <img
                        src={
                          `${import.meta.env.VITE_IMG_SERVER}` +
                          getstudentdata.gurdian1_img
                        }
                        className="profile_img_form"
                      />
                    </div>

                    <div className="col-lg-3 mb-2">
                      <p className="col-lg-6 font-12 fw-bold">
                        Gaurdian's Image 2
                      </p>

                      <img
                        src={
                          `${import.meta.env.VITE_IMG_SERVER}` +
                          getstudentdata.gurdian2_img
                        }
                        className="profile_img_form"
                      />
                    </div>
                  </div>
                </div>

                {/* ANCHOR Address Info Section  */}

                <div className="border mb-3">
                  <div className="d-flex bg1 px-3 py-1">
                    <p className="text1 mb-0">Local Address</p>
                  </div>
                  <div className="row my-2 px-3">
                    <div className="col-lg-12 mb-2 d-flex">
                      <p className="col-lg-2 font-12 fw-bold">
                        Present Address
                      </p>
                      <p className="col-lg-10 font-12">
                        : {getstudentdata.presentdistrict}{" "}
                        {getstudentdata.presentcity}{" "}
                        {getstudentdata.presentstreet}
                      </p>
                    </div>

                    <div className="col-lg-12 mb-2 d-flex">
                      <p className="col-lg-2 font-12 fw-bold">
                        Permanent Address
                      </p>
                      <p className="col-lg-10 font-12">
                        : {getstudentdata.permanentdistrict}{" "}
                        {getstudentdata.permanentcity}{" "}
                        {getstudentdata.permanentstreet}
                      </p>
                    </div>
                  </div>
                </div>

                {getstudentdata.present_address &&
                  getstudentdata.permanent_address && (
                    <div className="border mb-3">
                      <div className="d-flex bg1 px-3 py-1">
                        <p className="text1 mb-0">Foreign Address</p>
                      </div>
                      <div className="row my-2 px-3">
                        <div className="col-lg-12 mb-2 d-flex">
                          <p className="col-lg-2 font-12 fw-bold">
                            Present Address
                          </p>
                          <p className="col-lg-10 font-12">
                            : {getstudentdata.present_address}
                          </p>
                        </div>

                        <div className="col-lg-12 mb-2 d-flex">
                          <p className="col-lg-2 font-12 fw-bold">
                            Permanent Address
                          </p>
                          <p className="col-lg-10 font-12">
                            : {getstudentdata.permanent_address}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* ANCHOR Contacts Info Section */}

                <div className="border mb-3">
                  <div className="d-flex bg1 px-3 py-1">
                    <p className="text1 mb-0">Contacts</p>
                  </div>
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Father's Contact
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.father_contact}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Father's Email</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.father_email}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Mother's Contact
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mother_contact}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Mother's Email</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.mother_email}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Emergency Contact 1
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.emergency_contact1}
                      </p>
                    </div>
                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Relation</p>
                      <p className="col-lg-8 font-12">
                        :{getstudentdata.relation1}
                      </p>
                    </div>

                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Contact</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sms_contact1}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Emergency Contact 1
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.emergency_contact2}
                      </p>
                    </div>
                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Relation</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.relation2}
                      </p>
                    </div>

                    <div className="col-lg-3 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Contact</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sms_contact2}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ANCHOR Payment Info Section */}

                <div className="border mb-3">
                  <div className="d-flex bg1 px-3 py-1">
                    <p className="text1 mb-0">Payment of Fees</p>
                  </div>
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-8 font-12 fw-bold">
                        Who will pay his/her fees?
                      </p>
                      <p className="col-lg-4 font-12">
                        : {getstudentdata.who_will_pay}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Relation</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.pay_relation}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-8 font-12 fw-bold">
                        Are you an employee of our School?
                      </p>
                      <p className="col-lg-4 font-12">
                        : {getstudentdata.employee_student}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Designation</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.employee_student}
                      </p>
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
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sibling1}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Siblings 2</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sibling2}
                      </p>
                    </div>

                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Siblings 3</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sibling3}
                      </p>
                    </div>
                    {/* 
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Siblings 4</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sibling4}
                      </p>
                    </div>
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">Siblings 5</p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.sibling5}
                      </p>
                    </div> */}
                  </div>
                </div>

                <div className="border mb-3">
                  <div className="d-flex bg1 px-3 py-1">
                    <p className="text1 mb-0">Note</p>
                  </div>
                  <div className="row my-2 px-3">
                    <div className="col-lg-6 mb-2 d-flex">
                      <p className="col-lg-4 font-12 fw-bold">
                        Additional Note
                      </p>
                      <p className="col-lg-8 font-12">
                        : {getstudentdata.note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
