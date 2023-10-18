import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const StudentAidEditComp = () => {
  const [studentData, setStudentData] = useState([]);
  const params = useParams();
  const { id } = params;

  const [discountTypeAdmission, setDiscountTypeAdmission] = useState("");
  const [discountAmountAdmission, setDiscountAmountAdmission] = useState("");

  const [discountTypeTuition, setDiscountTypeTuition] = useState("");
  const [discountAmountTuition, setDiscountAmountTuition] = useState("");

  const [discountTypeAnnual, setDiscountTypeAnnual] = useState("");
  const [discountAmountAnnual, setDiscountAmountAnnual] = useState("");

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
      setDiscountTypeAdmission(res.message[0].admission_discount);
      setDiscountAmountAdmission(res.message[0].admission_amount);

      setDiscountTypeTuition(res.message[0].tuition_discount);
      setDiscountAmountTuition(res.message[0].tuition_amount);

      setDiscountTypeAnnual(res.message[0].annual_discount);
      setDiscountAmountAnnual(res.message[0].annual_amount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAidData = async () => {
    const data = new FormData();
    data.append("id", id);
    data.append("admission_discount", discountTypeAdmission);
    data.append("admission_amount", discountAmountAdmission);
    data.append("tuition_discount", discountTypeTuition);
    data.append("tuition_amount", discountAmountTuition);
    data.append("annual_discount", discountTypeAnnual);
    data.append("annual_amount", discountAmountAnnual);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/UpdateStudentAid`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();
      console.log(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  useEffect(() => {
    getStudentData();
  }, [id]);

  return (
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
                    <p className="col-lg-8 font-12">: {studentData.section}</p>
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
                    <p className="col-lg-8 font-12">: {studentData.category}</p>
                  </div>

                  <div className="col-lg-6 mb-3 d-flex">
                    <p className="col-lg-4 font-12 fw-bold">House</p>
                    <p className="col-lg-8 font-12">: {studentData.house}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parents Particulars */}

          <div className="row px-3 border-bottom py-1">
            <div className="d-flex bg1 px-3 py-1">
              <p className="text1 mb-0">Parent's & Guardian's Particulars</p>
            </div>
            <div className="row my-2 px-3">
              <div className="col-lg-6 mb-2 d-flex">
                <p className="col-lg-4 font-12 fw-bold">Father's Name</p>
                <p className="col-lg-8 font-12">: {studentData.father_name}</p>
              </div>

              <div className="col-lg-6 mb-2 d-flex">
                <p className="col-lg-4 font-12 fw-bold">Father's Occupation</p>
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
                <p className="col-lg-8 font-12">: {studentData.mother_name}</p>
              </div>

              <div className="col-lg-6 mb-2 d-flex">
                <p className="col-lg-4 font-12 fw-bold">Mother's Occupation</p>
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
                    studentData.guardianimg1
                  }
                  className="profile_img_form"
                />
              </div>

              <div className="col-lg-3 mb-2">
                <p className="col-lg-6 font-12 fw-bold">Gaurdian's Image 2</p>

                <img
                  src={
                    `${import.meta.env.VITE_IMG_SERVER}` +
                    studentData.guardianimg2
                  }
                  className="profile_img_form"
                />
              </div>
            </div>
          </div>

          <div className="row px-3 border-bottom py-1">
            <div className="d-flex bg1 px-3 py-1">
              <p className="text1 mb-0">Financial Aid</p>
            </div>

            <div className="row my-2 px-3">
              {studentData.admission_fee == "true" && (
                <>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Admission Fee</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      value={`Applicable on ${studentData?.financial_aid_type}`}
                      disabled
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Discount Type</label>
                    <div className="d-flex ">
                      <div className="form-check col-lg-6">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="percentage"
                          name="discountTypeAdmission"
                          onChange={(e) => {
                            setDiscountTypeAdmission(e.target.value);
                          }}
                          checked={discountTypeAdmission == "percentage"}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          %
                        </label>
                      </div>
                      <div className="form-check col-lg-6">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          name="discountTypeAdmission"
                          value="amount"
                          onChange={(e) => {
                            setDiscountTypeAdmission(e.target.value);
                          }}
                          checked={discountTypeAdmission == "amount"}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          Fixed Amount
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Discount Amount</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      value={discountAmountAdmission}
                      onChange={(e) => {
                        setDiscountAmountAdmission(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}

              {studentData.tuition_fee == "true" && (
                <>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Tuition Fee</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      value={`Applicable on ${studentData?.financial_aid_type}`}
                      disabled
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Discount Type</label>
                    <div className="d-flex ">
                      <div className="form-check col-lg-6">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="percentage"
                          name="discountTypeTuition"
                          onChange={(e) => {
                            setDiscountTypeTuition(e.target.value);
                          }}
                          checked={discountTypeTuition == "percentage"}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          %
                        </label>
                      </div>
                      <div className="form-check col-lg-6">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          name="discountTypeTuition"
                          value="amount"
                          onChange={(e) => {
                            setDiscountTypeTuition(e.target.value);
                          }}
                          checked={discountTypeTuition == "amount"}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          Fixed Amount
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Discount Amount</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      value={discountAmountTuition}
                      onChange={(e) => {
                        setDiscountAmountTuition(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}

              {studentData.annual_fee == "true" && (
                <>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Annual Fee</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      value={`Applicable on ${studentData?.financial_aid_type}`}
                      disabled
                    />
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Discount Type</label>
                    <div className="d-flex ">
                      <div className="form-check col-lg-6">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          value="percentage"
                          name="discountTypeAnnual"
                          onChange={(e) => {
                            setDiscountTypeAnnual(e.target.value);
                          }}
                          checked={discountTypeAnnual == "percentage"}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          %
                        </label>
                      </div>
                      <div className="form-check col-lg-6">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          name="discountTypeAnnual"
                          value="amount"
                          onChange={(e) => {
                            setDiscountTypeAnnual(e.target.value);
                          }}
                          checked={discountTypeAnnual == "amount"}
                        />
                        <label className="form-check-label font-13 fw-500 ms-1">
                          Fixed Amount
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-2">
                    <label className="form-label label1">Discount Amount</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      value={discountAmountAnnual}
                      onChange={(e) => {
                        setDiscountAmountAnnual(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="row align-items-center py-3">
              <div className="col-lg-12">
                <div class="form-check mb-1">
                  <input
                    class="form-check-input "
                    type="checkbox"
                    value="1"
                    id="flexCheckDefault"
                    onChange={handlerChange}
                  />
                  <label
                    class="form-check-label font-11"
                    for="flexCheckDefault"
                  >
                    Are You Sure to Submit?
                  </label>
                </div>
              </div>
              <div className="col-lg-2 text-end">
                <button
                  className="btn submit-btn-sm w-100"
                  onClick={updateAidData}
                  disabled={yn !== true}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
